/*
 * Create a list that holds all of your cards
 */

const symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

const deck = document.querySelector('.deck');
const timer = document.querySelector('.timer');
let cards = [];
let match = [];
let currentTimer;

function startGame() {
  shuffle(symbols);
  for (let i=0; i<symbols.length; i++) {
    const card = document.createElement('li');
    const icon = symbols[i];
    const markup = `<i class="${icon}"></i>`;
    card.classList.add('card');
    card.innerHTML = markup;
    deck.appendChild(card);
    click(card);
    stopTimer(currentTimer);
  	second = 0;
    timer.innerHTML = 'Time: ' + second;
  	startTimer();
  }
}

function click(card) {
  card.addEventListener('click', function() {

    const current = this;
    const previous = cards[0];

    if(cards.length === 1) {
      // when clicked, push open/show classes to card
      card.classList.add('open', 'show', 'disable');
      cards.push(this);

      compare(current, previous);

    } else {
      card.classList.add('open', 'show', 'disable');
      cards.push(this);
    }
  });
}

// compare 2 cards
function compare(current, previous) {

  // matcher
  if(current.innerHTML === previous.innerHTML) {
    current.classList.add('match');
    previous.classList.add('match');

    match.push(current, previous);

    cards = [];

    gameOver(); // check if the game is over

  } else {

    cards = [];

    // set a 500ms delay for closing cards
    setTimeout(function() {
      current.classList.remove('open', 'show', 'disable');
      previous.classList.remove('open', 'show', 'disable');
    }, 500);
  }

  // add new move
  addMove();
}

function gameOver() {
  if (match.length === symbols.length) {
    stopTimer(currentTimer);
    setTimeout(function() {
      let starLength = $('.fa-star').length;
      $('#exampleModal').modal('show');
      $('.modal-body').html('You won the game in ' + moves + ' moves. It took you ' + second + ' seconds. You have a ' + starLength + ' star rating. Pretty awesome! Would you like to play again?');
    }, 200)
  }
}

// add a move
const gameMoves = document.querySelector('.moves');
let moves = 0;
gameMoves.innerHTML = 'Moves: ' + moves;

function addMove() {
  moves++;
  gameMoves.innerHTML = 'Moves: ' + moves; // add it to the container

  rating();
}

// rating system
const gameStars = document.querySelector('.stars');
gameStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
function rating() {
  switch(moves) {
    case 15:
      gameStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    break;
    case 20:
      gameStars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;
  }
}


// start the timer
function startTimer() {
  currentTimer = setInterval(function() {
    timer.innerHTML = 'Time: ' + second;
    second++;
  }, 1000);
}

// reset the timer
function stopTimer(timer) {
  clearInterval(timer);
}



// restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
  deck.innerHTML = "";
  startGame();
  match = [];
  moves = 0;
  gameMoves.innerHTML = 'Moves: ' + moves;
  gameStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
});

// start the game for the first time
startGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
