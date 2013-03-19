
	window.Phpngo = window.Phpngo || {};

	Phpngo.demo = {
		init: function(){

			// load content block using ajax
			var $target = $('#content');

			$('.leyout a').each(function(){
				var $this = $(this),
					params = {
						$target: $target,
						url: $this.attr('href'),
						block: 'content',
						onBefore: function(){
							return true;
						}
					};
					$this.transition( params );
			});

		}
	};

	$( Phpngo.demo.init );