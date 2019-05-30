// Setting up the canvas
const $canvas = document.getElementById("cnvs");
$canvas.width = window.innerWidth
$canvas.height = window.innerHeight -5

const context = $canvas.getContext('2d')

context.fillStyle='#fff';

// Declaring global variables
const stickWidth = 20, speed = 5, ballSpeed = 5;
let ballX = window.innerWidth / 2, ballY = window.innerHeight / 2, dx = ballSpeed, dy = -(ballSpeed);

const isW = window.innerWidth - stickWidth, goals = [0,0]; // isW -> inner stick Width

// Setting up a Player class
class Player {
    constructor (x, y) {
        this.up = false
        this.down = false
        this.x = x
        this.y = y
    }
}

// Initializing two players
let player1 = new Player(0,0), player2 = new Player(isW,0);

const drawBall = () => {
    context.strokeStyle='#fff';
    context.beginPath();
    context.arc(ballX, ballY, 20, 0, Math.PI * 2);
    context.fill();
    context.stroke();
}

const updateGoals = (p1,p2) => {
    goals[0] += p1;
    goals[1] += p2;
    document.querySelector("#goals").innerHTML = goals[0] + " : " + goals[1] // display goals

    // Check for win
    if(goals[0] >= 5) {
        alert("Player 1 has won!")
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
        goals[0] = 0; goals[1] = 0;
    } else if (goals[1] >= 5) {
        alert("Player 2 has won!")
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
        goals[0] = 0; goals[1] = 0;
    }

}

const moveBall = () => {
    if(ballX + dx > $canvas.width-20 || ballX + dx < 20) dx = -dx;
    if(ballY + dy > $canvas.height-20 || ballY + dy < 20) dy = -dy;

    //check if Player 1 lost
    if(ballX === 20 && player1.y < ballY && player1.y + 200 > ballY) {dy = -(dy+2)}
    else if(ballX !== 20) {}
    else {
        updateGoals(0,1)
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
    }

    //check if Player 2 lost
    if(ballX === $canvas.width-20 && player2.y < ballY && player2.y + 200 > ballY) {dy = -(dy)}
    else if(ballX !== $canvas.width-20) {}
    else {
        updateGoals(1,0)
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
    }

    ballX += dx
    ballY += dy
    drawBall()
}

const drawPlayer = () => {
    context.fillRect(player1.x, player1.y, stickWidth, 200); // drawing Player 1
    context.fillRect(player2.x, player2.y, stickWidth, 200); // drawing Player 2
}

const movePlayer = () => {
    if(player1.down) player1.y += speed;
    if(player1.up) player1.y -= speed;
    if(player2.down) player2.y += speed;
    if(player2.up) player2.y -= speed;
    drawPlayer()
}

// check for pressed keys
onkeydown = (evt) => {
    switch (evt.key) {
        case 's':
            player1.down = true
            break;
        case 'w':
            player1.up = true
            break;
        case 'ArrowDown':
            player2.down = true
            break;
        case 'ArrowUp':
            player2.up = true
            break;
        default:
            break;
    }
}

// stop moving player if key up
onkeyup = (evt) => {
    console.log(evt)
    switch (evt.key) {
        case 's':
            player1.down = false
            break;
        case 'w':
            player1.up = false
            break;
        case 'ArrowDown':
            player2.down = false
            break;
        case 'ArrowUp':
            player2.up = false
            break;
        default:
            break;
    }
}

// animate and start the game
setInterval(() => {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
    movePlayer()
    moveBall()
}, 10)