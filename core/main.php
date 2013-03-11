<?php

// Internal files
require_once( PH_PATH . 'core/functions.php' );

class Main {

	// The core init function, searching for fitting view in urls array and executing it's view
	public static function init(){

		global $URLS, $_IS_URLS_BEEN_PROCESSED;
		$uri = str_replace( BASE_URI, '', $_SERVER['REQUEST_URI'] );

		// URLS configuration
		foreach ($URLS as $regex => $action){
			if( preg_match($regex, $uri) ){

				if( $action && is_array( $action ) && $action[0] == 'http_redirect' ){
					// HTTP redirect
					if( !headers_sent() && $action[1] ){
						header('Location: ' . $action[1] );
						exit;
					}
				}else if( $action && is_array( $action ) && $action[0] == 'view_redirect' ){
					// Redirect by providing a view name
					$url = self::reverse( $action[1], $action[2] );

					if( !headers_sent() && $url){
						header('Location: ' . $url );
						exit;
					}
				}else if( $action ){
					// Loading view
					if( HTML_COMPRESS ) ob_start('Main::html_compress');
					$_IS_URLS_BEEN_PROCESSED = true;
					return self::load_view( $action, $uri );
				}

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
					'/style.css'
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
		$_IS_URLS_BEEN_PROCESSED = true;
		return self::load_view( ERROR_404_VIEW, $uri );
	}

	public static function html_compress( $content ){
        return preg_replace( array('/ {2,}/','/<!--.*?-->|\t|(?:\r?\n[ \t]*)+/s'), array(' ',''), $content );
	}

	public static function reverse( $view = '', $args = array() ){
		global $URLS;
		$url = (string)array_search($view, $URLS);
		$url = str_replace('/^', BASE_URL, $url);
		$url = str_replace('\/', '/', $url);
		return $url;
	}

	// Executing the view function
	private static function load_view($view, $uri){
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
		$files = ( JS_ENCODE ) ? explode('+', utf8_decode( base64_decode( $cached_string ) ) ) : explode('+', utf8_decode( $cached_string ) ) ;
		//$cached_string = base64_encode( $cached_string );

		// die("<pre>". $cache_dir . $cached_string . $ext ."</pre>");

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
