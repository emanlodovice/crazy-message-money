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

////////// websocket /////////////////
$(document).ready(function () {
    if ("WebSocket" in window){
	   websocket = true;
    } else {
        // no web socket support
        websocket = false;
    }

    var msg = { event: 'register', };
    ws_send(msg);

    jimmyReady();
}); // ready end


function myfunction(){
    msg = { event: 'x', some_data: 'hello websocket world', };
    ws_send(msg);
}


function ws_send(msg){
  if( websocket == true ){
    // if ws is not open call open_ws, which will call ws_send back
    if( typeof(ws) == 'undefined' || ws.readyState === undefined || ws.readyState > 1){
      open_ws(msg);
    }else{
      ws.send( JSON.stringify(msg) );
      console.log("ws_send sent");
    }
  }
}


function open_ws(msg){
   if( typeof(ws) == 'undefined' || ws.readyState === undefined || ws.readyState > 1){
     // websocket on same server with address /websocket
     ws = new WebSocket("ws://localhost:8888/websocket");

       ws.onopen = function(){
           // Web Socket is connected, send data using send()
           console.log("ws open");
           if( msg.length != 0 ){
               ws_send(msg);
           }
       };

       ws.onmessage = function (evt){
           var received_msg = evt.data;
           console.log(evt.data);
	       msg = JSON.parse(evt.data)

           if( msg.event == "x" ){
	       // process message x
           }else if( msg.event == 'y' ){
	       // process message y
           }else if( msg.event == 'z' ) {
	       // process message z
           }
       };

       ws.onclose = function(){
           // websocket is closed, re-open
           console.log("Connection is closed... reopen");
    	   var msg = { event: 'register', };
    	   setTimeout( function(){ws_send(msg);}, 1000 );
       };
   }
}


///////// jimmmmyy ///////////
function jimmyReady() {
    $(document).on('click', function() {
        ws_send({'message': 'imong mama'});
    });
}
