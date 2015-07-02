<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * Please see /external/starkers-utilities.php for info on Starkers_Utilities::get_template_parts()
 *
 * @package 	WordPress
 * @subpackage 	Starkers
 * @since 		Starkers 4.0
 */
?>
<?php 

	Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); 

	$work = get_fields(4)['work_tile'];

?>

<script>
var work = <?php echo JSON_encode($work); ?>;
</script>
<div id="main">
	<div class="fs home">
		
		

		<!-- <div class="page">
			<img src="<?php //bloginfo('template_directory'); ?>/img/taryn_site_scroll.jpg" />
		</div> -->
	</div>
	<div class="description">
		<h2><?php echo get_fields(4)['description']; ?></h2>
	</div>
	<div class="work">
		<?php 
			foreach ($work as $key => $tile) {
				if($tile['tile_title'] != "Faders") {
					if($key % 3 === 0) {
						echo "<ul>";
					}

					echo "<li class='work_item' data-index='" . $key . "'>";
					echo '<img src="' . $tile['tile_image']['url'] . '" />';
					echo '<div><h4>' . $tile['tile_title'] . '</h4></div>';
					echo "</li>";
					if($key % 3 == 2) {
						echo "</ul>";
					}	
				}
			}
		?>
	</div>
	<div class="resume">
		<div class="resume_wrap">
			<div class="work">
				<div class="work_wrap">
					<ul class="intro">
						<li>Creative Explorer</li>
						<li>Problem Solver</li>
						<li>Do-it-yourselver</li>
						<li>Mom Blog Enthusiast</li>
						<li>Mother and Wife</li>
					</ul>
					<table style="padding-right:182px;">
						<tr>
							<td class="title" style="text-align:center;position:relative;top:-5px;">Skills</td>
						</tr>
						
						<tr>
							<td class="center">Design. UX. Storyboarding.<br>
							Identity Development. Photography.</td>
						</tr>
					</table>
					<table>
						<tr>
							<td></td>
							<td class="title">Education</td>
						</tr>
						<tr>
							<td>'06-'09</td>
							<td class="company">UNIVERSITY OF MINNESOTA</td>
						</tr>
						<tr>
							<td></td>
							<td>BS Graphic Design</td>
						</tr>
						<tr>
							<td></td>
							<td class="title">Experience</td>
						</tr>
						<tr>
							<td class="date">'06-Current</td>
							<td class="company">KLOUD COVER</td>
						</tr>
						<tr>
							<td></td>
							<td>Designer</td>
						</tr>
						<tr>
							<td class="date">'11-'15</td>
							<td class="company">PUNY</td>
						</tr>
						<tr>
							<td></td>
							<td>Designer</td>
						</tr>
						<tr>
							<td class="date">'09-'11</td>
							<td class="company">SEVNTHSIN</td>
						</tr>
						<tr>
							<td></td>
							<td>Designer</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script id="slider-template" type="text/x-handlebars-template">

	<ul class="hidden_height">
		{{#each slider_images}}
		<li><img src="{{image.url}}"/></li>
			
		{{/each}}
	</ul>
	<div class="slides_container">
		<ul class="slides">
			{{#each slider_images}}
				{{#if this.image.url}}
					<li style="background-image:url({{image.url}});"></li>
				{{else}}
					<li class="fixed_text"><p>{{text}}</p></li>
				{{/if}}
			{{/each}}
		</ul>
	</div>

</script>
<script id="fader-template" type="text/x-handlebars-template">

	<ul class="hidden_height">
		{{#each slider_images}}
		<li><img style="height:{{image.width}}px;" src="{{image.url}}"/></li>
		{{/each}}
	</ul>
	<div class="faders_container">
		<ul class="fader">
			{{#each slider_images}}
			<li style="background-image:url({{image.url}});"></li>
			{{/each}}
		</ul>
	</div>

</script>
<script id="scroller-template" type="text/x-handlebars-template">
	<div class="hidden_height">
		<img class="taryn" src="<?php bloginfo('template_directory'); ?>/img/taryn_site_scroll.jpg" />
	</div>

	<div class="desktop_wrap">
		<img src="<?php bloginfo('template_directory'); ?>/img/monitor.png" alt="Monitor" />
		<div class="page_wrap">
			<div class="page">
				<img src="{{desktop_site_image.url}}" />
			</div>
		</div>
	</div>

	<div class="iphone_wrap">
		<img src="<?php bloginfo('template_directory'); ?>/img/iphone.png" alt="iPhone">
		<div class="page_wrap">
			<div class="page">
				<img src="{{iphone_site_image.url}}" />


			</div>
		</div>				
	</div>
</script>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>