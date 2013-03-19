
	window.Phpngo = window.Phpngo || {};

	Phpngo.demo = {
		init: function(){

			// load content block using ajax
			var $target = $('#content');

			$('leyout a').each(function(){
				var $this = $(this),
					params = {
						$target: $target,
						url: $this.attr('href'),
						block: 'demo-content',
						onBefore: function(){
							/*$('#demo-menu li.active').removeClass('active');
							$this.parents('li').addClass('active');*/
							return true;
						}
					};
					$this.transition( params );
			});

		}
	};

	$( Phpngo.demo.init );