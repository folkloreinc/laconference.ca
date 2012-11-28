define(['jquery'], function($) {

	var TweetTooltip = function(el) {
		this.$el = $(el);
		// this.$tooltip = $(el);
	};


    TweetTooltip.prototype.show = function(tweet) {
        
        this.$tooltip = this._buildElement();
        $('#stage').append(this.$tooltip);

        this.$tooltip.find('.screenName').html('@'+tweet.screen_name);
        this.$tooltip.find('.tweet').html(tweet.text);

        this.$tooltip.css('opacity',0);

        this.$tooltip.removeClass('tweettooltip-left');
        this.$tooltip.removeClass('tweettooltip-right');
        this.$tooltip.removeClass('tweettooltip-top-left');
        this.$tooltip.removeClass('tweettooltip-top-right');
        this.$tooltip.removeClass('tweettooltip-bottom-left');
        this.$tooltip.removeClass('tweettooltip-bottom-right');

        var position = this.getPosition();
        this.$tooltip.addClass('tweettooltip-'+position);

        this.$tooltip.fadeTo('fast',1);
    };

	TweetTooltip.prototype._buildElement = function() {

		var $tooltip = $('<div class="tweettooltip"></div>');
		$tooltip.append('<div class="tip"></div>');
		$tooltip.append('<div class="screenName"></div>');
		$tooltip.append('<div class="tweet"></div>');
		$tooltip.css('opacity',0);

		return $tooltip;
	};

	TweetTooltip.prototype.hide = function() {

		this.$tooltip.fadeTo('fast', 0, function(){
            $(this).remove();
        });

	};

	TweetTooltip.prototype.getPosition = function() {

		var elOffset = this.$el.offset();
		var tooltipHeight = this.$tooltip.outerHeight()+20;
		var tooltipWidth = this.$tooltip.outerWidth()+20;

		/*
		//Top left
		if((elOffset.left-tooltipWidth) > 0 && (elOffset.top-tooltipHeight) > 0) {
			return 'top-left';

		//Top right
		} else if((elOffset.left+tooltipWidth) < window.innerWidth && (elOffset.top-tooltipHeight) > 0) {
			return 'top-right';

		//Bottom left
		} else if((elOffset.left-tooltipWidth) > 0) {
			return 'bottom-left';

		//Bottom right
		} else if((elOffset.left+tooltipWidth) < window.innerWidth) {
			return 'bottom-right';
		}*/

		//Top left
		if((elOffset.left-tooltipWidth) > 0) {
            this.$tooltip.css({
                'left': elOffset.left - tooltipWidth,
                'top': elOffset.top
            });

			return 'left';

		//Top right
		} else if((elOffset.left+tooltipWidth) < window.innerWidth) {
            this.$tooltip.css({
                'left': elOffset.left + 40,
                'top': elOffset.top
            });
			return 'right';
		}

	};


	return TweetTooltip;

});