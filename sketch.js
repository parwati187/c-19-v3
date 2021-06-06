var PLAY = 1;
var END = 0;
var gameState = PLAY;

var horse , horse_running
var obstacle, obstacleImage
var obstacleGroup
var score=0;

var backImage,backgr;
var ground,ground_img;

var gameOver;

function preload(){
  
  obstacleImage = loadImage("stone.png"); 
  
  backImage=loadImage("jungle.jpg");
  horse_running = loadAnimation("jumpp.png","runp.png","run2p.png");
  horse_collided = loadAnimation("runp.png");
   
}

function setup() {
  
  createCanvas(800,400);
   
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
    
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

   horse=createSprite(100,340,20,50);
   horse.addAnimation("Running", horse_running);
   horse.addAnimation("collided", horse_collided);
   horse.scale=0.8;
   horse.setCollider("rectangle",0,0,horse.width/3,horse.height/3);
   
   obstaclesGroup = new Group();
 
   score = 0;
  
}

function draw() {
  
  background(255);
  if(gameState === PLAY){
   
    score = score + Math.round(getFrameRate()/60);
     
    if(ground.x<0) {
       ground.x=ground.width/2;
    }
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
     
    if(keyDown("space") && horse.y >= 179) {
      horse.velocityY = -18;
    }
         
    if(obstaclesGroup.isTouching(horse)){
         
     obstaclesGroup.destroyEach();
     gameState = END;
                   
    }
  
    horse.velocityY = horse.velocityY + 0.8;
    horse.collide(ground);   
  
    spawnObstacles();
    drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);     
 }
 
  if (gameState === END) {
       
  stroke("red");
  fill("red");
  textSize(30);
  text("Game Over", 230,250)
  stroke("red");
  textSize(20);
  fill("red");
  text("Score: "+ score, 250,150); 
        
 }
  
}

function spawnObstacles() {
  
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,370,10,40);
 
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
