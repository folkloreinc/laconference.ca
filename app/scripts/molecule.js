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
            'x': 0,
            'y': 0
        };
    };

    Molecule.prototype.addElements = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
    };

    Molecule.prototype.getElement = function(id) {
        return this.elements[id];
    };

    Molecule.prototype.addElement = function(el) {
        this.placeElement(el);
        this.elements.push(el);
    };

    Molecule.prototype.updatePosition = function(position) {
        this.pos.x = position.x;
        this.pos.y = position.y;
        this.center.x = this.pos.x + this.radius;
        this.center.y = this.pos.y + this.radius;

        // // Draw Origin
        // $('<div>').css({
        //     'background': 'blue',
        //     'position': 'absolute',
        //     'left': this.pos.x,
        //     'top': this.pos.y,
        //     'width': '10px',
        //     'height': '10px'
        // }).appendTo('body');

        // // Draw Center
        // $('<div>').css({
        //     'background': 'red',
        //     'position': 'absolute',
        //     'left': this.center.x - 5,
        //     'top': this.center.y -5,
        //     'width': '10px',
        //     'height': '10px'
        // }).appendTo('body');
        // console.log(this.pos, this.radius, this.center);

    }

    Molecule.prototype.placeElement = function(el) {
        // get random position inside radius
        var randCoords = Utilities.randomCoordsInACircle(this.center.x, this.center.y, this.radius);
        // console.log(randCoords);
        el.pos.x = randCoords.x;
        el.pos.y = randCoords.y;
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
        var sp = Utilities.randomPropertyKey(Sprites.circles);
        var circleAnim = new FrameAnimation(window.boomStage.$stage, {
            'frames': Sprites.circles[sp].frames,
            'height': this.radius * 3,
            'width': this.radius * 3,
            'posX': this.pos.x - (this.radius / 4),
            'posY': this.pos.y - (this.radius / 4),
            'loop': false
        });
        circleAnim.animate();
        circleAnim.$animEl.fadeOut(6000, function(){
            $(this).remove();
        });

        
        // Word animation
        // prevent same word to appear twice in a row
        var wd = Utilities.randomPropertyKey(Sprites.words);
        while( wd === window.boomStage.previousWord ) {
            wd = Utilities.randomPropertyKey(Sprites.words);
        }
        window.boomStage.previousWord = wd;

        // get random position on circle
        var randAngle = Utilities.randomIntInRange(359);
        var wordAnim = new FrameAnimation(window.boomStage.$stage, {
            'frames': Sprites.words[wd].frames,
            'height': Sprites.words[wd].height + Utilities.randomIntInRange(100),
            'width': Sprites.words[wd].width + Utilities.randomIntInRange(50),
            'posX': this.center.x + Math.cos(randAngle) * this.radius,
            'posY': this.center.y + Math.sin(randAngle) * this.radius,
            'classes' : ['word'],
            'loop': true
        });
        wordAnim.animate();
        wordAnim.$animEl.fadeOut(6000, function(){
            wordAnim.stopAnimation();
            $(this).remove();
        });

    };

    return Molecule;

});