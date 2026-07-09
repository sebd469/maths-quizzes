// Simple Arkanoid / Breakout game for the browser
// Works on GitHub Pages because it only uses HTML, CSS and JavaScript.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const paddle = {
  width: 120,
  height: 16,
  x: WIDTH / 2 - 60,
  y: HEIGHT - 50,
  speed: 8,
  dx: 0
};

const ball = {
  radius: 9,
  x: WIDTH / 2,
  y: HEIGHT - 75,
  dx: 5,
  dy: -5,
  launched: false
};

const brickSettings = {
  rows: 6,
  cols: 10,
  width: 70,
  height: 24,
  gap: 8,
  top: 70
};

const brickColours = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7"
];

let bricks = [];
let score = 0;
let lives = 3;
let gameOver = false;
let won = false;

function createBricks() {
  bricks = [];

  const totalWidth =
    brickSettings.cols * brickSettings.width +
    (brickSettings.cols - 1) * brickSettings.gap;

  const startX = (WIDTH - totalWidth) / 2;

  for (let row = 0; row < brickSettings.rows; row++) {
    for (let col = 0; col < brickSettings.cols; col++) {
      bricks.push({
        x: startX + col * (brickSettings.width + brickSettings.gap),
        y: brickSettings.top + row * (brickSettings.height + brickSettings.gap),
        width: brickSettings.width,
        height: brickSettings.height,
        colour: brickColours[row % brickColours.length],
        visible: true
      });
    }
  }
}

function resetGame() {
  paddle.x = WIDTH / 2 - paddle.width / 2;
  paddle.y = HEIGHT - 50;
  paddle.dx = 0;

  ball.x = WIDTH / 2;
  ball.y = HEIGHT - 75;
  ball.dx = Math.random() < 0.5 ? -5 : 5;
  ball.dy = -5;
  ball.launched = false;

  score = 0;
  lives = 3;
  gameOver = false;
  won = false;

  createBricks();
}

function drawBackground() {
  ctx.fillStyle = "#050816";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawPaddle() {
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, paddle.x, paddle.y, paddle.width, paddle.height, 8);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  bricks.forEach((brick) => {
    if (brick.visible) {
      ctx.fillStyle = brick.colour;
      roundRect(ctx, brick.x, brick.y, brick.width, brick.height, 5);
    }
  });
}

function drawText() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 20, 35);
  ctx.fillText(`Lives: ${lives}`, WIDTH - 120, 35);

  if (!ball.launched && !gameOver && !won) {
    drawCentreText("Press SPACE to launch", 30, "#9ca3af", HEIGHT / 2);
  }

  if (gameOver) {
    drawCentreText("GAME OVER", 52, "#ef4444", HEIGHT / 2 - 35);
    drawCentreText("Press SPACE to restart", 28, "#ffffff", HEIGHT / 2 + 25);
  }

  if (won) {
    drawCentreText("YOU WIN!", 52, "#22c55e", HEIGHT / 2 - 35);
    drawCentreText("Press SPACE to play again", 28, "#ffffff", HEIGHT / 2 + 25);
  }
}

function drawCentreText(text, size, colour, y) {
  ctx.fillStyle = colour;
  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(text, WIDTH / 2, y);
  ctx.textAlign = "left";
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function movePaddle() {
  if (gameOver || won) return;

  paddle.x += paddle.dx;

  if (paddle.x < 0) {
    paddle.x = 0;
  }

  if (paddle.x + paddle.width > WIDTH) {
    paddle.x = WIDTH - paddle.width;
  }
}

function keepBallOnPaddle() {
  if (!ball.launched) {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = paddle.y - ball.radius - 5;
  }
}

function moveBall() {
  if (!ball.launched || gameOver || won) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > WIDTH) {
    ball.dx *= -1;
  }

  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height &&
    ball.dy > 0
  ) {
    ball.dy *= -1;

    const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
    ball.dx = hitPosition * 7;

    if (Math.abs(ball.dx) < 1) {
      ball.dx = ball.dx < 0 ? -2 : 2;
    }
  }

  // Brick collision
  bricks.forEach((brick) => {
    if (
      brick.visible &&
      ball.x + ball.radius > brick.x &&
      ball.x - ball.radius < brick.x + brick.width &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + brick.height
    ) {
      brick.visible = false;
      score += 10;
      ball.dy *= -1;
    }
  });

  if (ball.y - ball.radius > HEIGHT) {
    lives--;

    if (lives <= 0) {
      gameOver = true;
    } else {
      ball.launched = false;
      ball.dx = Math.random() < 0.5 ? -5 : 5;
      ball.dy = -5;
    }
  }

  const remainingBricks = bricks.filter((brick) => brick.visible).length;

  if (remainingBricks === 0) {
    won = true;
  }
}

function update() {
  drawBackground();

  movePaddle();
  keepBallOnPaddle();
  moveBall();

  drawBricks();
  drawPaddle();
  drawBall();
  drawText();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    paddle.dx = -paddle.speed;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    paddle.dx = paddle.speed;
  }

  if (event.code === "Space") {
    if (gameOver || won) {
      resetGame();
    } else {
      ball.launched = true;
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key.toLowerCase() === "a" ||
    event.key.toLowerCase() === "d"
  ) {
    paddle.dx = 0;
  }
});

resetGame();
update();
