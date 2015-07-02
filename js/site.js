




jQuery(document).ready(function($) {
	//menu 
    $("#btn_menu").on("click", function(e) {
        e.preventDefault();
        console.log(this);
        $(this).toggleClass("active");
        $("#menu").toggleClass("on");
    });
    $("#menu li a").on('click', function(e) {
        e.preventDefault();
        var goTo = $(this).data().scroll;
        if(goTo) {
            console.log(goTo);
            if(goTo !== "footer") {
                scrollingTo = $('#main > .'+goTo).position().top;
            }else {
                scrollingTo = $('footer').position().top;
            }

            $('#menu').toggleClass("on");

            $("html, body").animate({
                scrollTop: scrollingTo
            }, 1000);
        }
    });

    var work_tiles = _(work).reject(function(val) {
        return val.tile_title === "Faders";
    });
    
    work_tiles = _(work_tiles).map(function(val) {
        if(!_.isUndefined(val.slider_images)) {
            val.slider_images = _(val.slider_images).map(function(img) {
                
                img.image.width = Math.floor(parseInt(img.image.width) / 2);
                return img;
            });
            return val;
        }
    });


    var page = _(work).find(function(val) {
        return val.tile_title === "Faders";
    });

    /*** LOAD UP THE PAGE MAGIC ****/
    viewportSizer.init(page, function() {
        
        // menuGlow.set();
        // window.addEventListener("optimizedScroll", function() {
        //     menuGlow.coast();
        // });
        // window.addEventListener("optimizedResize", function() {
        //     menuGlow.set();
        // });
    });


    $('.work_item').on('click', function() {
        viewportSizer.setTile(work_tiles[this.dataset.index]);
    });


    // var menuGlow = (function($) {
    //     var places, closest;
    //     var names = {
    //         home: '#main > .home',
    //         work: '#main > .work',
    //         resume: '#main > .resume',
    //         contact: 'footer'
    //     }

    //     return {
    //         set: function(obj) {
    //             places = {
    //                 home: $('#main > .home').offset().top,
    //                 work: $('#main > .work').offset().top,
    //                 resume: $('#main > .resume').offset().top,
    //                 contact: $('footer').offset().top
    //             }
    //             _(places).each(function(val, key) {
    //                 if(closest > Math.abs(val - window.scrollY)) {
    //                     closest = val;
    //                 }
    //                 console.log(closest);
    //             });
    //         },
    //         coast: function() {
               
    //             _(places).each(function(val, key) {
    //                 if(closest < Math.abs(val - window.scrollY) || _.isUndefined(closest)) {
    //                     closest = val;
    //                     console.log("boston");
    //                 }
    //                 console.log("closest: " + closest);
    //                 console.log(Math.abs(val - window.scrollY));
    //             });
    //         }
    //     }
    // })($);

    


});



(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle ("scroll", "optimizedScroll");
    throttle ("resize", "optimizedResize");
})();

// handle event

