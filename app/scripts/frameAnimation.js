define(['jquery'], function($) {

    var FrameAnimation = function(opts){
        this.opts = $.extend({
            'frames': [],
            'height': 400,
            'width': 400,
            'posX': 0,
            'posY': 0,
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
        this.$el.attr('src', this.opts.frames[noFrame]);
        this.curFrame = noFrame;
    };

    FrameAnimation.prototype.animate = function() {
        if(!this.$el) {
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
            this.$el = $('<img class="frameAnimation" height="'+this.opts.height+'" width="'+this.opts.width+'" src="'+this.opts.frames[this.curFrame]+'" />');
            this.$el.css({
                'position': 'absolute',
                'left': this.opts.posX,
                'top': this.opts.posY
            });
            $(window.boomStage.$stage).append(this.$el);
        }
    };
    
    return FrameAnimation;

});