var myRunner;
var myRunnerPic;
var myWinner;
var myWinnerPic;
var mySky;
var myStart;
var myWin;
var x;
var y;
var maxX;
var maxY;
var won;
var screenW;
var screenH;
var minWidth;
var startTime;
var endTime;
var myRRunnerPics;
var myLRunnerPics;
var index;
var intervalID = null;
var vIntervalID;
var myButtons;
var vomiting;
var tID;

var startButton = document.getElementById("startButton");
var replayButton = document.getElementById("replayButton");
var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");

var leftBtnRect = leftButton.getBoundingClientRect();
var rightBtnRect = rightButton.getBoundingClientRect();


function init () {
	minWidth = 640;
	screenW = document.body.clientWidth;	
	won = "starting";
	myRunner = document.getElementById('runner').style;
	myRunnerPic = document.getElementById('runnerPic');
	myWinner = document.getElementById('winner').style;
	myWinnerPic = document.getElementById('winnerPic');
	mySky = document.getElementById('sky').style;
	myStart = document.getElementById('startScreen').style;
	myWin = document.getElementById('winScreen').style;
	myButtons = document.getElementById('buttonBox').style;
	myRRunnerPics = new Array();
	myLRunnerPics = new Array();
	myRRunnerPics[0] = "runner-r1.png";
	myRRunnerPics[1] = "runner-r3.png";
	myLRunnerPics[0] = "runner-l1.png";
	myLRunnerPics[1] = "runner-l3.png";
	var runnerl1 = document.createElement("img");
	runnerl1.setAttribute("src", "runner-l1.png");
	runnerl1.setAttribute("alt", "Runner");
	var runnerl2 = document.createElement("img");
	runnerl2.setAttribute("src", "runner-l3.png");
	runnerl2.setAttribute("alt", "Runner");
	var runnerr1 = document.createElement("img");
	runnerr1.setAttribute("src", "runner-r1.png");
	runnerr1.setAttribute("alt", "Runner");
	var runnerr2 = document.createElement("img");
	runnerr2.setAttribute("src", "runner-r3.png");
	runnerr2.setAttribute("alt", "Runner");

	index = 0;

	myVRunnerPics = new Array();
	myVRunnerPics[0] = "runner-v1.png";
	myVRunnerPics[1] = "runner-v2.png";
	myVRunnerPics[2] = "runner-v3.png";
	myVRunnerPics[3] = "runner-v4.png";
	myVRunnerPics[4] = "runner-v5.png";
	myVRunnerPics[5] = "runner-v6.png";
	myVRunnerPics[6] = "runner-v7.png";
	myVRunnerPics[7] = "runner-v8.png";
	myVRunnerPics[8] = "runner-v9.png";
	for (var i =0; i<myVRunnerPics.length; i++) {
		var newPic = document.createElement("img");
		newPic.setAttribute("src", myVRunnerPics[i]);
		newPic.setAttribute("alt", "Blargh!");
	}
	
	myRunner.color = "black";
	myRunner.background = "none";
	myRunner.position = "absolute";
	myRunner.height = "50px";
	myRunner.width = "50px";
	myRunner.display = "block";

	myWinner.color = "black";
	myWinner.background = "none";
	myWinner.position = "absolute";
	myWinner.height = "50px";
	myWinner.width = "50px";
	myWinner.display = "none";
	
	myStart.display = "block";
	myStart.border = "thin solid black";
	myStart.width = parseInt(screenW - 200) + "px";
	document.startButtonForm.startButton.focus();
	//alert ("The object of the game is to fly to the other end of the sky. " + myStart.width);
	
}
function startGame () {
	screenH = document.body.clientHeight;
	screenW = document.body.clientWidth;
	clearInterval(intervalID);
	clearInterval(vIntervalID);
	myWin.width = parseInt(screenW - 400) + "px";
	won = "notyet";
	mySky.width = parseInt(screenW - 200) + "px";
	maxX = (screenW - 200 - 58);
	maxY = 190;
	x = 1;
	y = maxY;
	setPos (x, y, myRunner);
	//alert ("setting position for myWinner.  x: " + x + ", y: " + y + ".");
	setPos (maxX, y, myWinner);
	//setTimeout('myRunnerPic.src = myRRunnerPics[0]', 1000);
	myStart.display = "none";
	mySky.display = "block";
	myRunner.display = "block";
	myWinner.display = "none";
	myWin.display = "none";
	myButtons.display = "block";
	startTime = new Date ();
	intervalID = null;

}
function restartGame () {
	myWinner.display = "none";
	clearInterval(vIntervalID);
	startGame();
	myRunnerPic.src = myRRunnerPics[0];
}
function setPos (x, y, ref) {
	ref.left = x + "px";
	ref.top = y + "px";
}

