	
	window.Phpngo = window.Phpngo || {};

	Phpngo.params = {
		browser: navigator.userAgent.toLowerCase()
	};

	// History API
	Phpngo.history = {
		states: [],
		popstate: function(event){
			var state = event.state;

			if((state === null) || (state === undefined)){
				state = window.event.state;
			}

			if( state ){
				console.log(state.index, Phpngo.history.states, Phpngo.history.states[ state.index ] );
				Phpngo.history.states[ state.index ].element.trigger( Phpngo.history.states[ state.index ].action );
			}
		}
	};
	window.addEventListener('popstate', Phpngo.history.popstate );

	// Content transitions
	$.fn.transition = function( args ){

		var self = this,
			$element = $(this),
			defaults = {

				// Event
				action: 'click',			// Event method
				prevent: true,				// Prevent defaults

				// Transition
				animation: 'push',			// "push", "clear", "none", "fade", "back-return"
				duration: 1000,				// (in ms) Total duration of the animation
				loadingClass: '',			// The calss name that will be appended durring the loading time
				loadingHTML: '',			// The HTML content of the element durring the loading time
				$target: $('body'),

				// Ajax
				history: true,
				cache: false,
				title: '',
				url: '',
				data: {},
				type: 'POST',
				block: '',

				// Hard Coded
				HTML: '',
				rtl: false,
				loaderImgPath: '/phpngo/media/images/loader.gif',

				// Events: onBefore > (onSuccess | onError) > onAfterUpdate
				onBefore: function(){ return true; },
				onSuccess: function( response, self ){ 
					do_animation.init(response);
					return true; 
				},
				onError: function( response ){ return false; },
				onAfterUpdate: function( response ){}

			},
			options = $.extend( false, defaults, args ), // User can change the settings.

			do_animation = {
				switch_elements: function(response){
					var stage = 'start';
					//wrap it
					$target.wrapInner('<div id="phpngo-element-wrap"></div>');
					//add class to parent
					$target.addClass('phpngo-element-parent');
					//add style
					var style = '<style id="phpngo-element-style">'+do_animation.add_new_style(options.animation)+'</style>';
					$target.append(style);
					//adding loader layer
					functions.add_loader();
					//hide page's scrollbar
					functions.disable_scrollbar();

					switch(options.animation)
					{
					case 'push':
					  var new_element = functions.add_new_element(response);
					  $('#phpngo-element-wrap').wrap('<div id="phpngo-elements-push"></div>');
					  $('#phpngo-elements-push').prepend(new_element);
					  //adjust the div's height according to the new element's height
					  functions.adjust_element_height('phpngo-new-element');
					  setTimeout(function(){
					  	$('#phpngo-elements-push').addClass('active');
					  }, 10);

					  $('#phpngo-elements-push').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
					  	if(!options.cache){
						  	$('#phpngo-element-wrap').remove();
							functions.remove_phpngo_wrapper('phpngo-new-element');
							functions.remove_phpngo_wrapper('phpngo-elements-push');
						  	$('#phpngo-element-style').remove();
						  	$target.removeClass('phpngo-element-parent');
					  	}
					  });
					  break;
					case 'push-back':
					  var new_element = functions.add_new_element(response);
					  $('#phpngo-element-wrap').wrap('<div id="phpngo-elements-push"></div>');
					  $('#phpngo-elements-push').prepend(new_element);
					  //adjust the div's height according to the new element's height
					  functions.adjust_element_height('phpngo-new-element');
					  setTimeout(function(){
					  	$('#phpngo-elements-push').addClass('active');
					  }, 10);

					  $('#phpngo-elements-push').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
					  	if(!options.cache){
						  	$('#phpngo-element-wrap').remove();
							functions.remove_phpngo_wrapper('phpngo-new-element');
							functions.remove_phpngo_wrapper('phpngo-elements-push');
						  	$('#phpngo-element-style').remove();
						  	$target.removeClass('phpngo-element-parent');
					  	}
					  });
					  break;
					case 'back-return':
						//when transition finishes - add the new content
						$('#phpngo-element-wrap').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
							if(stage == 'start'){
								stage = 'back';
								$(this).html(response);
							    //adjust the div's height according to the new element's height
							    functions.adjust_element_height('phpngo-element-wrap');
								//add style
								var style = do_animation.add_new_style(options.animation+'-back');
								$('#phpngo-element-style').html(style);
							}else{
								//remove wrapper & style
								functions.remove_phpngo_wrapper('phpngo-element-wrap');
								$target.removeClass('phpngo-element-parent');
								$('#phpngo-element-style').remove();
							}
						});
					  break;
					}
					//remove loader layer
					functions.remove_loader();
					//check if page has scrollbar
					functions.enable_scrollbar();
				},
				add_new_style: function(animation){
					//mesure
					var el_width = $target.outerWidth(),
						el_height = $target.outerHeight(),
						duration = parseInt(options.duration)/1000,
						extra_padding_movement = 100;

					switch(animation)
					{
					case 'push':
					  var direction = (!options.rtl) ? 'right' : 'left',
					  	  initial_position = '',
					  	  move_to = '';

					  if(!options.rtl){
					  		initial_position = 'margin-left:0;';
					  		move_to = 'margin-left:-'+el_width+'px';
					  }else{
					  		initial_position = 'margin-left:-'+el_width+'px;';
					  		move_to = 'margin-left:0';
					  }

					  var css = '.phpngo-element-parent{overflow:hidden;width:'+(el_width)+'px;height:'+el_height+'px;}';
					  	  css += '#phpngo-elements-push{width:'+(el_width*2)+'px;height:'+el_height+'px;'+initial_position;
					  	  css +=  functions.get_browser_prefix()+"transition: margin-left "+duration+"s ease;}";
					  	  css += '#phpngo-elements-push.active{'+move_to+'}';
					  	  css += '#phpngo-element-wrap,#phpngo-new-element';
					  	  css += '{width:'+el_width+'px;float:'+direction+';}';

					  	  return css;
					  break;
					case 'push-back':
					//for back clicking
					  var direction = (!options.rtl) ? 'right' : 'left',
					  	  initial_position = '',
					  	  move_to = '';

					  if(!options.rtl){
					  		initial_position = 'margin-left:0;';
					  		move_to = 'margin-left:-'+el_width+'px';
					  }else{
					  		initial_position = 'margin-left:-'+el_width+'px;';
					  		move_to = 'margin-left:0';
					  }

					  var css = '.phpngo-element-parent{overflow:hidden;width:'+(el_width)+'px;height:'+el_height+'px;}';
					  	  css += '#phpngo-elements-push{width:'+(el_width*2)+'px;height:'+el_height+'px;margin-'+direction+':-'+el_width+'px;';
					  	  css +=  functions.get_browser_prefix()+"transition: margin-"+direction+" "+duration+"s ease;}";
					  	  css += '#phpngo-elements-push.active{margin-'+direction+':0}';
					  	  css += '#phpngo-element-wrap,#phpngo-new-element';
					  	  css += '{width:'+el_width+'px;float:left;}';

					  	  return css;
					  break;
					case 'back-return':
						var push_to = (parseInt(el_width)+extra_padding_movement)+'px';
						var direction = (!options.rtl) ? 'left' : 'right';
						
					  var parent_css = '.phpngo-element-parent{overflow:hidden;width:'+el_width+'px;height:'+el_height+'px;}',
					  	  element_css = '#phpngo-element-wrap{width:'+el_width+'px;margin-'+direction+':-'+push_to+';'+functions.get_browser_prefix()+'transition: margin-'+direction+' '+duration+'s linear;}';

					  	  return parent_css+element_css;
					  break;
					case 'back-return-back':
						var push_to = (parseInt(el_width)+extra_padding_movement)+'px';
						var direction = (!options.rtl) ? 'left' : 'right';
						
					  var parent_css = '.phpngo-element-parent{overflow:hidden;width:'+el_width+'px;height:'+el_height+'px;}',
					  	  element_css = '#phpngo-element-wrap{width:'+el_width+'px;margin-'+direction+':0;'+functions.get_browser_prefix()+'transition: margin-'+direction+' '+duration+'s ease;}';

					  	  return parent_css+element_css;
					  break;
					}
				},
				init: function(response){
					$target = options.$target;
					setTimeout(function(){
						do_animation.switch_elements(response);
					}, options.duration);
				}
			};

			functions = {
				update_content: function( content ){
					if( ($.isFunction( options.onSuccess ) && options.onSuccess( content, self )) ){
						/*options.$target.html( content );*/
						if( $.isFunction( options.onAfterUpdate ) ){
							options.onAfterUpdate();
						}
					}
				},
				handle_error: function(){
					if (typeof console != "undefined") {
					    console.log('handling error');
					}
				},
				get_browser_prefix: function(){
					var browser = Phpngo.params.browser;
					if(browser.indexOf("firefox") > -1){return '-moz-';}
					if(browser.indexOf("chrome") > -1){return '-webkit-';}
					if(browser.indexOf("safari") > -1){return '-webkit-';}
					if(browser.indexOf("opera") > -1){return '-o-';}
					if(browser.indexOf("msie") > -1){return '-ms-';}

					return '';
				},
				remove_phpngo_wrapper: function(el_id){
					var child = $('#'+el_id).children(":first");
					child.unwrap('<div id="'+el_id+'"></div>');
				},
				add_new_element: function(response){
					return '<div id="phpngo-new-element">'+response+'</div>';
				},
				adjust_element_height: function(element){
					var height = $('#'+element).outerHeight()+'px';
					$target.outerHeight(height);
				},
				disable_scrollbar: function(){
					$('body').css('overflow', 'hidden');
				},
				enable_scrollbar: function(){
					var has_scrollbar = functions.check_for_scrollbar(),
						attr = '';
					if(has_scrollbar){
						attr = 'auto';
					}else{
						attr = 'visible';
					}
					setTimeout(function(){
						$('body').css('overflow', attr);
					}, 10);
				},
				check_for_scrollbar: function(){
					if ($(document).height() > $(window).height()) { 
						return true;
					}else{
						return false;
					}
				},
				add_loader: function(){
					var layer_css = 'height:100%;width:100%;z-index:1000;background:#000000;opacity:0.4;padding-top:25%;position:absolute;top:0;left:0;',
						black_layer = '<div class="phpngo-transition-layer" style="position:relative;text-align:center;"><div style="'+layer_css+'"></div><img style="position:absolute;padding-top:25%;z-index:1001" src="'+options.loaderImgPath+'" /></div>';
					$target.prepend(black_layer);
				},
				remove_loader: function(){
					$('.phpngo-transition-layer').remove();
				}
			};


		$element.on( options.action, function(e){
			if( ($.isFunction( options.onBefore ) && options.onBefore()) ){
				
				if( options.prevent ){
					e.preventDefault();
				}

				if( options.HTML ){
					functions.update_content( options.HTML );
				}else if( options.url ){

					if( options.history && typeof history.pushState !== 'undefined' ){
						var index = Phpngo.history.states.length;
						Phpngo.history.states[ index ] = { element: $element, action: options.action }
						history.pushState( { index: index }, options.title, options.url);
					}

					$.ajax({
						url: options.url,
						type: options.type,
						data: $.extend( false, {
							is_ajax: 'true',
							block: options.block
						}, options.data ),
						success: functions.update_content,
						error: functions.handle_error
					});
				}

			}
		});

		return $element;
	}