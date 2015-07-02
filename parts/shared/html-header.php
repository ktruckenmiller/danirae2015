<!DOCTYPE HTML>
<!--[if IEMobile 7 ]><html class="no-js iem7" manifest="default.appcache?v=1"><![endif]--> 
<!--[if lt IE 7 ]><html class="no-js ie6" lang="en"><![endif]--> 
<!--[if IE 7 ]><html class="no-js ie7" lang="en"><![endif]--> 
<!--[if IE 8 ]><html class="no-js ie8" lang="en"><![endif]--> 
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html class="no-js" lang="en"><!--<![endif]-->
	<head>
		<title><?php bloginfo( 'name' ); ?><?php wp_title( '|' ); ?></title>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Remove if you're not building a responsive site. (But then why would you do such a thing?) -->
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.ico"/>
		<link href="<?php echo get_stylesheet_directory_uri(); ?>/bower_components/normalize-css/normalize.css" />
		<link href='http://fonts.googleapis.com/css?family=Raleway:400,500' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<link href="<?php echo get_stylesheet_directory_uri(); ?>/css/style.css" />

		<?php wp_head(); ?>
		<script type="text/javascript">
		    (function() {
		        var path = '//easy.myfonts.net/v2/js?sid=10406(font-family=Cochin)&sid=211076(font-family=Cochin+Pro+Bold)&sid=218007(font-family=Cochin+Pro+Roman)&key=zww4Hy3S5R',
		            protocol = ('https:' == document.location.protocol ? 'https:' : 'http:'),
		            trial = document.createElement('script');
		        trial.type = 'text/javascript';
		        trial.async = true;
		        trial.src = protocol + path;
		        var head = document.getElementsByTagName("head")[0];
		        head.appendChild(trial);
		    })();
		</script>
	</head>
	<body <?php body_class(); ?>>