function checkKey (e) {
	if (won == "notyet") {
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		switch(KeyID) { 
			case 37:
				runLeft (e);
				break;
			case 39:
				runRight (e);
				break;
			case 13:
			case 32:
				if (e.target == leftButton) {
					runLeft(e);
				} else if (e.target == rightButton) {
					runRight(e);
				}
				break;
			//default:
			//	console.log ("pressed " + KeyID);
		}
	}
}
function goRight () {
	if (x < maxX && won == "notyet") {
		x = x + 5;
		index++;
		index = (index % 2);
		if (x >= maxX) x = maxX;
		setPos (x, y, myRunner);
		myRunnerPic.src = myRRunnerPics[index];
	}
	if (x == maxX) {
		stopRunning();
		youWin();
	}
}

function goLeft () {
	if (x > 0 && won == "notyet") {
		x = x - 5;
		index++;
		index = (index % 2);
		if (x < 0) x = 0;
		setPos (x, y, myRunner);
		myRunnerPic.src = myLRunnerPics[index];

	}

}
function runLeft (e) {
	e.preventDefault();
	if (intervalID === null) {
		intervalID = setInterval('goLeft()', 50);
	}
}
function runRight (e) {
	e.preventDefault();
	if (intervalID === null) {
		intervalID = setInterval('goRight()', 50);
	}
}
function stopRunning () {
	clearInterval(intervalID);
	intervalID = null;
}
function youWin () {
	clearInterval(intervalID);
	won = "yup";
	endTime = new Date ();
	myRunner.display = "none";
	myWinner.display = "block";
	var timeE = Math.round((endTime.getTime() - startTime.getTime())/1000);
	document.getElementById('winScreenText').innerHTML = "You win!  Your score was " + timeE  + " seconds.<br>Would you like to play again?";
	vIntervalID = setInterval('showVomit ()', 1000);
	myWin.display = "block";
	document.replayButtonForm.replayButton.focus();
}
function showVomit () {
	tID = new Array();
	for (index = 0; index < 9 && won == "yup"; index++) {
		setTimeout ('myWinnerPic.src = myVRunnerPics[' + index + ']', index * 60);
	}
}

function handleMove (e) {
	console.log ("Handling move: " + e.target.id + ".");
	console.log ("Handling move: x: " + e.changedTouches[0].pageX + ", y: " + e.changedTouches[0].pageY + ".");
	let x = leftBtnRect.left; //e.target.offsetLeft;
	let rect = e.target.getBoundingClientRect();
	//console.log ("Handling move target (x): " + x +"px");
	console.log ("Handling move rect.left: " + rect.left +"px to rect.right: " + rect.right + "px");
	console.log ("Width: " + rect.width + "px");


	if (e.changedTouches[0].pageX < rect.left || e.changedTouches[0].pageX > rect.right || e.changedTouches[0].pageY < rect.top || e.changedTouches[0].pageY > rect.bottom) stopRunning(e);
} // End of handleMove

window.addEventListener("keydown", checkKey, false);
window.addEventListener("keyup", stopRunning, false);
startButton.addEventListener("click", startGame, false);
replayButton.addEventListener("click", startGame, false);
leftButton.addEventListener("mousedown", runLeft, false);
leftButton.addEventListener("touchstart", runLeft, false);
rightButton.addEventListener("mousedown", runRight, false);
rightButton.addEventListener("touchstart", runRight, false);
leftButton.addEventListener("mouseup", stopRunning, false);
leftButton.addEventListener("touchend", stopRunning, false);
leftButton.addEventListener("touchcancel", stopRunning, false);
rightButton.addEventListener("mouseup", stopRunning, false);
rightButton.addEventListener("touchend", stopRunning, false);
rightButton.addEventListener("touchcancel", stopRunning, false);

leftButton.addEventListener("touchmove", handleMove, false);
rightButton.addEventListener("touchmove", handleMove, false);

init();
