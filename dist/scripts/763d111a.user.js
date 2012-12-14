define(['jquery', 'animations', 'tooltip'], function($, Animations, Tooltip) {

    var User = function(id, data){
        this.id = id;
        this.size = 40;
        this.pos = {
            'x': 0,
            'y': 0
        };

        // parse data into properties
        var that = this;
        $.each(data, function(key, value){
            that[key] = value;
        });
    };

    User.prototype.show = function(showTooltip) {
        // Load Image
        var profileImg = new Image();
        $(profileImg).bind('load', 
            {
                'id': this.id,
                'size': this.size,
                'x': this.pos.x,
                'y': this.pos.y
            },
            
            $.proxy(function(event){
                // Build jQuery Image object
                var $usrdiv = $('<div class="user-div">').css({
                    'width': event.data.size,
                    'height': event.data.size,
                    'left': event.data.x,
                    'top': event.data.y
                });
                var $img = $(profileImg).attr({'id': event.data.id, 'class': 'user-img'});
                $usrdiv.append($img);
                $usrdiv.data('userObj', this);

                // Place
                // -----
                // Place on stage
                $('#stage').append($usrdiv);
                // Create tooltip
                this.tooltip = new Tooltip($usrdiv);

                // Animate entry
                Animations.pop($usrdiv, {fromCenter: true, randomDelay: true, maxDelay: 2000}, $.proxy(function(){
                    if (!!showTooltip) {
                        this.tooltip.show({
                            'screen_name' : this.screen_name,
                            'text' : this.text
                        });

                        window.setTimeout($.proxy(function() {
                            this.tooltip.hide();
                        }, this), 3000);
                    }
                    
                }, this));
            },this)
        );
        profileImg.src = 'https://api.twitter.com/1/users/profile_image?screen_name='+this.screen_name+'&size=normal';
        
        
    };

    return User;
    
});