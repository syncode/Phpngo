
	window.Phpngo = window.Phpngo || {};

	Phpngo.demo = {
		init: function(){

			// load content block using ajax
			var $target = $('#demo-content-block');

			$('#demo-menu li a').each(function(){
				var $this = $(this),
					params = {
						$target: $target,
						url: $this.attr('href'),
						block: 'demo-content',
						onBefore: Phpngo.demo.menuManager
					};
					$this.transition( params );
			});

		},
		menuManager: function( url ){

			// Clear the selected menu
			$('#demo-menu li.active').removeClass('active');

			// Select the new url
			switch( url){
				case '/':
				break;
				case '/demo/':
				break;
			}

			return true;
		}
	};

	$( Phpngo.demo.init );