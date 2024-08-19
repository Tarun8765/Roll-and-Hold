// 'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const restart = document.querySelector('.btn--new');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

//Initial condition
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
init();

//Rolling dice functionality
btn_roll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random number
    const diceRoll = Math.trunc(Math.random() * 6 + 1);

    // 2.Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    // 3. Check if the number is 1
    if (diceRoll !== 1) {
      //Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // change latter
    } else {
      //switch to new player
      switchPlayer();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    score[activePlayer] += currentScore;
    //score[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2. Check if score>=100? player win: switch player
    if (score[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// inplementing new game button

restart.addEventListener('click', init);
