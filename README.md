# Master Mind Game Project 
Master Mind Game takes from the popular color matching game but with a twist. A player is given a random number generated from a random number api. A player then has to guess four numbers under 10 seconds. 
A player gets 10 attempts.

**Link to project:** https://master-mind-reach-game.netlify.app/

![2022-05-27](https://user-images.githubusercontent.com/67053237/170685683-7be80521-4254-4bf1-8587-4c501d2ab8e6.png)


## How to play
** Player hits the start the game button. Player is taken to the master mind number game dashboard. Player hits the start button to begin playing. The timer for the game is 
activated. The player then has 10 seconds to get the right number combination. A player receives a score of one if they win and 0 if they lose. If you need more time or
feel a little overwhelmed just hit the reset button. If you need detailed instruction hit the about tab in the navbar.

## Download Game
** To download on your computer paste
** $ git clone https://github.com/bluecollarcoders/master-mind-reach-gulp.git
** Once open go to index.html to begin accessing game through the landing page.

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, along with Bootstrap,Gulp and Axios.

My process in building the game was first to use a wireframe for the layout. I didn't stick to close to the layout. I just used it as a guide line. I then used bootstrap to 
get a layout quickly. I focused most of my attention to Javascript and programming the game. I took in consideration the role I'm interviewing which is an SRE. I used gulp to 
make the site faster and take less time loading. I used gulp to automate the process of minifying the javascript, css, and images. This allows for faster page speed.

## Optimizations
*(optional)*

** I would have added a database or local storage to keep track of highest score for a player. I attempted to do so but it didn't work as I planned.
** I also would make the reset button more functional. I just used a window.reload dom object to achieve a refresh. Their is definetly a better way to to this.
** The rapper guessing game has a bug. It doesn't give a proper location hint. It just rules out all positions in the array. 
** I would also create an api for the rapper game unstead of using a function to get the random rapper array.
** Also their is a scripting problem I'm having with gulp. I have to write a better build script.

## Lessons Learned:
I learned more about dom manipulation and general programming. I also learned how to add a timer to the game along with a players score. I felt real proud about that. 
I can definitely see an improvement with my programming knowledge. I have alot to learn still, but this was a great challenge. I enjoyed working on this project.

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Sessions** https://github.com/bluecollarcoders/Sessions

**Weather Me** https://github.com/bluecollarcoders/weather-me

**Roney LLC:** https://github.com/bluecollarcoders/roney-llc-website  https://roneyllc.netlify.app/

