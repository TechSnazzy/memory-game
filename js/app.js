/*
 * Create a list that holds all of your cards
 */

const symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

// select the deck
const deck = document.querySelector('.deck');

let cards = [];
let match = [];

function startGame() {
  // create the cards
  for (let i=0; i<symbols.length; i++) {
    const card = document.createElement('li');
    const icon = symbols[i];
    const markup = `<i class="${icon}"></i>`;
    card.classList.add('card');
    card.innerHTML = markup;
    deck.appendChild(card);

    // add click event to each card
    click(card);
  }
}

function click(card) {
  // make the card clickable
  card.addEventListener('click', function() {

    const current = this;
    const previous = cards[0];

    if(cards.length === 1) {
      // when clicked, push open/show classes to card
      card.classList.add('open', 'show', 'disable');
      cards.push(this);

      compareCards(current, previous);

    } else {
      card.classList.add('open', 'show', 'disable');
      cards.push(this);
    }
  });
}

// compare 2 cards
function compareCards(current, previous) {
  // cards clicked, open/show classes applied
  // lets compare 2 cards
  if(current.innerHTML === previous.innerHTML) {
    current.classList.add('match');
    previous.classList.add('match');

    // if match, apply match class
    match.push(current, previous);

    cards = [];

    gameOver();

  } else {

    cards = [];

    // set a 500ms delay for closing cards
    setTimeout(function() {
      current.classList.remove('open', 'show');
      previous.classList.remove('open', 'show');
    }, 500);
  }
}

function gameOver() {
  // if length of matches in array is equal to length of symbols
  if (match.length === symbols.length) {
    alert("Game Over");
  }
}

// start the game for the first time
startGame();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
