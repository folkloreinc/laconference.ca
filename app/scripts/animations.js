define(['jquery', 'easing'], function($){

    var Animations = {

        // Make object appear as a POP!!
        pop: function($el, opts, cb){
            cb = cb || function(){};

            // Options
            opts = $.extend({
                'fromCenter': false,
                'randomDelay': false,
                'maxDelay': 500
            }, opts);

            // Setup variables
            var delay = (opts.randomDelay)?(Math.random() * opts.maxDelay + 1)-1:0;
            var offset = {
                x: (opts.fromCenter)?Math.ceil($el.width()/2):0,
                y: (opts.fromCenter)?Math.ceil($el.height()/2):0
            };
            var originalSize = {
                x: $el.width(),
                y: $el.height()
            };

            // Animate pop
            $el.css({
                'left': '+='+offset.x,
                'top': '+='+offset.y,
                'width': 0,
                'height': 0
            })
            .show()
            .delay(delay)
            .animate({
                'left': '-='+offset.x,
                'top': '-='+offset.y,
                'width': originalSize.x,
                'height': originalSize.y
            }, 800, 'easeOutElastic', cb);
        },

        stretch: function($el, opts){
            // Options
            opts = $.extend({
                'size': 40,
                'fromCenter': false
            }, opts);

            // Setup variables
            var offset = {
                x: (opts.fromCenter)?Math.ceil(opts.size/2):0,
                y: (opts.fromCenter)?Math.ceil(opts.size/2):0
            };

            // Animate pop
            $el.animate({
                'left': '-='+offset.x,
                'top': '-='+offset.y,
                'width': '+='+opts.size,
                'height': '+='+opts.size
            }, 600, 'easeOutElastic');
        },

        explode: function($el, opts){

            var $clone = $el.clone().appendTo('#stage').addClass('anim-explode');

            // Options
            opts = $.extend({
                'size': 100,
                'fromCenter': true
            }, opts);

            // Setup variables
            var offset = {
                x: (opts.fromCenter)?Math.ceil(opts.size/2):0,
                y: (opts.fromCenter)?Math.ceil(opts.size/2):0
            };

            // Animate explosion
            $clone.animate({
                'left': '-='+offset.x,
                'top': '-='+offset.y,
                'width': '+='+opts.size,
                'height': '+='+opts.size,
                'opacity': 0
            }, 1000, 'easeOutExpo', function() {
                $(this).remove();
            });
        },

        randomBGFlicker: function($el, opts){
            // Options
            opts = $.extend({
                'images': []
            }, opts);


            var switchBG = function() {
                // Random background
                var randBG = opts.images[Math.floor(Math.random() * opts.images.length)];
                // $el.css({
                //     'background-image': 'url('+randBG+')'
                // });

                $el.attr('src', randBG);
                
            };

            (function animloop(){
                requestAnimationFrame(animloop);
                switchBG();
            })();

        }


    };

    return Animations;

});

// requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());