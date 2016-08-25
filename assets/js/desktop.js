var video = $('video');
var counter = 0;

function playVideo() {
    video[0].play();
    counter = 10;
}

function pauseVideo() {
    video[0].pause();
}

function timer() {
    setTimeout(function() {
        if (counter > 0) {
            counter--;
            if (counter === 0) {
                pauseVideo();
            }
        }
        timer();
    }, 50);
}

timer();

$(document).on('click', playVideo);