var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function() {
    if (!started) {
        $("h1").text("Level 0");
         nextSequence();
         started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animateColor(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    console.log(gamePattern)
    console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Sucess");
        if (gamePattern.length === userClickedPattern.length) {
           setTimeout(function() {
            nextSequence();
        }, 1000); 
        }
        
    } else {    
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }  
};

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //button flash
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    //button sound
    playSound(randomChosenColor);
 
    return randomChosenColor;
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    //button sound
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animateColor(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

