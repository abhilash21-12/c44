var track,trackImg;

var player,playerImg;

var obs1,obs2,obs3,obs4;

var obstacle,obstacleGroup;

var gameState = 1 ;

var count = 0;


function preload(){
  trackImg = loadImage("images/path.png");
  playerImg = loadImage("images/car.png");
  obs1 = loadImage("images/obs 1.png");
  obs2 = loadImage("images/obs2.png");
  obs3 = loadImage("images/obs3.png");
  obs4 = loadImage("images/obs4.png");
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  track = createSprite(width/2,height/2);
  track.addImage("track",trackImg);
  track.scale = 2;
  track.y = track.height/2;
  track.velocityY = 3;
  console.log(track.y);
  
  player = createSprite(width/2,height-200,10,10);
  player.addImage("player",playerImg);
  player.scale = 0.75

  obstacleGroup = new Group();

  player.debug = true;
  player.setCollider("rectangle",0,0,110,200);


}

function draw() {
  background(255,255,255);

  textSize(18);
  text("score : " + count,width-300,50);

  if(gameState === 1){
    console.log("gameStateisPlay");
    if(track.y > displayHeight){
      track.y = track.height/2;
     }
     
     
     count = count + Math.round(getFrameRate()/60);
     if(count % 100 === 0){
      //track.velocityY = 3;
      track.velocityY = (3 + 3*count/100);
     }

    
     if(keyDown("left")){
       player.x = player.x - 6;
     }
   
     if(keyDown("right")){
       player.x = player.x + 6;
     }
   
   
     spawnObstacles();

     if(obstacleGroup.isTouching(player)){
      gameState = 0;
     }

  } else if(gameState === 0){
    track.velocityY = 0;
    obstacleGroup.setVelocityYEach(0);
    fill("red");
    textSize(35);
    text("Game Over ",50,height/2-100);
    text("Press 'R' to Restart ",50,height/2-50);
    if(keyDown("r")){
      reset();
    }
  }

  

 
  drawSprites();
}

function reset(){
  gameState = 1;
  obstacleGroup.destroyEach();
  count = 0;
}




function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(-10,-10,10,10);
    obstacle.x = Math.round(random(width/2-200,width/2+200));

    obstacle.velocityY =  (6 + 3*count/100);

    obstacle.debug = true;
    
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: obstacle.addImage(obs1);
      break;
      case 2: obstacle.addImage(obs2);
      break;
      case 3: obstacle.addImage(obs3);
      break;
      case 4: obstacle.addImage(obs4);
      break;
    }

    //obstacle.velocityY = 5;
    obstacle.lifetime = height/5;
    obstacleGroup.add(obstacle);
  }

}