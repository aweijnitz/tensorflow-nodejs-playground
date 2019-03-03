console.log('client');
let socket = io();

socket.on('msg', function(msg) {
  let msgEl = $('<div>').text(JSON.stringify(msg)).hide();
  $('#messages').prepend(msgEl.fadeIn(300));
});

socket.on('data', function(msg){
  let msgEl = $('<div>').text(JSON.stringify(msg)).hide();
  $('#data').prepend(msgEl.fadeIn(300));
});

