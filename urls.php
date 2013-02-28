<?php

	global $URLS;

	$URLS = array(

		'/^$/' => "index",
		'/^demo/' => "demo",
		'/^reverse/' => reverse('demo'),
		'/^redirect/' => redirect('http://www.google.com'),

	);
