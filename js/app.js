let cards = [
  "fa-google-plus",
  "fa-google-plus",
  "fa-google-wallet",
  "fa-google-wallet",
  "fa-stack-overflow",
  "fa-stack-overflow",
  "fa-google",
  "fa-google",
  "fa-medium",
  "fa-medium",
  "fa-slack",
  "fa-slack",
  "fa-instagram",
  "fa-instagram",
  "fa-twitter",
  "fa-twitter"
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
  let cardHTML = shuffle(cards).map(function (card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join("");

  let allCards = document.querySelectorAll(".card");
  let openCards = [];
  let matchedCards = 0;

  allCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (!card.classList.contains("open") &&
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
            // make a variable for card matches
            let matching = document.querySelectorAll('.match').length;
            // open the modal if all cards match
            if (matching === 16) {
              matchedCards = 1;
              modal.style.display = 'block';
              clearTimeout(timing);
            }
            openCards = [];
          } else {
            //If cards do not match, flip cards back over
            setTimeout(function () {
              openCards.forEach(function (card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
            }, 500);
          }
        }
      }
    });
  });

  // Timer
  let timer = document.querySelector(".timer");
  let timing;
  let minute = 0;
  let second = 0;

  function startTimer() {
    timing = window.setInterval(function () {
      timer.innerHTML = minute + " mins " + second + " secs ";
      let timeTook = document.querySelector('.timer').innerText;
      //console.log(timeTook);
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
      var youWin = document.querySelector('.content');
      youWin.innerHTML = `Congrats, you da bomb diggity! Your score is ${starCount}, it took you ${timeTook} to finish, and you made ${moves} moves... wanna play again?`;
      console.log(timeTook);
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timing);
  }
  startTimer();
  document.querySelector(".restart").addEventListener("click", resetTimer);
}

// move counter and star rating
let moves = 0;
let moveCounter = document.querySelector(".moves");
let starOne = document.querySelector("#sO");
let starTwo = document.querySelector("#sT");
let starCount = 3;

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  console.log(moves);
  // remove stars as the move count goes higher
  if (moves > 8 && moves <= 12) {
    starOne.style.display = 'none';
    starCount = 2;
    console.log(starCount);
  } else if (moves > 13) {
    starTwo.style.display = 'none';
    starCount = 1;
    console.log(starCount);
  }
}

initGame();
/// Get the modal
var modal = document.getElementById('myModal');
// let player restart the game without winning
var replay = document.querySelector('.close');
replay.onclick = function () {
  // I don't see a point in writing more code if we can just use this
  window.location.reload();
}

// let the player restart from the modal
var btn = document.querySelector('#playAgain');
btn.onclick = function () {
  // I don't see a point in writing more code if we can just use this
  window.location.reload();
}