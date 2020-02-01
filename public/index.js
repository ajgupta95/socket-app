
var socket=io();
socket.on('connect',()=>{
    console.log("connected to server");
});
socket.on('disconnect',()=>{
    console.log('disconnected from server');
});

socket.on('newMessage',(message)=>{
    console.log("message",message);
    var li=jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);

}); 
// socket.emit('createMessage',{
//     from:'abcde@gmail.com',
//     text:"you are ABC",
//           },(data)=>{console.log("Got it",data);});


 jQuery('#message-form').on('submit',(e)=>{
        e.preventDefault();
        
        socket.emit('createMessage',{
            from:'user',
            text:jQuery('[name=message]').val()
        },()=>{

        });
 }) ;