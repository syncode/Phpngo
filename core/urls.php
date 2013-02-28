<?php
	
	// Helper function to redirect using a view name
	function reverse( $view, $args = array() ){
		if( $view ){
			return array( 'view_redirect', $view, $args );
		}
		return '';
	}

	// Helper function to redirect using 
	function redirect( $url ){
		if( $url ){
			return array( 'http_redirect', $url );
		}
		return '';
	}

	global $URLS;
	$URLS = array();
