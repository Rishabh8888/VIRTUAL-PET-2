var dogImg , happydogImg
var dog
var database
var foodS , foodStock
var fedTime , lastFed
var foodObj

function preload(){
  dogImg = loadImage("images/Dog.png")
  happydogImg = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(1000, 600);
  database = firebase.database();
  
  foodStock = database.ref("Food")
  foodStock.on("value", readStock)
  foodStock.set(20)
  
  //foodObj = new Food() ;

  dog = createSprite("1000,95")
  dog.addImage(dogImg)
  dog.scale = 0.3

  addFood = createButton("Add Food")
  addFood.position(400,95)
  addFood.mousePressed(feedDogFood)


  feedFood = createButton("Feed Food")
  feedFood.position(500,95)
  feedFood.mousePressed(feedDogFood)


}


function draw() {  
  background(46,139,87)

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val
  })

   //foodObj.display() ;

   fill(255,255,254)
   textSize(15)
   
   if(lastFed>=12) {
     text("Last Feed :"+ lastFed%12 + "PM", 300,30) ;
   }else if(lastFed==0){
     text("Last Feed : 12 AM", 300,30) ;
   }else{
     text("Last Feed :"+ lastFed + "AM", 300,30) ;
   }

  drawSprites();
}

function addDogFood() {
  foodS++
  database.ref('/').update({
    Food:foodS
  })

}

function feedDogFood() {
  dog.addImage(happydogImg) ;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  fedTime:hour()
  })

}

function writeStock(x) {
   x = x-1
  
  database.ref('/').update({
    food:x
  })
}

function readStock(data) {
  foodS = data.val();
}


