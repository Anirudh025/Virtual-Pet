var dog, happyDog, database, foodS, foodStock
var database

function preload()
{
dogImg = loadImage("dogImg.png");
happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.addImage("dog",dogImg);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(2500);
}


function draw() {  
  background(46,139,87);
  if(foodS !== undefined){
    textSize(20);
    fill(255);
    text("Note: Press UP ARROW To Feed Drago Milk", 50, 50);
    text("Food Remaining: "+foodS, 150, 150);
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS = 2500;
  }

  drawSprites();
  //add styles here

}

function writeStock(x){
if(x <= 0){
x = 0;
}
else{
  x = x - 1;
}
database.ref("/").update({
  Food:x
});
}

function readStock(data){
  foodS = data.val();
}