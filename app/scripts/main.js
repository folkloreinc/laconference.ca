require.config({
    paths: {
        "jquery": "empty:",
        easing: 'vendor/jquery.easing.1.3'
    }

});
 
require(['jquery', 'stage', 'molecule', 'user', 'tooltip', 'animations'], function($, Stage, Molecule, User, Tooltip, Animations) {
    
    /*
     * Static Tweets
     */
    $.get('/ecosystem.json', function receiveTweets(data) {
        
        window.receivedTweets = data;

        // Create stage
        window.boomStage = new Stage($('#stage'));

        // Create Molecules
        var nbStartMolecules = 1;
        for (var i = 0; i < nbStartMolecules; i++) {
            var mol = new Molecule();
            window.boomStage.addMolecule(mol);
        }

        // Place Users into random molecule
        // build array of keys
        var availTweets = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                availTweets.push(key);
            }
        }
        var m = 0;
        var maxUsersToShow = window.boomStage.getMaxUsersToShow();
        while(m < maxUsersToShow) {
            // random Molecule
            var randMol = window.boomStage.getRandomMolecule();

            // place random Users in that molecule
            var randKeyKey = Math.floor(availTweets.length * Math.random());
            var randKey = availTweets.splice(randKeyKey, 1);
            var usr = new User(key, data[randKey]);
            randMol.addElement(usr);
            m++;
        }

        // Show stage
        window.boomStage.show();

    });

    /*
     * Twitter Stream
     */
    var socket = io.connect('http://localhost:3502');
        socket.on('tweet', function(tweet) {
        console.log(tweet);
        var existingUser = window.boomStage.searchUser(tweet.user.id);
        if(existingUser) {
            console.log('Existing');
            console.log(existingUser);

            existingUser.tooltip.show({
                'screen_name' : existingUser.screen_name,
                'text' : tweet.text
            });
        } else {
            console.log('New User');
            // Get existing molecule
            var mol = window.boomStage.getRandomMolecule();
            console.log(mol);
            // prepare tweet data
            var tweetdata = {
                'id': tweet.user.id,
                'screen_name': tweet.user.screen_name,
                'tweet': tweet.text,
                'friends': []
            };
            // create new User, add to molecule, and show
            var usr = new User(tweet.user.id, tweetdata);
            console.log(usr);
            mol.addElement(usr);
            usr.show();
        }

    });


    /*
     * Bind Events
     */

    // User - mouseEnter
    $('#stage').on('mouseenter', '.user-div img', function(){
        var $userDiv = $(this).parent('.user-div');
        var usrObj = $(this).parent('.user-div').data('userObj');
        
        if( usrObj ) { // prevent errors when new Users appear under the mouse
            // stretch only if has friends
            if (usrObj.friends.length) {
                $userDiv.stop(true, true).css({'width': usrObj.size, 'height': usrObj.size, 'z-index': 3});
                Animations.stretch($userDiv, {size: 20, fromCenter: true});
            }
            
            usrObj.tooltip.show({
                'screen_name' : usrObj.screen_name,
                'text' : usrObj.text
            });
        }

    });

    // // User - mouseLeave
    $('#stage').on('mouseleave', '.user-div img', function(){
        var $userDiv = $(this).parent('.user-div');
        var usrObj = $(this).parent('.user-div').data('userObj');
        
        if( usrObj ) { // prevent errors when new Users appear under the mouse
            // stretch only if has friends
            if (usrObj.friends.length) {
                $userDiv.stop(true, true).css({'width': usrObj.size+20, 'height': usrObj.size+20, 'z-index': '-=1'});
                Animations.stretch($userDiv, {size: -20, fromCenter: true});
            }
            usrObj.tooltip.hide();
        }
    });

    // User - Click
    $('#stage').on('click', '.user-div', function(){
        var usrObj = $(this).data('userObj');
        if(usrObj.friends.length) {

            // Register click
            window.boomStage.registerClick();

            // explose animation
            Animations.explode($(this));

            // Create Molecule and place it on Stage
            var mol = new Molecule({minRadius: 200,maxRadius: 400});
            window.boomStage.addMolecule(mol);

            // Add allowed number of Friends to molecule, at random
            var availFriends = usrObj.friends;

            var u = 0;
            var maxUsersToShow = window.boomStage.getMaxUsersToShow()

            while(u < maxUsersToShow) {                
                // get random Friend from available friends
                var randKeyKey = Math.floor(availFriends.length * Math.random());
                var randKey = availFriends.splice(randKeyKey, 1)[0];

                // create User and place inside Molecule
                var tweetdata = getTweetData(randKey)
                if(tweetdata){
                    var usr = new User(randKey, tweetdata);
                    mol.addElement(usr);
                }
                u++;   
            }
            
            // show it
            mol.show();
        }


    });
    
    function getTweetData(id) {
        if (window.receivedTweets.hasOwnProperty(id)) {
            return window.receivedTweets[id];
        }
    }

    // BG Flickr
    Animations.randomBGFlicker($('#bgimg'), {
        'images': [
            '/images/frameAnimations/bg_001.png',
            '/images/frameAnimations/bg_002.png',
            '/images/frameAnimations/bg_003.png',
            '/images/frameAnimations/bg_004.png',
            '/images/frameAnimations/bg_005.png',
            '/images/frameAnimations/bg_006.png',
            '/images/frameAnimations/bg_007.png'
        ]
    });


});