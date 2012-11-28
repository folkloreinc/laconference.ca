require.config({
    paths: {
        "jquery": "empty:",
        easing: 'vendor/jquery.easing.1.3'
    }

});
 
require(['jquery', 'stage', 'molecule', 'user', 'tooltip', 'animations'], function($, Stage, Molecule, User, Tooltip, Animations) {
    
    // console.log($);

    // var socket = io.connect('http://localhost');
    //     socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });
    
    // Get Original Tweets
    $.get('/ecosystem.json', function receiveTweets(data) {
        
        window.receivedTweets = data;

        // Create stage
        window.boomStage = new Stage($('#stage'));

        // Create Molecules
        var nbStartMolecules = 1;
        for (var i = 0; i < nbStartMolecules; i++) {
            var mol = new Molecule();
            boomStage.addMolecule(mol)
        }

        // Place Users into random molecule
        // build array of keys
        var availTweets = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                availTweets.push(key);
            }
        }
        var i = 0;
        while(i < 40) {
            // random Molecule
            var mol = boomStage.getRandomMolecule();

            // place random Users in that molecule
            randKeyKey = Math.floor(availTweets.length * Math.random());
            randKey = availTweets.splice(randKeyKey, 1);
            var usr = new User(key, data[randKey]);
            mol.addElement(usr);
            i++;
        }

        // Show stage
        boomStage.show();

    });

    /*
     * Bind Events    
     */

    // User - mouseEnter
    $('#stage').on('mouseenter', '.user-div img', function(){
        var $userDiv = $(this).parent('.user-div');
        var usrObj = $(this).parent('.user-div').data('userObj');
        
        // stretch only if has friends
        if (usrObj.friends.length) {
            $userDiv.stop(true, true).css({'width': usrObj.size, 'height': usrObj.size, 'z-index': 3});
            Animations.stretch($userDiv, {size: 20, fromCenter: true});
        }
        
        usrObj.tooltip.show({
            'screen_name' : usrObj.screen_name,
            'text' : usrObj.text
        });

    });

    // // User - mouseLeave
    $('#stage').on('mouseleave', '.user-div img', function(){
        var $userDiv = $(this).parent('.user-div');
        var usrObj = $(this).parent('.user-div').data('userObj');

        
        // stretch only if has friends
        if (usrObj.friends.length) {
            $userDiv.stop(true, true).css({'width': usrObj.size+20, 'height': usrObj.size+20, 'z-index': '-=1'});
            Animations.stretch($userDiv, {size: -20, fromCenter: true});
        }
        usrObj.tooltip.hide();
    });

    // User - Click
    $('#stage').on('click', '.user-div', function(){

        var usrObj = $(this).data('userObj');
        if(usrObj.friends.length) {

            // explose animation
            Animations.explode($(this));

            // Create Molecule and place it on Stage
            var mol = new Molecule({minRadius: 200,maxRadius: 400});
            window.boomStage.addMolecule(mol);

            // Add Friends to molecule
            $.each(usrObj.friends, function(key, value) {
                var usr = new User(value, window.receivedTweets[value]);
                mol.addElement(usr);
            });
            
            // show it
            mol.show()
        }


    });
    



});