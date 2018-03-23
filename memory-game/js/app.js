{
  const matchCards = document.getElementsByClassName("match");
  const jsRestart = document.querySelector(".js-restart");
  const restart = document.querySelector(".restart");
  const moveText = document.querySelector(".moves");
  const stars = document.querySelector(".stars");
  const modal = document.querySelector(".modal");
  const deck = document.querySelector(".deck");
  let openCards = [];

  let moves, minutes, seconds, starCounter, time;

  init();

  // Start game
  function init() {
    endTimer();
    moves = 0;
    minutes = 0;
    seconds = 0;
    starCounter = 3;
    modal.style.display = "none";
    deck.innerHTML = "";
    moveText.innerHTML = "";
    time = setInterval(timer, 1000);
    generateCards();
    timer();
  }

  // Randomly add icons to cards
  function generateCards() {
    // List of all different icons to display
    const cards = [
      "fa-paper-plane-o",
      "fa-diamond",
      "fa-anchor",
      "fa-bicycle",
      "fa-bolt",
      "fa-cube",
      "fa-leaf",
      "fa-bomb",
      "fa-paper-plane-o",
      "fa-diamond",
      "fa-anchor",
      "fa-bicycle",
      "fa-bolt",
      "fa-cube",
      "fa-leaf",
      "fa-bomb"
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
      randomCard.setAttribute("class", `card fa ${cards[card]}`);
      fragment.appendChild(randomCard);
    }
    deck.appendChild(fragment);
    starRating();
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
          gameWin();
        } else {
          setTimeout(noMatch, 500);
        }
        // If two cards are open, count as one move
        moves++;
        moveCounter();
        starRating();
      }
    }
  }

  // Keep track of moves and display counter
  function moveCounter() {
    if (moves === 0) {
      moveText.innerHTML = "";
    } else if (moves === 1) {
      moveText.innerHTML = moves + " move";
    } else {
      moveText.innerHTML = moves + " moves";
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

  // Update starCounter variable according to number of moves
  function starRating() {
    if (moves > 12 && moves < 17) {
      starCounter = 2;
    } else if (moves > 18 && moves < 24) {
      starCounter = 1;
    } else if (moves > 24) {
      starCounter = 0;
    }
    showStars(starCounter);
  }

  // Generate html to display stars
  function showStars(num) {
    const starHtml = '<li class="fa fa-star"></li>';
    stars.innerHTML = "";
    for (let i = 0; i < num; i++) {
      stars.innerHTML += starHtml;
    }
  }

  // Time counter
  function timer() {
    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
  }

  function endTimer() {
    clearInterval(time);
  }

  // Format time to mm:ss
  function formatTime() {
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  }

  //  Game win
  function gameWin() {
    if (matchCards.length == 16) {
      endTimer();
      modal.style.display = "block";
      modalGameInfo();
    }
  }

  // Generate pop-up Game Info
  function modalGameInfo() {
    const jsStars = document.querySelector(".js-stars");
    const jsMoves = document.querySelector(".js-moves");
    const jsTime = document.querySelector(".js-time");

    formatTime();

    jsTime.innerHTML = `${minutes}:${seconds}`;
    jsStars.innerHTML = stars.innerHTML;
    jsMoves.innerHTML = moveText.innerHTML;
  }

  // If user clicks outside pop-up, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Set up DOM and Restart button event listeners
  document.addEventListener("DOMContentLoaded", init);
  restart.addEventListener("click", init);
  jsRestart.addEventListener("click", init);

  // Set up Card event listeners
  deck.addEventListener("click", displayCardSymbol);
}
