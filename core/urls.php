<?php
	
	// Helper function to redirect using a view name
	function reverse( $view, $args = array() ){
		global $URLS, $_IS_URLS_BEEN_PROCESSED;
		if( $view && !$_IS_URLS_BEEN_PROCESSED ){
			return array( 'view_redirect', $view, $args );
		}else if( $view && count($URLS) ){
			return Main::reverse( $view, $args );
		}
		return '';
	}

	// Helper function to redirect using 
	function redirect( $url ){
		global $_IS_URLS_BEEN_PROCESSED;
		if( $url && !$_IS_URLS_BEEN_PROCESSED ){
			return array( 'http_redirect', $url );
		}
		return '';
	}

	global $URLS, $_IS_URLS_BEEN_PROCESSED;
	$_IS_URLS_BEEN_PROCESSED = false;
	$URLS = array();
