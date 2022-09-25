// const http = require('http');
const express = require('express');
// const path = require('path');
const app = express();
// const server = require('server');

// app.use(express.json());
// app.use(express.static("public"));
// // default URL for website
// app.use('/', function(req,res){
//     res.sendFile(path.join(__dirname+'/public/index.html'));
//     //__dirname : It will resolve to your project folder.
//   });
// const server = http.createServer(app);
// const port = 3000;
// server.listen(port);
// console.debug('Server listening on port ' + port);

const server = require('server');
const { get, socket, post } = server.router;
const { render, send, status } = server.reply;
const fs = require('fs');
const dbPath = './public/db.json';
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

server({ security: { csrf: false } }, [
  get('/', ctx => render('globalChat.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage),
  post('/add_user/:username/:password/:first/:last/:school/:about/:friends', ctx => {
    status(200).send('ok');
    fetch('http://localhost:3000/public/db.json')
    .then((response) => response.json())
    .then((json) => {
      json.push({
        "username": ctx.params.username,
        "password": ctx.params.password,
        "first_name": ctx.params.first,
        "last_name": ctx.params.last,
        "school": ctx.params.school,
        "aboutme": ctx.params.about,
        "friends": ctx.params.friends
      });
      fs.writeFile(dbPath, JSON.stringify(json), 'utf8', callback);
    });
  })
]);

// app.get('/add_user/:username&=:password&=:first&=:last&=:school&=:about&=:friends', function(req, res) {
//   fetch('./data.json')
//     .then((response) => response.json())
//     .then((json) => {
//       json["table"].push({
//         "username": req.params.username,
//         "password": req.params.password,
//         "first_name": req.params.first,
//         "last_name": req.params.last,
//         "school": req.params.school,
//         "aboutme": req.params.about,
//         "friends": req.params.friends
//       });
//       fs.writeFile('./db.json', JSON.stringify(json), 'utf8', callback);
//     });
//     res.send(200, { message: 'ok' });
// });