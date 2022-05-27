//constants used for the max amount of guesses as well as hints for player
const maxGuesses = 10;
const full = "✔️";
const half = "☑️";
const empty = "❌";

//variable values
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let previousGuessesMatches = new Map();
let guessMatch = [];
let playerScore = 0;
let storeScore = [];
let highScore = localStorage.getItem("highScore");

//elements by id
const startNewGame = document.getElementById("start-game");
const playAgain = document.getElementById("play-again");
const numbers = document.querySelectorAll(".number");
// const doOver = document.getElementById("do-over");
let backspace = document.getElementById("backspace");
let currentGuessDisplay = document.getElementById("current-guess");
let guessesRemainingDisplay = document.getElementById("guesses-remaining");
let previousGuessesMatchesDisplay = document.getElementById(
  "previous-guesses-matches"
);
let getScore = document.getElementById("score");

guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount;

//event listeners
startNewGame.addEventListener("click", startGame);
playAgain.addEventListener("click", resetGame);
backspace.addEventListener("click", deleteGuess);
// doOver.addEventListener("click", startOver);

numbers.forEach((number) => {
  let guess = number.innerHTML;
  number.addEventListener("click", () => guessAnswer(guess));
});

//functions
// Used the numbers api to get random numbers
async function getRandomNumbers() {
  axios
    .get(
      "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    )
    .then((response) => {
      let data = response.data.split("");
      let stringNumbers = data.filter((el) => el !== "\n");
      randomNumbers = stringNumbers.map(function (x) {
        return parseInt(x);
      });
      console.log(randomNumbers);
    });
}

function guessAnswer(guess) {
  //function to display numbers entered in
  if (randomNumbers.length > 0) {
    currentGuess.push(parseInt(guess));
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

// allows for back button
function deleteGuess() {
  if (currentGuess.length >= 1) {
    currentGuess.pop();
    currentGuessDisplay.innerHTML = currentGuess.join("");
  }
}

// Game timer
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

// Function assigned to an eventlistner to start game
function startGame() {
  //get random numbers first
  getRandomNumbers();
  // start timer
  timerStart();
  //make sure no variables stored from last game
  resetValues();
}

// reset game
function resetGame() {
  window.location.reload();
}

// reset values once game is over
function resetValues() {
  randomNumbers = [];
  previousGuesses = [];
  previousMatches = [];
  currentGuess = [];
  currentMatch = [];
  previousGuessesMatches = new Map();
  currentGuessDisplay.innerHTML = currentGuess;
  guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount;
  previousGuessesMatchesDisplay.innerHTML = "";
}

// display the history of the players guesses
function displayHistory() {
  //conditional values in currentGuess compared to randomNumbers
  randomNumbers.forEach((num, idx) => {
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

// function to check if player won or lose

function checkGameState() {
  console.log(currentGuess, randomNumbers);
  //first check if guess matches--as game is over with win until max is reached
  if (currentGuess.every((val, idx) => val === randomNumbers[idx])) {
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

// I tried implementing local storage, could not get it to work

// if (highScore !== null) {
//   if (storeScore > highScore) {
//     localStorage.setItem("highScore", JSON.stringify(storeScore));
//   }
// } else {
//   localStorage.setItem("highScore", JSON.stringify(storeScore));
// }
