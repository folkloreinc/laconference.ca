define(['jquery'], function($) {

    var FrameAnimation = function($el, opts){
        this.$el = $el;
        this.opts = $.extend({
            'frames': [],
            'height': 400,
            'width': 400,
            'posX': 0,
            'posY': 0,
            'classes': [''],
            'loop': true,
            'speed': 8  //in ms
        }, opts);
        this.nbFrames = this.opts.frames.length;
        this.curFrame = 0;
        this.stopped = false;

        this.create();
        // this.drawFrame(this.curFrame);
    };

    FrameAnimation.prototype.nextFrame = function() {
        // Advance to next frame
        var newFrame;
        if (this.curFrame >= this.nbFrames) {
            if(this.opts.loop) {
                newFrame = 0;
            } else {
                this.stopAnimation();
            }
        } else {
            newFrame = this.curFrame + 1;
        }

        // Draw Frame
        this.drawFrame(newFrame);
    };

    FrameAnimation.prototype.drawFrame = function(noFrame) {
        this.$animEl.attr('src', this.opts.frames[noFrame]);
        this.curFrame = noFrame;
    };

    FrameAnimation.prototype.animate = function() {
        if(!this.$animEl) {
            this.create();
        }
        this.nextFrame();

        // Loop animation
        var that = this;
        this.timeout = window.setTimeout(function() {
            if(!that.stopped) {
                that.animate();
            }
        }, this.opts.speed);
    };

    FrameAnimation.prototype.stopAnimation = function () {
        this.stopped = true;
        window.clearInterval(this.timeout);
    };

    FrameAnimation.prototype.create = function() {
        if (this.opts.frames.length) {
            this.$animEl = $('<img class="frameAnimation '+this.opts.classes.join(' ')+'" height="'+this.opts.height+'" width="'+this.opts.width+'" src="'+this.opts.frames[this.curFrame]+'" />');
            this.$animEl.css({
                'position': 'absolute',
                'left': this.opts.posX,
                'top': this.opts.posY
            });
            this.$el.append(this.$animEl);
        }
    };
    
    return FrameAnimation;

});