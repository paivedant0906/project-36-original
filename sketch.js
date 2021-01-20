//Create variables here

var database;
var doghappy,dogs;
var dog;
var foods;

function preload()
{
  //load images here
  doghappy=loadImage("dogImg1.png")
   dogs=loadImage("dogImg.png")
}

function setup() {
  database=firebase.database();
    console.log(database);

  createCanvas(800, 700);
  dog=createSprite(400,450,50,50);
  dog.addImage(dogs);

var foodref=database.ref('food');
  foodref.on("value",readstock,showError);
  
}


function draw() {  
background(46, 139, 87)
dog.scale=0.2;
  drawSprites();
  textSize(30)
  fill("white")
text("Note: Press the up arrow key to feed the dog bruno ",100,100)
text("Food stock left: "+foods,100,600)
  //add styles here
  if(foods !== 0){
if(keyIsDown(UP_ARROW)){
  writestock(foods)
  dog.addImage(doghappy)
}
if(keyWentUp(UP_ARROW)){
  writestock(foods)
  dog.addImage(dogs)
}
  }
if(foods === 0){
  dog.addImage(dogs);
  foods = 20;
}

}

function readstock(data){
foods = data.val();
}

function writestock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('Food').update({
    Food:x
  })
}

function showError(){
  console.log("Error in writing to the database");
}



