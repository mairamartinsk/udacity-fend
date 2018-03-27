"use strict";

(function() {
  var matchCards = document.getElementsByClassName("match");
  var jsRestart = document.querySelector(".js-restart");
  var restart = document.querySelector(".restart");
  var moveText = document.querySelector(".moves");
  var stars = document.querySelector(".stars");
  var clock = document.querySelector(".clock");
  var modal = document.querySelector(".modal");
  var deck = document.querySelector(".deck");
  var openCards = [];

  var moves, minutes, seconds, starCounter, time;

  // Start game
  function init() {
    endTimer();
    moves = 0;
    minutes = 0;
    seconds = 0;
    starCounter = 3;
    modal.style.display = "none";
    deck.innerHTML = "";
    clock.innerHTML = "00:00";
    moveText.innerHTML = moves + ' moves <img src="./img/moves.png">';
    time = setInterval(timer, 1000);
    generateCards();
    timer();
  }

  // Randomly add icons to cards
  function generateCards() {
    // List of all different icons to display
    var cards = [
      "01-money.png",
      "02-key.png",
      "03-potion.png",
      "04-mushroom.png",
      "05-ghost.png",
      "06-pacman.png",
      "07-aliens.png",
      "08-ghost.png",
      "01-money.png",
      "02-key.png",
      "03-potion.png",
      "04-mushroom.png",
      "05-ghost.png",
      "06-pacman.png",
      "07-aliens.png",
      "08-ghost.png"
    ];

    // Shuffle list of icons calling Shuffle function
    var iconsOne = shuffle(cards);
    var iconsTwo = shuffle(cards);
    var randomCards = iconsOne.concat(iconsTwo);
    randomCards = shuffle(randomCards);

    // Loop through each card and generate its HTML
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      var randomCard = document.createElement("li");
      randomCard.innerHTML = '<img src="./img/' + cards[i] + '">';
      randomCard.classList.add("card");
      fragment.appendChild(randomCard);
    }
    deck.appendChild(fragment);
    starRating();
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
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
  var displayCardSymbol = function displayCardSymbol(event) {
    var cardClicked = event.target;

    if (cardClicked.tagName === "LI") {
      var openLimit = openCards.length;

      // Check that no more than 2 cards are open
      if (openLimit < 2) {
        cardClicked.classList.add("show", "open");
        openCards.push(cardClicked);
      }

      // Compare cards type
      if (openLimit === 1) {
        if (openCards[0].children[0].src === openCards[1].children[0].src) {
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
  };

  // Keep track of moves and display counter
  function moveCounter() {
    if (moves === 0) {
      moveText.innerText = moves + " moves";
    } else if (moves === 1) {
      moveText.innerText = moves + " move";
    } else {
      moveText.innerText = moves + " moves";
    }
    moveText.innerHTML += ' <img src="./img/moves.png">';
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
    if (moves > 15 && moves < 19) {
      starCounter = 2;
    } else if (moves > 20 && moves < 24) {
      starCounter = 1;
    } else if (moves > 24) {
      starCounter = 0;
    }
    showStars(starCounter);
  }

  // Generate html to display stars
  function showStars(num) {
    var starHtml = '<img src="./img/stars.png">';
    stars.innerHTML = "";
    for (var i = 0; i < num; i++) {
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

    showClock();
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

  function showClock() {
    formatTime();
    clock.innerHTML = minutes + ":" + seconds + ' <img src="./img/timer.png">';
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
    var jsStars = document.querySelector(".js-stars");
    var jsMoves = document.querySelector(".js-moves");
    var jsTime = document.querySelector(".js-time");

    formatTime();

    jsTime.innerHTML = minutes + ":" + seconds;
    jsStars.innerHTML = stars.innerHTML;
    jsMoves.innerHTML = moveText.textContent;
  }

  init();

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
})();
