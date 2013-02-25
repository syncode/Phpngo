<?php

	function base($url_params){
		$name = $url_params[1];
		$content_block = "templates/base_parts/content_block.php";
		include("templates/base.php");
	}

	function demo($url_params){
		render("templates/demo/content.php");
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
	