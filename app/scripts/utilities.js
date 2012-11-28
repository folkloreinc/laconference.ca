define([], function() {

    var Utilities = {

        randomCoordsInACircle: function(cx, cy, radius) {
            var r2 = radius*Math.sqrt(Math.random());
            var angle = 2*Math.PI*Math.random();
            return {
                x: Math.round(r2 * Math.cos(angle) + cx),
                y: Math.round(r2 * Math.sin(angle) + cy)
            };
        },

        randomIntInRange: function(from, to) {
            // if only one param is passed, generate in range [0, param]
            if (to == null) {
                to = from;
                from = 0;
            }
            return Math.floor(Math.random()*(to-from+1)+from);
        },

        randomPropertyKey: function(obj) {
            var result;
            var count = 0;
            for (var prop in obj)
                if (Math.random() < 1/++count)
                   result = prop;
            return result;
        }

    };
    return Utilities;
});