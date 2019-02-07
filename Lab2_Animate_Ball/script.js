const ctx = myCanvas.getContext("2d");
//Ball Radius
const BALL_RADIUS = 10;

//Paddle 
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_DX = 5;
const PADDLE_DY = 5;
//Paddle Keys to Move Left and Right
const KEY_LEFT = 39;
const KEY_RIGHT = 37;

//Track Key Press
let moveRight = false;
let moveLeft = false;

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 20;
var brickOffSetTop = 25;
var brickOffSetLeft = 20;

//
var score = 0;

var bricks = [];

for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0
        };
    }

}

//Listen for Key down
document.addEventListener('keydown', function (e) {
    if (e.keyCode == KEY_LEFT) {
        moveRight = true;
    } else if (e.keyCode == KEY_RIGHT) {
        moveLeft = true;
    }
}, false);

//Listen for key up event
document.addEventListener('keyup', function (e) {
    if (e.keyCode == KEY_LEFT) {
        moveRight = false;
    } else if (e.keyCode == KEY_RIGHT) {
        moveLeft = false;
    }
}, false);

//Ball Attributes
ctx.lineWidth = 4;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'blue';

//Positioning Ball on Canvas 
let x = myCanvas.width / 2;
let y = myCanvas.height - (BALL_RADIUS * 2);

//Positioning Paddle On Canvas
let paddleX = (myCanvas.width - PADDLE_WIDTH) / 2;
let paddleY = (myCanvas.height - PADDLE_HEIGHT) / 2;

let dx = 10;
let dy = 10;

//Draw Ball
function drawBall(cx, cy) {
    ctx.beginPath();
    ctx.arc(cy, cx, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

//function Score
function drawScore() {
    cyx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score : " + score, 8, 20);

}

//Draw Paddle
function drawPaddle() {
    ctx.fillRect(paddleX, myCanvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brickX = (c * (brickWidth + brickPadding)) + brickOffSetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffSetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fill();
            ctx.closePath()


        }

    }

}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (x > b.x && x < b.x + brickWidth && y > b.y && b < b.y + brickHeight) {
                dy = -dy;
                score++;
            }
        }
    }

}

//Updates the Position of the Ball on Canvas 
function update() {

    ctx.clearRect(0, 0, myCanvas.height, myCanvas.width);

    drawBall(x, y);
    drawPaddle();
    drawBricks();
   



    //Move Paddle
    if (moveRight && paddleX < myCanvas.width - PADDLE_WIDTH) {
        paddleX += PADDLE_DX;
    } else if (moveLeft && paddleX > 0) {
        paddleX -= PADDLE_DX;
    }
    // if (x + dx > paddleX && x + dx < paddleX + PADDLE_WIDTH - myCanvas.Width) {
    //     dx = -dx;
    // } else if (y + dy < BALL_RADIUS) {
    //     dy = -dy;
    // } else if (y + dy > ctx.height - BALL_RADIUS) {
    //     if (x > paddleX && x < paddleX + PADDLE_WIDTH)
    //         dy = -dy;
    // } else {
    //     //alert('GAME OVER');
    //     //document.location.reload();
    // }
    
    // Left and right walls
    if (x + dx > myCanvas.width - BALL_RADIUS || x + dx < BALL_RADIUS)
        dx = -dx;

    // Top
    if (y + dy < BALL_RADIUS) {
        dy = -dy;
    }
    // Bottom
    else if (y + dy > myCanvas.height - BALL_RADIUS) {

        // Hit paddle
        if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
            dy = -dy;
        }
        // Game Over
        else if (y + dy > myCanvas.height) {
            //alert('Game Over');
            //document.location.reload();  
        }
    }








   
    //collisionDetection();

    x += dx;
    y += dy;
    requestAnimationFrame(update);
    //drawScore();
}

//Calls update function
update();