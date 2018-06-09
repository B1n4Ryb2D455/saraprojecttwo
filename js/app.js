var cards = ['fa-code-fork', 'fa-code-fork',
    'fa-cogs', 'fa-cogs',
    'fa-user-secret', 'fa-user-secret',
    'fa-terminal', 'fa-terminal',
    'fa-space-shuttle', 'fa-space-shuttle',
    'fa-sitemap', 'fa-sitemap',
    'fa-i-cursor', 'fa-i-cursor',
    'fa-gamepad', 'fa-gamepad'
];

// Returns card HTML function from https://youtu.be/_rUH-sEs68Y
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
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
    var deck = document.querySelector('.deck');
    var moveCounter = document.querySelector('.moves');

    var cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');
}
initGame();

// keep matching cards open from FEND tutorial <insert link>
var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;

allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {

        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
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

                moves += 1;
                moveCounter.innerText = moves;
            }
        }
    });
});
// Timer that resets with restart button
var timer = document.querySelector('.timer');
var timing;
var second = 0;

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
//}

// move counter
var moveCounter = document.querySelector('.moves');
var moves = 0;
moveCounter.innerHTML = 0;

function addMove() {
    moves++;
    moveCounter.innerHTML = moves;

    rate();
}


// stars remover
var stars = document.querySelector('.stars');

function rate() {
    if (moves > 2) {
        stars.innerHTML = `<li>
                    <i class="fa fa-star"></i>
                </li>
                <li class=>
                    <i class="fa fa-star"></i>
                </li>`
    }
}


//build modal
//from https://www.w3schools.com/howto/howto_css_modals.asp

//game over open modal
function gameOver() {
    var modal = document.querySelector('.modal');
    var win = document.querySelectorAll('.card', '.open', '.show', '.match');
    if (win.length == 16) {
        modal.style.display = "block";
    }

    console.log('this works!');
};

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