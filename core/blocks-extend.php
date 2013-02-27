<?php
###################################################################
######################blocks - extends system######################
###################################################################

// temporary container for the extended template
$templates_hirarchy = array();

// array of blocks mentioned in the current template.
// each block should start with the function block('$block_name');
// and to end with the function endblock(), all the printed content in between
// will be captured into $blocks array in the format of 
// $blocks[ ['$first_block_name', '<div>block content</div>'], ['$second_block_name', '<div>block content</div>'] ]
$blocks;
$open_block;
$extend_count = 0;
function render( $template, $context = array() ){
	global $blocks, $templates_hirarchy, $extend_count, $template_context;
	foreach ($context as $key => $value) {
		global $$key;
		$$key = $value;
	}
	$template_context = $context;
	$blocks = array();
	ob_start();
	require $template ;
	$lowest = ob_get_clean();
	array_push($templates_hirarchy, $lowest);
	echo replace_blocks();
}
function extend( $template ){
	global $templates_hirarchy, $extend_count, $template_context;
	foreach ($template_context as $key => $value) {
		global $$key;
		$$key = $value;
	}
	++$extend_count;
	ob_start();
	require $template;
	$temp = ob_get_clean();
	array_push($templates_hirarchy, $temp);
}

function block($block_name){
	global $open_block;
	$open_block = $block_name;
	ob_start();
}


function endblock(){
	global $blocks, $open_block;
	$blocks[$open_block] = ob_get_clean();
}

function replace_blocks(){
	global $blocks, $templates_hirarchy;
	$last = array_shift($templates_hirarchy);
	foreach ($blocks as $key => $value) {
		$pattern = '/{[ \t]*block[ \t]*'.$key.'[ \t]*}/';
		$last = preg_replace($pattern, $value , $last);
	}
	return $last;
}