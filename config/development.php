<?php
	
	//
	// Development enviroment settings
	// 


	// Base settings
	define('BASE_URI', '/Projects/Sinapsa/Phpngo/');
	define('BASE_URL', (strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . BASE_URI );


	// Media
	define('HTML_COMPRESS', false);

	define('CSS_ENCODE', false);
	define('CSS_CONCAT', false);
	define('CSS_COMPRESS', false);
	define('CSS_CACHE_DIR', 'cache\\');

	define('JS_ENCODE', false);
	define('JS_CONCAT', false);
	define('JS_COMPRESS', false);
	define('JS_CACHE_DIR', 'cache\\');
