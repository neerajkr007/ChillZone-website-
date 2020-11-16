const socket = io();
var chosenIdP1;
var aiId;
var roomId = 0;
var p1score = 0;
var p2score = 0;
var notfirsttime = false;
var gamemode = 0;
function begin(){
	document.getElementById("paper2").style.display = "none";
	document.getElementById("stone2").style.display = "none";
	document.getElementById("scissor2").style.display = "none";
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
		chosenIdP1 = 0;
		document.getElementById("chosenName1").innerHTML = "Paper";
		document.getElementById("stone1").style.display = "none";
		document.getElementById("scissor1").style.display = "none";
		gameLogic();
}

function stone1clicked(){
	chosenIdP1 = 1;
		document.getElementById("chosenName1").innerHTML = "Stone";
		document.getElementById("paper1").style.display = "none";
		document.getElementById("scissor1").style.display = "none";
		gameLogic();
}

function scissor1clicked(){
	chosenIdP1 = 2;
		document.getElementById("chosenName1").innerHTML = "Scissor";
		document.getElementById("paper1").style.display = "none";
		document.getElementById("stone1").style.display = "none";
		gameLogic();
}

function startGame(){
	document.getElementById("score2").innerHTML = "Score - " + 0;
	document.getElementById("score1").innerHTML = "Score - " + 0;
	document.getElementById("chosenName1").innerHTML = "Choose";
	document.getElementById("chosenName2").innerHTML = "choosing...";
	document.getElementById("vsAI").style.display = "flex";
	if(notfirsttime){
		document.getElementById("paper1").style.display = "inline-flex";
		document.getElementById("stone1").style.display = "inline-flex";
		document.getElementById("scissor1").style.display = "inline-flex";
	}
	begin();
}

function gameLogic(){
	notfirsttime = true;
	aiId = Math.floor(Math.random() * 3);
	//aiId = 0;
	if(aiId === 0){
		document.getElementById("chosenName2").innerHTML = "Paper";
		document.getElementById("paper2").style.display = "inline-flex";
	}
	if(aiId === 1){
		document.getElementById("chosenName2").innerHTML = "Stone";
		document.getElementById("stone2").style.display = "inline-flex";
	}
	if(aiId === 2){
		document.getElementById("chosenName2").innerHTML = "Scissor";
		document.getElementById("scissor2").style.display = "inline-flex";
	}
	document.getElementById("modalBody").style.display = "none";
	document.getElementById("modalBodywin").style.display = "none";
	document.getElementById("modalBodyloss").style.display = "none";
	//console.log(aiId);
	//console.log(chosenIdP1);
	if(chosenIdP1 === 0){
		if(aiId === 0){
			//document.getElementById("modalBody").style.display = "flex";
			//document.getElementById("modalBody").innerHTML = "Draw !!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		if(aiId === 1){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
			//document.getElementById("modalBodywin").style.display = "flex";
			//document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
				//
		}
		if(aiId === 2){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
			//document.getElementById("modalBodyloss").style.display = "flex";
			//document.getElementById("modalBodyloss").innerHTML = "You lost !";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		//document.getElementById("playagain").style.display = "flex";
	}
	if(chosenIdP1 === 1){
		if(aiId === 0){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
			//document.getElementById("modalBodyloss").style.display = "flex";
			//document.getElementById("modalBodyloss").innerHTML = "You Lost !";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		if(aiId === 1){
			//document.getElementById("modalBody").style.display = "flex";
			//document.getElementById("modalBody").innerHTML = "Draw !!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
				//
		}
		if(aiId === 2){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
			//document.getElementById("modalBodywin").style.display = "flex";
			//document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		//document.getElementById("playagain").style.display = "flex";
	}
	if(chosenIdP1 === 2){
		if(aiId === 0){
			p1score++;
			document.getElementById("score1").innerHTML = "Score - " + p1score;
			//document.getElementById("modalBodywin").style.display = "flex";
			//document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		if(aiId === 1){
			p2score++;
			document.getElementById("score2").innerHTML = "Score - " + p2score;
			//document.getElementById("modalBodyloss").style.display = "flex";
			//document.getElementById("modalBodyloss").innerHTML = "You Lost !";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
				//
		}
		if(aiId === 2){
			//document.getElementById("modalBody").style.display = "flex";
			//document.getElementById("modalBody").innerHTML = "Draw !!";
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			//setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		
	}
	if(p2score === 5 || p1score === 5)
	{
		document.getElementById("playagain").style.display = "flex";
		if(p1score === 5){
			document.getElementById("modalBodywin").style.display = "flex";
			document.getElementById("modalBodywin").innerHTML = "You Win !!!";
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 500);
			setTimeout(function(){$('#endgameModal').modal('toggle')}, 2000);
		}
		else
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
			document.getElementById("chosenName1").innerHTML = "Choose";
			document.getElementById("chosenName2").innerHTML = "choosing...";
			document.getElementById("vsAI").style.display = "flex";
			if(notfirsttime){
				document.getElementById("paper1").style.display = "inline-flex";
				document.getElementById("stone1").style.display = "inline-flex";
				document.getElementById("scissor1").style.display = "inline-flex";
			}
			begin();
		},2000);
	}
} 


socket.on("hosted", function(data){
	//console.log("works1");
	document.getElementById("modeButton").style.display = "none";
	document.getElementById("gameId").style.display = "inline-flex";
	document.getElementById("gameId").outerHTML = "<h4 id='gameId' class='display-5 text-center'></h4>";
	document.getElementById("gameId").innerHTML = "game id -  "+ data;
	document.getElementById("waitingMsg").style.display = "inline-flex";
	document.getElementById("waitingMsg").outerHTML = "<h5 id='waitingMsg' class='text-center'> waiting for other player to join...</h5>";
});

function tryJoin(){
	roomId = document.getElementById("enteredId").value;
	console.log(roomId);
	socket.emit("tryJoin", roomId);
}


socket.on("joined", function(){
	console.log("joined");
	document.getElementById("modeButton").style.display = "none";
	$('#exampleModal2').modal('toggle')
	//document.getElementById("join").data-dismiss =  "modal";
	//socket.to('123456').emit('test123');
});

socket.on("notJoined", function(){
	alert("id incorrect !");
	console.log("nah did not join ");
});

socket.on("test123",function(){
	console.log("other player joined");
	document.getElementById("waitingMsg").outerHTML = "<h5 id='waitingMsg' class='text-center'> player joined</h5>";
});
