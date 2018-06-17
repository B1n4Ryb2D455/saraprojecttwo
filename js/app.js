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
            //console.log(openCards);
            let matching = document.querySelectorAll('.match').length;
            //console.log(matching);
            if (matching === 16) {
              matchedCards = 1;
              modal.style.display = 'block';

            }
            //console.log(openCards);
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

  // Timer that resets with restart button
  let timer = document.querySelector(".timer");
  let timing;
  let minute = 0;
  let second = 0;

  function startTimer() {
    timing = window.setInterval(function () {
      timer.innerHTML = minute + " mins " + second + " secs ";
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
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
let starCount = 3;

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  console.log(moves);
  if (moves > 8 && moves <= 12) {
    starOne.style.display = 'none';
    starCount = 2;
    console.log(starCount);
  } else if (moves > 13) {
    starTwo.style.display = 'none';
    starCount = 1;
    console.log(starCount);
  }
  var youWin = document.querySelector('.content');
  youWin.innerHTML = `Congrats, you da bomb diggity! Your score is ${starCount} and it took you ${moves} moves to finish... wanna play again?`;
}

// let match = [...document.querySelectorAll('.match')];
initGame();
/// Get the modal
var modal = document.getElementById('myModal');

// var span = document.getElementsByClassName("close")[0];
var replay = document.querySelector('.close');
// Get the button that opens the modal
var btn = document.querySelector('#playAgain');

//When the user clicks on <span>, close the modal
btn.onclick = function () {
  window.location.reload();
 // console.log("I clicked the button");
}

replay.onclick = function () {
   window.location.reload();
  //modal.style.display = "none";
}