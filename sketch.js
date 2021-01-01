//Create variables here
var dogImage, happyDogImage;
var dogSprite;
var dog, happyDog;
var foodS, foodStock;
var database;

function preload() {
  //load images here
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
   dogSprite = createSprite(250,250,100,100);
  imageMode(CENTER);
  //image(dog,250,250,100,100);
  dogSprite.addImage(dog,100,100,5,5);

  foodStock=database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  keypressed();
 
  drawSprites();
  //add styles here
  textSize(20);
  fill(0,0,0);
  stroke(10);
  text("Press the up arrow key to feed Padfoot milk!",50,50);
  text("Milk bottles remaining: "+ foodS,125,250);
}

function readStock(data){
  foodS = data.val();
  console.log(foodS);

}

function keypressed(){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);

  }

  if(keyWentDown(DOWN_ARROW)){
    reStock(foodS);
    dogSprite.addImage(dog);
  }
}

function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}
database.ref('/').update({
  food:x
})
}

function reStock(x){
      x=x+1;
  
  database.ref('/').update({
    food:x
  })
  console.log(x);
  }