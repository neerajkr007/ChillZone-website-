require('dotenv').config()
const express = require('express');
const app = express();
const serv = require('http').createServer(app);


const mongoose = require('mongoose');

const URI = "mongodb+srv://Neeraj_kr:jhuCFHH7h0bsV0iq@cluster0.w0ajk.mongodb.net/defaultDb?retryWrites=true&w=majority";
const connection = async ()=>{
    await mongoose.connect(
    URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true },
    function(err){
        if (err){
            console.log(err)
            return
        }
        mongoose.set('useFindAndModify', false);
        console.log("db connected")
    });
}
connection();
 

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/index', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/game1', (req, res) =>
{
    res.sendFile(__dirname + '/game1.html');
}); 

app.get('/game2', (req, res) =>
{
    res.sendFile(__dirname + '/game2.html');
}); 

app.get('/game3', (req, res) =>
{
    res.sendFile(__dirname + '/game3.html');
}); 

app.get('/notice', (req, res) =>
{
    res.sendFile(__dirname + '/notice.html');
}); 

app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 3000);

var SOCKET_LIST = {};
//var i = 0;
var PLAYER_LIST = {};
var Player = function(id){
	var self = {
        id:id,
        roomId: "",
    } 
    return self;
}

var io = require('socket.io')(serv,{});


io.sockets.on('connection', function(socket){
    console.log('socket connected ');
    socket.id = String(Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1) + Math.ceil(1000)));
    //socket.id = i;
    //i++; 
    console.log(socket.id);
    SOCKET_LIST[socket.id] = socket;
    //var keys = Object.keys(SOCKET_LIST);
    //console.log(userId); 
    var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;
    socket.on("host", function(){
        socket.join(player.id);
        player.roomId = player.id;
        socket.emit("hosted", String(player.id));  
    });

    socket.on("tryJoin", id => {
        for(var i in SOCKET_LIST){
            if(id == SOCKET_LIST[i].id){
                socket.join(id);  
                player.roomId = id;
                //console.log(socket.adapter.rooms.get(id)); 
                socket.emit("joined", player.id); 
                startit();
                return true;   
            }  
        }
        socket.emit("notJoined"); 
    });
    
    function startit(){
        socket.broadcast.emit('startGame', Array.from(socket.adapter.rooms.get(player.roomId))[0]);
    }

    socket.on('values', function(data){
        socket.broadcast.emit("runlogic", {p1: data.p1, p2: data.p2, id: Array.from(socket.adapter.rooms.get(player.roomId))[0]});
    });

    socket.on('disconnect',function(){
        console.log('socket disconnected ');
        delete SOCKET_LIST[socket.id]; 
		delete PLAYER_LIST[socket.id];
    });
        
});