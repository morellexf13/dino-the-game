/**
 * 📐 https://p5js.org
 *  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#identifying-slow-code-profiling
 * */ 
var score = config.INITIAL_SCORE;
var highScore = config.INITIAL_SCORE;
var speed = config.INITIAL_SPEED;
var scrollBg = 0;
var obstacles = [];
var player;
var restart = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 🖼 🔊 Handle all the assets
function preload() {
  bgsound = loadSound('./assets/sounds/background.mp3');
  jumpSound = loadSound('./assets/sounds/jump.wav');
  bgimage = loadImage('./assets/images/bg.jpg');
  obstacleImage = loadImage('./assets/images/gorilla.png');
  playerImage = loadImage('./assets/images/T-Rex.png');
  gameOverSound = loadSound('./assets/sounds/game-over.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgsound.playMode('restart');
  bgsound.setLoop(true);
  bgsound.play();
  // 🦖 Create the player
  player = new Player();
}


function draw() {
  // 🖼  Animate the background
  // ------------------------------------------------------------
  image(bgimage, -scrollBg, 0, width,height);
  image(bgimage, -scrollBg + width, 0,width,height);
  
  if (scrollBg > width) {
    scrollBg = 0;
  }

  // ------------------------------------------------------------
  // 💯 Handle score
  // ------------------------------------------------------------
  if (frameCount % 5 == 0) {
    score++;
  }  

  if(score > highScore) {
    highScore = score;
    localStorage.setItem("DINO_HIGHSCORE", highScore);
  }

  if(localStorage.getItem("DINO_HIGHSCORE") != null) {
    highScore = parseFloat(localStorage.getItem("DINO_HIGHSCORE"));
  }

  new Text(`Score ${score}`, 40, 30);
  new Text(`Highscore ${highScore}`, window.innerWidth - 190, 30); 
  
  // ------------------------------------------------------------
  // 🦍 Start spawning the obstacles
  // ------------------------------------------------------------
  if (random(config.DEFAULT_NORMAL_MODE_OBSTACLES) < 0.75 && frameCount % 50 == 0) {
    obstacles.push(new Obstacle())
  }  

  // ✂️ Cut the obstacles to ease the game performance
  if(obstacles.length >= 5) {
    obstacles.splice(0, 2)
  }

  for (let obstacle of obstacles) {
    obstacle.move();

    // Game 🏴‍☠️ over! 
    if(player.collide(obstacle)) {
      noLoop()
      bgsound.stop();
      gameOverSound.play();
      obstacles = []
      scrollBg = 0;
      speed = config.INITIAL_SPEED;
      new Text(config.DEFAULT_GAMEOVER_TEXT, windowWidth/2 - 70, windowHeight/2);
      restart = true;
    }
  }
  // ------------------------------------------------------------
  
  player.move()

  
  speed += config.INTIAL_SPEED_INCREMENT;
  scrollBg += speed / 5;
}