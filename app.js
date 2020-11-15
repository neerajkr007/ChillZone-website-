const express = require('express');
const app = express();
const serv = require('http').Server(app);
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
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connected ');

    socket.id = Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1) + Math.ceil(1000));
    console.log(socket.id);
    SOCKET_LIST[socket.id] = socket;
    var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;
    
    socket.on("host", function(){
        //socket.roomId = Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1) + Math.ceil(1000));
        socket.emit("hosted", player.id); 
    });

    socket.on("tryJoin", function(id){
        //console.log(SOCKET_LIST.length); 
        for(var i in PLAYER_LIST){
            //console.log(PLAYER_LIST[i].id); 
            if(id == PLAYER_LIST[i].id){
                socket.emit("joined"); 
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