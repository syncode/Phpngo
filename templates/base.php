<?php

	// Loading styles
	block('styles');
	
		load('css', array(
			'general.css',
		));

	endblock();


	// Loading the scripts
	block('scripts');

		load('js', array(
			'demo.js',
		));

	endblock(); 

	include "header.php";
?>

	<?php

		// Styles
		load('css', array(
			'general.css',
			'home.css'
		));

	?>
	{ block styles }

	<!-- Content -->
	<?php block('content'); ?>
	<div id="content">
		<div class="leyout">
			<div id="stage">
				<div class="media">
					<div class="cloud-animated"></div>
					<div class="cloud-static"></div>
					<div class="wheel-large"></div>
					<div class="wheel-medium"></div>
					<div class="wheel-small"></div>
					<div class="laptop">
						<div class="experience"></div>
						<div class="quality"></div>
					</div>
				</div>
				<h1>
					<span class="pre">We help innovators</span>
					<span class="hedline">
						<span class="green">plan</span>, <span class="green">build</span> and <span class="green">launch</span>
					</span>
					<span class="post">great web applications</span>
				</h1>
			</div>
		</div>
		<ul id="featured">
			<li class="experience">
				We take tons of <strong>experience</strong><br>to <strong>plan</strong> and <strong>develop</strong> exciting<br>web applications.
			</li>
			<li class="quality">
				We focus on <strong>quality</strong><br>to deliver <strong>rich</strong> &amp; <strong>powerfull</strong><br>software.
			</li>
			<li class="technologies">
				We use open source <strong>technologies</strong><br>to deliver <strong>strong</strong> capabilites.
			</li>
		</ul>
		<div class="leyout">
			<ul id="clients">
				<li class="conduit"></li>
				<li class="newvem"></li>
				<li class="illuminea"></li>
				<li class="bestmatch"></li>
			</ul>
		</div>
	</div>
	<?php endblock(); ?>


	<?php

		// Scripts
		load('js', array(
			'libs/jquery.js',
			'ui.min.js',
			'general.min.js',
			'libs/core.js'
		));

	?>
	{ block scripts }

	<?php include "footer.php"; ?>