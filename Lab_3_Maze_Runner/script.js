const ctx = myCanvas.getContext("2d");

const WALL_COLOUR = 'blue';
const MAZE_COLS = 20;
const MAZE_ROWS = 15;
const WALL_WIDTH = 40;
const WALL_HEIGHT = 40;
const MAZE_BLOCK_GAP = 2;

//const ball
const ballColour = "yellow";
ballRadius = 10;

var ballX = 70;
var ballY = myCanvas.height - 200;

let ballDX = 3;
let ballDY = 3;

function moveBall() {
    if (rightPressed) {
        ballX += ballDX;
    } else if (leftPressed) {
        ballX -= ballDX;
    } else if (upPressed) {
        ballY -= ballDY;
    } else if (downPressed) {
        bally += ballDY;
    }
}

//Keys 

const KeyUp = 38;
const KeyDown = 40;
const KeyLeft = 37;
const KeyRight = 39;

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;



function drawBall() {

    ctx.fillStyle = ballColour;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.Pi * 2);
    ctx.fill();
    ctx.closePath();

}




let mazeGrid = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1




];

function drawMaze() {
    ctx.fillStyle = WALL_COLOUR;

    for (let r = 0; r < MAZE_ROWS; r++) {
        for (let c = 0; c < MAZE_COLS; c++) {

            let gridIndex = c + (MAZE_COLS * r);

            if (mazeGrid[gridIndex] == 1) {

                let reCTX = WALL_WIDTH * c;
                let rectY = WALL_HEIGHT * r;

                let recW = WALL_WIDTH - MAZE_BLOCK_GAP;
                let recH = WALL_HEIGHT - MAZE_BLOCK_GAP;

                ctx.fillRect(reCTX, rectY, recH, recW);
            }

        }

    }


}


function gameLoop() {

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    drawMaze();
    drawBall();
    moveBall();

    requestAnimationFrame(gameLoop);


}
document.addEventListener('keydown',
    function (event) {
        if (event.keyCode == key.right) {
            rightPressed = true;
        } else if (event.keyCode == key.left) {
            leftPressed = true;
        } else if (event.keyCode == KeyUp) {
            upPressed = true;
        } else if (event.keyCode == key.KeyDown) {
            downPressed = true;

        }
    }, false);
document.addEventListener('keyup',
    function (event) {
        if (event.keyCode == KeyRight) {
            rightPressed = false;
        } else if (event.keyCode == KeyLeft) {
            leftPressed = false;
        } else if (event.keyCode == KeyUp) {
            upPressed = false;
        } else if (event.keyCode == KeyDown) {
            downPressed = false;
        }
    },
    false);
gameLoop();