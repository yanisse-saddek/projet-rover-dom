// var titleMenu = document.getElementById("title-menu");
// var menuImg = document.getElementById("img");

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
function getTimeLeft(){
    timeLeft--;
    if(timeLeft == 0){
        gameStatut = false;
        gameState()
    }
}
function changeGameState(){
    gameStatut = true;
    timeLeft = 10
    score = 0
    gameState()
}
function gameState(){
    resultHTML = document.getElementById('result');
    gameHTML = document.getElementById('app-game');
    menuHTML = document.getElementById('menu');

    if(!gameStatut){
        resultHTML.style.display = "flex";
        gameHTML.style.display = "none";
    }else{
        resultHTML.style.display = "none";
        gameHTML.style.display = "flex";
        menuHTML.style.display ="none"
    }
    scoreHTML = document.getElementById('score')
    scoreHTML.innerHTML = "Score: "+score; 
    finalScoreHTML = document.getElementById('finalScore')
    finalScoreHTML.innerHTML = "Score: "+score
    timeLeftHTML = document.getElementById('timeLeft');
    timeLeftHTML.innerHTML = "Temps restant: "+ timeLeft; 


}
setInterval(getTimeLeft, 1000)


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
var score = 0
var randomCase = 0

function newItem(){
var randomCaseY = Math.floor(Math.random() * 9)
var randomCaseX= Math.floor(Math.random() * 9)
 randomCase = randomCaseY.toString() + randomCaseX.toString();
var getHtmlCase = document.getElementById(randomCase)
getHtmlCase.style.backgroundImage = "url('img/lune.png')"
getHtmlCase.style.backgroundPosition = "center"
getHtmlCase.style.backgroundSize ="35px"
getHtmlCase.style.backgroundRepeat = "no-repeat"
}

newItem()
function htmlCase(){
    roverX = rover.x.toString()
    roverY = rover.y.toString()
    pos = roverY+ roverX
    var getCase = document.getElementById(pos)
    getCase.style.backgroundImage = "url('img/rover.png')"
    getCase.style.backgroundPosition = "center"
    getCase.style.backgroundSize = "50px"

    if(pos === randomCase){
        score++ 
        console.log("score", score)
        newItem()
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
    console.table(grid);
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
    console.table(grid)
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
        console.log("--->",ancienPos)
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
    console.table(rover.direction)
    console.log('-----------------------------')
    console.table(grid)
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
    console.log('y', rover.y, 'x', rover.x)
    
    if(rover.direction == "W" && rover.x !== -1){
        roverX = rover.x+1
        ancienPos = rover.y.toString() + roverX;
        caseProute = document.getElementById(ancienPos)
        changeCase(caseProute)
    }
    if(rover.direction == "E" && rover.x !== 10){
        roverX = rover.x-1
        ancienPos = rover.y.toString() + roverX ; 
        console.log("--->",ancienPos)
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

