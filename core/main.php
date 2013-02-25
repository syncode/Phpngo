<?php

// Internal files
include_once "core/functions.php";


class Main {
	
	// The core init function
	public static function init(){

		global $urls;
		$uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
		foreach ($urls as $regex => $view){
			if( preg_match($regex , $uri) ){
				return get_view($view, $uri);
			}
		}
		return get_view( 'error_404', $uri );
	}

	// This function go's through the render buffer
	// adding support to the basics of Django templeting engine 
	public static function buffer( $buffer ){

		// Blocks
		for ($i= 0; $i < substr_count($buffer, '{ startblock ') + 2; $i++) {
			$block_name = Main::get_inner_substring( $buffer, '{ startblock ', ' }' );
			$block = Main::get_inner_substring( $buffer, '{ startblock '. $block_name .' }', '{ endblock }' );
			$buffer = str_replace($block, '', $buffer);
			$buffer = str_replace('{ block '. $block_name .' }', $block, $buffer);
			$buffer = str_replace('{ block '. $block_name .' }', '', $buffer);
			$buffer = str_replace('{ startblock '. $block_name .' }', '', $buffer);
			$buffer = str_replace('{ endblock }', '', $buffer);
		}

		return $buffer;
	}

	public static function get_inner_substring( $string,  $from = '', $to = '', $incl = false ) {
		$temp = ( !$incl ) ? strpos( $string, $from ) + strlen( $from ) : strpos( $string, $from );
		$result = substr( $string, $temp, strlen( $string ) );
		$dd = strpos($result,$to);
		if($dd == 0){
			$dd = strlen($result);
		}

		return substr($result,0,$dd);
	}

}

// Start the beast
Main::init();