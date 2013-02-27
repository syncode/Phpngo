<?php

	function index( $url_params ){

		$context = array(
			'header_selected_menu_item' => 'Home'
		);

		render('templates/index.php', $context);
	}

	function demo( $url_params ){

		$context = array(
			'header_selected_menu_item' => 'Demo'
		);

		render('templates/demo.php', $context);
	}

	function error_404($params){
		$uri   = $uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
		$requested_url = $uri;

		echo 'ERROR:  cannont retrive >'.$requested_url.'< <br> wrong url';
	}
	
