let cards = ['fa-code-fork', 'fa-code-fork',
    'fa-cogs', 'fa-cogs',
    'fa-user-secret', 'fa-user-secret',
    'fa-terminal', 'fa-terminal',
    'fa-space-shuttle', 'fa-space-shuttle',
    'fa-sitemap', 'fa-sitemap',
    'fa-i-cursor', 'fa-i-cursor',
    'fa-gamepad', 'fa-gamepad'];

// Returns card HTML function from https://youtu.be/_rUH-sEs68Y
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

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
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');

    let allCards = document.querySelectorAll('.card');
    let openCards = [];


    allCards.forEach(function (card) {
        card.addEventListener('click', function (e) {

            if (!card.classList.contains('open') &&
                !card.classList.contains('show') &&
                !card.classList.contains('match')
            ) {
                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {
                    moveCount();
                    //If cards match, leave facing up
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        openCards = [];
                    } else {
                        //If cards do not match, flip cards back over
                        setTimeout(function () {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show');
                            });
                            openCards = [];
                        }, 1000);
                    }
                }
            }
        });
    });

    // Timer that resets with restart button
    let timer = document.querySelector('.timer');
    let timing;
    let second = 0;

    function startTimer() {
        timing = window.setInterval(function () {
            timer.innerHTML = second + " secs"
            second++;
        }, 1000);
    }

    function resetTimer() {
        clearInterval(interval);
    }
    startTimer();

    document.querySelector('.restart').addEventListener('click', resetTimer);
}

// Move counter
let moves = 0;
let moveCounter = document.querySelector('.moves');
let starOne = document.querySelector('#sO');
let starTwo = document.querySelector('#sT');
//let stars = document.querySelector('.stars');

function moveCount() {
    moves++;
    moveCounter.innerHTML = moves;
    //Begin removing stars based on move count
    if (moves > 8 && moves <= 12) {
        starOne.style.display = 'none';
        //stars.removeChild(stars.childNodes[1]);
    } else if (moves > 13) {
        starTwo.style.display = 'none';
        //stars.removeChild(stars.childNodes[2]);
    }

}

initGame();

// modal from https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

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

