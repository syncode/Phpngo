<?php

	function index( $url_params ){
		$context = array(
			'header_selected_menu_item' => 'Home'
		);
		render('index.php', $context);
	}

	// Demos
	function demo_history( $url_params ){
		$context = array(
			'header_selected_menu_item' => 'Demo',
			'demo_selected_menu_item' => 'History API'
		);
		render('demo/history-api.php', $context);
	}

	function demo_transitions( $url_params ){
		$context = array(
			'header_selected_menu_item' => 'Demo',
			'demo_selected_menu_item' => 'Transitions'
		);
		render('demo/transactions.php', $context);
	}

	function error_404($params){
		$uri   = $uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
		$requested_url = $uri;

		echo 'ERROR:  cannont retrive >'.$requested_url.'< <br> wrong url';
	}
	
