var colourBoxes = ["red", "purple", "blue", "green"] ;
var gameGeneration = [];
var userSequence = [];
var started = false;
var level = 0;


$("#main-h1").fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);

// start the game on h1 click
$("#main-h1").click(function(){
    if (!started) {
        gameSequence();
        level = 0;
        started = true;
    }
});

// the game sequence
function gameSequence() {
    level++;
    $("#main-h1").text("Level " + level);
    userSequence.length = 0;
    var randomNumber = Math.floor(Math.random()* 4);
    var randomColour = colourBoxes[randomNumber];
    gameGeneration.push(randomColour);
    playSound(randomColour);
    $("." + randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// code to react to user clicks
$(".little-boxes").click(function() {
    var userClicked = $(this).attr("id");
    userSequence.push(userClicked);
    $(this).addClass("clicked");
    setTimeout(() => {
        $(this).removeClass("clicked");
    }, 100);
    playSound(userClicked);
    checkAnswers(userSequence.length - 1);  
});

// game button sounds
function playSound (sound) {
    var audio = new Audio("sounds/" + sound + ".wav");
    audio.play();
};

// check if user is right or wrong then run a game reaction to user selection
function checkAnswers(answers) {
    console.log(gameGeneration);
    console.log(userSequence);
    if (userSequence[answers] === gameGeneration[answers]) {
        console.log("right!");
        if (userSequence.length === gameGeneration.length) {
            setTimeout(gameSequence, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $(".main").addClass("wrong");
        setTimeout(() => {
            $(".main").removeClass("wrong");
        }, 300);
        $("#main-h1").text("Game Over!! Press Here to Restart The Game.");
        startOver();
    }
} 

// this code will restart the game if user selection is wrong
function startOver() {
    level = 0;
    userSequence = [];
    gameGeneration = [];
    started = false;
}