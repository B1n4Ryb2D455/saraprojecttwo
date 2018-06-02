// creates cards
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bicycle'];
//
// const bottom = [];
// const top = [];
// const turnedOver = 0;

// Function card HTML from FEND tutorial https://youtu.be/_rUH-sEs68Y
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
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
    var cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');

    var allCards = document.querySelectorAll('.card');
    var openCards = [];


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
}