<?php

// Internal files
include_once "core/functions.php";


class Main {

	// The core init function, searching for fitting view in urls array and executing it's view
	public static function init(){
		global $URLS;
		$uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
		foreach ($URLS as $regex => $view){
			if( preg_match($regex , $uri) ){
				return self::get_view($view, $uri);
			}
		}
		return self::get_view( 'error_404', $uri );
	}

	// calling view function
	private static function get_view($view, $uri){
		return call_user_func( $view , explode('/', $uri) );
	}

}

// Start the beast
Main::init();