const socket = io.connect();
var chosenIdP1 = 4;
var p1Choosen = false;
var chosenIdP2 = 4;
var p2Choosen = false;
var aiId;
var roomId = 0;
var p1score = 0;
var p2score = 0;
var notfirsttime = false;
var gamemode = 0;
var joinedId = "";
var isHost = true;
var turn = true;
var chosenId = 4;

function begin(){
	if(isHost)
	{
		document.getElementById("paper2").style.display = "none";
		document.getElementById("stone2").style.display = "none";
		document.getElementById("scissor2").style.display = "none";
	}
	else
	{
		document.getElementById("paper1").style.display = "none";
		document.getElementById("stone1").style.display = "none";
		document.getElementById("scissor1").style.display = "none";
	}
}

function chooseMultiMode(){
	document.getElementById("")
}

function gamemodechosen(){
	document.getElementById("modeButton").style.display = "none";
	//console.log(gamemode);
	//module.exports.gamemode = gamemode;
	if(gamemode === 0){
		startGame();
	}
}
function paper1clicked(){
	if(turn){
		turn = false;
		chosenIdP1 = 0;
		
		document.getElementById("stone1").style.display = "none";
		document.getElementById("scissor1").style.display = "none";
		if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
		//console.log("works ????");
		document.getElementById("chosenName1").innerHTML = "Paper";
	}
}

function stone1clicked(){
	if(turn){
		turn = false;
		chosenIdP1 = 1;
		document.getElementById("chosenName1").innerHTML = "Stone";
		document.getElementById("paper1").style.display = "none";
		document.getElementById("scissor1").style.display = "none";
		if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
	}
}

function scissor1clicked(){
	if(turn){
		turn = false;	
		chosenIdP1 = 2;
		document.getElementById("chosenName1").innerHTML = "Scissor";
		document.getElementById("paper1").style.display = "none";
		document.getElementById("stone1").style.display = "none";
		if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
	}
}

function paper2clicked(){
	if(turn){
		turn = false;
		chosenIdP2 = 0;
		document.getElementById("chosenName2").innerHTML = "Paper";
		document.getElementById("stone2").style.display = "none";
		document.getElementById("scissor2").style.display = "none";
		//if(gamemode === 0){
			if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
		//}
	}
}

function stone2clicked(){
	if(turn){
		turn = false;
		chosenIdP2 = 1;
		document.getElementById("chosenName2").innerHTML = "Stone";
		document.getElementById("paper2").style.display = "none";
		document.getElementById("scissor2").style.display = "none";
		if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
	}
}

function scissor2clicked(){
	if(turn){
		turn = false;	
		chosenIdP2 = 2;
		document.getElementById("chosenName2").innerHTML = "Scissor";
		document.getElementById("paper2").style.display = "none";
		document.getElementById("stone2").style.display = "none";
		if(gamemode === 0){
			gameLogic();
		}
		else{
			socket.emit('values', {p1:chosenIdP1, p2:chosenIdP2});
		}
	}
}

function startGame(){
	p1score = 0;
	p2score = 0;
	document.getElementById("score2").innerHTML = "Score - " + 0;
	document.getElementById("score1").innerHTML = "Score - " + 0;
	if(isHost){
		document.getElementById("chosenName1").innerHTML = "Choose";
		document.getElementById("chosenName2").innerHTML = "choosing...";
	}
	else{
		document.getElementById("chosenName2").innerHTML = "Choose";
		document.getElementById("chosenName1").innerHTML = "choosing...";
	}
	
	document.getElementById("vsAI").style.display = "flex";
	if(notfirsttime){
		turn = true;
		if(isHost){
			document.getElementById("paper1").style.display = "inline-flex";
			document.getElementById("stone1").style.display = "inline-flex";
			document.getElementById("scissor1").style.display = "inline-flex";
		}
		else{
			document.getElementById("paper2").style.display = "inline-flex";
			document.getElementById("stone2").style.display = "inline-flex";
			document.getElementById("scissor2").style.display = "inline-flex";
		}
		
	}
	begin();
}

