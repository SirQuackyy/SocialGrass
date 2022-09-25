var element = document.getElementById('chat');

element.addEventListener('DOMSubtreeModified', myFunction);

function myFunction(e) {
  element.scrollTop = element.scrollHeight;
}


var user = cookie.get('username');
var socket = io();
if (!user) {
    alert('You can\'t chat without an account');
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
      user: cookie.get('username') || 'Anonymous',
      message: message
    });
  
    e.target.reset();
    $(e.target).find('input').focus()};
  });