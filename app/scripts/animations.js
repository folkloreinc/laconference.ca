define(['jquery', 'easing'], function($){

    var Animations = {

        // Make object appear as a POP!!
        pop: function($el, opts){
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
            }, 800, 'easeOutElastic');
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
        }


    };

    return Animations;


});