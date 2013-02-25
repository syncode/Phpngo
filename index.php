<?php
include_once "settings.php";
include_once "urls.php";
include_once "views.php";

function start(){
	global $urls;
	$uri = str_replace(SITE_BASE_URI, '', $_SERVER['REQUEST_URI']);
	foreach ($urls as $regex => $view){
		if( preg_match($regex , $uri) ){
			return get_view($view, $uri);
		}
	}
	return get_view( 'error_404', $uri );
}

function get_view( $view, $uri){
	return call_user_func( $view , explode('/', $uri) );
}

start();