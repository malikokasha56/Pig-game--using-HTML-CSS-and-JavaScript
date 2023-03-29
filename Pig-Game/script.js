'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curr0 = document.querySelector('#current--0');
const curr1 = document.querySelector('#current--1');
const hold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');

score0El.textContent = score1El.textContent = 0;
diceEl.classList.add('hidden');
let activePlayer = 0;
let currScore = 0;
let scores = [0, 0];

const diceUpdation = num => {
  diceEl.src = `/dice-${num}.png`;
};

const changeActivation = number => {
  document.querySelector(`.player--${number}`).classList.remove('player--active');
  document.querySelector(`#current--${number}`).textContent = 0;
  if (activePlayer == 0) activePlayer = 1;
  else activePlayer = 0;
  currScore = 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

const resetting = () => {
    score0El.textContent = score1El.textContent = curr0.textContent = curr1.textContent =0;
    diceEl.classList.add('hidden');
    scores = [0,0]
    currScore =0
    activePlayer = 0
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
};

const holdingEvent = number => {
  scores[number] += currScore;
  if (number == 0) score0El.textContent = scores[number];
  else score1El.textContent = scores[number];

  if (scores[number] >= 100) {
    document.querySelector(`.player--${number}`).classList.add('player--winner');
} else {
    changeActivation(activePlayer);
}
};

rollDice.addEventListener('click', () => {
  diceEl.classList.remove('hidden');

  let random = Math.trunc(Math.random() * 6) + 1;
  diceUpdation(random);
  if (random !== 1) {
      currScore = currScore + random;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
} else {
    changeActivation(activePlayer);
}
});

hold.addEventListener('click', () => {
    holdingEvent(activePlayer);
});

newGame.addEventListener('click', () => {
    resetting();
});
