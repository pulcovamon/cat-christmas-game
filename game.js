/**
 * Loading
 */

loading = document.getElementById("loadingOverlay");
loading.style.display = "flex";

window.addEventListener("load", () => {
  const images = document.querySelectorAll("img");
  let loadedImages = 0;

  function onImageLoad() {
    loadedImages++;
    if (loadedImages === images.length) {
      loading.style.display = "none";
    }
  }

  images.forEach((img) => {
    if (img.complete) {
      onImageLoad();
    } else {
      img.addEventListener("load", onImageLoad);
      img.addEventListener("error", () => {
        console.error(`Obrázek ${img.src} se nepodařilo načíst.`);
        onImageLoad();
      });
    }
  });
});


/**
 * Initialization
 */

const RED = "#e63946";

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const background = document.getElementById("background");

const platformCanvas = document.getElementById("platformCanvas");
const platformCtx = platformCanvas.getContext("2d");
const platformImages = document.getElementById("platforms");

const platformSets = [
  [
    { x: 10, y: 200, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 180, y: 550, width: 32, height: 16, tileX: 48, tileY: 192 },
    { x: 325, y: 220, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 650, y: 450, width: 32, height: 9, tileX: 48, tileY: 7 },
    { x: 1200, y: 325, width: 48, height: 48, tileX: 96, tileY: 272 },
    { x: 500, y: 150, width: 48, height: 32, tileX: 48, tileY: 128 },
    { x: 800, y: 350, width: 32, height: 16, tileX: 48, tileY: 112 },
    { x: 1400, y: 225, width: 32, height: 16, tileX: 0, tileY: 192 },
    { x: 1050, y: 120, width: 48, height: 9, tileX: 0, tileY: 7 },
    { x: 1000, y: 520, width: 48, height: 16, tileX: 0, tileY: 112 },
    { x: 350, y: 433, width: 48, height: 9, tileX: 0, tileY: 256 },
    { x: 40, y: 350, width: 32, height: 32, tileX: 48, tileY: 128 }
  ],
  [
    { x: 885, y: 286, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 1168, y: 364, width: 32, height: 16, tileX: 48, tileY: 192 },
    { x: 500, y: 150, width: 48, height: 9, tileX: 0, tileY: 7 },
    { x: 1300, y: 221, width: 48, height: 9, tileX: 48, tileY: 7 },
    { x: 350 , y: 500, width: 48, height: 48, tileX: 96, tileY: 272 },
    { x: 618, y: 383, width: 48, height: 32, tileX: 48, tileY: 208 },
    { x: 995, y: 476, width: 32, height: 16, tileX: 48, tileY: 112 },
    { x: 300, y: 179, width: 32, height: 16, tileX: 0, tileY: 192 },
    { x: 80, y: 433, width: 48, height: 9, tileX: 0, tileY: 256 },
    { x: 1000, y: 120, width: 48, height: 9, tileX: 96, tileY: 256 },
    { x: 1300, y: 520, width: 32, height: 16, tileX: 0, tileY: 112 },
    { x: 50 , y: 250, width: 32, height: 16, tileX: 144, tileY: 272 }
  ],
  [
    { x: 5, y: 199, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 597, y: 450, width: 48, height: 16, tileX: 48, tileY: 192 },
    { x: 249, y: 259, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 820, y: 357, width: 32, height: 9, tileX: 48, tileY: 7 },
    { x: 1350, y: 138, width: 48, height: 48, tileX: 96, tileY: 272 },
    { x: 1167, y: 250, width: 48, height: 32, tileX: 48, tileY: 128 },
    { x: 132, y: 388, width: 32, height: 16, tileX: 48, tileY: 112 },
    { x: 18, y: 510, width: 32, height: 16, tileX: 0, tileY: 192 },
    { x: 915, y: 241, width: 32, height: 9, tileX: 0, tileY: 7 },
    { x: 450, y: 200, width: 48, height: 32, tileX: 48, tileY: 288 },
    { x: 1100, y: 520, width: 80, height: 9, tileX: 0, tileY: 256 },
    { x: 400, y: 400, width: 32, height: 32, tileX: 48, tileY: 128 }
  ]  
];

const itemsCanvas = document.getElementById("itemsCanvas");
const itemsCtx = itemsCanvas.getContext("2d");
itemsCtx.shadowBlur = 20;
itemsCtx.shadowColor = "yellow";

const items = document.getElementsByClassName("items");

background.addEventListener("load", () => {
  backgroundCtx.drawImage(background, 0, 0, 1500, 750);
});

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
    if ((i % groundPlatform.width) * 3 === 0) {
      platformCtx.drawImage(
        groundPlatform,
        i,
        700,
        groundPlatform.width * 3,
        groundPlatform.height * 3
      );
    }
  }
});

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
const TIME_LIMIT = 30;

