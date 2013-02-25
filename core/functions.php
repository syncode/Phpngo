<?php

function extend( $template ){

	include $template;

}


function render( $template, $contenxt = array()){

	ob_start("Main::buffer");

	include $template;

	ob_end_flush();

}


function get_view( $view, $uri){
	return call_user_func( $view , explode('/', $uri) );
}