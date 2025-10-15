const playBoard=document.querySelector(".play-board");

let foodX,foodY;
let snakeX=5,snakeY=10;
let velocityX=0,velocityY=0;
let snakeBody=[];

const changeFoodPosition = () =>{
    //passing a random 0-30 value as food position
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const changeDirection = (e) => {
    if(e.key==="ArrowUp"){
        velocityX=0;
        velocityY=-1;
    }else if(e.key==="ArrowDown"){
        velocityX=0;
        velocityY=1;
    }else if(e.key==="ArrowLeft"){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key==="ArrowRight"){
        velocityX=1;
        velocityY=0;
    }
}

const initGame = () =>{
    let htmlMarkUp=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    //checking if the snake hit the food
    if(snakeX===foodX && snakeY===foodY){
        snakeBody.push([snakeX,snakeY]);
        console.log('after pushing:',snakeBody);
        changeFoodPosition();
    }

    if(snakeBody.length>=2){
        for(let i=snakeBody.length-1;i>=0;i--){
        //shifting forward the values of the elements in the snake body by one
        snakeBody[i]=snakeBody[i-1]; 
        }
    }

    snakeBody[0]=[snakeX,snakeY]; //setting first element of snake body to current snake position   


    if(snakeBody.length>=1){
        for(let i=0;i<snakeBody.length;i++){
        //adding a div for each part of the snake body
        htmlMarkUp+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        }
    }

    //updating the snake's head position based on current velocity
    //for keyboard event
    snakeX=snakeX+velocityX;
    snakeY=snakeY+velocityY;
    
    playBoard.innerHTML=htmlMarkUp;
}


changeFoodPosition();
setInterval(initGame,125); //125ms=speed of snake
document.addEventListener("keydown",changeDirection);
