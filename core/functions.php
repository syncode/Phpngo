<?php

require_once( PH_PATH . 'core/blocks-extend.php' );

// Quick helper functions
function load( $media_type = 'CSS', $files = array() ){
	$script_name = '';
	switch( strtoupper( $media_type ) ){
		case 'CSS':
			foreach ($files as $file) {
				if( CSS_CONCAT ){
					if( strpos($file, 'http://') !== 0 && strpos($file, 'https://') !== 0 ){
						$script_name .= ( $script_name ) ? '+' . $file : $file ;
					}else{
						?><link rel="stylesheet" href="<?php echo $file; ?>"><?php
					}
				}else{
					?><link rel="stylesheet" href="<?php echo MEDIA_URL . CSS_URL . $file; ?>"><?php
				}
			}

			if( $script_name ){
				if( CSS_ENCODE ){
					$script_name = base64_encode( $script_name );
				}
				?><link rel="stylesheet" href="css/<?php echo $script_name; ?>/style.css"><?php
			}
		break;
		case 'JS': case 'JAVASCRIPT':
			foreach ($files as $file) {
				if( JS_CONCAT ){
					if( strpos($file, 'http://') !== 0 && strpos($file, 'https://') !== 0 ) {
						$script_name .= ( $script_name ) ? '+' . $file : $file ;
					}else{
						?><script src="<?php echo $file; ?>"></script><?php
					}
				}else{
					?><script src="<?php echo MEDIA_URL . JS_URL . $file; ?>"></script><?php
				}
			}

			if( $script_name ){
				if( JS_ENCODE ){
					$script_name = base64_encode( $script_name );
				}
				?><script src="js/<?php echo $script_name; ?>/script.js"></script><?php
			}
		break;
	}
}