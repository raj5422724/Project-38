var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, restart;

var jump, die, checkpoint;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  trex_normal = loadAnimation("trex1.png");
  trex_inverted = loadAnimation("trexIn1.png","trexIn2.png","trexIn3.png");
  trex_invert_normal = loadAnimation("trexIn1.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  jump = loadSound("jump.mp3");

  die = loadSound("die.mp3");

  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(-1180, 180, 20, 50);

  trex.addAnimation("normal",trex_normal);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("invert_run", trex_inverted);
  trex.addAnimation("invert_normal", trex_invert_normal);
  trex.scale = 0.5;

  ground = createSprite(0, 180, 400, 20);
  ground.addImage("ground", groundImage);
  //ground.x = ground.width / 2;
  //ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(trex.x, 50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(trex.x, 90);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;


  invisibleGround = createSprite(0, 190, 2400, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  Obstacle1 = createSprite(-900, 165, 10, 40);
  Obstacle1.addImage(obstacle1);
  Obstacle1.scale = 0.6;
  obstaclesGroup.add(Obstacle1);
  Obstacle2 = createSprite(-600, 165, 10, 40);
  Obstacle2.addImage(obstacle2);
  Obstacle2.scale = 0.6;
  obstaclesGroup.add(Obstacle2);
  Obstacle3 = createSprite(-300, 165, 10, 40);
  Obstacle3.addImage(obstacle3);
  Obstacle3.scale = 0.6;
  obstaclesGroup.add(Obstacle3);
  Obstacle4 = createSprite(0, 165, 10, 40);
  Obstacle4.addImage(obstacle4);
  Obstacle4.scale = 0.55;
  obstaclesGroup.add(Obstacle4);
  Obstacle5 = createSprite(300, 165, 10, 40);
  Obstacle5.addImage(obstacle5);
  Obstacle5.scale = 0.55;
  obstaclesGroup.add(Obstacle5);
  Obstacle6 = createSprite(600, 165, 10, 40);
  Obstacle6.addImage(obstacle6);
  Obstacle6.scale = 0.55;
  obstaclesGroup.add(Obstacle6);
  Obstacle7 = createSprite(900, 165, 10, 40);
  Obstacle7.addImage(obstacle2);
  Obstacle7.scale = 0.6;
  obstaclesGroup.add(Obstacle7);

  score = 0;
}

function draw() {
  //trex.debug = true;
  trex.setCollider("circle",0,0,35);
  background(255);

  gameOver.x = trex.x;
  restart.x = trex.x;

  camera.position.x = trex.x;

  if (gameState === PLAY) {

    if(keyDown(RIGHT_ARROW)) {
      trex.x += 5;
      trex.changeAnimation("running",trex_running);
    }else {
      trex.changeAnimation("normal",trex_normal);
    }

    if(keyDown(LEFT_ARROW)) {
      trex.x -= 5;
      trex.changeAnimation("invert_run",trex_inverted);
    }


    if ((touches.length > 0||keyDown("space")) && trex.y >= 159) {
      trex.velocityY = -14;
      touches = [];
      if (jump.isPlaying()) {
        jump.stop();
      } else {
        jump.play();
      }
    }

    trex.velocityY = trex.velocityY + 0.8

    trex.collide(invisibleGround);

    if(trex.x >= 1150) {
      gameState = WIN;
    }

    if (obstaclesGroup.isTouching(trex)) {
      die.play();
      gameState = END;
    }
  } else if (gameState === END) {

    restart.visible = true;
    gameOver.visible = true;

    trex.collide(invisibleGround);

    //change the trex animation
    trex.changeAnimation("collided", trex_collided);

    if (mousePressedOver(restart)) {
      reset();
    }
  } else if (gameState === WIN) {
    trex.collide(invisibleGround);
    trex.changeAnimation("normal",trex_normal);
    fill(0);
    textSize(22);
    text("You Win",trex.x,100);
  }

  drawSprites();
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  trex.x = -1180;
  trex.y = 180;

  trex.changeAnimation("running", trex_running);

}
