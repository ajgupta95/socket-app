const express=require('express');
const path=require('path');
const socketIO=require('socket.io');
const http=require('http');
const indexPath=path.join(__dirname,'../public');


const app=express();

var server=http.createServer(app);

app.use(express.static(indexPath));

var io=socketIO(server);
io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.on('disconnect',()=>{
        console.log('disconneted from user');

 

    });
    // socket.emit('newMessage',{
    //     from:"bnm@gmail.com",
    //     text:"you are this",
    //     cretatedate:123
    // });
    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        socket.emit('newMessage',{
            from:"Admin",
            text :"Welcome to the CHAT APP",
            createdAt: new Date().getTime()
        });
        socket.broadcast.emit('newMessage',{
            from:"Admin",
            text :"New user joined",
            createdAt: new Date().getTime()
        });
        // io.emit('newMessage',{
        //     from:message.from,
        //     text :message.text,
        //     createdAt: new Date().getTime()
        // });
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //     text :message.text,
    //     createdAt: new Date().getTime()
    // });
    });
});

    

 server.listen(3000,()=>{
    console.log("server is listening on port 3000");});
