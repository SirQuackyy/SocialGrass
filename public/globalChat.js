var element = document.getElementById('chat');

element.addEventListener('DOMSubtreeModified', myFunction);

function myFunction(e) {
  element.scrollTop = element.scrollHeight;
}


var user = cookie.get('user');
var socket = io();
if (!user) {
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    cookie.set('user', user);
  }
}
socket.on('count', function (data) {
    $('.user-count').html(data);
});
  
socket.on('message', function (data) {
    document.getElementById("chat").innerHTML += ('<strong>' + data.user + '</strong>: ' + data.message + '<br>');
    // $('#chat').innerHTML += ('<strong>' + data.user + '</strong>: ' + data.message + '<br>');
});

$('form').submit(function (e) {
    e.preventDefault();
  
    var message = $(e.target).find('input').val();
    if (message.length > 0 && !/^\s*$/.test(message)){
    socket.emit('message', {
      user: cookie.get('user') || 'Anonymous',
      message: message
    });
  
    e.target.reset();
    $(e.target).find('input').focus()};
  });