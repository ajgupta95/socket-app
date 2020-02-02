
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

socket.on('newLocationMessage',(message)=>{
var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My current Location</a>');
  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);

});


 jQuery('#message-form').on('submit',(e)=>{
        e.preventDefault();
        var messageTextBox=jQuery('[name=message]')
        socket.emit('createMessage',{
            from:'user',
            text:messageTextBox.val()
        },()=>{
        messageTextBox.val('')
        });

    });
       // var location=jQuery("#send-location");
        jQuery('#send-location').on('click',()=>{
            if(!navigator.geolocation){
                return alert("Geoloaction is not supported");
            }
            jQuery('#send-location').attr('disabled','disabled').text('SEND LOCATION..');
            navigator.geolocation.getCurrentPosition((position)=>{
                jQuery('#send-location').removeAttr('disabled').text('SEND LOCATION');
                socket.emit("createLocationMessage",{
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                });
            
        },()=>{
            jQuery('#send-location').removeAttr('disabled');
        alert('unable to fetch');
    });
        
      
    
     } );