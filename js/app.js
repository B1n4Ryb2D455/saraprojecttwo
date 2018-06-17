let cards = [
  "fa-code-fork",
  "fa-code-fork",
  "fa-cogs",
  "fa-cogs",
  "fa-user-secret",
  "fa-user-secret",
  "fa-terminal",
  "fa-terminal",
  "fa-space-shuttle",
  "fa-space-shuttle",
  "fa-sitemap",
  "fa-sitemap",
  "fa-i-cursor",
  "fa-i-cursor",
  "fa-gamepad",
  "fa-gamepad"
];

// Returns card HTML function from https://youtu.be/_rUH-sEs68Y
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
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

// pass in card, turn into string from FEND tutorial https://youtu.be/_rUH-sEs68Y
function initGame() {
  let deck = document.querySelector(".deck");
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join("");

  let allCards = document.querySelectorAll(".card");
  let openCards = [];
  let matchedCards = 0;

  allCards.forEach(function(card) {
    card.addEventListener("click", function(e) {
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {
        openCards.push(card);
        card.classList.add("open", "show");

        if (openCards.length == 2) {
          moveCount();
          //If cards match, leave facing up
          if (openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards[0].classList.add("match");
            openCards[0].classList.add("open");
            openCards[0].classList.add("show");

            openCards[1].classList.add("match");
            openCards[1].classList.add("open");
            openCards[1].classList.add("show");
            console.log(openCards);
           let matching = document.querySelectorAll('.match').length;
            console.log(matching);
            if (matching === 2) {
              matchedCards = 1;
            }
            console.log(matchedCards);
            openCards = [];

          } else {
            //If cards do not match, flip cards back over
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
            }, 500);
          }
        }
      }
    });
  });

  // Timer that resets with restart button
  let timer = document.querySelector(".timer");
  let timing;
  let second = 0;

  function startTimer() {
    timing = window.setInterval(function() {
      timer.innerHTML = second + " secs";
      second++;
    }, 1000);
  }

  function resetTimer() {
    clearInterval(interval);
  }
  startTimer();

  document.querySelector(".restart").addEventListener("click", resetTimer);
}

let moves = 0;
let moveCounter = document.querySelector(".moves");
let starOne = document.querySelector("#sO");
let starTwo = document.querySelector("#sT");
let starLast = document.querySelector("#sL");

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  // fix the counts back after testing
  if (moves > 2 && moves <= 3) {
    starOne.parentNode.removeChild(starOne);
  } else if (moves > 4 && moves <= 5) {
    starTwo.parentNode.removeChild(starTwo);
  } else if (moves > 50) {
    starLast.parentNode.removeChild(starLast);
  }
}


// let match = [...document.querySelectorAll('.match')];
// let length = match.length;
//let length = 0;


initGame();

/// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

