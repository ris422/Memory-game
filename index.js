const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockCard = false;
let score = 0;

document.querySelector(".score").textContent = score;

cards = [
  {
    "image": "../assets/chili.png",
    "name": "chili"
  },
  {
    "image": "../assets/grapes.png",
    "name": "grapes"
  },
  {
    "image": "../assets/lemon.png",
    "name": "lemon"
  },
  {
    "image": "../assets/orange.png",
    "name": "orange"
  },
  {
    "image": "../assets/pineapple.png",
    "name": "pineapple"
  },
  {
    "image": "../assets/strawberry.png",
    "name": "strawberry"
  },
  {
    "image": "../assets/tomato.png",
    "name": "tomato"
  },
  {
    "image": "../assets/watermelon.png",
    "name": "watermelon"
  },
  {
    "image": "../assets/cherries.png",
    "name": "cherries"
  },
  {
    "image": "../assets/chili.png",
    "name": "chili"
  },
  {
    "image": "../assets/grapes.png",
    "name": "grapes"
  },
  {
    "image": "../assets/lemon.png",
    "name": "lemon"
  },
  {
    "image": "../assets/orange.png",
    "name": "orange"
  },
  {
    "image": "../assets/pineapple.png",
    "name": "pineapple"
  },
  {
    "image": "../assets/strawberry.png",
    "name": "strawberry"
  },
  {
    "image": "../assets/tomato.png",
    "name": "tomato"
  },
  {
    "image": "../assets/watermelon.png",
    "name": "watermelon"
  },
  {
    "image": "../assets/cherries.png",
    "name": "cherries"
  }
];
shuffleCards();
generateCards();

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockCard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockCard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
