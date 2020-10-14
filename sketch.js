


var dog,happyDog,foodS,foodStock,database;
var lastFed;
function preload()
{
  
   dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 1200);
 

  database = firebase.database();
   database.ref('/').update({
    food : 20,
   
  })
  foodObj= new Food();
  foodStock = database.ref('food');
foodStock.on("value",readStock);


  dog = createSprite(650,300,100,100);
  dog.addImage(dogIMG);
  dog.scale =  0.2;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  

  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
    
  

  

}


function draw() {  
background(46, 139, 87);


/*if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogIMG);

}

textSize(20);
fill("white");
stroke("black");
text("FOOD REMAINING :"+foodS,150,180);
textSize(20);
fill("black");
text("PRESS UP ARROW TO FEED THE DOG MILK!",50,100);*/



foodObj.display(); 

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val(); 
})


drawSprites();

fill(29,84,200);
textSize(25);
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM",325,30);
  console.log(lastFed);
}
else if(lastFed===0){
  text("Last Feed: 12 AM",325,30)
}
else{
  text("Last Feed:" + lastFed + "AM",325,30)

}

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);

}

/*feed.mousePressed(()=>{
  deductFood(foodS);
})*/


function feedDog(){
  var foodDed = foodObj.deductFood(foodObj.getFoodStock());
  dog.addImage(happyDogIMG);

  database.ref('/').update({
    'food' : foodDed,
    'FeedTime' : hour()
  })
}
function addFoods(){
  
if(foodS<20){
  foodS++;
  database.ref('/').update({
'food' : foodS


  })
}
}

/* function writeStock(x){

  
 if(x<=0){
    x=0;
  }

  if(x>0){
    x=x-1;
  }

 
  database.ref('/').update({
    'food':x
  })
 
}*/

function showError(){
  console.log("ERROR!");
}



