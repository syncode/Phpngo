<?php extend('templates/demo/title.php'); ?>

<html>
<head>
	{ block title }
</head>
<body>
	before<br>
	{ block first }
	{ block second }
	{ block first }
	{ block third }
	after<br>
</body>
</html>