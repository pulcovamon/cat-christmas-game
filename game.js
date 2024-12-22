/**
 * Initialization
 */

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const background = document.getElementById("background");

background.addEventListener("load", () => {
  backgroundCtx.drawImage(background, 0, 0, 1500, 750);
});

const platformCanvas = document.getElementById("platformCanvas");
const platformCtx = platformCanvas.getContext("2d");
const platformImages = document.getElementById("platforms");

const platforms = [
  { x: 100, y: 325, width: 32, height: 9, tileX: 0, tileY: 7 },
  { x: 325, y: 450, width: 32, height: 16, tileX: 48, tileY: 192 },
  { x: 325, y: 200, width: 32, height: 9, tileX: 0, tileY: 7 },
  { x: 650, y: 450, width: 32, height: 9, tileX: 48, tileY: 7 },
  { x: 1000, y: 325, width: 48, height: 48, tileX: 96, tileY: 272 },
  { x: 500, y: 150, width: 48, height: 32, tileX: 48, tileY: 128 },
  { x: 800, y: 350, width: 32, height: 16, tileX: 48, tileY: 112 },
  { x: 1225, y: 225, width: 32, height: 16, tileX: 0, tileY: 192 },
  { x: 1025, y: 100, width: 32, height: 9, tileX: 0, tileY: 7 },
];

const itemsCanvas = document.getElementById("itemsCanvas");
const itemsCtx = itemsCanvas.getContext("2d");

const items = document.getElementsByClassName("items");

function getRandomItem() {
  let index = Math.floor(Math.random() * items.length);
  return items[index];
}

let actualItems = [];

function initializeItems() {
  actualItems = [];
  for (const platform of platforms) {
    let item = getRandomItem();
    actualItems.push({
      img: item,
      x: platform.x + (platform.width * 3) / 2 - 24,
      y: platform.y - 60,
    });
  }
}

function rerenderItems() {
  itemsCtx.clearRect(0, 0, itemsCanvas.width, itemsCanvas.height);
  for (let item of actualItems) {
    itemsCtx.drawImage(item.img, item.x, item.y, 48, 48);
  }
}

platformImages.addEventListener("load", () => {
  for (const platform of platforms) {
    platformCtx.drawImage(
      platformImages,
      platform.tileX,
      platform.tileY,
      platform.width,
      platform.height,
      platform.x,
      platform.y,
      platform.width * 3,
      platform.height * 3
    );
  }
});

let groundPlatform = document.getElementById("winter-ground");
groundPlatform.addEventListener("load", () => {
  for (let i = 0; i < 1500; i++) {
    console.log(i % groundPlatform.width*3);
    if (i % groundPlatform.width*3 === 0) {
      platformCtx.drawImage(
        groundPlatform,
        i,
        700,
        groundPlatform.width*3,
        groundPlatform.height*3
      );
    }
  };
})

/**
 * Game initialization
 */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const characterIdle = document.getElementById("character-idle");
const characterWalking = document.getElementById("character-walking");

const SCALE = 3;
const GROUND = 700;
const GRAVITY = 0.1;
const JUMP_STRENGTH = -8;
const PLAYER_SPEED = 2;
const FRAME_WIDTH = 48;
const FRAME_HEIGHT = 48;

let SCORE;
let gameRunning;
let time;
let lastTime;
let keys = {};

const player = {
  x: 120,
  y: GROUND,
  width: FRAME_WIDTH * SCALE,
  height: FRAME_HEIGHT * SCALE,
  dx: 0,
  dy: 0,
  onGround: true,
};

function setInitialState() {
  initializeItems();

  SCORE = 0;
  gameRunning = true;
  time = 0;
  lastTime = 0;
  keys = {};

  player.x = 120;
  player.y = GROUND;
  player.dx = 0;
  player.dy = 0;
  player.onGround = true;
}

setInitialState();

