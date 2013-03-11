	
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
				animation: 'push',			// "push", "clear", "none", "fade"
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
				//wrapping the content & adding css
				new_element: function(response){
					//get traget position
					var el_position = $target.offset(),
						active_direction = 'left:'+el_position.left+'px',
						right_position = 0;

					if(options.rtl){
						right_position = window.width() - el_position.left - $('body').width();
						active_direction = 'right:'+right_position+'px',
					}

					//creating the transition's css
					var transition_css_in = functions.create_transition_css(options.animation, el_position.top, el_position.left, right_position);

					return  '<div id="transition-inner-wrapper-in">'+response+'</div>'+
							'<style id="transition-inner-style">'+
								'#transition-inner-wrapper-in{'+transition_css_in+'}'+
								'#transition-inner-wrapper-in.active{'+active_direction+'}'+
							'</style>';
				},
				current_html: function(){
					var current_html = $target.html(),
						el_position = $target.offset(),
						transition_css_out = functions.create_transition_css(animation+'-out', el_position.top, el_position.left);

					return '<div id="transition-inner-wrapper-out">'+current_html+'</div>'+
						   '<style id="transition-out-style">'+
						   '#transition-inner-wrapper-out{'+transition_css_out+'}'+
						   '#transition-inner-wrapper-out.active{left: 150%;}'+
						   '</style>';
				},
				do_switch: function(response, cache){
					//switch between old & new html
					$target.html(response);
					$('#transition-inner-wrapper-in').remove();
					$('#transition-inner-style').remove();
					$('#transition-inner-wrapper-out').toggleClass('active');
					setTimeout(function(){
						$('#transition-inner-wrapper-out').remove();
						if(!cache){
							$('#transition-out-style').remove();
						}
					},700);
				},
				init: function(response){
					$target = options.$target;
					//adding the new element to the dom
					$('body').append(do_animation.new_element(response));
					setTimeout(function(){
						//adding the transition class
						$('#transition-inner-wrapper-in').toggleClass('active');
						//wrap current element html & position it
						$('body').append(do_animation.current_html());
					},200);
					setTimeout(function(){
						do_animation.do_switch(response, options.cache);
					},2300);
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
				create_transition_css: function(transition, top, left, right){
					var style = '';

					switch(transition)
					{
					case 'push':
					  if(options.rtl){
					  	
					  }
					  style = "left:-50%;position:absolute;top:"+top+"px;";
					  style += functions.get_browser_prefix()+"transition: left 2s ease;";
					  break;
					case 'push-out':
					  style = "left:"+left+"px;position:absolute;top:"+top+"px;";
					  style += functions.get_browser_prefix()+"transition: left 2s ease;"
					  break;
					}
					return style;
				},
				get_browser_prefix: function(){
					var browser = Phpngo.params.browser;
					if(browser.indexOf("firefox") > -1){return '-moz-';}
					if(browser.indexOf("chrome") > -1){return '-webkit-';}
					if(browser.indexOf("safari") > -1){return '-webkit-';}
					if(browser.indexOf("opera") > -1){return '-o-';}
					if(browser.indexOf("msie") > -1){return '-ms-';}

					return '';
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