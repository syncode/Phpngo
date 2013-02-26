<?php

// Internal files
require_once( PH_PATH . 'core/functions.php' );

class Main {

	// The core init function, searching for fitting view in urls array and executing it's view
	public static function init(){
		global $URLS;

		$uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);

		// URLS configuration
		foreach ($URLS as $regex => $view){
			if( preg_match($regex, $uri) ){
				return self::get_view($view, $uri);
			}
		}

		// CSS files
		if( preg_match('/^css\/[A-Za-z0-9-+=_.\/]*\/style.css[?a-z0-9=.]*/', $uri) ){
			
			header('Content-Type: text/css');
			return self::load( 
					CSS_COMPRESS,
					CSS_CONCAT,
					CSS_CACHE_DIR,
					'core/libs/cssmin.php',
					'CSSmin',
					'.css',
					CSS_URL,
					$uri,
					'css/',
					'/style.js'
				);

		// JS files
		}else if( preg_match('/^js\/[A-Za-z0-9-+=_.\/]*\/script.js[?a-z0-9=.]*/', $uri) ){

			header('Content-Type: text/javascript');
			return self::load(
					JS_COMPRESS,
					JS_CONCAT,
					JS_CACHE_DIR,
					'core/libs/JSMinPlus.php',
					'JSMinPlus',
					'.js',
					JS_URL,
					$uri,
					'js/',
					'/script.js'
				);

		}

		// 404
		return self::get_view( ERROR_404_VIEW, $uri );
	}

	// Executing the view function
	private static function get_view($view, $uri){
		return (function_exists( $view )) ? call_user_func( $view , explode('/', $uri) ) : call_user_func( ERROR_404_VIEW , explode('/', $uri) );
	}

	// Load media files
	private static function load( 
		$compress = false,
		$concat = false,
		$cache_dir = '',
		$compress_class_lib = '',
		$compress_class_name = '',
		$ext = '',
		$media_dir = '',
		$uri = '',
		$cached_string_prefix = '',
		$cached_string_postfix = ''
	){
		
		$buffer = '';
		$cached_string = str_replace($cached_string_prefix, '', str_replace($cached_string_postfix, '', $uri));
		$files = ( JS_ENCODE ) ? explode('+', base64_decode( $cached_string ) ) : explode('+', $cached_string ) ;
		$cached_string = base64_encode( $cached_string );

		if( $cached_string && file_exists( $cache_dir . $cached_string . $ext )){
			// Load cached file
			$buffer = file_get_contents( $cache_dir . $cached_string . $ext );
		}else{
			// Concat all files
			foreach( $files as $index => $file ){
				$file = $file . $ext;

				$temp_buffer = '';
				if( file_exists( PH_PATH . $media_dir . $file) ){
					$temp_buffer = file_get_contents( PH_PATH . $media_dir . $file);
				}

				// Compress
				if( $compress && $temp_buffer && !preg_match('/[A-Za-z-+_.\/]*.min.js/', $file) ){
					require_once( PH_PATH . $compress_class_lib );
					$compressor = new $compress_class_name();
					$temp_buffer = $compressor->min( $temp_buffer );
				}

				$buffer .= ( substr($temp_buffer , -1) == ';' ) ? $temp_buffer : $temp_buffer . ';' ;
			}

			// Cache the the result
			if( $concat && $cache_dir && $buffer && $cached_string ){
				
				if( !file_exists($cache_dir) ){
    				mkdir($cache_dir, 0777);
    			}

				$file = fopen( $cache_dir . $cached_string . $ext, 'w');
				fwrite( $file, $buffer );
				fclose( $file );
			}
		}

		echo $buffer;
		return true;
	}

}

// Start the beast
Main::init();