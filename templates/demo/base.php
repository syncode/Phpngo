<?php
	extend('base.php');


	// Loading styles
	block('styles');
	
		load('css', array(
			'general.css',
			'demo.css',
		));

	endblock();


	// Loading the scripts
	block('scripts');

		load('js', array(
			'demo.js',
		));

	endblock();


	// Content
	block('content');

		?>
		<div class="row">
			<div class="span3">
				<div class="well" style="padding: 8px 0;">
					<ul class="nav nav-list" id="demo-menu">
						<li class="nav-header">Ajax</li>
							<li<?php echo ($demo_selected_menu_item == 'History API' || !$demo_selected_menu_item)? ' class="active"' : '' ; ?>><a href="<?php echo reverse('demo_history'); ?>">History API</a></li>
							<li<?php echo ($demo_selected_menu_item == 'Transitions')? ' class="active"' : '' ; ?>><a href="<?php echo reverse('demo_transitions'); ?>">Transitions</a></li>
							<li<?php echo ($demo_selected_menu_item == 'Advanced')? ' class="active"' : '' ; ?>><a href="#">Advanced</a></li>
						<li class="nav-header">Templating</li>
							<li<?php echo ($demo_selected_menu_item == 'Blocks')? ' class="active"' : '' ; ?>><a href="#">Blocks</a></li>
							<li<?php echo ($demo_selected_menu_item == 'Sections')? ' class="active"' : '' ; ?>><a href="#">Sections</a></li>
							<li<?php echo ($demo_selected_menu_item == 'Contenxt')? ' class="active"' : '' ; ?>><a href="#">Contenxt</a></li>
						<li class="divider"></li>
							<li><a href="#">Documentation</a></li>
					</ul>
				</div>
			</div>
			<div class="span9" id="demo-content-block">
				{ block demo-content }
			</div>
		</div>
		<?php

	endblock();
