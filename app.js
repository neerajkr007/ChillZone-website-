const express = require('express');
const app = express();
const serv = require('http').Server(app);



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

//  app.get('', (req, res) =>
//  {
//      res.sendFile(__dirname + '/notice.html');
//  });

app.get('/notice.html', (req, res) =>
{
    res.sendFile(__dirname + '/notice.html');
}); 

app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 3000);





var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');
});  