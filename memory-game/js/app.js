// Randomly add icons to cards
function generateCards() {
  // List of all different icons to display
  const icon = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
  ];

  // Shuffle list of icons calling Shuffle function
  let iconsOne = shuffle(icon);
  let iconsTwo = shuffle(icon);
  let randomIcons = iconsOne.concat(iconsTwo);
  randomIcons = shuffle(randomIcons);

  // Loop through each card and generate its HTML
  let cards = [...document.querySelectorAll(".card")];

  for (let i = 0; i < cards.length; i++) {
    const randomCard = document.createElement("i");
    randomCard.setAttribute("class", "fa");
    randomCard.classList.add(randomIcons[i]);
    cards[i].appendChild(randomCard);
  }
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
