require.config({
    paths: {
        "jquery": "empty:",
        easing: 'vendor/jquery.easing.1.3'
    }

});
 
require(['jquery', 'molecule', 'user'], function($, Molecule, User) {
    
    // console.log($);

    // var socket = io.connect('http://localhost');
    //     socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });
    

    var tweets = {
        '271613943288586241': {
            screenName: 'martinlessard',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [2222]
        },
        '270919484397731840': {
            screenName: 'francoiscote',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: []
        },
        '270614833014120448': {
            screenName: 'prout',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120449': {
            screenName: 'prout',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120442': {
            screenName: 'prout',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120443': {
            screenName: 'prout',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120444': {
            screenName: 'prout',
            profileImageUrl: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        }
    };

    function receiveTweets(rawTweets) {
        // Build Molecule from tweets
        var mol = new Molecule($('#stage'));
        for (var key in rawTweets) {
            var usr = new User(key, rawTweets[key]);
            mol.addElement(usr)
        };
        mol.show();
    }
    receiveTweets(tweets);

    



});