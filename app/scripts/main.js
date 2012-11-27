require.config({
    paths: {
        "jquery": "empty:",
        easing: 'vendor/jquery.easing.1.3'
    }

});
 
require(['jquery', 'molecule', 'user','tooltip'], function($, Molecule, User, Tooltip) {
    
    // console.log($);

    // var socket = io.connect('http://localhost');
    //     socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });
    
    // Get Original Tweets
    $.get('/ecosystem.json', function receiveTweets(data) {
        
        // Create Molecules
        var nbMolecules = 3;
        var molecules = [];
        for (var i = 0; i < nbMolecules; i++) {
            var mol = new Molecule($('#stage'));
            molecules.push(mol);
        }

        // Place Users into random molecule
        for (var key in data) {
            // random Molecule
            var randMol = Math.floor(Math.random() * nbMolecules);
            var mol = molecules[randMol];

            // place Users
            var usr = new User(key, data[key]);
            mol.addElement(usr);
        }

        //Show molecules
        for (var m = 0; m < nbMolecules; m++) {
            console.log(molecules[m]);
            molecules[m].show();
        }
    });
    



});