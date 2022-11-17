
const fruit = ["apple","banana","cherry","grapes","mango","orange","peach","pear","watermelon"];
const elem = document.getElementById("fruit");  

var score = 0;
var life = 3;
var deadPoint = 0;
var cut = new Audio('audio/Knife-Stab.mp3');
var gameStatus = true ;
let id = null;
var interval;

function resetGlobalVariables(){
    score = 0;
    life = 3;
    deadPoint = 0;
    document.getElementById("game-over").classList.remove("show");
    gameStatus = true ; 
    document.getElementById("score").innerHTML = 0;
    removeAllChildNodes(elem);
    clearInterval(id);
    clearInterval(interval);
    
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
        
function lifeCount(count){
    while (document.getElementById("scorePoints").hasChildNodes()){
        document.getElementById("scorePoints").removeChild(document.getElementById("scorePoints").lastChild);
    }
    for(var i = 0;i<count;i++){
        let img = document.createElement("img");
        img.src= "images/heart.jpeg";
        document.getElementById("scorePoints").append (img);
    }
}


document.getElementById("startBtn").onclick = function(){
    if(gameStatus){
        start();
        document.getElementById("startBtn").innerHTML = "Restart"
        gameStatus = false ;
    } else {
        resetGlobalVariables();
        console.log("restart press");
        start();
        
    }
}

function start(){
    autoFall();
    gameStatus = false ;
}

function autoFall(){
    window.clearInterval(interval);
    interval = setInterval(() => {
        fall();  
        console.log(life + "in autofall");
        console.log( life - deadPoint  + " : life-deadPoint in auto fall ");
        lifeCount(life-deadPoint);
        
        if ( life - deadPoint  == 0) {
            elem.removeChild(elem.children[0]);
            window.clearInterval(interval);
            gameOver();

        }              
    }, 4000);
}
    
function fall(){
    var fruitRandom = fruit[Math.floor(Math.random() * 9)];
    let img = document.createElement("img");
    img.src= "images/"+fruitRandom+".jpeg";
    elem.append(img);
    if(elem.childElementCount > 1){
        elem.removeChild(elem.children[0]);
        deadPoint++;
    }
        
    let posy = -50;
    let posx = Math.floor(Math.random() * 90);
    elem.style.left = posx + "%"; 
    clearInterval(id);
    id = setInterval(down, 1);
    
    function down() {
        
        if (posy == 550) {
        clearInterval(id);
        } else {
        posy++; 
        elem.style.top = posy + "px"; 
        }
    }

    elem.onmouseover = function(){
        score++;
        cut.play();
        // console.log(score +";"+life + ";" + deadPoint);
        document.getElementById("score").innerHTML = score;
        $("#fruit img").hide( "explode", {pieces: 9 }, 500 );
        if (elem.hasChildNodes()) {
            elem.removeChild(elem.children[0]);
            }
        
    }
    
    
}

function gameOver(){
    document.getElementById("game-over").className += " show";
    document.getElementById("last-score").innerHTML = score;
}