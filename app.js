console.log("start");
const http = require('http');
const fs = require('fs');
const hostname = 'chillzone-website.herokuapp.com';
const port = 3000;
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
    else if(url == '/Sudoku'){
        res.end(game3);
    }
    else if(url == '/Tic Tac Toe'){
        res.end(game1);
    }
    else if(url == '/game2'){
        res.end(game2);
    }

    else{
        res.statusCode = 404;
        res.end("<h1>404 not found</h1>");
    }
});

server.listen(port, hostname, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
  });

console.log("end");
