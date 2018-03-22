// Global variables
const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
let openCards = [];

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

// Restart game with new cards
function restartGame() {
  deck.innerHTML = "";
  generateCards();
}

// "Turn" card and display its symbol
function displayCardSymbol(event) {
  const cardClicked = event.target;

  if (cardClicked.tagName === "LI") {
    const openLimit = openCards.length;

    // Check that no more than 2 cards are open
    if (openLimit < 2) {
      cardClicked.classList.add("show", "open");
      openCards.push(cardClicked);
    }

    // Compare cards type
    if (openLimit === 1) {
      if (openCards[0].classList.value === openCards[1].classList.value) {
        match();
      } else {
        setTimeout(noMatch, 500);
      }
    }
  }
}

// If cards match
function match() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
}

// If cards don't match
function noMatch() {
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
}

function moveCounter(num) {
  // if two cards are open, count as one move
  // keep track of moves
}

// Set up DOM and Restart button event listeners
document.addEventListener("DOMContentLoaded", generateCards);
restart.addEventListener("click", restartGame);

// Set up Card event listeners
deck.addEventListener("click", displayCardSymbol);
