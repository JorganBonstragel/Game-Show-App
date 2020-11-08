//Select Elements
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = phrase.querySelector('ul');
const phraseLetters = phraseUl.children;
const hearts = document.getElementsByClassName('.tries')
//Start Screen Elements
const startScreen = document.getElementById('overlay');

//Initilize Variables
let missed = 0;
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
    for (let i = 0; i < phraseArray.length; i++) {
        if(keyPress === phraseArray[i]){
            phraseLetters[i].className += 'show'
            
        }
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

//keyboard event handler
keyboard.addEventListener('click', (e) =>{
    if(e.target.tagName === "BUTTON"){
        keyPress = e.target.textContent;
        keyPress.disabled = true;
        console.log(`Key Press - ${keyPress}`);
        checkLetter(keyPress);
        if(checkLetter()){

        }
        else{
            missed++
           
        }
    }
});