function gameLogic(){
	notfirsttime = true;
	if(gamemode === 0){
		aiId = Math.floor(Math.random() * 3);
	}
	else if (gamemode === 1){
			chosenId = chosenIdP1;
			aiId = chosenIdP2;
			
	}
	//aiId = 0;
	if(aiId === 0 && isHost){
		document.getElementById("chosenName2").innerHTML = "Paper";
		document.getElementById("paper2").style.display = "inline-flex";
	}
	else if(aiId === 1 && isHost){
		document.getElementById("chosenName2").innerHTML = "Stone";
		document.getElementById("stone2").style.display = "inline-flex";
	}
	else if(aiId === 2 && isHost){
		document.getElementById("chosenName2").innerHTML = "Scissor";
		document.getElementById("scissor2").style.display = "inline-flex";
	}
	if(chosenIdP1 === 0 && !isHost){
		document.getElementById("chosenName1").innerHTML = "Paper";
		document.getElementById("paper1").style.display = "inline-flex";
	}
	else if(chosenIdP1 === 1 && !isHost){
		document.getElementById("chosenName1").innerHTML = "Stone";
		document.getElementById("stone1").style.display = "inline-flex";
	}
	else if(chosenIdP1 === 2 && !isHost){
		document.getElementById("chosenName1").innerHTML = "Scissor";
		document.getElementById("scissor1").style.display = "inline-flex";
	}
	document.getElementById("modalBody").style.display = "none";
	document.getElementById("modalBodywin").style.display = "none";
	document.getElementById("modalBodyloss").style.display = "none";
	//console.log(aiId);
	//console.log(chosenIdP1);
	if(chosenId === 0){
		if(aiId === 1){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
				//
		}
		if(aiId === 2){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
		}
	}
	if(chosenId === 1){
		if(aiId === 0){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
		}
		if(aiId === 2){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
		}
	}
	if(chosenId === 2){
		if(aiId === 0){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
		}
		if(aiId === 1){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
		}
	}
	if(isHost){
		chosenIdP2 = 4;
	}
	else{
		chosenIdP1 = 4;
	}
	if(p2score === 5 || p1score === 5)
	{
		document.getElementById("playagain").style.display = "flex";
		if(p1score === 5 && isHost){
			document.getElementById("modalBodywin").style.display = "flex";
			document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		else if(p1score === 5 && !isHost)
		{
			document.getElementById("modalBodyloss").style.display = "flex";
			document.getElementById("modalBodyloss").innerHTML = "You Lost !";
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		if(p2score === 5 && !isHost){
			document.getElementById("modalBodywin").style.display = "flex";
			document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		
		else if(p2score === 5 && isHost)
		{
			document.getElementById("modalBodyloss").style.display = "flex";
			document.getElementById("modalBodyloss").innerHTML = "You Lost !";
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
	}
	else
	{
		setTimeout(function(){
			if(isHost){
				document.getElementById("chosenName1").innerHTML = "Choose";
				document.getElementById("chosenName2").innerHTML = "choosing...";
				document.getElementById("vsAI").style.display = "flex";
				if(notfirsttime){
					document.getElementById("paper1").style.display = "inline-flex";
					document.getElementById("stone1").style.display = "inline-flex";
					document.getElementById("scissor1").style.display = "inline-flex";
				}
			}
			else{
				document.getElementById("chosenName2").innerHTML = "Choose";
				document.getElementById("chosenName1").innerHTML = "choosing...";
				document.getElementById("vsAI").style.display = "flex";
				if(notfirsttime){
					document.getElementById("paper2").style.display = "inline-flex";
					document.getElementById("stone2").style.display = "inline-flex";
					document.getElementById("scissor2").style.display = "inline-flex";
				}
			}
			begin();
			turn = true;
		},2000);
		
	}
} 

function tryJoin(){
	roomId = document.getElementById("enteredId").value;
	console.log(roomId);
	socket.emit("tryJoin", roomId);
}

socket.on("hosted", function(data){
	roomId = data;
	document.getElementById("modeButton").style.display = "none";
	document.getElementById("gameId").style.display = "inline-flex";
	document.getElementById("gameId").outerHTML = "<h4 id='gameId' class='display-5 text-center'></h4>";
	document.getElementById("gameId").innerHTML = "game id -  "+ data;
	document.getElementById("waitingMsg").style.display = "inline-flex";
	document.getElementById("waitingMsg").outerHTML = "<h5 id='waitingMsg' class='text-center'> waiting for other player to join...</h5>";
});

socket.on("joined", function(id){
	joinedId = id;
	gamemode = 1;
	isHost = false;
	console.log("joined");
	document.getElementById("modeButton").style.display = "none";
	$('#exampleModal2').modal('toggle')
	//socket.emit("joinComplete");
	//document.getElementById("join").data-dismiss =  "modal";
	//socket.to('123456').emit('test123');
});

socket.on("notJoined", function(){
	alert("id incorrect !");
	console.log("nah did not join ");
});

socket.on('startGame',(id) => {
	if(roomId == id && isHost)
	{	
		document.getElementById("waitingMsg").outerHTML = "<h5 id='waitingMsg' class='text-center'></h5>";
		startGame();
	}
	else if(roomId == id && !isHost)
	{
		startGame();
	}  
});

socket.on('runlogic', function(data){
	if(roomId == data.id)
	{
		chosenIdP1 = data.p1;
		chosenIdP2 = data.p2;
		if(chosenIdP2 == 4 && !isHost){
			document.getElementById("chosenName1").innerHTML = "choosen";
		}
		if(chosenIdP1 == 4 && isHost){
			document.getElementById("chosenName2").innerHTML = "choosen";
		}
		if(chosenIdP2 !=4 && chosenIdP1 !=4){
			gameLogic();
		}
	} 
});


