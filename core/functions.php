<?php
$outer = '';
$blocks = array();
function extend( $template ){
	global $outer;
	ob_start();
	include $template;
	$outer = ob_get_clean();
}


function render( $template, $contenxt = array() ){
	include $template;
	$rendered = replace_blocks();
	echo $rendered;
}

function startblock($block_name){
	global $blocks;
	array_unshift( $blocks, array($block_name) );
	ob_start();
}


function endblock(){
	global $blocks;
	$blocks[0][1] = ob_get_clean();
}

function replace_blocks(){
	global $blocks, $outer;
	$temp;
	while( $temp = array_pop($blocks) ){
		$pattern = '/{[ \t]*block[ \t]*'.$temp[0].'[ \t]*}/';
		$outer = preg_replace($pattern, $temp[1] , $outer);
	}
	return $outer;
}

function get_view( $view, $uri){
	return call_user_func( $view , explode('/', $uri) );
}