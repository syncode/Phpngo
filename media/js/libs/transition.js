(function( $ ) {
	var methods = {
		init : function(options) {
			// Create some defaults, extending them with any options that were provided
			var settings = $.extend( {
				target: $('body'),
				event: 'click',
				transitionClasses: {
					// animation classes to apply to content containers, based on animate.css on http://daneden.me/animate/
					in: 'bounceIn',
					out: 'bounceOut',
					visited: 'bounceIn'
				},
				waitForOut: true
				// waitForOut: false
			}, options);
	
			
			
			return this.each(function(){
				var $this = $(this),
					data  = $this.data('transition');
				
				// check if plug-in already initialized on current element
				if( !data ){
					$this.bind( settings.event+'.transition', methods.transfer )
					.data('transition', settings);
				}
			});
		},

		transfer: function(e){
			e.preventDefault();
			var $this = $(this),
				settings = $this.data('transition'),
				$target = settings.target;

			if( typeof $target.data('settings') == 'undefined' ){
				$target.empty();
				$target.data('settings', {
					$current: null,
					cache: {}
				});
			}
			
			methods.animateOut($this);
		},

		animateOut: function($link){
			var href = $link.attr('href'),
				settings = $link.data('transition'),
				$target = settings.target,
				$prev = $target.data('settings').$current,
				$next = null;

			if(typeof href != 'undefined' /* TODO: && not current page */){
				var $cached = $target.data('settings').cache[href];
				if( $cached ){
					// retrieve from cache
					$next = $cached;
				}else{
					// retrieve from server
					$next = methods.request($link);
				}
			}

			console.log($next);
			if( $prev != null ){
				$prev.addClass( $link.data('transition').transitionClasses.out )
						.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
						    $prev.removeClass( $link.data('transition').transitionClasses.out )
						    .hide()
						    .unbind();

							if( $link.data('transition').waitForOut /*&& $next*/ ){
								methods.animateIn($next, $link);
							}
						});
			}else{
				methods.animateIn($next, $link);
			}


			if( $link.data('transition').waitForOut == false /*&& $next*/ ){
				methods.animateIn($next, $link);
			}
			$target.data('settings').$current = $next;
		},

		animateIn: function($next, $link){
			$next.show()
				.addClass( $link.data('transition').transitionClasses.visited )
				.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
				    $next.removeClass( $link.data('transition').transitionClasses.visited )
				    	.unbind();
				});
		},

		request: function($link){
			var	href = $link.attr('href')
				settings = $link.data('transition'),
				$target = settings.target;

			var $newContentContainer = $('<div class="animated loading"></div>');
			$newContentContainer.hide();
			$target.data('settings').cache[href] = $newContentContainer;
			$target.append($newContentContainer);

			$.ajax({
				url: href,
				data: {
					is_ajax: 'true',
					block: 'demo-content'
				},
				success: function(data){ methods.update_content(data, $newContentContainer); }
			});
			return $newContentContainer;
		},

		update_content: function(data, $newContentContainer){
			$newContentContainer.html(data)
				.removeClass("loading");
		}

	};

	// functions dispatcher
	$.fn.transition = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.transition' );
		}    
	};
})( jQuery );


var transition = {
	init: function(){
		$('#demo-menu li a').transition({ target: $('#demo-content-block') });
	}
}

$( transition.init );