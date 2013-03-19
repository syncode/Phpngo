<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<!-- Essential -->
	<meta charset="UTF-8">
	<title>Sinapsa - Internet Solutions</title>
	<base href="<?php echo BASE_URI ?>" target="_top" />

	<!-- Mobile -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<?php

		// Styles
		load('css', array(
			'general.css',
			'home.css',
			'custom.css',
			'libs/bootstrap.min.css'
		));

	?>
</head>
<body>
	<header>
		<div class="branding leyout">
			<a href="/" title="Sinapsa - Internet Solutions" class="logo"></a>
			<div class="menu-btn ui-te">
				<span></span>
	            <span></span>
	            <span></span>
			</div>
		</div>
		<div class="menu-overlay"></div>
		<div class="menu">
			<a href="/" title="Sinapsa - Internet Solutions" class="white-logo"></a>
			<ul class="leyout">
				<li class="selected">
					<a href="<?php echo BASE_URI ?>">
						<span class="title">Home</span>
						<span class="desc">Where we first met</span>
					</a>
				</li>
				<li>
					<a href="<?php echo BASE_URI ?>solutions/">
						<span class="title">Solutions</span>
						<span class="desc">We focus on quality</span>
					</a>
				</li>
				<li>
					<a href="<?php echo BASE_URI ?>case-studies/">
						<span class="title">Case Studies</span>
						<span class="desc">What drives us forward</span>
					</a>
				</li>
				<li>
					<a href="<?php echo BASE_URI ?>company/">
						<span class="title">Company</span>
						<span class="desc">What drives us forward</span>
					</a>
				</li>
				<li>
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
				<li class="mobile-only">
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
				<li class="mobile-only">
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
				<li class="mobile-only">
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
				<li class="mobile-only">
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
				<li class="mobile-only">
					<a href="<?php echo BASE_URI ?>labs/">
						<span class="title">Labs</span>
						<span class="desc">Our web dev lab</span>
					</a>
				</li>
			</ul>
		</div>
	</header>
	<section id="main">
