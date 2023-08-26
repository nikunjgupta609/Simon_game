let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []
let userClickedPattern = [] 


let started = false;
let level = 0;

// Start Game
let startKey = document.getElementById("startGame");
startGame.addEventListener("click", function(){
    if(!started){
        document.getElementById("counter").innerHTML = `Level ${level}`;
        nextSequence();
        started = true;
    }
    
})


// Click Function On Button
let button = Array.from(document.getElementsByClassName("btn"))
button.forEach(btn=>{
    btn.addEventListener("click", function(){
        let userChosenColour = btn.id;
        animatePress(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);

        checkAnswer(userClickedPattern.length-1)
        
    });
});

// Alternative
// $(".btn").click(function(){
//     let userChosenColour = $(this).attr("id");
//     console.log(userChosenColour)
//     userClickedPattern.push(userChosenColour);
// })





// Play Sound
function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}



// BackGround Animation
function animatePress(currentColour){
    let element = document.getElementById(currentColour)
    element.classList.add("pressed");
    setTimeout(()=>{
        element.classList.remove("pressed")
    },200)
}



// Functionality
function nextSequence(){

    userClickedPattern = []
    level++;
    document.getElementById("counter").innerHTML = `Level ${level}`;
    
    let random = Math.floor(Math.random()*4)
    let randomChosenColour = buttonColours[random];
    gamePattern.push(randomChosenColour)
    let audio = new Audio(`sounds/${randomChosenColour}.mp3`);
    audio.play();
    $("#" + randomChosenColour).fadeOut(50).fadeIn(100).fadeOut(50).fadeIn(100);

    
}



function checkAnswer(currentLevel){
    console.log(currentLevel)
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        let gameOver = document.getElementById("startGame")
        gameOver.innerHTML = "Game<br />Over"
        gameOver.style.backgroundColor = "red"
        gameOver.style.fontSize = "1.1rem"
        document.getElementById("level-title").innerHTML = "Press Any Key to Restart"

        $("#startGame").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound("wrong")
        
        document.addEventListener("keypress", function(){
            startOver()
        })
    }
}



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    location.reload()
}

