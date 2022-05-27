const maxGuesses=10,full="✔️",half="☑️",empty="❌";let randomNumbers=[],guessesCount=0,currentGuess=[],currentMatch=[],previousGuesses=[],previousMatches=[],previousGuessesMatches=new Map,guessMatch=[],playerScore=0,storeScore=[],highScore=localStorage.getItem("highScore");const startNewGame=document.getElementById("start-game"),playAgain=document.getElementById("play-again"),numbers=document.querySelectorAll(".number");let backspace=document.getElementById("backspace"),currentGuessDisplay=document.getElementById("current-guess"),guessesRemainingDisplay=document.getElementById("guesses-remaining"),previousGuessesMatchesDisplay=document.getElementById("previous-guesses-matches"),getScore=document.getElementById("score");async function getRandomNumbers(){axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new").then((e=>{let s=e.data.split("").filter((e=>"\n"!==e));randomNumbers=s.map((function(e){return parseInt(e)})),console.log(randomNumbers)}))}function guessAnswer(e){randomNumbers.length>0&&(currentGuess.push(parseInt(e)),currentGuessDisplay.innerHTML=currentGuess.join(""),console.log(currentGuess),4===currentGuess.length&&(previousGuesses.includes(currentGuess.join(""))?($("#alreadyGuessedModal").modal({show:!0}),deleteGuess()):(guessesCount++,checkGameState())))}function deleteGuess(){currentGuess.length>=1&&(currentGuess.pop(),currentGuessDisplay.innerHTML=currentGuess.join(""))}function timerStart(){var e=30;setInterval((()=>{--e>=0&&(span=document.getElementById("game-timer"),span.innerHTML=e),0===e&&($("#out-of-time").modal({show:!0}),clearInterval(e),resetValues())}),1e3)}function stopTimer(){clearTimeout(timerStart)}function startGame(){getRandomNumbers(),timerStart(),resetValues()}function resetGame(){window.location.reload()}function resetValues(){randomNumbers=[],previousGuesses=[],previousMatches=[],currentGuess=[],currentMatch=[],previousGuessesMatches=new Map,currentGuessDisplay.innerHTML=currentGuess,guessesRemainingDisplay.innerHTML=10-guessesCount,previousGuessesMatchesDisplay.innerHTML=""}function displayHistory(){randomNumbers.forEach(((e,s)=>{currentGuess[s]===e?currentMatch.push("✔️"):currentGuess.includes(e)?currentMatch.push("☑️"):currentMatch.push("❌")})),currentMatch.sort().reverse(),previousGuesses.push(currentGuess.join("")),previousMatches.push(currentMatch.join("")),previousGuessesMatchesDisplay.innerHTML="",currentGuessDisplay.innerHTML="",currentGuess=[],currentMatch=[],previousGuesses.forEach(((e,s)=>{previousGuessesMatches.set(e,previousMatches[s])})),console.log(previousGuessesMatches);for(const[e,s]of previousGuessesMatches.entries()){let r=document.createElement("div");r.classList.add("col"),r.innerHTML=`${e} <br> ${s}`,previousGuessesMatchesDisplay.appendChild(r)}}function checkGameState(){console.log(currentGuess,randomNumbers),currentGuess.every(((e,s)=>e===randomNumbers[s]))?(playerScore+=1,getScore.innerHTML=`Score: ${playerScore}`,storeScore.push(playerScore),$("#victoryModal").modal({show:!0}),resetValues()):10===guessesCount?(playerScore=0,getScore.innerHTML=`Score: ${playerScore}`,storeScore.push(playerScore),$("#lostModal").modal({show:!0}),resetValues()):(displayHistory(),guessesRemainingDisplay.innerHTML=10-guessesCount)}guessesRemainingDisplay.innerHTML=10-guessesCount,startNewGame.addEventListener("click",startGame),playAgain.addEventListener("click",resetGame),backspace.addEventListener("click",deleteGuess),numbers.forEach((e=>{let s=e.innerHTML;e.addEventListener("click",(()=>guessAnswer(s)))}));