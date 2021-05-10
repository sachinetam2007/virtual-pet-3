//Create variables here
var database,dogImg,happydogImg,dog
var foodStock=0
var feed,addFood
var foodObj
var lastFed
var bedroom,garden,washroom
function preload()
{
	//load images here
dogImg=loadImage("images/Dog.png")
happydogImg=loadImage("images/happydog.png")
bedroom=loadImage("virtual+pet+images/Bed Room.png")
garden=loadImage("virtual+pet+images/Garden.png")
washroom=loadImage("virtual+pet+images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
database=firebase.database()
foodObj=new Food()
dog=createSprite(600,500,10,10)
dog.addImage(dogImg)
dog.scale=0.2
database.ref('food').on("value",readStock)
feed=createButton("feed the dog")
feed.position(400,95)
feed.mousePressed(feedDog)
addFood=createButton("Add the food")
addFood.position(600,95)
addFood.mousePressed(addfoods)
}


function draw() { 
  background("green") 

  foodObj.display()
  currentTime=hour();
   if(currentTime==(lastFed+1)){ update("Playing"); 
   foodObj.garden(); 
  }else if(currentTime==(lastFed+2)){ update("Sleeping");
   foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){ update("Bathing");
  foodObj.washroom();
 }
  drawSprites();
  database.ref('lastFed').on("value",function(data){
    lastFed=data.val()

  })
  fill (255,255,245)
  textSize (15)
  if(lastFed>=12){
    text("last Fed :"+lastFed%12+"pm",350,35)
  }else if(lastFed==0){
    text("last Fed : 12 am",350,30)
  }else{
    text("last Fed :"+lastFed+"am",350,30)
  }
  
  //add styles here

}
function readStock(data){
  if(data!==undefined){
  foodStock=data.val()
  foodObj.updateFoodStock(foodStock)
}
}



function feedDog(){
dog.addImage(happydogImg)
if(foodObj.getFoodStock()<=0){
   foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}
database.ref('/').update({
  food:foodObj.getFoodStock(),
lastFed:hour()})
}

function addfoods(){
foodStock=foodStock+1
database.ref('/').update({
  food:foodStock})
}

