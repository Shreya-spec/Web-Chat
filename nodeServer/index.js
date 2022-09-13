//Node server which will handle socket io connections
const express = require('express');
const app = express();
var users = {};
const cors = require('cors');
//const { Client } = require('socket.io/dist/client');
app.use(cors());
const io = require('socket.io')(8000)
io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{
        console.log("New User", name, socket.id);
        users[socket.id] = name;
        console.log(users[socket.id]);
        socket.broadcast.emit('new-user-joined', name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})
