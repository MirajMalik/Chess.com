const socket = io();

socket.emit("Ok")                                              // emit(event)-> means sending a event from frontend to backend, in backend io.on will receive this event through uniquesocket and will execute a function 

socket.on("ok ok got it", function() {                         // received ok ok got it event from backend
    console.log("ok ok got it received");
})