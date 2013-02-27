<header>
	<div class="navbar navbar-static-top">
		<div class="navbar-inner">
			<div class="container">

				<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</a>

				<!-- Be sure to leave the brand out there if you want it shown -->
				<a class="brand" href="<?php echo BASE_URL; ?>">Phpngo</a>

				<!-- Everything you want hidden at 940px or less, place within here -->
				<div class="nav-collapse collapse">
					<ul class="nav pull-right">
						<li<?php echo ($header_selected_menu_item == 'Home' || !$header_selected_menu_item)? ' class="active"' : '' ; ?>><a href="<?php echo BASE_URL; ?>">Home</a></li>
						<li<?php echo ($header_selected_menu_item == 'Demo')? ' class="active"' : '' ; ?>><a href="<?php echo BASE_URL; ?>demo/">Demo</a></li>
						<li class="<?php echo ($header_selected_menu_item == 'Documentation')? 'active ' : '' ; ?>dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Documentation <b class="caret"></b></a>
								<ul class="dropdown-menu">
								<li><a href="#">Urls</a></li>
								<li><a href="#">Templates</a></li>
								<li><a href="#">Media files</a></li>
								<li class="divider"></li>
								<li><a href="#">History API</a></li>
								<li><a href="#">Transitions</a></li>
							</ul>
						</li>
					</ul>
				</div>

			</div>
		</div>
	</div>
</header>
