const express = require('express');
const app = express();
const serv = require('http').createServer(app);
// var originalfile = fs.readFileSync('../scripts/stone paper scissors.js', 'utf8');
// fs.writeFileSync('./sps-module.js', originalfile + "\nexports.startGame = startGame;");
// var sps = require('./sps-module.js');


app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/index.html', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/game1.html', (req, res) =>
{
    res.sendFile(__dirname + '/game1.html');
}); 

app.get('/game2.html', (req, res) =>
{
    res.sendFile(__dirname + '/game2.html');
}); 

app.get('/game3.html', (req, res) =>
{
    res.sendFile(__dirname + '/game3.html');
}); 

app.get('/notice.html', (req, res) =>
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
		score: 0,
    } 
    return self;
}

//var i = 0;
var io = require('socket.io')(serv,{});


io.on('connection', function(socket){
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
        //console.log(Array.from(socket.adapter.rooms.get('room1'))[0]);
        //console.log(socket.to(socket.id)); 
        //console.log(String(socket.id));
        socket.emit("hosted", String(player.id));  
    });

    socket.on("tryJoin", id => {
        for(var i in SOCKET_LIST){
            if(id == SOCKET_LIST[i].id){
                socket.join(id);
                //console.log(socket.adapter.rooms.get(id)); 
                socket.emit("joined", player.id); 
                socket.broadcast.emit('test123', Array.from(socket.adapter.rooms.get(id))[0]);
                return true;   
            }  
        }
        socket.emit("notJoined"); 
    });
    
    socket.on('disconnect',function(){
        console.log('socket disconnected ');
        delete SOCKET_LIST[socket.id]; 
		delete PLAYER_LIST[socket.id];
    });
        
});