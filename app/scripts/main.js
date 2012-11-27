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
            profileImageUrl: 'https://si0.twimg.com/profile_images/2221455972/wynn-mic-bw_normal.jpg',
            text: 'bla bla bla bla',
            followers: [2222]
        },
        '270919484397731840': {
            screenName: 'francoiscote',
            profileImageUrl: 'https://si0.twimg.com/profile_images/2445472230/j7zhz338m2zkyf9aq11p_normal.png',
            text: 'bla bla bla bla',
            followers: []
        },
        '270614833014120448': {
            screenName: 'prout',
            profileImageUrl: 'https://si0.twimg.com/profile_images/349841616/350_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120449': {
            screenName: 'prout',
            profileImageUrl: 'https://si0.twimg.com/profile_images/66332657/IP_black_logotype_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120442': {
            screenName: 'prout',
            profileImageUrl: 'https://si0.twimg.com/profile_images/1593782614/Xavier_Web_normal.jpg',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120443': {
            screenName: 'prout',
            profileImageUrl: 'https://si0.twimg.com/profile_images/1648299166/IMG_1401_normal.JPG',
            text: 'bla bla bla bla',
            followers: [111]
        },
        '270614833014120444': {
            screenName: 'prout',
            profileImageUrl: 'https://si0.twimg.com/profile_images/2885562391/94725bd3596f4b87bf8fd3840cd8d6ce_normal.png',
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