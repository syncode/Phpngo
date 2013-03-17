	
	window.Phpngo = window.Phpngo || {};

	Phpngo.params = {
		browser: navigator.userAgent.toLowerCase()
	};

	Phpngo.compatibility = {
		has_transitions: function(){
		    var b = document.body || document.documentElement;
		    var s = b.style;
		    var p = 'transition';
		    if(typeof s[p] == 'string') {return true; }

		    // Tests for vendor specific prop
		    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
		    p = p.charAt(0).toUpperCase() + p.substr(1);
		    for(var i=0; i<v.length; i++) {
		      if(typeof s[v[i] + p] == 'string') { return true; }
		    }
		    $('body').addClass('no-transition');
		    return false;
		}
	};


	var browser_has_transitions = Phpngo.compatibility.has_transitions();

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
	
	if(window.addEventListener){
		window.addEventListener('popstate', Phpngo.history.popstate );

	}else if(window.attachEvent){
		//ie fix
		window.attachEvent('popstate', Phpngo.history.popstate );
	}

	// Content transitions
	$.fn.transition = function( args ){

		var self = this,
			$element = $(this),
			functions_queue = '',
			defaults = {

				// Event
				action: 'click',			// Event method
				prevent: true,				// Prevent defaults

				// Transition
				animation: 'back-return',			// "push", "clear", "none", "fade", "back-return"
				duration: 1000,				// (in ms) Total duration of the animation
				loadingClass: 'phpngo-transition-layer',			// The calss name that will be appended durring the loading time
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
				rtl: true,
				loaderImgPath: '/phpngo/media/images/loader.gif',

				// Events: onBefore > (onSuccess | onError) > onAfterUpdate
				onBefore: function(){ return true; },
				onSuccess: function( response, self ){ 
					return true; 
				},
				onError: function( response ){ return false; },
				onAfterUpdate: function( response ){},
				onTransition: function(){ 
					functions.do_animation();
					if(browser_has_transitions){
						functions.animation_finish();
					}
				},
				onAfter: function( response ){}

			},
			options = $.extend( false, defaults, args ), // User can change the settings.

			handle_dom = {
				add_new_style: function(animation){
					//mesure
					var el_width = $target.outerWidth(),
						el_height = $target.outerHeight(),
						duration = parseInt(options.duration)/1000,
						extra_padding_movement = 100;

					switch(animation)
					{
					case 'push':
 
						  if(!options.rtl){
						  		var margin_left = 0,
						  			margin_left_active = '-'+el_width,
						  			direction = 'right';
						  }else{
						  		var margin_left = '-'+el_width,
						  			margin_left_active = 0,
						  			direction = 'left';
						  }

						  var style = new Array();
						  style['.phpngo-element-parent'] = {
						  	'overflow': 'hidden', 
						  	'width': el_width+'px', 
						  	'height': el_height+'px'
						  };

						  style['#phpngo-elements-push'] = {
						  	'width': (el_width*2), 
						  	'height': el_height, 
						  	'margin-left': margin_left, 
						  	'transition': 'margin-left '+duration+'s ease'
						  };

						  style['#phpngo-elements-push.active'] = {'margin-left': margin_left_active};
						  style['#phpngo-element-wrap,#phpngo-new-element'] = {'width': el_width, 'float': direction};

						  css = functions.css_factory(style);
					  
					  	  return css;
					  break;
					case 'push-back':
						//for back clicking
						  if(!options.rtl){
					  		var margin_left = '-'+el_width,
					  			margin_left_active = 0,
					  			direction = 'right';
						  }else{
					  		var margin_left = 0,
					  			margin_left_active = '-'+el_width,
					  			direction = 'left';
						  }

						  var style = new Array();
						  style['.phpngo-element-parent'] = {
						  	'overflow': 'hidden', 
						  	'width': el_width, 
						  	'height': el_height
						  };

						  style['#phpngo-elements-push'] = {
						  	'width': (el_width*2), 
						  	'height': el_height, 
						  	'margin-left': margin_left, 
						  	'transition': 'margin-left '+duration+'s ease'
						  };

						  style['#phpngo-elements-push.active'] = {'margin-left': margin_left_active};
						  style['#phpngo-element-wrap,#phpngo-new-element'] = {'width': el_width, 'float': direction};

						  css = functions.css_factory(style);
					  	  return css;
					  break;
					case 'back-return':
						  var margin_left = (!options.rtl) ? '-' : '';
							  margin_left += parseInt(el_width)+extra_padding_movement;
						
						  var style = new Array();
					  	  style['.phpngo-element-parent'] = {
					  		'overflow': 'hidden', 
					  		'margin-left': 0,
					  		'float': 'left',
					  		'width': el_width, 
					  		'height': el_height
					  	  };

						  style['#phpngo-element-wrap'] = {
						  		'width': el_width, 
						  		'float': 'left',
						  		'margin-left': margin_left, 
						  		'transition': 'margin-left '+duration+'s linear'
						  };

						  css = functions.css_factory(style);
					  	  return css;
					  break;
					case 'back-return-back':
						  var margin_left = (!options.rtl) ? '-' : '';
							  margin_left += parseInt(el_width)+extra_padding_movement;
						
						  var style = new Array();
					  	  style['.phpngo-element-parent'] = {
					  		'overflow': 'hidden', 
					  		'float': 'left',
					  		'width': el_width, 
					  		'height': el_height
					  	  };

						  style['#phpngo-element-wrap'] = {
						  		'width': el_width, 
					  			'float': 'left',
						  		'margin-left': 0, 
						  		'transition': 'margin-left '+duration+'s linear'
						  };

						  css = functions.css_factory(style);
					  	  return css;
					  break;
					}
				},
				init: function(response){
					$target = options.$target;
					//update dom
					functions.update_dom(response);
					//remove loader layer
					functions.remove_loader();
					//check if page has scrollbar
					functions.enable_scrollbar();
				}
			};

			functions = {
				update_content: function( content ){
					if( ($.isFunction( options.onSuccess ) && options.onSuccess( content, self )) ){
						handle_dom.init(content);

						if( ($.isFunction( options.onAfterUpdate ) && options.onAfterUpdate( content, self )) ){
							options.onAfterUpdate();
						}

						if( ($.isFunction( options.onTransition ) && options.onTransition( content, self )) ){
							options.onTransition();
						}

						if( ($.isFunction( options.onAfter ) && options.onAfter( content, self )) ){
							options.onAfter();
						}
					}
				},
				update_dom: function(response){
					//wrap it
					$target.wrapInner('<div id="phpngo-element-wrap"></div>');
					//add class to parent
					$target.addClass('phpngo-element-parent');
					//add style
					var style = '<style id="phpngo-element-style">'+handle_dom.add_new_style(options.animation)+'</style>';
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
					  //functions.adjust_element_height('phpngo-new-element');

					  break;
					case 'push-back':
					  var new_element = functions.add_new_element(response);
					  $('#phpngo-element-wrap').wrap('<div id="phpngo-elements-push"></div>');
					  $('#phpngo-elements-push').prepend(new_element);
					  //adjust the div's height according to the new element's height
					  //functions.adjust_element_height('phpngo-new-element');

					  break;
					case 'back-return':


						if(!browser_has_transitions){
							//ie
							var $wrap = $('#phpngo-element-wrap'),
								offset = 150,
								margin = ($wrap.outerWidth()+offset)+'px';

							$wrap.css('margin-left', 0)

							if(!options.rtl){
								margin = '-'+margin;
							}
							
							//going in
							$wrap.stop().animate({
								marginLeft: margin
							},options.duration, 'linear', function(){
								//add new content
								$('#phpngo-element-wrap').html(response);
								
								setTimeout(function(){
									$wrap.stop().animate({
										marginLeft: '0'
									},options.duration, 'linear', function(){
										//remove wrapper & style
										functions.remove_phpngo_wrapper('phpngo-element-wrap');
										$target.removeClass('phpngo-element-parent');
										$('#phpngo-element-style').remove();
									});
								}, 10);
							});

							
						}else{
							//when transition finishes - add the new content
							$('#phpngo-element-wrap').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
								$(this).html(response);
							    //adjust the div's height according to the new element's height
							    functions.adjust_element_height('phpngo-element-wrap');
								//add style
								var style = handle_dom.add_new_style(options.animation+'-back');
								$('#phpngo-element-style').html(style);

								//when transition finishes - add the new content
								$('#phpngo-element-wrap').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
									//remove wrapper & style
									functions.remove_phpngo_wrapper('phpngo-element-wrap');
									$target.removeClass('phpngo-element-parent');
									$('#phpngo-element-style').remove();
								});
							});
						}

						functions_queue = $('#phpngo-elements-push').queue("fx");
						
					  break;
					}
				},
				do_animation: function(){
					switch(options.animation){
					case 'push':
						
						if(!browser_has_transitions){
							//ie
							var $wrap = $('#phpngo-elements-push'),
								margin = ($wrap.outerWidth()/2)+'px';

							if(!options.rtl){
								margin = '-'+margin;
							}

							$wrap.stop().animate({
							    marginLeft: margin
							}, options.duration, 'linear', functions.animation_finish);
						}else{
				  			$('#phpngo-elements-push').addClass('active');
						}

						functions_queue = $('#phpngo-elements-push').queue("fx");

					  break;
					case 'push-back':

						if(!browser_has_transitions){
							//ie
							var $wrap = $('#phpngo-elements-push'),
								margin = '-'+($wrap.outerWidth()/2)+'px';

							if(!options.rtl){
								margin = 0;
							}

							$wrap.stop().animate({
							    marginLeft: margin
							}, options.duration, 'linear', functions.animation_finish);
						}else{
				  			$('#phpngo-elements-push').addClass('active');
						}

						functions_queue = $('#phpngo-elements-push').queue("fx");
					  
					  break;
					case 'back-return':

					  break;
					}
				},
				animation_finish: function(){
					switch(options.animation){
						case 'push':
						
						  if(!browser_has_transitions){
						  	//checking if there's no animation in progress
						  	if(functions_queue != 'inprogress'){
						  		setTimeout(function(){
							  		if(!options.cache){
							  			
									  	$('#phpngo-element-wrap').remove();
										functions.remove_phpngo_wrapper('phpngo-new-element');
										functions.remove_phpngo_wrapper('phpngo-elements-push');
									  	$('#phpngo-element-style').remove();
									  	$target.removeClass('phpngo-element-parent');
								  	}
								  }, parseInt(options.duration));
						  	}
						  }else{
							  $('#phpngo-elements-push').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
							  	if(!options.cache){
								  	$('#phpngo-element-wrap').remove();
									functions.remove_phpngo_wrapper('phpngo-new-element');
									functions.remove_phpngo_wrapper('phpngo-elements-push');
								  	$('#phpngo-element-style').remove();
								  	$target.removeClass('phpngo-element-parent');
							  	}
							  });
						  }

						  break;
						  case 'push-back':
							  

							  
							  if(!browser_has_transitions){
							  	//checking if there's no animation in progress
							  	if(functions_queue != 'inprogress'){
							  		setTimeout(function(){
								  		if(!options.cache){
								  			
										  	$('#phpngo-element-wrap').remove();
											functions.remove_phpngo_wrapper('phpngo-new-element');
											functions.remove_phpngo_wrapper('phpngo-elements-push');
										  	$('#phpngo-element-style').remove();
										  	$target.removeClass('phpngo-element-parent');
									  	}
									  }, parseInt(options.duration));
							  	}
							  }else{

								  $('#phpngo-elements-push').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
								  	if(!options.cache){
									  	$('#phpngo-element-wrap').remove();
										functions.remove_phpngo_wrapper('phpngo-new-element');
										functions.remove_phpngo_wrapper('phpngo-elements-push');
									  	$('#phpngo-element-style').remove();
									  	$target.removeClass('phpngo-element-parent');
								  	}
								  });
							  }
							  break;
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
				default_loader: function(){
					var layer_css = 'height:100%;width:100%;z-index:1000;background:#000000;opacity:0.4;padding-top:25%;position:absolute;top:0;left:0;',
						black_layer = '<div class="phpngo-transition-layer" style="position:relative;text-align:center;"><div style="'+layer_css+'"></div><img style="position:absolute;padding-top:25%;z-index:1001" src="'+options.loaderImgPath+'" /></div>';
				
					return black_layer;
				},
				add_loader: function(){
					if(options.loadingHTML.length){
						black_layer = options.loadingHTML;
					}else{
						black_layer = functions.default_loader();
					}
					$target.prepend(black_layer);
				},
				remove_loader: function(){
					$('.'+options.loadingClass).remove();
				},
				css_factory: function(style){
					var out = '';
					
					for(var elements in style){
						out += elements+'{';
						for(var k in style[elements]) {
						   out += functions.css_line_build(k, style[elements][k]);
						}
						out += '}';
					}
					return out;
				},
				css_line_build: function(key, val){
					var tags_with_prefixes = ['transition'],
						out = key+':';

					//check for tags with vendor prefix
					if($.inArray(key, tags_with_prefixes) != -1){
						out = functions.get_browser_prefix() + key +':';
					}

					out += val;

					//add px if it's a number
					if(!isNaN(parseInt(val))){
						out += 'px';
					}

					out += ';';

					return out;
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