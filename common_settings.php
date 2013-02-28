<?php
	
	//
	// Global settings
	//

	// Environment ( 'development', 'staging', 'production' )
	// This will be used to load the enviroment based settings file
	define('ENVIRONMENT', 'development');
	
	define('TEMPLATES_DIR', PH_PATH . 'templates/');

	// Media
	define('MEDIA_URL', 'media/');
	define('CSS_URL', MEDIA_URL . 'css/');
	define('JS_URL', MEDIA_URL . 'js/');


	// ERRORS
	define('ERROR_404_VIEW', 'error_404');
	