let SCORE;
let gameRunning;
let gamePaused;
let time;
let lastTime;
let keys = {};
let HP = 5;

const hpCanvas = document.getElementById("hpCanvas");
const hpCtx = hpCanvas.getContext("2d");
const redHeart = document.getElementById("red-heart");
const greyHeart = document.getElementById("grey-heart");
redHeart.addEventListener("load", () => {
  for (let i = 0; i < HP; i++) {
    hpCtx.drawImage(redHeart, 1230 + i * 50, 20, 40, 40);
  }
});

function getRandomItem() {
  let index = Math.floor(Math.random() * items.length);
  return items[index];
}

let actualItems = [];
let platforms;

function initializePlatforms() {
  platformCtx.clearRect(0, 0, platformCanvas.width, platformCanvas.height);
  let index = Math.floor(Math.random() * platformSets.length);
  platforms = platformSets[index];
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
  for (let i = 0; i < 1500; i++) {
    if ((i % groundPlatform.width) * 3 === 0) {
      platformCtx.drawImage(
        groundPlatform,
        i,
        700,
        groundPlatform.width * 3,
        groundPlatform.height * 3
      );
    }
  }
}

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

function displayHP() {
  for (let i = 0; i < HP; i++) {
    hpCtx.drawImage(redHeart, 1230 + i * 50, 20, 40, 40);
  }
  for (let i = HP; i < 5; i++) {
    hpCtx.drawImage(greyHeart, 1230 + i * 50, 20, 40, 40);
  }
}

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
  initializePlatforms();
  initializeItems();

  backgroundCtx.drawImage(background, 0, 0, 1500, 750);

  SCORE = 0;
  gameRunning = true;
  gamePaused = false;
  time = 0;
  lastTime = 0;
  keys = {};
  HP = 5;

  player.x = 120;
  player.y = GROUND;
  player.dx = 0;
  player.dy = 0;
  player.onGround = true;
  player.isFacingLeft = false;
}

setInitialState();

for (let item of actualItems) {
  item.img.addEventListener("load", () => {
    itemsCtx.drawImage(item.img, item.x, item.y, 48, 48);
  });
}

/**
 * Handle keys and control buttons
 */

/**
 * Handle keys and control buttons
 */

// Pomocný objekt pro správu dotyků
const activeTouches = new Set();

function handleTouchStart(buttonKey, e) {
  e.preventDefault(); // Zabrání konfliktům s gesty na mobilu
  activeTouches.add(e.changedTouches[0].identifier);
  keys[buttonKey] = true;
}

function handleTouchEnd(buttonKey, e) {
  e.preventDefault();
  // Ujistíme se, že uvolňujeme jen doteky, které byly registrovány
  for (const touch of e.changedTouches) {
    if (activeTouches.has(touch.identifier)) {
      activeTouches.delete(touch.identifier);
      keys[buttonKey] = false;
    }
  }
}

// Touch události
document.getElementById("left-button").addEventListener("touchstart", (e) => handleTouchStart("ArrowLeft", e));
document.getElementById("jump-button").addEventListener("touchstart", (e) => handleTouchStart("Space", e));
document.getElementById("right-button").addEventListener("touchstart", (e) => handleTouchStart("ArrowRight", e));

document.getElementById("left-button").addEventListener("touchend", (e) => handleTouchEnd("ArrowLeft", e));
document.getElementById("jump-button").addEventListener("touchend", (e) => handleTouchEnd("Space", e));
document.getElementById("right-button").addEventListener("touchend", (e) => handleTouchEnd("ArrowRight", e));

// Mouse události
document.getElementById("left-button").addEventListener("mousedown", () => (keys["ArrowLeft"] = true));
document.getElementById("jump-button").addEventListener("mousedown", () => (keys["Space"] = true));
document.getElementById("right-button").addEventListener("mousedown", () => (keys["ArrowRight"] = true));

document.getElementById("left-button").addEventListener("mouseup", () => (keys["ArrowLeft"] = false));
document.getElementById("jump-button").addEventListener("mouseup", () => (keys["Space"] = false));
document.getElementById("right-button").addEventListener("mouseup", () => (keys["ArrowRight"] = false));


window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Space") {
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
  updateIcicles();

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
          player.y + player.height/2 < item.y + itemHeight &&
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
 * Icicles
 */

const icicleImage = document.getElementById("icicle");

const ICICLE_WIDTH = 32;
const ICICLE_HEIGHT = 64;
const ICICLE_SPEED = 1;

const icicles = [];

