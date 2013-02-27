<?php
	
	extend('templates/demo/base.php');
		
	// Loading styles
	block('styles');
	
		load('css', array(
			'libs/bootstrap.min.css',
			'general.css',
			'demo.css'
		));

	endblock();

	// Loading the scripts
	block('scripts');

		load('js', array(
			'http://code.jquery.com/jquery.min.js',
			'demo.js'
		));

	endblock();