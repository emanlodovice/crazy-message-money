var video = $('video');
var counter = 0;
var dollar = $('.dollar').html();
console.log(dollar);

function playVideo() {
    video[0].play();
    counter = 10;
    addDollar();
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

function addDollar() {
    var d = $(dollar);
    $('.dollars').append(d);
    var l = Math.random() * 100;
    var r = Math.random() * 100;
    d.animate({'bottom': l + '%', 'left': r + '%'}, 400, function() {
        $(this).remove();
    });
}

timer();

$(document).on('click', playVideo);