<?php

	// This documents loads the nesessary settings file
	// based on the configured enviroment.

	define('PH_PATH', str_replace('core'.DIRECTORY_SEPARATOR.'settings.php', '', __FILE__));
	
	require_once( PH_PATH . 'common_settings.php');

	if( defined('ENVIRONMENT') && ENVIRONMENT && file_exists( PH_PATH . 'config/' . strtolower( ENVIRONMENT ) . '.php') ){
		require_once( PH_PATH . 'config/' . strtolower( ENVIRONMENT ) . '.php' );
	}


	// Reset defaults
	// Don't change the values here - this is only a backup when some
	// defenitions are not set.
	$defaults = array(
		'HTML_COMPRESS' => false,

		'CSS_ENCODE' => true,
		'CSS_CONCAT' => false,
		'CSS_COMPRESS' => false,
		'CSS_CACHE_DIR' => '',

		'JS_ENCODE' => true,
		'JS_CONCAT' => false,
		'JS_COMPRESS' => false,
		'JS_CACHE_DIR' => '',
	);

	foreach( $defaults as $key => $value ){
		if( !defined( $key ) ){ define( $key, $value ); }
	}
