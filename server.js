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
var db = require('./public/db.json');
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
  post('/add_user', ctx => {
    db.push(ctx.data);
    fs.writeFileSync('./public/db.json', JSON.stringify(db), 'utf8');
    render('home.html');
  }),
  post('/set_interests/:user', ctx => {
    for(var i = 0; i < db.length; i++){
      if(db[i].username = ctx.params.user){
        db[i].interests = ctx.data;
        break;
      }
    }
    fs.writeFileSync('./public/db.json', JSON.stringify(db), 'utf8');
  }),
  post('/set_about/:user', ctx => {
    for(var i = 0; i < db.length; i++){
      if(db[i].username = ctx.params.user){
        db[i].aboutme = ctx.data;
        break;
      }
    }
    fs.writeFileSync('./public/db.json', JSON.stringify(db), 'utf8');
  }),
  get('/user/:username', ctx => {
    let found = false;
    for(var i = 0; i < db.length; i++){
      if(ctx.params.username == db[i].username){
        found = true;
        break;
      }
    }
    console.log(found);
    if(found){
      send('exists');
    } else {
      send('not exists');
    }
  }),
  get('/login/:username/:passsword', ctx => {
    let found = false;
    for(var i = 0; i < db.length; i++){
      if(ctx.params.username == db[i].username){
        if(ctx.params.password == db[i].password){
          found = true;
          break;      
        }
      }
    }
    if(found){
      render('home.html');
    } else {
      send('not exists');
    }
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