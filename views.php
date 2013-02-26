<?php

	function demo($url_params){
		render("templates/demo/chiled.php");
	}

	function css($url_params){
		render("templates/demo/css.php");
	}


	function error_404($params){
		$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
		$host     = $_SERVER['HTTP_HOST'];
		$uri   = $_SERVER['REQUEST_URI'];
		$requested_url = $protocol . '://' . $host . $uri;

		echo "ERROR:  cannont retrive " .$requested_url."<br> wrong url";
	}
	
