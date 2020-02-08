$(document).ready(function(){
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function (event) {
        console.log('connected');
    };

    socket.onmessage = function(msg){
        $('#result').append(msg.data);
        console.log(msg.data);
    };

});



