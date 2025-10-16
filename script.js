const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls img");

let foodX,foodY;
let snakeX=5,snakeY=10;
let velocityX=0,velocityY=0;
let snakeBody=[];
let gameOver=false;
let setIntervalId;
let score=0;
let highScore=localStorage.getItem("high-score") || 0;
highScoreElement.innerText=`High score : ${highScore}`;

const changeFoodPosition = () =>{
    //passing a random 0-30 value as food position
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const changeDirection = (e) => {
    if(e.key==="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key==="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }else if(e.key==="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key==="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}
const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game over!Please try again");
    location.reload();
}

//move the snake head on each mouse click
controls.forEach(control=>{
    control.addEventListener("click", () => {
        console.log(control.dataset.key)
        changeDirection({key:control.dataset.key})
    });
});

const initGame = () =>{
    if(gameOver) return handleGameOver();
    let htmlMarkUp=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;


    //when the snake hits the wall, game over and game stops
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        gameOver=true;
    }

    //checking if the snake hit the food
    if(snakeX===foodX && snakeY===foodY){
        snakeBody.push([snakeX,snakeY]);
        changeFoodPosition();

        score++;
        highScore=score >= highScore ? score : highScore;
        scoreElement.innerText=`Score : ${score}`;
        highScoreElement.innerText=`High Score : ${highScore}`;
        localStorage.setItem("high-score",highScore);
    }

    if(snakeBody.length>=2){
        for(let i=snakeBody.length-1;i>0;i--){
        //shifting forward the values of the elements in the snake body by one
        snakeBody[i]=snakeBody[i-1]; 
        }
    }

    snakeBody[0]=[snakeX,snakeY]; //setting first element of snake body to current snake position   


    if(snakeBody.length>=1){
        for(let i=0;i<snakeBody.length;i++){
        //adding a div for each part of the snake body
        htmlMarkUp+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        //if the snake head hit the body, show game over
        if(i !== 0 && snakeBody[0][0]===snakeBody[i][0] && snakeBody[0][1]===snakeBody[i][1]){
            gameOver=true;
        }
        }
    }

    //updating the snake's head position based on current velocity
    //for keyboard event
    snakeX=snakeX+velocityX;
    snakeY=snakeY+velocityY;
    
    playBoard.innerHTML=htmlMarkUp;
}


changeFoodPosition();
setIntervalId=setInterval(initGame,125); //125ms=speed of snake
document.addEventListener("keydown",changeDirection);
