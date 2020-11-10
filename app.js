const express = require('express');
const app = express();
const serv = require('http').Server(app);

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + './index.html');
});


serv.listen(3000);


/*console.log("start");
const http = require('http');
const fs = require('fs');
const port = 3000;
app.use(express.static('data'));
const home = fs.readFileSync('./index.html');
const about = fs.readFileSync('./notice.html');
const game1 = fs.readFileSync('./game1.html');
const game2 = fs.readFileSync('./game2.html');
const game3 = fs.readFileSync('./game3.html');

const server = http.createServer((req, res)=>{
    console.log(req.url);
    url = req.url;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if(url == '/'){
        res.end(home);
    }
    else if(url == '/game1.html'){
        res.end(game1);
    }
    else if(url == '/game2.html'){
        res.end(game2);
    }
    else if(url == '/game3.html'){
        res.end(game3);
    }

    else{
        res.statusCode = 404;
        res.end("<h1>404 not found</h1>");
    }
});

server.listen(port, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
  });

console.log("end");
*/
