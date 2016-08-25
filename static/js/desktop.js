var video = $('video');
var counter = 0;
var dollar = $('.dollar').html();

var messages = ['make it rain.', 'kawaii', 'faster faster', 'sugoi'];

function playVideo() {
    video[0].play();
    counter = 10;
    addDollar();
    addTalk();
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
    var s = Math.random() * 100;
    $('.dollars').append(d);
    var b = (Math.random() * 50) + 50;
    var r = Math.random() * 100;
    d.animate({'bottom': b + '%', 'left': r + '%'}, 500, function() {
        $(this).remove();
    });
}

function addTalk() {
    var index = parseInt(Math.random() * messages.length);
    var m = $('<div class="text">' + messages[index] + '</div>');
    var t = Math.random() * 100;
    var l = Math.random() * 100;
    m.css({'left': l + '%', 'top': t + '%'});
    $('.video-content').append(m);
    m.fadeOut(3000, function() {
        m.remove();
    });
}

timer();

$(document).on('click', playVideo);