<?php

	// This documents loads the nesessary settings file
	// based on the configured enviroment.

	define('PH_PATH', str_replace('core/settings.php', '', __FILE__));

	require_once( PH_PATH . 'common_settings.php');

	if( defined('ENVIRONMENT') && ENVIRONMENT && file_exists( PH_PATH . 'config/' . strtolower( ENVIRONMENT ) . '.php') ){
		require_once( PH_PATH . 'config/' . strtolower( ENVIRONMENT ) . '.php' );
	}
