var PLAY = 1;
var END = 0;

var monkey , monkey_running,ground,ground1,sky;
var banana ,bananaImage, obstacle,obstacleImg ;
var FoodGroup, obstacleGroup;
var surtime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png")
 
}

function setup() {
  createCanvas(600,600);
  
  //creating monkey
  monkey = createSprite(100,475,30,30);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.25;
  
  //creating ground
  ground = createSprite(150,555,1200,20);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x);
   
  //creating invisible ground
  ground1 = createSprite(155,565,1200,30);
  ground1.visible = false;
  
  // creating sky to forbid movement
  sky =  createSprite(90,90,1200,10);
  sky.visible = false;
  
  //creating Survival time
  surtime = 0;
  

}


function draw() {

  background("white"); 
  
  //survival time
  stroke("black");
  textSize(20);
  fill("black");
  surtime = surtime + Math.round(getFrameRate()/60);
  text("                             Survival Time : "+surtime,3,60);
  
  
  
  //making monkey jump when sapce bar is pressed
   if(keyDown("space")&& monkey.y >= 100) {
     gameState = PLAY;
    monkey.velocityY = -10;
  }
  
  //Adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //Making infinite ground
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //colliding with invisible ground
  monkey.collide(ground1);
  
  //colliding with invisible Sky to avoid going out of canvas
  if(monkey.collide(sky)){
    monkey.velocityY =5;
  }
  
 //calling functions
  obstacles();
  food();
  
  
  
  drawSprites();
  
}
//creating obstacles
function obstacles(){
if(frameCount% 300 === 0){
 var  obstacle = createSprite(200,510,20,20);  
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.2;
  obstacle.lifetime = 80;
  obstacle.velocityX= -4;
}
}
//creating banana
function food(){
  if(frameCount%80 === 0){
    var food = createSprite(550,200,30,30);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.2;
    food.lifetime = 100;
    food.velocityX = -6;
    
  }
}  
