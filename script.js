//gameStart on key press
let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];//to select color for choosing random button

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");//change the name of the level

let btnStrt = document.querySelector("button");//start button

btnStrt.addEventListener("click", function() {
    if(started == false){//To start game only once
        console.log("game is started");
        started = true;

        levelUp();//proceed to next lvl
    }
});
// btnFlash+level-1
function gameFlash(btn){//to flash the box both on user click and change of level
    btn.classList.add("gameflash");//added .gameflash in css to change color to white
    setTimeout(function () {
        btn.classList.remove("gameflash");//to just flash and return to original colour        
    } ,250);

}function userFlash(btn){//to flash the box in level 2 and display black color
    btn.classList.add("userFlash");//added .userflash in css to change color to black
    setTimeout(function () {
        btn.classList.remove("userFlash");//to just flash and return to original colour        
    } ,250);
}
function levelUp() {
    userSeq = [];//so that the user shold enter all colors on each lvl

    level++;//increses level
    h2.innerText = `level ${level}`;//change name of level diplayed
    audio();//add start audio
    // random button choose
    let randIdx = Math.floor(Math.random() * 3);//generate random
    let randColor = btns[randIdx];//select random color
    let randbtn = document.querySelector(`.${randColor}`)//access button of that class

    gameSeq.push(randColor);//add random color to sequence(system level)
    console.log(gameSeq);//print the sequence
    gameFlash(randbtn);//flash button
}

// LEVEL INCREASE ON PRESS

function btnPress (idx) {//button press
    let btn = this;
    userFlash(btn);// flash the pressed button in black
    // console.log(this);

    userColor = btn.getAttribute("id");//get user input color using id(user level)
    userSeq.push(userColor);// add user color to sequence (user level)
    audioclick();//call click audio function
    chkbutton(userSeq.length-1);//to check the previous color and then change
}

function chkbutton(idx){//check the user input is correct or not
    // console.log("current level :",level);
    // let idx = level - 1;//store the value of previous level

    if(userSeq[idx] === gameSeq[idx]){//check the sequence
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score Was <b>${level}</b> <br>Press any key to START`;//display SCORE
        document.querySelector("body").style.backgroundColor = "red";//display red screen after game over
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";//cahnge it to normal again after
        },150);
        audiowrong();
        reset();//to start game again
    }
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);//button identified
    
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function HighScr(lvl) {
    if (lvl > highScore) {
      highScore = lvl;
    }
    return highScore;
  }
  function audio() {
    let msc = new Audio("level.mp3");
    msc.play();
  }
  
  function audiowrong() {
    let msc = new Audio("buzzer.mp3");
    msc.play();
  }
  
  function audioclick() {
    let msc = new Audio("click-button.mp3");
    msc.play();
  }