const buttonColours = ["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let started = false;
let level=0;

$(".btn").click(function(){
    let userChosenColour = this.id;
    // userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(!started){
        gameOver(userChosenColour);
    }
    else{
        // let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        let indx=userClickedPattern.length-1;

        if(userClickedPattern[indx]==gamePattern[indx]){
            if(userClickedPattern.length==gamePattern.length){
                setTimeout(nextSequence,500);
            }
        }
        else{
            gameOver(userChosenColour);
        }
    }
});

$(document).keypress(function (){
    if(!started){
        started=true;
        nextSequence();
    }
});

///////////////////////////////////////////////////////////////////////

function playSound(name){
    let audio=new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function gameOverSound(){
    let audio=new Audio(`sounds/wrong.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function gameOver(colour) {
    playSound(colour);
    animatePress(colour);
    gameOverSound();
    $(`body`).addClass("game-over");
    setTimeout(function(){
        $(`body`).removeClass("game-over");
    }, 100);
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    started=false;
    $("#level-title").text(`Game Over, Press Any Key to Restart`);
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text(`Level ${level}`);
    userClickedPattern=[];
}