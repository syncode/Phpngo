<?php

	global $URLS;

	$URLS = array(

		'/^reverse/' => reverse('demo'),
		'/^redirect/' => redirect('http://www.google.com'),
		
		'/^solutions/' => 'solutions',
		'/^case-studies/' => 'case_studies',
		'/^company/' => 'company',
		'/^labs/' => 'labs',
		'/^clients/' => 'clients',
		'/^$/' => 'index'
	);