for (let item of actualItems) {
  item.img.addEventListener("load", () => {
    itemsCtx.drawImage(item.img, item.x, item.y, 48, 48);
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
  }

  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

/**
 * Game loop
 */

function update() {
  if (keys["ArrowRight"]) {
    player.dx = PLAYER_SPEED;
    player.facingLeft = false;
  } else if (keys["ArrowLeft"]) {
    player.dx = -PLAYER_SPEED;
    player.facingLeft = true;
  } else player.dx = 0;

  if (keys["Space"] && player.onGround) {
    player.dy = JUMP_STRENGTH;
    player.onGround = false;
  }

  player.dy += GRAVITY;
  player.x += player.dx;
  player.y += player.dy;

  if (player.y + player.height > GROUND) {
    player.y = GROUND - player.height;
    player.dy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }

  for (const platform of platforms) {
    const platformTop = platform.y;
    const platformLeft = platform.x;
    const platformRight = platform.x + platform.width * SCALE;

    if (
      player.x + (FRAME_WIDTH * 3) / 2 > platformLeft &&
      player.x + (FRAME_WIDTH * 3) / 2 < platformRight &&
      player.y + player.height > platformTop &&
      player.y + player.height - player.dy <= platformTop
    ) {
      player.y = platformTop - player.height;
      player.dy = 0;
      player.onGround = true;

      actualItems.forEach((item, index) => {
        const itemWidth = 48;
        const itemHeight = 48;

        const isHorizontalColliding =
          player.x + player.width > item.x && player.x < item.x + itemWidth;
        const isColliding =
          isHorizontalColliding &&
          player.y < item.y + itemHeight &&
          player.y + player.height > item.y;
        if (isColliding) {
          SCORE++;
          actualItems.splice(index, 1);
          rerenderItems();
        }
      });
    }
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width)
    player.x = canvas.width - player.width;
  if (player.y > canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
  }
}

/**
 * Drawing
 */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let character = player.dx == 0 ? characterIdle : characterWalking;
  let isFacingLeft = player.dx < 0 || (player.dx === 0 && player.facingLeft);

  if (isFacingLeft) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(
      character,
      FRAME * FRAME_WIDTH,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      -player.x - FRAME_WIDTH * SCALE,
      player.y,
      FRAME_WIDTH * SCALE,
      FRAME_HEIGHT * SCALE
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      character,
      FRAME * FRAME_WIDTH,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      player.x,
      player.y,
      FRAME_WIDTH * SCALE,
      FRAME_HEIGHT * SCALE
    );
  }
}

/**
 * Winning
 */

function displayWinMessage() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.fillText("You Won!", canvas.width / 2, canvas.height / 2);
}

function checkWinCondition() {
  if (actualItems.length === 0) {
    gameRunning = false;
    displayWinMessage();
  }
}

/**
 * Running game
 */

function updateStats() {
  let currentTime = Date.now();
  if (currentTime - lastTime >= 1000) {
    time++;
    lastTime = currentTime;
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${SCORE}`;
  document.getElementById("timeDisplay").innerText = `Time: ${time}`;
}

let lastFrameTime = 0;
const FRAME_DELAY = 100;
let FRAME = 0;

function gameLoop(timestamp) {
  if (!gameRunning) return;
  update();
  draw();
  updateStats();
  checkWinCondition();

  if (timestamp - lastFrameTime > FRAME_DELAY) {
    FRAME = (FRAME + 1) % 4;
    lastFrameTime = timestamp;
  }

  requestAnimationFrame(gameLoop);
}

/**
 * Restart
 */

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function restartGame() {
  gameRunning = false;
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "block";
  delay(1000).then(() => {
    document.getElementById("restartButton").blur();
    setInitialState();
    rerenderItems();
    updateStats();
    loadingOverlay.style.display = "none";
    cancelAnimationFrame(gameLoop);
    requestAnimationFrame(gameLoop);
    gameLoop();
  });
}

document.getElementById("restartButton").addEventListener("click", restartGame);

/**
 * Run game loop
 */

requestAnimationFrame(gameLoop);
gameLoop();
