// var titleMenu = document.getElementById("title-menu");
// var menuImg = document.getElementById("img");

//const { clear } = require("console");

// titleMenu.onmouseover = function() {
//    menuImg.animate([
//        {transform: 'margin-'}
//    ])
// };




gameStatut = true;
document.addEventListener('keydown', logKey);
function logKey(e) {
    if(gameStatut){
        if(e.keyCode == "39"){
            turnRight(rover)
        }else if(e.keyCode == "38"){
            moveForward(rover)
        }else if(e.keyCode == "40"){
            moveBackward(rover)
        }else if(e.keyCode == "37"){
            turnLeft(rover)
        }    
    }
}
timeLeft = 999999999999999999999999
var score = 0
var randomCase = 0

function getTimeLeft(){
    timeLeft--;
    timeLeftHTML = document.getElementById('timeLeft');
    timeLeftHTML.innerHTML = "Temps restant: "+ timeLeft; 
    if(timeLeft == 0){
        gameStatut = false;
        gameState()
    }
}

function changeGameState(){
    gameStatut = true;
    gameState()

}
nombrePartie = 0
function gameState(){
    resultHTML = document.getElementById('result');
    gameHTML = document.getElementById('app-game');
    menuHTML = document.getElementById('menu');
    timeLeft = 60
    score = 0;
    scoreHTML = document.getElementById('score')
    scoreHTML.innerHTML = "Score: "+score; 
    nombrePartie++
    if(!gameStatut){
        resultHTML.style.display = "flex";
        gameHTML.style.display = "none";
    }else{
        resultHTML.style.display = "none";
        gameHTML.style.display = "flex";
        menuHTML.style.display ="none";
        if(nombrePartie > 1){
            clearCase()   
        }
        setInterval(newBonus, 15000)
    }
}

setInterval(getTimeLeft, 1000)
function clearCase(){
    for(i=0; i<10; i++){
        for(j=0; j<10; j++){
            caseX = i.toString()
            caseY = j.toString()
            pos = caseY+ caseX
            caseProute = document.getElementById(pos)
            caseProute.style.background = ""
            caseProute.style.border = "1px black solid"    
            htmlCase()    
        }
    }
}

var travelLog = []
var grid = [
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ],
    ["", "", "", "", "", "", "", "", "", "" ]
];
var rover = {
    direction: "E",
    x: 0,
    y: 0,
}


function newItem(){
    var randomCaseY = Math.floor(Math.random()* 9)
    var randomCaseX= Math.floor(Math.random() * 9)
    randomCase = randomCaseY.toString() + randomCaseX.toString();
    var getHtmlCase = document.getElementById(randomCase)
    getHtmlCase.style.backgroundImage = "url('img/lune.png')"
    getHtmlCase.style.backgroundPosition = "center"
    getHtmlCase.style.backgroundSize ="35px"
    getHtmlCase.style.backgroundRepeat = "no-repeat"

    scoreHTML = document.getElementById('score')
    scoreHTML.innerHTML = "Score: "+score; 
    finalScoreHTML = document.getElementById('finalScore')
    finalScoreHTML.innerHTML = "Score: "+score
}
newItem()
var randomCaseBonus = 0
function newBonus(){
    var randomCaseY = Math.floor(Math.random() * 10)
    var randomCaseX= Math.floor(Math.random() * 10)
    randomCaseBonus = randomCaseY.toString() + randomCaseX.toString();
    var getHtmlCase = document.getElementById(randomCaseBonus)

    getHtmlCase.style.backgroundImage = "url('img/time.png')"
    getHtmlCase.style.backgroundPosition = "center"
    getHtmlCase.style.backgroundSize ="35px"
    getHtmlCase.style.backgroundRepeat = "no-repeat"
}




function htmlCase(){
    roverX = rover.x.toString()
    roverY = rover.y.toString()
    pos = roverY+ roverX
    var getCase = document.getElementById(pos)
    getCase.style.backgroundImage = "url('img/rover.png')"
    getCase.style.backgroundPosition = "center"
    getCase.style.backgroundSize = "50px";
    getCase.style.zIndex = "9999"

    if(pos === randomCase){
        score++ 
        console.log("score", score)
        newItem()
    }else if(pos === randomCaseBonus){
        timeLeft += 10;

    }


    if(rover.direction == "N"){
        getCase.style.transform = "rotate(90deg)"
    }
    else if(rover.direction == "S"){
        getCase.style.transform = "rotate(-90deg)"
    }
    else if(rover.direction == "W"){
        getCase.style.transform = "rotate(0deg)"
    }
    else if(rover.direction == "E"){
        getCase.style.transform = "scaleX(-1)"
    }
} 
htmlCase()

