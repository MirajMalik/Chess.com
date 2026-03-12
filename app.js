const express = require("express");
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");                // only the Chess class is taken from chess.js
const path = require("path");


const app = express();
const server = http.createServer(app);
const io = socket(server);
const chess = new Chess();
const PORT = 3000;

let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));






app.get('/', (req,res) => {
    res.render("index", { title : "Chess Game" });
});


io.on("connection", function(uniquesocket) {                                
    console.log("Connected");

    if(!players.white) {                                                              // if there is no player in the players object
        players.white = uniquesocket.id;                                              // the first player will assigned with white field in the players object with a id 
        uniquesocket.emit("playerRole", "w");                                         // sending playerrole to the player
    }
    else if(!players.black) {                                                              
        players.black = uniquesocket.id;                                      
        uniquesocket.emit("playerRole", "b");                                         
    }
    else {
        uniquesocket.emit("spectatorRole");                                            // others rather then the white and black will act as spectator
    }


    uniquesocket.on("disconnect", function() {                                         // if any player is disconnected delete the field from the object
        if(uniquesocket.id === players.white) {
            delete players.white;
        }                                     
        else if(uniquesocket.id === players.black) {
            delete players.black;
        }                                     
    });





});




// this function decides whom to send the message 
// io.on("connection", function(uniquesocket) {                                      // whenever a connection is built,uniquesocket will keep the functionality of the user
//     console.log("Connected");

//     // uniquesocket.on("Ok", function() {
//     //     io.emit("ok ok got it");                                               // received Ok event from frontend and by io.emit() sending all connections to backend to frontend                                                
//     // })
//     // uniquesocket.on("disconnect", function() {
//     //     console.log("User disconnected");                                      // when someone disconnects or browser tab closed
//     // })
// });


server.listen(3000, () => {
    console.log(`Server is listenin on http://localhost:${PORT}`);
});