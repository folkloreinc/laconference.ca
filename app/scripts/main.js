require.config({
    paths: {
        jquery: 'vendor/jquery.min'
    }

});
 
require(['jquery', 'frameAnimation'], function($, FrameAnimation) {
    
    // console.log($);

    // var socket = io.connect('http://localhost');
    //     socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });

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

    cercle1Animation.animate();

    



});