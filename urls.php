<?php

	global $URLS;

	$URLS = array(

		'/^reverse/' => reverse('demo'),
		'/^redirect/' => redirect('http://www.google.com'),
		
		'/^demo\/transacions/' => 'demo_transitions',
		'/^demo/' => 'demo_history',
		'/^$/' => 'index',

	);
