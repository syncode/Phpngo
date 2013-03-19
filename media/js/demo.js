
	window.Phpngo = window.Phpngo || {};

	Phpngo.demo = {
		init: function(){

			// load content block using ajax
			var $target = $('#stage');

			$('.leyout a').each(function(){
				var $this = $(this),
					params = {
						$target: $target,
						url: $this.attr('href'),
						block: 'main-content',
						// onBefore: function(){
						// 	return true;
						// },
						history: false
					};
					$this.transition( params );
			});

		}
	};

	$( Phpngo.demo.init );