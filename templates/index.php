<?php
	extend('templates/base.php');

	
	// Loading styles
	block('styles');
	
		load('css', array(
			'general.css',
			'demo.css',
		));

	endblock();


	// Loading the scripts
	block('scripts');

		load('js', array(
			'demo.js',
		));

	endblock();


	// Content
	block('content');

		?>
		<div class="row">
			<div class="span4">
				<div class="page-header">
					<h1>Phpngo</h1>
				</div>
				<p>A light weight php startring template for your app</p>
			</div>
			<div class="span8">...</div>
		</div>
		<?php

	endblock();
