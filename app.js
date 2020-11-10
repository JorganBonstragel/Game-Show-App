//Select Elements
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = phrase.querySelector('ul');
const phraseLetters = phraseUl.children;
const hearts = document.getElementsByTagName('img');
//Start Screen Elements
const startScreen = document.getElementById('overlay');

//Initilize Variables
let missed = 0;
let heartCounter = 4;
let phrases = ['peach cat', 'imposter cat', 'pico bird', 'blue bird', 'trouble cat'];

//Randomly select phrase from phrases and return phrase as array
function getRandomPhraseAsArray(phrases){
    const index = Math.floor((Math.random()* phrases.length));
    let phrase = phrases[index];
    console.log(`phrase = ${phrase}`);
    phraseArray = phrase.split('');
    return phraseArray;
}

//Add Selected Phrase to UL and assign className based on text content
function addPhraseToDisplay(phraseArray){
    for (let i = 0; i < phraseArray.length; i++) {
        const item = document.createElement('li');
        item.textContent = phraseArray[i];
        phraseUl.appendChild(item);
        if(item.textContent == ' '){
            item.className = 'space';
        }
        else{
            item.className = 'letter';
        }
    }
 }

//Checks if keypress value matches Phrase Value 
 function checkLetter(keyPress){
    let match = false;
    for (let i = 0; i < phraseArray.length; i++) {
        if(keyPress === phraseArray[i]){
            phraseLetters[i].className = 'letter show'
            match = true;
        }
    }
    return match;
}

//counts missed keypresses and removes heart
function missCheck(keypress){
    if(!checkLetter(keyPress)){
        missed++;
        hearts[heartCounter].src = 'images/lostHeart.png';
        heartCounter--;
    }
}

function resetGame(){
    //reset variables for game restart
     missed = 0;
     heartCounter = 4;
    const allButtons = document.querySelectorAll('button');
    //remove previous phrase from display
    phraseUl.innerHTML = '';
    //Enable all keyboard buttons
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = false;
    }
    //reset hearts
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = 'images/liveHeart.png';
    }
}

//Checks if Player wins or loses the game and displays either win or lose screen
function winCheck(){
    //page elements
    const title = startScreen.querySelector('.title');
    const resetBtn = startScreen.querySelector('.btn__reset');
    const letters = phraseUl.querySelectorAll('.letter');
    const correct = phraseUl. querySelectorAll('.show');
    //Checks for Win
    if(letters.length === correct.length){
        startScreen.style.display = 'flex';
        startScreen.className = 'start win' 
        title.textContent = 'You Win';
        resetBtn.textContent = 'Reset';
        resetGame();
    }
    //Checks for Game Over
   else if(missed == 5){
        startScreen.style.display = 'flex';
        startScreen.className = 'start lose'
        title.textContent = 'Game Over';
        resetBtn.textContent = 'Try Again';
        resetGame();
    }
}

//Start screen event handler
startScreen.addEventListener('click', () =>{
    //Hide Overlay 
    startScreen.style.display = 'none';
    //select Random phrase and initailize phrase display
    getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    

});

//onscreen keyboard event handler
keyboard.addEventListener('click', (e) =>{
    if(e.target.tagName === "BUTTON"){
        keyPress = e.target.textContent;
        e.target.disabled = true;
        console.log(`Key Press - ${keyPress}`);
        checkLetter(keyPress);
        missCheck(keyPress);
        winCheck();
    }
});



