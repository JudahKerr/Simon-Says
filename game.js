var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;



//On button Click function
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);



  checkAnswer(userClickedPattern.length-1);


})

function checkAnswer(currentLevel){
          if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if (userClickedPattern.length === gamePattern.length){
              setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
              }, 1000);

              // console.log("yes");
            }
          } else {
            var wrong = new Audio("sounds/wrong.mp3")
            wrong.play();
            $("body").addClass("game-over").fadeOut(200);
            $("body").removeClass("game-over").fadeIn(200);

            startOver();


}}




function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level = level + 1;
  $("h1").text("Level " + level);



}


function startOver(){
   gamePattern = [];
   userClickedPattern = [];
   level = 0;
   $("h1").text("Game Over. Press any key to restart.");



}




// Initilaize the game with a key press, only the first time
$(document).keypress(function() {

  if (level < 1) {
    $("h1").text("Level 0");
    nextSequence();

  }
});


// Play sounds
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}

// Animate Button fade
function animatePress(currentColor) {
  $("#" + currentColor).addClass(".pressed").fadeOut(100);
  $("#" + currentColor).removeClass(".pressed").fadeIn(250);
}