function getEntrie(){
    prompt.start()
    prompt.get('commands', (err, result) =>{
        commands = result.commands;
        pilotRover(commands)
    })
}

function turnRight(rover){
    console.log('right')
    if(rover.direction === "N"){
         rover.direction = "E"
    }
    else if(rover.direction === "E"){
        rover.direction = "S";
    }
    else if(rover.direction === "S"){
        rover.direction = "W"
    }
    else if(rover.direction === "W"){
        rover.direction = "N"
    }
    grid[rover.y][rover.x] = rover.direction
    htmlCase()
}
grid[rover.y][rover.x] = rover.direction

function turnLeft(rover){
    console.log('left')
    if(rover.direction === "N"){
        rover.direction = "W"
    }
    else if(rover.direction === "W"){
        rover.direction = "S"
    }
    else if(rover.direction === "S"){
        rover.direction = "E"
    }
    else if(rover.direction === "E"){
        rover.direction = "N"
    }
    grid[rover.y][rover.x] = rover.direction
    htmlCase()
}
function changeCase(caseProute){
    caseProute.style.background = ""
    caseProute.style.border = "1px black solid"
}
function moveBackward(rover){
    grid[rover.y][rover.x] = rover.direction
    if(rover.direction == "N"  && rover.y !== 9){
        rover.y += 1;
        rover.x = rover.x
    }else if(rover.direction == "S" && rover.y !== 0){
        rover.y -= 1
        rover.x = rover.x
    }else if(rover.direction == "E" && rover.x !== 0){
        rover.y = rover.y
        rover.x -= 1
    }else if(rover.direction == "W" && rover.x !== 9 ){
        rover.y = rover.y
        rover.x += 1
    }
    
    if(rover.direction == "W" && rover.x !== 0){
        grid[rover.y][rover.x-1] = ""
    }
    if(rover.direction == "E" && rover.x !== 9){
        grid[rover.y][rover.x+1] = ""
    }
    if(rover.direction == "N" && rover.y !== 0){
        grid[rover.y-1][rover.x] = ""
    }
    if(rover.direction == "S" && rover.y !== 9){
        grid[rover.y+1][rover.x] = ""
    }

    if(rover.direction == "W" && rover.x !== 0){
        roverX = rover.x-1
        ancienPos = rover.y.toString() + roverX;
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)

    }
    if(rover.direction == "E" && rover.x !== 9){
        roverX = rover.x+1
        ancienPos = rover.y.toString() + roverX ; 
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "N" && rover.y !== 0){
        roverY = rover.y-1
        ancienPos = roverY + rover.x.toString()
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "S" && rover.y !== 9){
        roverY = rover.y+1
        ancienPos = roverY + rover.x.toString()
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }

    grid[rover.y][rover.x] = rover.direction
    htmlCase()

}
function moveForward(rover){
    if(rover.direction == "N"  && rover.y !== 0){
        rover.y -= 1;
        rover.x = rover.x
    }else if(rover.direction == "S"  && rover.y !== 9){
        rover.y += 1
        rover.x = rover.x
    }else if(rover.direction == "E" && rover.x < 9){
        rover.y = rover.y
        rover.x += 1
    }else if(rover.direction == "W" && rover.x > 0 ){
        rover.y = rover.y
        rover.x -= 1
    }
    
    if(rover.direction == "W" && rover.x !== -1){
        roverX = rover.x+1
        ancienPos = rover.y.toString() + roverX;
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "E" && rover.x !== 10){
        roverX = rover.x-1
        ancienPos = rover.y.toString() + roverX ; 
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "N" && rover.y !== -1){
        roverY = rover.y+1
        ancienPos = roverY + rover.x.toString()
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "S" && rover.y !== 10){
        roverY = rover.y-1
        ancienPos = roverY + rover.x.toString()
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }

    grid[rover.y][rover.x] = rover.direction
    htmlCase()

}



function pilotRover(commands){
    for(i=0; i<commands.length; i++){
        if (commands[i] == "l"){
            travelLog.push('Gauche')
            turnLeft(rover)
            console.log(rover)
        }
        if (commands[i] == "r"){
            travelLog.push('Droite')
            turnRight(rover)
        }
        else if (commands[i] == "f"){
            travelLog.push('Avance')
            moveForward(rover)
        }
        else if (commands[i] == "b"){
            travelLog.push('Recule')
            moveBackward(rover)
        }else{
            console.log("La commande n'est pas valide ! Arret du pilotage de proute")
            return;
        }
    }
    console.log(travelLog.join(' - '))
    getEntrie()
}

