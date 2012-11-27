require.config({
    paths: {
        "jquery": "empty:",
        easing: 'vendor/jquery.easing.1.3'
    }

});
 
require(['jquery', 'stage', 'molecule', 'user', 'tooltip'], function($, Stage, Molecule, User, Tooltip) {
    
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
        var nbMolecules = 1;
        for (var i = 0; i < nbMolecules; i++) {
            var mol = new Molecule();
            boomStage.addMolecule(mol)
        }

        // Place Users into random molecule
        for (var key in data) {

            // random Molecule
            var mol = boomStage.getRandomMolecule();

            // place Users
            var usr = new User(key, data[key]);
            mol.addElement(usr);
        }

        // Show stage
        boomStage.show();

    });

    $('#stage').on('click', '.user-img', function(){
        var usrObj = $(this).data('userObj');
        if(usrObj.friends.length) {

            // Create Molecule
            var mol = new Molecule({minRadius: 200,maxRadius: 400});
            
            // Add Users to molecule
            $.each(usrObj.friends, function(key, value) {
                var usr = new User(value, window.receivedTweets[value]);
                mol.addElement(usr);
            });
            
            // place it on stage and show it
            window.boomStage.addAndShowMolecule(mol);
        }

    });
    



});