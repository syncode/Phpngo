<?php extend('templates/demo/grandparent.php'); ?>
<hr>
parent template
<hr>

<? block('first'); ?>
configured in parent.php<br>
<? endblock(); ?>

<? block('third'); ?>
configured in parent.php<br>
<? endblock(); ?>

before <br>

{ block first }

<br>after