//Create Array for the button colours

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern  = [];

var started = false;

var level = 0;

var userClickedPattern = [];

document.addEventListener("keydown", function(event){

 if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;

}
})

//What is chosen by the user
$(".btn").click(function (event){
userClickedPattern.push(this.id);

playSound(this.id);
animatePress(this.id);
checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function()
      {nextSequence();}
      , 1000);
    }

  }
  else {
    console.log("wrong");
    $("#level-title").text("Game Over 😕 Press Any Key to Restart");

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

}


function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}
//Choose next sequence to the pattern

function nextSequence(){

    level++;
    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    var randomNumber = (Math.floor(Math.random() * 4));
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //add animation to show pressed button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound dor randomChoseColour
  playSound(randomChosenColour);

}



//plays sound when button is pressed
function playSound(name) {
  var soundColour = "sounds/" + name + ".mp3";
  var playSound = new Audio(soundColour);
  playSound.play();
}


//adding animation when clicking on the button
function animatePress(currentColour){

$("#"+ currentColour).addClass("pressed");

  //puts it in a set time to remove the press button
  setTimeout(function() {
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}
