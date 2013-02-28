	
	window.Phpngo = window.Phpngo || {};

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

		var $element = $(this),
			defaults = {

				// Event
				action: 'click',			// Event method
				prevent: true,				// Prevent defaults

				// Transition
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

				// Events: onBefore > (onSuccess | onError) > onAfterUpdate
				onBefore: function(){ return true; },
				onSuccess: function( response ){ return true; },
				onError: function( response ){ return false; },
				onAfterUpdate: function( response ){}

			},
			options = $.extend( false, defaults, args ), // User can change the settings.

			functions = {
				update_content: function( content ){
					if( ($.isFunction( options.onSuccess ) && options.onSuccess()) || true ){
						options.$target.html( content );
						if( $.isFunction( options.onAfterUpdate ) ){
							options.onAfterUpdate();
						}
					}
				}
			};


		$element.on( options.action, function(e){
			if( ($.isFunction( options.onBefore ) && options.onBefore()) || true ){
				
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
						success: functions.update_content
					});
				}

			}
		});

		return $element;
	}