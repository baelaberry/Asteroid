var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length;i++){
        var asteroidsLocation = asteroids.locations[i];
        var asteroidsDiam = asteroids.diams[i];
        var r = isInside(asteroidsLocation,asteroidsDiam,spaceship.location,spaceship.size);
            if(r){
             gameOver();   
            }
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
        var r = isInside(spaceship.location,spaceship.size,earthLoc,earthSize.y);
            if(r){
             gameOver();
            }
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
        var r = isInside(spaceship.location,
                        spaceship.size,
                        earthLoc,
                        earthSize.y);
        if(r){
            gameOver();
        }
        
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bulletSys = spaceship.bulletSys;
    var bullets = bulletSys.bullets;
    for(var i=0; i<bullets.length;i++){
        for(var j=0; j<asteroids.locations.length;j++);
        var asteroidsLocation = asteroids.locations[j];
        var asteroidsDiam = asteroids.diams[j];
        var r = isInside(asteroidsLocation,asteroidsDiam,bullets[i],bulletSys.diam);
        
        if(r){
            asteroids.destroy(j);
        }
    
    }


//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function testIsInside(){
    var locA = createVector(50,50);
    var sizeA = 10;
    var locB = createVector(55,55);
    var sizeB = 10;
    
    var r = isInside(locA, sizeA, locB, sizeB);
    console.log(r);
}

function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x, locA.y, locB.x, locB.y);
    var maxDist = sizeA/2+sizeB/2;
    if(maxDist<d){
        return false;
    }else{
        return true;
    }

}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}