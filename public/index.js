var socket=io();
socket.on('connect',()=>{
    console.log("connected to server");
});
socket.on('disconnect',()=>{
    console.log('disconnected from server');
});
socket.emit('createMessage',{
    from:'abcde@gmail.com',
    text:"you are ABC",
          });
 socket.on('newMessage',(message)=>{
     console.log("message",message);

 });  