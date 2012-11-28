define(['jquery', 'user', 'utilities', 'frameanimation', 'sprites'], function($, User, Utilities, FrameAnimation, Sprites) {

    var Molecule = function(opts){
        this.opts = $.extend({
            'minRadius': 100,
            'maxRadius': 300
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
        el.pos.x = randCoords.x + this.pos.x;
        el.pos.y = randCoords.y + this.pos.y;
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
        var anim = new FrameAnimation({
            'frames': Sprites.cercle1,
            'height': this.radius * 3,
            'width': this.radius * 3,
            'posX': this.pos.x - (this.radius / 4),
            'posY': this.pos.y - (this.radius / 4),
            'loop': false
        });
        anim.animate();
        anim.$el.fadeOut(6000);

    };

    return Molecule;

});