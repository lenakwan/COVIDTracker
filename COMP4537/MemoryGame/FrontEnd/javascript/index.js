function Level(level, matrix_size, win_condition){
    this.level = level;
    this.matrix_size = matrix_size;
    this.win_condition = win_condition;
}

let totalClicks = 0;
let currentClicks = 0;
let correctClicks = 0;
let buttonsArray = [];
let levels = [];
let nextLevel = 0;
let correctButtons =[];
let degree = 0;

levels.push(new Level(1, 2, 2));
levels.push(new Level(2, 3, 3));
levels.push(new Level(3, 3, 4));
levels.push(new Level(4, 4, 4));
levels.push(new Level(5, 4, 5));
levels.push(new Level(6, 5, 5));
levels.push(new Level(7, 5, 6));
levels.push(new Level(8, 6, 6));
levels.push(new Level(9, 6, 7));
levels.push(new Level(10, 7, 7));
levels.push(new Level(11, 7, 8));

function Button(boolean){
    if (boolean == true){
        this.color = "#d2f5e3";
        this.score = 1;
    }
    else{
        this.color = "#d9adad";
        this.score = -1
    }
}

terminateGame = () => {
    console.log("clicked Terminate");
    window.location.href = "summary.html";
}
hideTileColors = () => {
    let gameDiv = document.getElementById("play-state");
    let buttons = gameDiv.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++){
        if(buttons[i].innerHTML == "1"){
            console.log('flipping');
            setTimeout(flipButton(buttons[i], "#B2D9EA", 180), 500);
        }
    }
}

showCorrectTile = () => {
    let gameDiv = document.getElementById("play-state");
    let buttons = gameDiv.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++){
        if(buttons[i].innerHTML == "1"){
            setTimeout(flipButton(buttons[i], "#d2f5e3", 0), 100);
            correctButtons.push[buttons[i]];
        }
    }
    
}



function onClick(){
    let content = parseInt(this.innerHTML);
    let color = "";
    if(content>=0){
        color = "#d2f5e3";
    }
    else{
        color = "#d9adad";
    }
    flipButton(this, color,0);
    updateScore(content, color);
    this.disabled = 'disabled';
    if(content>=0){
        correctClicks += 1;
        console.log(correctClicks)
    }
    currentClicks += 1;
    console.log("current" + currentClicks)
    
    setTimeout(function(){
        checkGameCondition(totalClicks);
    }, 500);
    
}

flipButton= (buttonObject, color, degrees) => {
    let degree = degrees;
    degree += 180;
    buttonObject.style.transform = "rotateY("+ degree + "deg)";
    buttonObject.style.transitionDuration = "0.5s";
    buttonObject.style.color = color;
    buttonObject.style.background = color;
}

function clearScreen(){
    let div = document.getElementById("play-state");
    div.innerHTML = "";
}

function checkGameCondition(totalClicks){
    if(correctClicks == totalClicks){
        bonusScore(totalClicks);
        nextLevel += 1;
        generateLevel(levels[nextLevel]);
        
    }
    if(currentClicks == totalClicks && correctClicks != totalClicks){
        if(nextLevel > 0){
            nextLevel -= 1;
        }
        generateLevel(levels[nextLevel]);
    }
    
}

bonusScore = (bonus) => {
    let scoreB = document.getElementById("score");
    let addScore = document.getElementById("tempScore");
    addScore.innerHTML= "Bonus: +" + String(bonus);
    let currentScore = parseInt(scoreB.innerHTML) + bonus;
    scoreB.innerHTML = String(currentScore);
    addScore.style.color = "#d2f5e3";
    fadeInOut(addScore);
}

parentWidth= (divInput) => {
    let x = document.getElementById(divInput).parentNode.parentElement.clientWidth;
    console.log(x);
    return x;
}

function generateButtons(){
    let tileColor = "#B2D9EA";
    let width =  parentWidth("play-state");
    let buttonSize = width/16;
    shuffle(buttonsArray);
    console.log("length" + buttonsArray.length);
    let mod = Math.sqrt(buttonsArray.length);
    let gameDiv = document.getElementById("play-state");
    gameDiv.removeAttribute('style');
    while(buttonsArray.length>0){
        console.log(i);
        if (buttonsArray.length % mod == 0){
            let spacing = document.createElement("BR"); 
            gameDiv.appendChild(spacing);
        }
        let currentButton = buttonsArray.pop();
        let button = document.createElement("BUTTON");
        button.style.height = buttonSize;
        button.style.width = buttonSize;
        button.setAttribute("id", "gameButtons");
        button.style.margin = "1px";
        button.innerHTML = String(currentButton.score);
        button.style.color = tileColor;
        button.style.background = tileColor;
        button.addEventListener("click",onClick);
        gameDiv.appendChild(button);
        
    }
    setTimeout (function(){
        gameDiv.style.transform = 'rotate(90deg)';
        gameDiv.style.transition = '.2s';
        hideTileColors();
        }, 1000);
    
}

shuffle = (array) =>{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateLevel(level){
    clearScreen();
    correctClicks = 0;
    currentClicks = 0;
    totalClicks = level.win_condition;
    console.log("you have a total of " +totalClicks);
    for(i = 0; i < Math.pow(level.matrix_size, 2)-level.win_condition; i++){
        buttonsArray.push(new Button(false));
        console.log("button" + i + "created");
    }
    for(i = 0; i < level.win_condition; i++){
        buttonsArray.push(new Button(true));
        console.log("button" + i + "created");
    }
    generateButtons();
    setTimeout(showCorrectTile, 200);
    displayBorders();
}

displayScore= (score)=>{
    let scoreBoard = document.getElementById("score");
    scoreBoard.innerHTML = String(score);
}

updateScore= (score, color)=>{
    let scoreB = document.getElementById("score");
    let addScore = document.getElementById("tempScore");
    addScore.innerHTML= String(score);
    let currentScore = parseInt(scoreB.innerHTML) + score;
    scoreB.innerHTML = String(currentScore);
    addScore.style.color = color;
    fadeInOut(addScore);
    if(currentScore < 0){
        setTimeout(terminateGame, 200);
    }
}

fadeInOut= (object) => {
    object.style.visibility = "visible";
    setTimeout(function(){
        object.style.visibility = "hidden";
    }, 500);
}

function displayBorders (){
    document.getElementById("terminate").style.display = "block";
    document.getElementById("play-state").style.visibility = "visible";
}

function initiateGame(){
    let score = 0;
    displayScore(score);
    let startDiv = document.getElementById("start-state");
    startDiv.style.display = "none";
    generateLevel(levels[nextLevel]);
    let terminateButton = document.getElementById("terminate");
    terminateButton.addEventListener("click",terminateGame);
}