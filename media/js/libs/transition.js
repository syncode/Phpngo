/*
based on 
jQuery.js
modernizr.js
animate.css
*/

(function( $ ) {
	// true while animating, prevent fast clicking and massing functionality
	var doNotDisturb = false,
		cssanimations = $('html').hasClass('cssanimations');
		
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
				waitForOut: true,
				preventDefault: true
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
			var $this = $(this),
				settings = $this.data('transition'),
				$target = settings.target;

			if(settings.preventDefault){
				e.preventDefault();
			}

			if( typeof $target.data('settings') == 'undefined' ){
				$target.empty();
				$target.data('settings', {
					$current: null,
					cache: {}
				});
			}
			console.log("transfer before");
			if( doNotDisturb || $target.data('settings').currentHref == $this.attr('href') ){
				// navigation to current href
				return;
			}
			console.log("transfer after");
			
			methods.animateOut($this);
		},

		animateOut: function($link){
			doNotDisturb = true;
			var href =$link.attr('href'),
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
				console.log($next[0]);
			}else{
				console.log("no href to navigate");
			}

			if( $prev != null ){
				if(cssanimations){
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
					// no css animation
					var prevWidth = $prev.outerWidth() * -1;
					$prev.css('right', 'auto').animate({'left': prevWidth}, "slow", function(){ 
						$prev.hide() 
						if( $link.data('transition').waitForOut /*&& $next*/ ){
							methods.animateIn($next, $link);
						}
					});
				}
			}else{
				methods.animateIn($next, $link);
			}


			if( $link.data('transition').waitForOut == false /*&& $next*/ ){
				methods.animateIn($next, $link);
			}
			$target.data('settings').$current = $next;
		},

		animateIn: function($next, $link){
			console.log("animateIn");
			$target = $link.data('transition').target;
			$target.data('settings').currentHref = $link.attr('href');
			if(cssanimations){
				$next.show()
					.addClass( $link.data('transition').transitionClasses.visited )
					.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
					    $next.removeClass( $link.data('transition').transitionClasses.visited )
					    	.unbind();
						doNotDisturb = false;
					});
			}else{
				// no css animation
				var nextWidth = $next.outerWidth();
				$next.show().css({'right': -1 * nextWidth, 'left': 'auto'})
					.animate({'right': 0, 'display': 'block'}, "slow", function(){doNotDisturb = false;} );
			}

			$next.css("overflow", "auto");
			nextHeight = $next[0].scrollHeight;
			$next.css("overflow", "hidden");

			console.log(nextHeight);
			if( nextHeight > 0 ){
				$target.animate({"height": nextHeight});
			}
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
				url: BASE_URL+href,
				type: 'POST',
				data: {
					is_ajax: 'true',
					block: 'main-content',
				},
				success: function(data){ 
					$target = $link.data('transition').target;
					methods.update_content(data, $newContentContainer, $target); 
				}
			});
			return $newContentContainer;
		},

		update_content: function(data, $newContentContainer, $target){
			$newContentContainer.html(data)
				.removeClass("loading");
			setTimeout(function(){
				$newContentContainer.css("overflow", "auto");
				$target.animate({"height": $newContentContainer[0].scrollHeight});
				$newContentContainer.css("overflow", "hidden");
			}
			,1000);
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
		var settings = { 
					target: $('#stage'),
					transitionClasses: {
						// animation classes to apply to content containers, based on animate.css on http://daneden.me/animate/
						in: 'fadeInRightBig',
						out: 'fadeOutLeftBig',
						visited: 'fadeInRightBig'
					},
					waitForOut: false
			 };
		$('#main-menu .leyout li a').transition(settings);
	}
}

$( transition.init );