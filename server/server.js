const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


var {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit form Admin text Welcome to the chat app
  socket.emit('newMessage', generateMessage('Amdin', 'Welcome to the chat app'));

  // socket.boradcast.emit from Admin text New user joined

  socket.broadcast.emit('newMessage', generateMessage('Amdin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // io.emit('newMessage', {
    //   from : message.from,
    //   text : message.text,
    //   createAt : new Date().getTime()
    // });
    // socket.broadcast.emit('newMessage', {
    //   from : message.from,
    //   text : message.text,
    //   createAt : new Date().getTime()
    // });

  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {

  console.log('Server is up on port' + port);

});
