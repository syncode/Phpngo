	window.Phpngo = window.Phpngo || {};

	// History API
	Phpngo.history = {
		BASE_URL: '/Projects/Sinapsa/Phpngo/',
		popstate: function(event){
			if( event && event.state && event.state.url ){
				var start = event.state.url.indexOf(Phpngo.history.BASE_URL) + Phpngo.history.BASE_URL.length;
				var url = event.state.url.substring(start);
				console.log(url);
				Phpngo.history.changeStateByUrl(url);
			}
		}
	};


	Phpngo.history.states = [
			//[url-regex, onBefore-func, onSuccess-func, onError-func, onAfterUpdate-func]
			["demo/", function(){console.log("working!");} ]
	];

	Phpngo.history.changeStateByUrl = function(url){
		if( typeof url == "undefined" ){
			url = window.location.pathname.replace(Phpngo.history.BASE_URL,'');
		}
		for (var i = 0; i < Phpngo.history.states.length; i++) {
			if( url.match(Phpngo.history.states[i][0]) ){
				Phpngo.history.states[i][1]();
				break;
			}
		};
	}

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
				onAfterUpdate: function( response ){ }

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

			// console.log(this);
			$(this).on(options.action, function(e){
				if( options.prevent ){
					e.preventDefault();
				}
				if( options.history && typeof history.pushState !== 'undefined' ){
					var opt = {onBefore: options.onBefore, onSuccess: options.onSuccess, onError: options.onError, onAfterUpdate: options.onAfterUpdate};
					history.pushState( {url: options.url}, options.title, options.url);
				}
				
				if( ($.isFunction( options.onBefore ) && options.onBefore()) ){
					if( options.HTML ){ // case updating with hard-coded html
						functions.update_content( options.HTML );
					}else if( options.url ){
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



		// $element.on( options.action, function(e){
		// 	if( ($.isFunction( options.onBefore ) && options.onBefore()) ){
				
		// 		if( options.prevent ){
		// 			e.preventDefault();
		// 		}

		// 		if( options.HTML ){
		// 			functions.update_content( options.HTML );
		// 		}else if( options.url ){

		// 			if( options.history && typeof history.pushState !== 'undefined' ){
		// 				var index = Phpngo.history.states.length;
		// 				history.pushState( { href: $element.attr('href') }, options.title, options.url);
		// 				if( options.prevent ){
		// 					e.preventDefault();
		// 				}
		// 			}

		// 			$.ajax({
		// 				url: options.url,
		// 				type: options.type,
		// 				data: $.extend( false, {
		// 					is_ajax: 'true',
		// 					block: options.block
		// 				}, options.data ),
		// 				success: functions.update_content
		// 			});
		// 		}

		// 	}
		// });
