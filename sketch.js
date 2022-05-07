 var PLAY = 1;
 var END= 0;
 var gameState = PLAY;
 
 
 
 var pou;
 var cono;
 var esqueleto;
 var fondo;
 var piedra;
 
 var suelo;
 var gameOver;
 var fondo;
var restart;


 function preload (){
conoImg = loadImage ("cono.png");
pouImg = loadImage ("pou.png");
esqueletoImg = loadImage ("esqueleto.png");
fondoImg = loadImage ("fondo.png");
piedraImg = loadImage ("piedra.png");

gameoverimg = loadImage ("gameover.png");
fondoImg = loadImage ("fondo.png");
restartImg = loadImage ("restart.png");

 }
 

 function setup(){
 createCanvas(windowWidth,windowHeight);
 
 pou = ceateSprite(50,180,20,50);
 pou.addImage("pou",pouImg);
 pou.scale = 0,5;
 
gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite (300,100);
restart.addImage(restartImg);

invisibleGround = createSprite(windowWidth);
invisibleGround.visible = false

gameOver.scale = 0.5;
restart.scale = 0.5;

gameOver.visible = false;
restart.scale = false;

cloudsGroup = new Group();
obstaclesGroup = new Group();

 }


 function draw(){
 background(fondoImg);

if(gameState===PLAY){
if(keyDown("space")&& pou.y >=159){
 pou.velocity = -12;
}
pou.velocityY = pou.velocityY + 1;

if(pou.collide(invisibleGround)){
spawnObstacles();
}
if(obstaclesGroup.isTouching(pou)){
    gameState = END;
}

}
else if(gameState === END){
 gameOver.visible = true;
 restart.visible = true;

pou.velocityX = 0;
pou.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);


obstaclesGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)){
reset();
 }
}

drawSprites();
 }

 function spawnObstacles(){
     if(frameCount % 60 === 0){
       var obstacle=createSprite(600,165,10,40);
     obstacle.velocityX = -(8+3*score/100);

     var rand = Math.round(random(1,6));
     switch(rand){
     case 1: obstacle.addImage(cono);
     break;

     case 2: obstacle.addImage(esqueleto);
     break;
     case 3:obstacle.addImage(piedra);
     break;
     default: break;
     }

     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
     }
 }

 function reset(){
     gameState = PLAY;
     gameOver.visible = false;
     restart.visible = false;

     obstaclesGroup.destroyEach();
 }