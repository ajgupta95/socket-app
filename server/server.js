const express=require('express');
const path=require('path');
const socketIO=require('socket.io');
const http=require('http');
const indexPath=path.join(__dirname,'../public');
const {generateMessage}=require('./message');

const app=express();

var server=http.createServer(app);

app.use(express.static(indexPath));

var io=socketIO(server);
io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.emit('newMessage',generateMessage('Admin','Welcome to CHAT APP'));
    socket.broadcast.emit('newMessage',generateMessage('Admin',"New user joined")); 
   
    // socket.emit('newMessage',{
    //     from:"bnm@gmail.com",
    //     text:"you are this",
    //     cretatedate:123
    // });
    socket.on('createMessage',(message,callbackkk)=>{
        console.log('createMessage',message);
      
       
       io.emit('newMessage',generateMessage(message.from,message.text));
   // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
    callbackkk("This is from server");
    
    });
    socket.on('disconnect',()=>{
        console.log('disconneted from user');
   });
   });

    

 server.listen(3000,()=>{
    console.log("server is listening on port 3000");});
