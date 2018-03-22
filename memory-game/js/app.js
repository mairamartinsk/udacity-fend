// Randomly add icons to cards
function generateCards() {
  // List of all different icons to display
  const cards = [
    { name: "diamond", cardType: "fa-diamond" },
    { name: "plane", cardType: "fa-paper-plane-o" },
    { name: "anchor", cardType: "fa-anchor" },
    { name: "bolt", cardType: "fa-bolt" },
    { name: "cube", cardType: "fa-cube" },
    { name: "leaf", cardType: "fa-leaf" },
    { name: "bike", cardType: "fa-bicycle" },
    { name: "bomb", cardType: "fa-bomb" },
    { name: "diamond", cardType: "fa-diamond" },
    { name: "plane", cardType: "fa-paper-plane-o" },
    { name: "anchor", cardType: "fa-anchor" },
    { name: "bolt", cardType: "fa-bolt" },
    { name: "cube", cardType: "fa-cube" },
    { name: "leaf", cardType: "fa-leaf" },
    { name: "bike", cardType: "fa-bicycle" },
    { name: "bomb", cardType: "fa-bomb" }
  ];

  // Shuffle list of icons calling Shuffle function
  let iconsOne = shuffle(cards);
  let iconsTwo = shuffle(cards);
  let randomCards = iconsOne.concat(iconsTwo);
  randomCards = shuffle(randomCards);

  // Loop through each card and generate its HTML
  const deck = document.querySelector(".deck");
  const fragment = document.createDocumentFragment();

  for (card in cards) {
    const randomCard = document.createElement("li");
    randomCard.setAttribute("class", `card fa ${cards[card].cardType}`);
    fragment.appendChild(randomCard);
  }
  deck.appendChild(fragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Restart game with new icons
function restartGame() {
  let cards = document.querySelectorAll(".card");
  // Clear current icon from card
  for (card of cards) {
    card.innerHTML = "";
  }
  generateCards();
}

// "Turn" card and display its symbol
function displayCardSymbol(event) {
  let openCards = [];
  let cardClicked = event.target;

  if (!cardClicked.classList.contains("show")) {
    cardClicked.classList.add("show");
    openCards += cardClicked;
  }
}

// Set up DOM and Restart button event listeners
document.addEventListener("DOMContentLoaded", generateCards);

const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);

// Set up Card event listeners
const showCard = [...document.querySelectorAll(".card")];
for (let i = 0; i < showCard.length; i++) {
  showCard[i].addEventListener("click", displayCardSymbol);
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
