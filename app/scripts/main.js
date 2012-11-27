require.config({
    paths: {
        jquery: 'vendor/jquery.min'
    }

});
 
require(['jquery', 'frameAnimation', 'grid'], function($, FrameAnimation, Grid) {
    
    // console.log($);

    // var socket = io.connect('http://localhost');
    //     socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });
    

    var tweets = {
        271613943288586241: {
            screen_name: 'martinlessard',
            profile_image_url: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [2222]
        },
        270919484397731840: {
            screen_name: 'francoiscote',
            profile_image_url: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: []
        },
        270614833014120448: {
            screen_name: 'martinlessard',
            profile_image_url: 'http://a0.twimg.com/profile_images/1777569006/image1327396628_normal.png',
            text: 'bla bla bla bla',
            followers: [111]
        },
    };


    function receiveTweets(tw) {
        var grid = new Grid(tw);

        grid.show();
    }
    receiveTweets(tweets);





    // Basic Frame animation
    var cercle1Animation = new FrameAnimation({
        'frames': [
            'images/frameAnimations/Cercle1-01.png',
            'images/frameAnimations/Cercle1-02.png',
            'images/frameAnimations/Cercle1-03.png',
            'images/frameAnimations/Cercle1-04.png',
            'images/frameAnimations/Cercle1-05.png',
            'images/frameAnimations/Cercle1-06.png',
            'images/frameAnimations/Cercle1-07.png',
            'images/frameAnimations/Cercle1-08.png',
            'images/frameAnimations/Cercle1-09.png',
            'images/frameAnimations/Cercle1-10.png'
        ],
        'loop': false
    });
    // cercle1Animation.animate();

    



});