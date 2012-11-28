define(['jquery', 'animations', 'tooltip'], function($, Animations, Tooltip) {

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
        $(profileImg).bind('load', 
            {
                'id': this.id,
                'size': this.size,
                'x': this.x,
                'y': this.y
            },
            
            $.proxy(function(event){
                // Build jQuery Image object
                var $usrdiv = $('<div class="user-div">').css({
                    'position': 'absolute',
                    'display': 'none',
                    'width': event.data.size,
                    'height': event.data.size,
                    'left': event.data.x,
                    'top': event.data.y
                });
                var $img = $(profileImg).attr({'id': event.data.id, 'class': 'user-img'});
                $img.css({
                    'cursor': 'pointer',
                    'display': 'block',
                    'position': 'absolute',
                    'width': '100%',
                    'height': '100%',
                    'top': 0,
                    'left': 0

                });
                $usrdiv.append($img);
                $usrdiv.data('userObj', this);

                // Create tooltip
                this.tooltip = new Tooltip($usrdiv);

                // Place
                // -----
                // Place on stage
                $(window.stage).append($usrdiv);
                // Animate entry
                Animations.pop($usrdiv, {fromCenter: true, randomDelay: true, maxDelay: 2000});
            },this)
        );
        profileImg.src = 'https://api.twitter.com/1/users/profile_image?screen_name='+this.screen_name+'&size=normal';
        
        
    };

    return User;
    
});