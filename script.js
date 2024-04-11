'use strict';

// Selecting elements 
const dice = document.querySelector('.dice');
const scoreEles = document.querySelectorAll('.score');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let currentEle = document.getElementById('current--0');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');


// Starting Configuration
dice.classList.add('hidden')
scoreEles[0].textContent = 0;
scoreEles[1].textContent = 0;


// Game logic
let currentScore = 0;
let activePlayer = 0;
let scores = [0,0];
let isPlaying = true;


btnRoll.addEventListener('click',function (){
    if(isPlaying)
    {
        // Generate random number 
        const diceNumber = Math.trunc(Math.random()*6)+1;

        // Display the dice images
        dice.src = `dice-${diceNumber}.png`;
        dice.classList.remove('hidden');

        // Check posible winner
        if(diceNumber === 1)
        {
            player0.classList.toggle('player--active');
            player1.classList.toggle('player--active');
            currentEle = document.getElementById(`current--${activePlayer}`)
            currentEle.textContent = 0;
            currentScore = 0;
            // Switch Player
            activePlayer = activePlayer === 0 ? 1 : 0;
        }
        else{
        // Update current score 
            currentEle = document.getElementById(`current--${activePlayer}`)
            currentScore += diceNumber;
            currentEle.textContent = currentScore;
        }
    }
});

btnHold.addEventListener('click',function () {
    if(isPlaying)
    {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        currentEle = document.getElementById(`current--${activePlayer}`)
        currentEle.textContent = 0;
        currentScore = 0;
        if(scores[activePlayer] >= 50)
        {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            dice.classList.add('hidden');
            isPlaying =false;
        }
        // Switch Player
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentEle = document.getElementById(`current--${activePlayer}`)
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
    }
});

btnNew.addEventListener('click',function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer = 0;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    scores = [0,0];
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    currentScore = 0;
    isPlaying = true;
    dice.classList.add('hidden');
});