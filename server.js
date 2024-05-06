
const express = require('express');
const path  = require('path');
const app  = express();
const http = require('http');
const socketIO = require ('sokect.io');

const io = socketIO(server);

app.use (express.static(path.join(__dirname, '../public')));

io.on ('connection ', function(sokect){
 console.log('A user connected');
});

sokect.on ('chat-message', function(data){
    io.emit('chat-message ' , data);

});

sokect.on('disconnect ', function(){
    console.log('user disconnected');
});

const server = http.createServer(app);

const PORT = process.env.PORT || 30005;

server.listen(PORT,function(){
    console.log(`server is running on port ${PORT}`);
})


