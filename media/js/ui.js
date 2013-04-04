
	var ui = {
		params: {
			speed: 0
		},
		ob: null,
		init: function(){

			ui.ob = new ui.observer('default');
			/* Initializing jQuery shorthand methods
			 ======================================================  */

			// An event method allowing setting a callback functiong
			// when clicking outside an element.
			$.fn.clickOutside = function( callback ){

				var $element = $(this);

				if( $.isFunction( callback ) ){
					var func = function( e ){
							var $target = $(e.target);
							if( !$element.is( $target ) && !$element.find( $target ).size() ){
								callback( e );
							}
						}
					
					$(document).on('click',func);
					$element.data('click-outside-func',func);
				}

				return $element;
			}

			// Unbinding the previus method
			$.fn.unbindClickOutside = function(){
				var $element = $(this);
				$(document).off('click',$element.data('click-outside-func'));
				return $element;
			};
			
			// Quick disable an element
			$.fn.disable = function(){
				return $(this).attr('disabled','disabled');
			}
			
			// Quick enable an element
			$.fn.enable = function(){
				return $(this).removeAttr('disabled');
			}

			// Quick function to detemine if element is disabled
			$.fn.isEnabled = function(){
				return ($(this).attr('disabled') == 'disabled') ? false : true ;
			}

			// Changing a state of an elemt for the observer design pattern
			$.fn.state = function( observer, state, action ){
				action = ( action ) ? action : 'click' ; 
				return $(this).on(action,function(){ observer.state( state ); });
			}

			// Logo hover effect
			$.fn.efx = function( options ) {

				var defaults = {					// Initialization of default settings
						spacing: 25,				// (in px) Representing the thickness of the ring effect
						duration: 3000,				// (in ms) Total duration of the .animate()  - each step gets half
						action: 'mouseenter',		// Event method
						element: {					// The position args for the mask ring
							X: 35,					// Position: x axis of the interior ring
							Y: 37,					// Interior Y
							R: 10					// Interior ring radius
						},
						cssProperty: 'font-size' ,	// CSS property to change in animation
						firstStep: 25,				// Value to reach in the end of the first step
						secondStep: 325				// Value to reach in the end of the second step
					},

					options = $.extend( false, defaults, options ), // User can change the settings.

					check = {
						inputR1: function(){
							// Case 1 - given spacing< given radius * 2
							if( options.spacing < options.element.R * 2 ){
								if( ( options.element.R - parseInt( options.spacing / 2 ) ) > 0 && options.spacing  > 1 ) {
									return ( options.element.R - parseInt( options.spacing / 2 ) );
								}else{
									return options.element.R;
								}
							}else{
								return options.element.R;
							}
						},
						inputR2: function(){
							var result = check.inputR1();
							if( result == options.element.R ) {
								if( options.spacing < defaults.spacing ){
									return options.element.R + parseInt( defaults.spacing );
								}else{
									return options.element.R + parseInt( options.spacing );
								}
							}else{
								return options.element.R + parseInt( options.spacing / 2 );
							}
						}
					},
					proccess = function(){

						obj = $(this);  	

						// Start of mask function
						obj.on( options.action ,function(){
							var cssProp = options.cssProperty,
								fstep	= options.firstStep,
								sstep	= options.secondStep,
								dur		= parseInt( options.duration / 2 ),
								x		= options.element.X,
								y		= options.element.Y,
								r1		= check.inputR1(),
								r2		= check.inputR2();
								
							obj
							.css({ 
								cssProp: 0 
							})
							.stop()
							.animate({ // First animation
								cssProp: fstep
							},{
								queue: true,
								duration: dur,
								step: function( s ){
									obj.css({"-webkit-mask":"-webkit-gradient(radial, " + x + " " + y + ", " + parseInt( r1 + s ) + "," + x + " " + y + ", " + parseInt( r2 + s ) + ", from(rgb(0, 0, 0)), color-stop(0.5, rgba(0, 0, 0, 0.2)), to(rgb(0, 0, 0)))"});
									now = s;
								}
							})
							.css({ 
								cssProp: fstep 
							})
							.stop()
							.animate({ // Second animation
								cssProp: sstep
							},{
								queue: true,
								duration: dur,
								step: function( s ){
									obj.css({"-webkit-mask":"-webkit-gradient(radial, " + x + " " + y + ", " + parseInt( r1 + s + now ) + "," + x + " " + y + ", " + parseInt( r2 + now + s ) + ", from(rgb(0, 0, 0)), color-stop(0.5, rgba(0, 0, 0, 0.2)), to(rgb(0, 0, 0)))"});
								},
								complete: function(){
									obj.css({"-webkit-mask":"none"});
								}
							});
						});

					};

				return $(this).each( proccess );

			};

			// Event binding
			if( false ){

				// This enables touch events for DIVs
				$(".ui-te").live("touchstart", function() {});

			}else{

				// Logo hover effect
				$('header .branding .logo').efx();

			}

		},
		template: function( name, data ){

			var result = '';

			// Support for arrays
			if( $.isArray(data) ){
				$.each(data,function(index, item_data){
					result += ui.template(name, item_data);
				});
				return result;
			}

			var template = (name) ? (name instanceof jQuery) ? name.html() : ($('template[name='+name+']').size()) ? $('template[name='+name+']').html() : name : '',
				parse = (template) ? template.split('{{') : '',
				key = '';

			$.each(parse,function( index, str ){

				if( str.charAt(0) == ':'){
					key = str.substr(1, str.indexOf('}}') - 1 ),
					first_key = (key.indexOf('||') > -1) ? key.substr(0, key.indexOf('||')) : key ;
					if( data && data[first_key] ){
						result += data[first_key];
					}else if( key.indexOf('||') > -1 ){
						key = key.substr( key.indexOf('||') + 2 );
						result += ( key.charAt(0) == ':' && data && data[key.substr(1)] ) ? data[key.substr(1)] : key ;
					}
					result += str.substr( str.indexOf('}}') + 2 );
				}else{
					result += str;
				}

			});
			return result;
		},

		// Observer pattern
		observer: function () {

			/* Properties */
			var observer = this,
				$element = $('body'),
				current_state = '',
				states = [];


			/* Methods */
			this.getState = function(){
				return current_state;
			};

			this.onState = function( state, callback, args, order, isExecUpponCurrentState ){
				if( state && $.isFunction( callback ) ){

					var state_object = getStateObject( state );
					if( !state_object ){
						state_object = states[(states.push({
													name: state,
													subscriptions: []
												}))-1];
					}

					// Add the subscription
					order = (order > 0) ? order : 100 ;
					state_object.subscriptions.push({
						callback: callback,
						args: args,
						order: order
					});

					// Reorder the subscription based on their order
					state_object.subscriptions.sort(function(a,b){
						return (a.order <= b.order) ? -1 : 1 ;
					});

					// Execute the subscriber on current state
					if( state == current_state && (typeof isExecUpponCurrentState == 'undefined' || isExecUpponCurrentState === true)){
						$(function(){
							callback(args,{
								from: current_state,
								to: state
							});
						});
					}
				}		
			};

			this.state = function( state, alt_state ){

				// Getting the state
				var state_object = getStateObject( state ),
					status = true;

				if( state_object ){

					// Envoke subscriptions
					$.each(state_object.subscriptions,function( index, subscription ){
						status = (status && subscription.callback(subscription.arguments, {
							from: current_state,
							to: state
						}) !== false ) ? true : false ;

					});

					if( status ){
						$element.removeClass('state-' + current_state ).addClass('state-' + state );
						current_state = state;
					}



				}else{
					status = false;
				}

				// Set to alternative state
				if( !status && alt_state ){
					this.state( alt_state ); // Status should remain false even thew the alt state likly returns true.
				}

				return status;
			};

			this.init = function( init_states, rebase ){
				if( $.isPlainObject( init_states ) ){

					if( rebase ){
						states = [];
					}

					$.each( init_states, function( key, value ){
						if( $.isFunction( value ) ){
							observer.onState( key, value );
						}else if( $.isPlainObject(value) && $.isFunction(value.callback) ){
							observer.onState( key, value.callback, value.args, value.order, value.isExecUpponCurrentState );
						}
					});
				}
			};


			/* Privates */
			var getStateObject = function( state ){
					var selected_object = null;
					if( state ){
						$.each(states,function( index, value ){
							if( !selected_object && value.name == state ){ selected_object = states[index]; }
						});
					}
					return selected_object;
				};

			/* Init */
			if( arguments[0] && arguments[1] ){
				$element = arguments[0];
				current_state = arguments[1];
				$element.addClass('state-' + current_state );
			}else if( arguments[0] ){
				current_state = arguments[0];
				$element.addClass('state-' + current_state );
			}
			

		}
	}

	$(ui.init);