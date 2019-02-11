const ctx = myCanvas.getContext("2d");

const WALL_COLOUR = 'blue';
const MAZE_COLS = 20;
const MAZE_ROWS = 15;
const MAZE_WALL_WIDTH = 40;
const MAZE_WALL_HEIGHT = 40;
const MAZE_PATH_WIDTH = 2;


//const ball
const BALL_COLOUR = 'yellow';
const BALL_RADIUS = 10;

let ballX = 70;
let ballY = myCanvas.height - 200;

let ballDX = 3;
let ballDY = 3;

//Keys 

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;


let MOVE_UP = false;
let MOVE_DOWN = false;
let MOVE_RIGHT = false;
let MOVE_LEFT = false;

let mazeGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
    // Rows
    for (let r = 0; r < MAZE_ROWS; r++) {
        // Cols
        for (let c = 0; c < MAZE_COLS; c++) {

            // Calculate array position
            let gridIndex = c + MAZE_COLS * r;

            // Draw a block if array value is 1
            if (mazeGrid[gridIndex] == 1) {
                let rectX = MAZE_WALL_WIDTH * c;
                let rectY = MAZE_WALL_HEIGHT * r;
                let rectW = MAZE_WALL_WIDTH - MAZE_PATH_WIDTH;
                let rectH = MAZE_WALL_HEIGHT - MAZE_PATH_WIDTH;

                ctx.fillRect(rectX, rectY, rectW, rectH);
            } // end if
        } // end col
    } // end row

}

function drawBall() {
    ctx.fillStyle = BALL_COLOUR;
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}



function moveBall() {
    if (MOVE_RIGHT && !testCollision(ballX + ballDX + BALL_RADIUS, ballY)) {
        ballX += ballDX;
    } else if (MOVE_LEFT && !testCollision(ballX - ballDX - BALL_RADIUS, ballY)) {
        ballX -= ballDX;
    } else if (MOVE_UP && !testCollision(ballX, ballY - ballDY - BALL_RADIUS)) {
        ballY -= ballDY;
    } else if (MOVE_DOWN && !testCollision(ballX - ballDX, ballY + ballDY + BALL_RADIUS)) {
        ballY += ballDY;
    }
}

// find array posity for row + col
function convertToGrid(col, row) {
    return col + MAZE_COLS * row;
}

function testCollision(ballX, ballY) {

    // Get col and row in grid
    let ballCol = Math.floor(ballX / MAZE_WALL_WIDTH);
    let ballRow = Math.floor(ballY / MAZE_WALL_HEIGHT);

    // Get array index
    let index = convertToGrid(ballCol, ballRow);

    // test if collision
    if (mazeGrid[index] == 1) {
        return true;
    } else {
        return false;
    }
}
// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    drawMaze();
    drawBall();
    moveBall();

    // speed the animation of the game according to the device speed
    // Better alternative to setInterval()
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimationFrame(gameLoop);
}

// Start the game

document.addEventListener('keydown',
    function (event) {
        if (event.keyCode == KEY_RIGHT) {
            MOVE_RIGHT = true;
        } else if (event.keyCode == KEY_LEFT) {
            MOVE_LEFT = true;
        } else if (event.keyCode == KEY_UP) {
            MOVE_UP = true;
        } else if (event.keyCode == KEY_DOWN) {
            MOVE_DOWN = true;
        }
    }, false);

document.addEventListener('keyup',
    function (event) {
        if (event.keyCode == KEY_RIGHT) {
            MOVE_RIGHT = false;
        } else if (event.keyCode == KEY_LEFT) {
            MOVE_LEFT = false;
        } else if (event.keyCode == KEY_UP) {
            MOVE_UP = false;
        } else if (event.keyCode == KEY_DOWN) {
            MOVE_DOWN = false;
        }
    }, false);

gameLoop();