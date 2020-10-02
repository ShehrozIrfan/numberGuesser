/*
Game Function:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct anser if loose 
- Let player choose to play again
*/

//Game Values

let minNum = 1,
    maxNum = 10,
    guessLeft = 3,
    winningNum = getRandomNumber (minNum, maxNum);

//UI values
const game = document.querySelector('.game'),
      min_num = document.querySelector('.min-num'),
      max_num = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

//Assigning values to min_num and max_num
min_num.innerHTML = minNum;
max_num.innerHTML = maxNum;



//play again event listener
game.addEventListener('mousedown', function (e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //check for invalid inputs
    if(isNaN(guess) || guess < minNum || guess > maxNum) {
        showMessage('Please enter number between ' + minNum + ' and ' + maxNum , 'red');
        guessInput.value = '';
    } else {
         //check if win
    if(guess === winningNum) {
        gameOver(true,`${winningNum} is correct, YOU WIN!`);
    } else {
        //reduce the guess left by 1.
        guessLeft -= 1;
        //if guessLeft equals '0' then game is over 
        if(guessLeft === 0) {
            //game over
            gameOver(false, `Game over, YOU LOST! Correct number was ${winningNum}.`);
        } else {
            //if guesses remain then game continue
            if(guess > winningNum) {
                showMessage(`${guess} is greater than winning number. ${guessLeft} guesses left.`, 'red');
            }
            if(guess < winningNum) {
                showMessage(`${guess} is smaller than winning number. ${guessLeft} guesses left.`, 'red');
            }
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
        } 
    }
    }
});

//random number generating
function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//displaying message
function showMessage (msg, color) {
    message.innerHTML = msg;
    message.style.color = color;
}

//game over 
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //disable the input
    guessInput.disabled = true;
    //changing the border color
    guessInput.style.borderColor = color;
    //changing the text color
    message.style.color = color;
    //setting the message text
    message.innerHTML = msg;

    //play-again logic
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}