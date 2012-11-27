define(['jquery', 'user', 'frameAnimation'], function($, User, FrameAnimation) {

    var Molecule = function($stage){
        this.elements = [];
        this.$stage = $stage;
        this.stageWidth = $stage.innerWidth();
        this.stageHeight = $stage.innerHeight();
        this.radius = 400;
        this.pos = {
            'x': (this.stageWidth - this.radius) / 2,
            'y': (this.stageHeight - this.radius) / 2
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
        var tryX = Math.floor(Math.random() * (this.radius + 1) + (this.pos.x));
        var tryY = Math.floor(Math.random() * (this.radius + 1) + (this.pos.y));

        // Place on stage
        el.x = tryX;
        el.y = tryY;
    };


    Molecule.prototype.show = function() {
        // // Circle animation
        // var anim = new FrameAnimation(this.$stage, {
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
        //     'posX': this.pos.x - (this.radius / 2),
        //     'posY': this.pos.y - (this.radius / 2),
        //     'loop': false
        // });
        // anim.animate();

        // Create Users elements
        if(this.elements) {
            for (var i = 0; i < this.elements.length; i++) {
                var elem = this.elements[i];
                elem.show();
            }
        }

    };

    return Molecule;

});