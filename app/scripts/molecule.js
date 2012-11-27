define(['jquery', 'user', 'frameAnimation', 'utilities'], function($, User, FrameAnimation, Utilities) {

    var Molecule = function(opts){
        this.opts = $.extend({
            'minRadius': 200,
            'maxRadius': 400
        }, opts);
        
        this.elements = [];
        this.radius = Utilities.randomIntInRange(this.opts.minRadius, this.opts.maxRadius);
        this.circ = this.radius * 2;
        // random position on stage
        this.pos = {
            'x': 0,
            'y': 0
        };
        this.center = {
            'x': this.pos.x + this.radius,
            'y': this.pos.y + this.radius
        };
    };

    Molecule.prototype.addElements = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
    };

    Molecule.prototype.addElement = function(el) {
        this.placeElement(el);
        this.elements.push(el);
    };

    Molecule.prototype.placeElement = function(el) {
        // get random position inside radius
        var randCoords = Utilities.randomCoordsInACircle(this.center.x, this.center.y, this.radius);
        el.x = randCoords.x;
        el.y = randCoords.y;
    };

    Molecule.prototype.show = function() {

        // Create Users elements
        if(this.elements) {
            for (var i = 0; i < this.elements.length; i++) {
                var elem = this.elements[i];
                elem.show();
            }
        }

        // Circle animation
        // var anim = new FrameAnimation({
        //     'frames': [
        //         'images/frameAnimations/Cercle1-01.png',
        //         'images/frameAnimations/Cercle1-02.png',
        //         'images/frameAnimations/Cercle1-03.png',
        //         'images/frameAnimations/Cercle1-04.png',
        //         'images/frameAnimations/Cercle1-05.png',
        //         'images/frameAnimations/Cercle1-06.png',
        //         'images/frameAnimations/Cercle1-07.png',
        //         'images/frameAnimations/Cercle1-08.png',
        //         'images/frameAnimations/Cercle1-09.png',
        //         'images/frameAnimations/Cercle1-10.png'
        //     ],
        //     'height': this.radius * 2,
        //     'width': this.radius * 2,
        //     'posX': this.pos.x,
        //     'posY': this.pos.y,
        //     'loop': false
        // });
        // anim.animate();

    };

    return Molecule;

});