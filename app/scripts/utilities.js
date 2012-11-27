define([], function() {

    var Utilities = {

        randomCoordsInACircle: function(cx, cy, radius) {
            var r2 = radius*Math.sqrt(Math.random());
            var angle = 2*Math.PI*Math.random();
            return {
                x: (r2 * Math.cos(angle) + cx),
                y: (r2 * Math.sin(angle) + cy)
            };
        },

        randomIntInRange: function(from, to) {
            return Math.floor(Math.random()*(to-from+1)+from);
        }

    };
    return Utilities;
});