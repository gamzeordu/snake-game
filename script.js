const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = gridSize, dy = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && dy === 0) { dx = 0; dy = -gridSize; }
    if (key === "ArrowDown" && dy === 0) { dx = 0; dy = gridSize; }
    if (key === "ArrowLeft" && dx === 0) { dx = -gridSize; dy = 0; }
    if (key === "ArrowRight" && dx === 0) { dx = gridSize; dy = 0; }
}

function updateGame() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20) * gridSize;
        food.y = Math.floor(Math.random() * 20) * gridSize;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Oyun Bitti!");
        document.location.reload();
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function gameLoop() {
    updateGame();
    drawGame();
    setTimeout(gameLoop, 100);
}

gameLoop();
