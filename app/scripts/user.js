define(['jquery', 'animations'], function($, Animations) {

    var $stage = $('#stage');

    var User = function(id, data){
        this.id = id;
        this.size = 40;
        this.x = 0;
        this.y = 0;

        // parse data into properties
        var that = this;
        $.each(data, function(key, value){
            that[key] = value;
        });
    };

    User.prototype.show = function() {

        // Load Image
        var profileImg = new Image();
        $(profileImg).bind('load', {
            'id': this.id,
            'size': this.size,
            'x': this.x,
            'y': this.y
            },
            function(event){

                // Build jQuery Image object 
                var $img = $(profileImg).attr({'id': event.data.id});
                $img.css({
                    'cursor': 'pointer',
                    'display': 'none',
                    'position': 'absolute',
                    'left': event.data.x,
                    'top': event.data.y,
                    'width': event.data.size,
                    'height': event.data.size
                });
                // Bind Events
                $img.hover(
                    // mouseenter
                    function(){
                        $(this).stop(true, true).css({'width': this.size, 'height': this.size, 'z-index': 3});
                        Animations.stretch($(this), {size: 20, fromCenter: true});
                    },
                    // mouseleave
                    function(){
                        $(this).stop(true, true).css({'width': this.size, 'height': this.size, 'z-index': '-=1'});
                        Animations.stretch($(this), {size: -20, fromCenter: true});
                    }
                );
                // Place on stage
                $stage.append($img);
                // Animate entry
                Animations.pop($img, {fromCenter: true, randomDelay: true});
            }
        );
        profileImg.src = this.profileImageUrl;
        
        
    };

    return User;
    
});