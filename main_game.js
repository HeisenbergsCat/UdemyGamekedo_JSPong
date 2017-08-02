var canvas;
var canvasContext;
var testBall = new Ball(10);
var leftPaddle = new Paddle("left", 100, 10);
var rightPaddle = new Paddle("right", 100, 10);
var mainGameState = new GameState();

var isMouseDown = false;

const WINNING_SCORE = 3;

//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

//ON MOUSECLICK
function continueGame(evt) {
    if (isMouseDown && mainGameState.showingWinScreen) {
        mainGameState.scoreReset();
        mainGameState.showingWinScreen = false;
    }
}

function mouseDownTest(evt) {
    isMouseDown = true;
}

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(canvas.width / 2, i, 5, 5);
    }
}

window.onload = function() {

    // CANVAS SETUP
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    //GAME OBJECT INITAL SETUP
    rightPaddle.setPaddles();
    leftPaddle.setPaddles();
    testBall.setup();

    // INPUT HANDLING
    canvas.addEventListener('mousedown', mouseDownTest);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            leftPaddle.positionY = mousePos.y - (leftPaddle.length / 2);
        });
}

//MAIN DRAWING LOOP
function drawFrame() {

    continueGame();
    drawBackground();

    if (!mainGameState.showingWinScreen) {
        updateMovement();
        drawObjects();
        mainGameState.printScores();
    } else {
        mainGameState.printWinMessage();
    }

}

function drawObjects() {

    drawNet();
    testBall.drawBall();
    leftPaddle.drawPaddle();
    rightPaddle.drawPaddle();
}

function updateMovement() {

    if (!mainGameState.showingWinScreen) {
        //checks if the ball is colliding with the edges of the screen
        testBall.boundsCheck();

        //switches the collision objct based on the movement direction ofthe ball
        //checks if the ball collides with a paddle
        if (testBall.speedX > 0) {
            testBall.collisionCheckR(rightPaddle);
        } else {
            testBall.collisionCheckL(leftPaddle);
        }

        //updates position of the ball
        testBall.updatePosition();

        //gives the controll over the right paddle to ai
        rightPaddle.aiPaddleMovement();
    }

}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}