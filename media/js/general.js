
	var sinapsa = {
		ob: new ui.observer('default'),
		init: function(){

			// Event binding
			$(window).resize( sinapsa.resize ).resize();

			// Init Observer
			sinapsa.ob.init( sinapsa.states );

			$('header .menu-overlay').state( sinapsa.ob, 'default' );
			$('header .menu-btn').state( sinapsa.ob, 'menu' );

		},
		states: {
			default: function(){
				// The default state
				$('header .menu').show();
			},
			menu: function(){
				// This state represents an open menu
			}
		},
		events: {

		},
		resize: function(){

			var $win = $(this),
				$header = $('header'),
				$content = $('section#main'),
				$footer = $('footer'),
				top_border = 5;

			// Sticky footer
			var $footer = $('footer').css('height','');
			if( $win.height() > ($header.height() + $content.height() + $footer.height() + top_border) ){
				$footer.addClass('fixed');
			}else{
				$footer.removeClass('fixed');
			}

			// Mobile menu
			if( $win.width() > 750 ){
				$('.menu, .menu > .leyout', $header ).css('height','');
			}else{
				$('.menu, .menu > .leyout', $header ).css('height', $win.height() + 100 );
				$('.menu-overlay', $header ).css('width', $win.width() - 230 );
			}
		}
	}

	$(sinapsa.init);