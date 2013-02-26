<?php extend('templates/demo/parent.php'); ?>

<hr>
chiled template
<hr>

{ block first }

<? block('second'); ?>
replaced from chiled.php<br>
<? endblock(); ?>

<? block('first'); ?>
replaced from chiled.php<br>
<? endblock(); ?>

{ block first }
