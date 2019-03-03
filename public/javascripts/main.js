console.log('client');
let socket = io();

socket.on('msg', function(msg) {
  let msgEl = $('<div>').text(JSON.stringify(msg)).hide();
  $('#messages').prepend(msgEl.fadeIn(300));
});

socket.on('data', function(msg){
  $('#messages').prepend($('<div>').text(JSON.stringify(msg)));
});

