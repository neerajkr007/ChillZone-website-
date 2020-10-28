var board;
const player1 = "o";
const player2 = "x";
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');

function gamemodechosen(){
	document.getElementById("modeButton").style.display = "none";
	startGame();

}


function startGame() {
	document.getElementById("playagain").style.display = "none";
	document.getElementById("board").style.display = "flex";
	document.querySelector(".endgame").style.display = "none";
	board = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof board[square.target.id] == 'number') {
		turn(square.target.id, player1)
		if (!checkTie()) turn(bestSpot(), player2);
	}
}

function turn(squareId, player) {
	board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(board, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board1, player) {
	let plays = board1.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == player1 ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == player1 ? "You win !" : "You lose !",gameWon.player);
}

function declareWinner(who, player) {
	document.querySelector(".endgame").style.display = "block";
	//document.querySelector(".endgame .text").innerText = who;
	if(player == player1){
		document.getElementById("youlost").style.display = "none";
		document.getElementById("youwin").style.display = "block";
		document.getElementById("youwin").innerText = who;
		document.getElementById("playagain").style.display = "block";
	}
	else{
		document.getElementById("youwin").style.display = "none";
		document.getElementById("youlost").style.display = "block";
		document.getElementById("youlost").innerText = who;
		document.getElementById("playagain").style.display = "block";
	}
}

function emptySquares() {
	return board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}