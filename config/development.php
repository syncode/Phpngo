<?php
	
	//
	// Development enviroment settings
	// 


	// Base settings
	define('BASE_URI', '/Projects/Sinapsa/Phpngo/');
	define('BASE_URL', (strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . BASE_URI );


	// Media
	define('HTML_COMPRESS', false);

	define('CSS_ENCODE', true);
	define('CSS_CONCAT', true);
	define('CSS_COMPRESS', true);
	define('CSS_CACHE_DIR', false);

	define('JS_ENCODE', true);
	define('JS_CONCAT', true);
	define('JS_COMPRESS', false);
	define('JS_CACHE_DIR', false);
