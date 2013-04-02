<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Phpngo</title>
	<base href="<?php echo BASE_URL; ?>">
	<?php

		// Styles
		load('css', array(
			'libs/bootstrap.min.css',
			'libs/animate.css'
		));

	?>
	{ block styles }

	<style type="text/css">
		#demo-content-block>.animated{ position: absolute; }
		#demo-content-block{ position: relative; }
	</style>
</head>
<body>
	<?php

		include "header.php";

	?>
	<div class="container">
		<div class="row">
			<div class="span12" style="min-height: 40px;">
				<!-- Just a spcae -->
			</div>
		</div>
		{ block content }
	</div>
	<?php

		// include "footer.php";
		
	?>
	<?php

		// Scripts
		load('js', array(
			'http://code.jquery.com/jquery.min.js',
			'libs/bootstrap-dropdowns.min.js',
			'libs/core.js',
			'libs/transition.js'
		));

	?>
	{ block scripts }
	<footer>
		
	</footer>
</body>
</html>