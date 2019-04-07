let options = document.querySelectorAll(".choice-option");
let userScore = document.getElementById("user-score");
let cpuScore = document.getElementById("cpu-score");
let output = document.getElementById("output");

for (let i = 0; i < options.length; i++) {
   options[i].addEventListener("click", playGame);
}

function getRandomChoice() {
   let choices = ["r", "p", "s"];
   let randomChoice = Math.floor(Math.random() * 3);
   return choices[randomChoice];
}

function letterToWord(letter) {
   switch (letter) {
      case 'r':
         return 'ROCK';
      case 'p':
         return 'PAPER';
      case 's':
         return 'SCISSORS';
   }
}

function game(option) {
   let cpuChoice = getRandomChoice();
   let userChoice = option;
   let game = {
      result: '',
      message: ''
   }

   switch(userChoice + cpuChoice) {
      case "rs":
      case "pr":
      case "sp":
         game.result = 'win'
         game.message = `<p class="win">YOU WON</p>
                         <p>${letterToWord(userChoice)} BEATS ${letterToWord(cpuChoice)}</p>`
         break;

      case "sr":
      case "rp":
      case "ps":
         game.result = 'lose'
         game.message = `<p class="lose">YOU LOST</p>
                         <p>${letterToWord(userChoice)} LOSES TO ${letterToWord(cpuChoice)}</p>`
         break;

      case "rr":
      case "pp":
      case "ss":
         game.result = 'draw'
         game.message = `<p>DRAW</p>`
         break;
   }

   output.innerHTML = game.message;
   
   setTimeout(() => {
      Swal.close();
      animateCSS('container', 'fadeIn');
      if(game.result == 'win') {
         userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
         animateCSS('user-score', 'tada');
      } else if(game.result == 'lose') {
         cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
         animateCSS('cpu-score', 'tada');
      } else {
         animateCSS('user-score', 'tada');
         animateCSS('cpu-score', 'tada');
      }
   }, 1200);
}

function playGame() {
   let option = this.getAttribute("optionValue");
   Swal.fire({
      html: `
            <div id="preloader">
               <div id="loader"></div>
            </div>
            `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      background: "rgba(0,0,0)",
      backdrop: "rgba(0,0,0)",
      animation: false,
      onBeforeOpen: () => {
         game(option);
      },
   });
}

function animateCSS(element, animationName) {
   const node = document.getElementById(element);
   node.classList.add('animated', animationName);
   function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
   }
   node.addEventListener('animationend', handleAnimationEnd);
}