var viewportSizer=function($){function o(){console.log("fullscreen height: "+$(".fs.home")[0].offsetHeight),console.log(window.outerHeight+window.scrollY)}function i(){console.log(window.outerWidth),console.log(window.outerHeight),c.css({height:window.outerHeight,width:window.outerWidth})}var e={},n={},t={},d={},l,r,c;return{init:function(t){c=$.parseHTML("<div class='test'></div>"),console.log(c),console.log("boston"),$("body").append(c),e=t.children(".iphone"),n=t.children(".desktop").children("img"),d=$("#monitor"),l=$("#monitor")[0].clientHeight,n.imagesLoaded(function(){i()}),window.addEventListener("optimizedScroll",function(){o()}),$(window).resize(function(){i()})}}}(jQuery);