const gameContainer = document.getElementById("game");

const picList = [
  './assets/AvenidaPaulista.jpeg',
  './assets/BecoDoBatman.jpeg',
  './assets/BuenosAires.jpeg',
  './assets/Chicago.jpeg',
  './assets/FozDoIguazu.jpeg',
  './assets/Manila.jpeg',
  './assets/RioDeJaneiro.jpeg',
  './assets/SanAntonio.jpeg',
  './assets/SanFranciscoBay.jpeg',
  './assets/Santiago.jpeg',
  './assets/UyuniSalt.jpeg',
  './assets/Valparaiso.jpeg',
  './assets/WashingtonDC.jpeg',
  './assets/Yellowstone.jpeg',
  './assets/YellowstonePools.jpeg',
  './assets/AvenidaPaulista.jpeg',
  './assets/BecoDoBatman.jpeg',
  './assets/BuenosAires.jpeg',
  './assets/Chicago.jpeg',
  './assets/FozDoIguazu.jpeg',
  './assets/Manila.jpeg',
  './assets/RioDeJaneiro.jpeg',
  './assets/SanAntonio.jpeg',
  './assets/SanFranciscoBay.jpeg',
  './assets/Santiago.jpeg',
  './assets/UyuniSalt.jpeg',
  './assets/Valparaiso.jpeg',
  './assets/WashingtonDC.jpeg',
  './assets/Yellowstone.jpeg',
  './assets/YellowstonePools.jpeg',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//function to reset the game board (also called at DOM initialization)
function resetGame() {
  winDiv.remove();
  loading = true;
  const cards = gameContainer.children;
  while (cards.length > 0) {
    cards[0].remove();
  }
  let shuffledPics = shuffle(picList);
  createDivsForPics(shuffledPics);
  matches = 0;
  flipped = null;
  loading = false;
  score = 0;
};

// This function loops over the array of pictures
// It creates a new div with three divs inside:
//    Div 1: Contains source image
//    Div 2: Contains back side of card
//    Div 3: Filler to ensure flexbox works
// It also adds an event listener for a click for each card
function createDivsForPics(picArray) {
  let count = picArray.length;
  for (let src of picArray) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    const cardFront = document.createElement("div");
    cardFront.classList.add("front-side");
    const cardBack = document.createElement("div");
    cardBack.classList.add("back-side")
    const spaceFiller = document.createElement("div");
    spaceFiller.classList.add("placeholder");
    const newImg = document.createElement("img");
    newImg.setAttribute("src",src);
    cardFront.append(newImg);
    newCard.append(cardFront);
    newCard.append(cardBack);
    newCard.append(spaceFiller);
    newCard.id = count;
    newCard.locked = false;
    count --;

    // call a function handleCardClick when a div is clicked on
    newCard.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newCard);
  }
}

//Initialize Win condition HTML elements
const winDiv = document.createElement('div');
winDiv.classList.add("win");
winDiv.innerText = "Winner!";
const resetButton = document.createElement('button');
resetButton.addEventListener('click',resetGame);
resetButton.innerText = "Play Again!";
winDiv.append(resetButton);
const scoreReport = document.createElement('h2');
const highScoreText = document.createElement('h3');
const newHighScore = document.createElement('h2');
newHighScore.innerText = 'New High Score!';

//function to launch at Win
function launchWinCondition(score) {
  scoreReport.remove();
  highScoreText.remove();
  newHighScore.remove();
  scoreReport.innerText = `Score: ${score.toString()}`;
  if (score < highScore) {
    highScore = score;
    localStorage.setItem("highScore",score.toString());
    winDiv.append(newHighScore);
  };
  highScoreText.innerText = `High score: ${highScore}`;
  winDiv.append(scoreReport);
  winDiv.append(highScoreText);
  document.body.append(winDiv);
};

//function to compare two flipped cards
function compareFlipsPics(firstDiv,secondDiv) {
  score += 1;
  setTimeout(function() {
    if (firstDiv.getAttribute("src") === secondDiv.getAttribute("src")) {
      firstDiv.locked = true;
      secondDiv.locked = true;
      loading = false;
      matches += 2;
      if (matches === picList.length) {
        launchWinCondition(score);
      };
    } else {
      firstDiv.parentElement.parentElement.classList.remove("select");
      secondDiv.parentElement.parentElement.classList.remove("select");
    };
    loading = false;
  },1000);
};

//function to handle card click event
function handleCardClick(event) {
  if (loading) {
  } else if (event.target.classList.contains("card") === true || event.target.classList.contains("placeholder") === true || event.target.classList.contains("front-side") === true) {
  } else if (event.target.tagName === "IMG") {
  } else {
    loading = true;
    const selectedImg = event.target.previousElementSibling.firstChild;
    const selectedCard = event.target.parentElement;
    selectedCard.classList.add("select");
    if (flipped) {
      if (flipped.parentElement.parentElement.id === event.target.parentElement.id) {
        loading = false;
      } else if (event.target.locked === true) {
        loading = false;
      } else {
        compareFlipsPics(flipped,selectedImg);
        flipped = null;
      };
    } else {
      flipped = selectedImg;
      loading = false;
    }
  };
};

// when the DOM loads
let loading;
let flipped;
let matches;
let score;
let highScore = localStorage.highScore === undefined ? Infinity : parseInt(localStorage.highScore);
resetGame();
