<?php
	
	//
	// Production enviroment settings
	// 


	// Base settings
	define('BASE_URI', '/');


	// Media
	define('CSS_ENCODE', true);
	define('CSS_CONCAT', true);
	define('CSS_COMPRESS', true);
	define('CSS_CACHE_DIR', PH_PATH . CSS_URL . 'cache/');

	define('JS_ENCODE', true);
	define('JS_CONCAT', true);
	define('JS_COMPRESS', true);
	define('JS_CACHE_DIR', PH_PATH . JS_URL . 'cache/');
	