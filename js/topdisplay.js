
function log(x) {
	console.log(x);
}

// Viewport Size for friendship purposes
var viewport = (function() {
	var w, x, y, d, e, g, x;
	function update() {
		w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
	}

	return {
		updateViewportDimensions: function() {
			update();
			return {
				width: x,
				height: y
			}
		}
	}
})();



var viewportSizer = (function($, viewport, Handlebars) {
	
	var $page = {};

	var templates;
	var elems = [];

	var currentFader = 0;

	var $home, $description, $desktop_wrap, $iphone_wrap, resumeTop, intervalID, loaded;
	var scrolling = true;
	var triggers = [];

	function onscroll() {
		if(scrolling)  {
			// Scrolling full screen sites
			if((window.scrollY + window.innerHeight) >= $description[0].offsetTop) {
				_(elems).each(function(item) {
					item.page.css({
						'margin-top': -(item.page.height() - item.height() - 2)
					});
				});



			}else {

				var total = $home.height() - window.innerHeight;
				var percentage = (window.scrollY / total);


				_(elems).each(function(item) {
					item.page.css({
						'margin-top': -((item.page.height() - item.page_wrap.height()) * percentage)
					});
				});
			}
		}else {
			var scrollable_distance = $('.hidden_height').height() - window.innerHeight;
			
			var $last_slide = $('.slides li:last-child');
			if($last_slide.length > 0) {
				var slide_coefficient = $last_slide.position().left/scrollable_distance;
			}
			

			if(window.scrollY < scrollable_distance) {
				$home.children('.slides_container').children('.slides').css({
					left: -(window.scrollY * slide_coefficient)
				});
			}
			
			
		}
		// Stupid z-index issue for the bottom frame and the top frame
		if(window.scrollY > Math.abs(resumeTop)) {
			$(".resume").css("opacity", 1);
		}else {
			$(".resume").css("opacity", 0);
		}
		
	}
	function cycleFaders() {
		var faders = $home.find('.fader li');
		if(!_.isEmpty(faders)) {
			$(faders[currentFader]).css({opacity: 0});
			if(currentFader === (faders.length - 1)) {
				currentFader = 0;
			}else {
				currentFader++;
			}
			$(faders[currentFader]).css({opacity: 1});

		}
	}

	function computeDesktop() {
		// add compute desktop for resizes
		/** give hidden elements proper height **/
		$home.height("auto");
		var sampleHeight = $home.height();
		if($home.find('.fader').length) {
			$home.height('100vh');
		}else {
			$home.height(sampleHeight);
		}
		
		$home.css({opacity:1});
		/****************************/


		onscroll();
		resumeTop = getResumeOffsetTop();

	}
	function setTile(obj) {
		// clear slideshow
		window.clearInterval(intervalID);
		if(!_.isEmpty(obj.slider_images)) {
			if(obj.tile_title === "Faders") {
				// Is fader
				setFader(obj);
			}else {
				// Is Slider
				setSlider(obj);
			}
			scrolling = false;
		}else {
			// Is iphone//desktop
			setScroller(obj);
			scrolling = true;
		}
	}
	function setScroller(obj) {
		var html = templates.scroller(obj);
		$home.append(html);
		

		imagesLoaded($home, function() {
			setTimeout(function() {
				$home.css({opacity:1});
				$desktop_wrap = $('.desktop_wrap');
					$desktop_wrap.page = $('.desktop_wrap .page');
					$desktop_wrap.page_wrap = $('.desktop_wrap .page_wrap');

				$iphone_wrap = $('.iphone_wrap');
					$iphone_wrap.page = $('.iphone_wrap .page');
					$iphone_wrap.page_wrap = $('.iphone_wrap .page_wrap');	

					elems = [];
					elems.push($iphone_wrap);
					elems.push($desktop_wrap);
					$home.css({
						height: 'auto'
					});
					resumeTop = $home.height();
			},100);

		});

	}
	
	function setFader(obj) {
		
		var html = templates.fader(obj);
		$home.html(html);
		imagesLoaded($home, function() {
			setTimeout(function() {
				computeDesktop();
				var width = $home.height();
				$home.find('.hidden_height li:first-child').children('li').each(function(index) {
					$home.find('.fader li:nth-child('+ (index + 1) +')').width($(this).height());
				});
				if($home.find('.fader').length) {
				
				intervalID = window.setInterval(function() {
					cycleFaders();
				}, 4000);
				loaded.resolve();
				/** 
					var faders = $home.find('.fader li');
					var point_at = Math.floor((window.scrollY * 3) / $home.height());
					_(faders).each(function(val, key) {
						if(key !== point_at) {
							$(val).css({opacity:0});
						}
					});
					// Point at the num in the array
					$(faders[point_at]).css({opacity: 1});
					**/
				}

			}, 100);
		});
	}

	function setSlider(obj) {
		var html = templates.slider(obj);
		$home.html(html);
		imagesLoaded($home, function() {
			setTimeout(function() {
				computeDesktop();
				var width = $home.width();
				//var height = $home.find('.hidden_height').height();
				var height = $(window).height() * obj.slider_images.length;
				var numImages = obj.slider_images.length;
				
				$home.find('.slides').children('li').each(function(index) {
					elems = [];
					elems.push($(this));
					log();
					if($(this).hasClass('fixed_text')) {
						
						triggers.push({
							slide: $(this),
							left: (width * index),
							height: (height / numImages)
						});
					}else {
						$(this).css({
							left: (width * index),
							height: (height / numImages)
						});	
					}
					
				});
				resumeTop = $home.height();
			},100);
		});
	}
	function getResumeOffsetTop() {
		return $('.resume').offset().top - viewport.updateViewportDimensions().height;
	}
	return {
		init: function(obj, cb) {
			templates = {
				scroller: Handlebars.compile($('#scroller-template').html()),
				slider: Handlebars.compile($('#slider-template').html()),
				fader: Handlebars.compile($('#fader-template').html())
			}
			// Need this for a z-index issue


			loaded = $.Deferred();

			$.when(loaded).done(function() {
				cb();
			});

			$home = $('.fs.home');

			$description = $('.description');
			
			setTile(obj);
			window.addEventListener("optimizedScroll", function() {
			    onscroll();
			});
			// maybe move this outside and init as a separate function
			window.addEventListener("optimizedResize", function() {
				computeDesktop();
			});
				
		},
		setTile: function(obj) {
			elems = [];
			$home.css({
				'height': $home.height(),
			});
			$('body').animate({
				scrollTop: 0
			});
			
			$home.transit({opacity: 0}).promise().done(function() {
				$home.children().remove();
				
				setTile(obj);
			});

		}
	}
})(jQuery, viewport, Handlebars);