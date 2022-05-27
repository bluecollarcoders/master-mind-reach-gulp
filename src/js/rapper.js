//constants for max guesses and icons to use as hints for the user
const maxGuesses = 10;
const full = "✔️";
const half = "☑️";
const empty = "❌";
const rappersArr = [
  "nas",
  "big",
  "pac",
  "jay",
  "kane",
  "g rap",
  "ll",
  "andre",
  "eminem",
  "pun",
];

// variables

let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];
let playerScore = 0;
let previousGuessesMatches = new Map();

// elements by id
const startNewGame = document.getElementById("start-game");
const playAgain = document.getElementById("play-again");
const numbers = document.querySelectorAll(".number");
const doOver = document.getElementById("do-over");
let backspace = document.getElementById("backspace");
let currentGuessDisplay = document.getElementById("current-guess");
let guessesRemainingDisplay = document.getElementById("guesses-remaining");
let previousGuessesMatchesDisplay = document.getElementById(
  "previous-guesses-matches"
);
let getScore = document.getElementById("score");

// event listners
startNewGame.addEventListener("click", startGame);
playAgain.addEventListener("click", resetGame);
backspace.addEventListener("click", deleteGuess);
numbers.forEach((number) => {
  let guess = number.innerHTML;
  number.addEventListener("click", () => guessAnswer(guess));
});
guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount;

// functions
// this picks a random set of 4 rappers
function getRandomRappers() {
  let assortedRappers = rappersArr.sort(() => 0.5 - Math.random());
  bestRappers = assortedRappers.slice(0, 4);
  console.log(bestRappers);
}

// this allows the keypad to be accessed once the start button is pressed
function guessAnswer(guess) {
  if (bestRappers.length > 0) {
    currentGuess.push(guess);
    currentGuessDisplay.innerHTML = currentGuess.join("");
    console.log(currentGuess);
    //don't want to run the below before we hit 4 numbers in guess
    if (currentGuess.length === 4) {
      if (previousGuesses.includes(currentGuess.join(""))) {
        $("#alreadyGuessedModal").modal({ show: true });
        deleteGuess();
      } else {
        //increase number of guesses by 1
        guessesCount++;
        //check whether won/lost/continue
        checkGameState();
      }
    }
  }
}

// back space button

function deleteGuess() {
  if (currentGuess.length >= 1) {
    currentGuess.pop();
    currentGuessDisplay.innerHTML = currentGuess.join[""];
  }
}

// timer for entire good
function timerStart() {
  var counter = 30;
  setInterval(() => {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("game-timer");
      span.innerHTML = counter;
    }
    if (counter === 0) {
      $("#out-of-time").modal({ show: true });
      clearInterval(counter);
      resetValues();
    }
  }, 1000);
}

function stopTimer() {
  clearTimeout(timerStart);
}

function resetGame() {
  window.location.reload();
}

function resetValues() {
  guessesCount = 0;
  currentGuess = [];
  currentMatch = [];
  previousGuesses = [];
  previousMatches = [];
  guessMatch = [];
  guessesCount = 0;
  previousGuessesMatches = new Map();
  currentGuessDisplay.innerHTML = currentGuess;
  guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount;
  previousGuessesMatchesDisplay.innerHTML = "";
}

function startGame() {
  // get random rappers
  getRandomRappers();
  // start timer
  timerStart();
  // reset game
  resetValues();
}

function displayHistory() {
  //conditional values in currentGuess compared to randomNumbers
  bestRappers.forEach((num, idx) => {
    if (currentGuess[idx] === num) {
      currentMatch.push(full);
    } else if (currentGuess.includes(num)) {
      currentMatch.push(half);
    } else {
      currentMatch.push(empty);
    }
  });
  currentMatch.sort().reverse();
  //add currentGuess array to previousGuesses, currentMatch to previousMatches
  previousGuesses.push(currentGuess.join(""));
  previousMatches.push(currentMatch.join(""));
  //reset currentGuess/Match for next guess input
  previousGuessesMatchesDisplay.innerHTML = "";
  currentGuessDisplay.innerHTML = "";
  currentGuess = [];
  currentMatch = [];
  previousGuesses.forEach((elem, idx) => {
    previousGuessesMatches.set(elem, previousMatches[idx]);
  });
  console.log(previousGuessesMatches);
  for (const [guess, match] of previousGuessesMatches.entries()) {
    let prevGuessMatchDiv = document.createElement("div");
    prevGuessMatchDiv.classList.add("col");
    prevGuessMatchDiv.innerHTML = `${guess} <br> ${match}`;
    previousGuessesMatchesDisplay.appendChild(prevGuessMatchDiv);
  }
}

function checkGameState() {
  console.log(currentGuess, bestRappers);
  //   check if guesses matches
  if (currentGuess.every((val, idx) => val === bestRappers[idx])) {
    playerScore += 1;
    getScore.innerHTML = `Score: ${playerScore}`;
    storeScore.push(playerScore);
    //show victory modal
    $("#victoryModal").modal({ show: true });
    //reset values for new game
    resetValues();

    //next check if maxGuesses reached--as that is the other condition that ends the game
  } else if (guessesCount === maxGuesses) {
    playerScore = 0;
    getScore.innerHTML = `Score: ${playerScore}`;
    storeScore.push(playerScore);
    //show lost modal
    $("#lostModal").modal({ show: true });
    //reset values for new game
    resetValues();

    //finally, when guess is made that doesn't match but also haven't reached maxGuesses
  } else {
    displayHistory();
    guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount;
  }
}