let hurt = false;

function generateIcicle() {
  if (icicles.length > 0) return;

  const x = Math.random() * (canvas.width - ICICLE_WIDTH);
  icicles.push({ x, y: -ICICLE_HEIGHT });
}

function updateIcicles() {
  for (let i = icicles.length - 1; i >= 0; i--) {
    const icicle = icicles[i];
    icicle.y += ICICLE_SPEED;

    if (icicle.y > canvas.height) {
      icicles.splice(i, 1);
    }

    if (
      player.x < icicle.x + ICICLE_WIDTH &&
      player.x + player.width > icicle.x &&
      player.y + player.height / 2 == icicle.y + ICICLE_HEIGHT
    ) {
      HP = Math.max(HP - 1, 0);
      hurt = true;
      displayHP();
      icicles.splice(i, 1);
    }
  }
}

function drawIcicles() {
  for (const icicle of icicles) {
    ctx.drawImage(icicleImage, icicle.x, icicle.y, ICICLE_WIDTH, ICICLE_HEIGHT);
  }
}

if (Math.random() < 0.01) {
  generateIcicle();
}

function drawIcicles() {
  for (const icicle of icicles) {
    ctx.drawImage(icicleImage, icicle.x, icicle.y, ICICLE_WIDTH, ICICLE_HEIGHT);
  }
}

const hurtCanvas = document.getElementById("hurt");
const hurtCtx = hurtCanvas.getContext("2d");

/**
 * Drawing
 */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawIcicles();

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

function displayMessage(text, wish, color) {
  console.log("display");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  platformCtx.clearRect(0, 0, canvas.width, canvas.height);
  itemsCtx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 6rem Public Pixel";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 3);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.strokeText(text, canvas.width / 2, canvas.height / 3);
  ctx.fillText(wish, canvas.width / 2, 2 * (canvas.height / 3));
  ctx.strokeText(wish, canvas.width / 2, 2 * (canvas.height / 3));
}

function checkWinCondition() {
  if (actualItems.length === 0) {
    gameRunning = false;
    displayMessage("You Won!🎉", "Merry X-mas!🎄", "white");
  }
}

/**
 * Running game
 */

document.getElementById("play-stop-button-pc").addEventListener("click", () => {
  gamePaused = !gamePaused;
});

document.getElementById("play-stop-button-phone").addEventListener("click", () => {
  gamePaused = !gamePaused;
});

function updateStats() {
  let currentTime = Date.now();
  if (currentTime - lastTime >= 1000) {
    time++;
    lastTime = currentTime;
  }

  document.getElementById("scoreDisplay").innerText = `🎁 Score: ${SCORE}`;
  let timeLimit = document.getElementById("timeDisplay");
  timeLimit.innerText = `⏱️ Time: ${TIME_LIMIT - time}`;

  if (TIME_LIMIT - time > 5) {
    timeLimit.style = "color: white";
  } else {
    timeLimit.style = `color: ${RED}`;
  }

  if (time >= TIME_LIMIT) {
    HP = 0;
    displayHP();
  }
}

let lastFrameTime = 0;
const FRAME_DELAY = 100;
let FRAME = 0;

let lastIcicle = 0;
const ICICLE_DELAY = 2000;

let elapsed = 0;
const flashDuration = 70;

function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (gamePaused) {
    lastFrameTime = timestamp;
  } else {

    if (HP === 0) {
      gameRunning = false;
      hurtCtx.clearRect(0, 0, canvas.width, canvas.height);
      displayMessage("You Lost!💀", "Try again!🤡", RED);
      return;
    }
  
    update();
    draw();
    updateStats();
    checkWinCondition();
  
    if (timestamp - lastIcicle > ICICLE_DELAY) {
      generateIcicle();
      lastIcicle = FRAME;
    }
  
    if (timestamp - lastFrameTime > FRAME_DELAY) {
      let maxFrame = player.dx === 0 ? 4 : 6;
      FRAME = (FRAME + 1) % maxFrame;
      lastFrameTime = timestamp;
    }
  
    if (hurt) {
      if (elapsed == 0) {
        elapsed = timestamp;
      }
      if (timestamp - elapsed > flashDuration) {
        hurtCtx.clearRect(0, 0, canvas.width, canvas.height);
        elapsed = 0;
        hurt = false;
      } else {
        hurt = true;
        hurtCtx.fillStyle = `${RED}0D`;
        hurtCtx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
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
  cancelAnimationFrame(gameLoop);
  delay(1000).then(() => {
    document.getElementById("restartButton").blur();
    setInitialState();
    rerenderItems();
    updateStats();
    loadingOverlay.style.display = "none";
    displayHP();
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
