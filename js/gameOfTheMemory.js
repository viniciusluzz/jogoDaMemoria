const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";

var dracarys = document.querySelector("#dracarys");
var dashboard = document.querySelector("#dashboard");
var restartBtn = document.querySelector("#restartBtn");

dracarys.addEventListener("click", dracarysBottom);
restartBtn.addEventListener("click", restartGame);

function dracarysBottom() {
    initializeCards(game.createCardsFromTechnologies());
    dashboard.style.display = "none";
}

function restartGame() {
    let gameOverDisplay = document.querySelector("#gameOver");
    gameOverDisplay.style.display = "none";
    startGame();
}

function startGame() {
    initializeCards(game.createCardsFromTechnologies());
    clearCards();
}

function initializeCards(x) {
    let gameBoard = document.querySelector("#gameBoard");
    gameBoard.innerHTML = '';
    gameBoard.classList.add("gameBoardStyle");

    x.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardsContent(card, cardElement);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener("click", flipCard);

        console.log(card.icon)
    });
}

function createCardsContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "/img/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElementBack = document.createElement('img');
        iconElementBack.classList.add(ICON);
        iconElementBack.src = "/img/" + BACK + ".png"
        cardElementFace.appendChild(iconElementBack);
    }

    element.appendChild(cardElementFace);
}

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");

        if (game.secondCard) {

            if (game.checkCard()) {

                game.clearCards();

                if (game.checkGameOver()) {
                    
                    setTimeout(() => {
                        let gameOverDisplay = document.querySelector("#gameOver");
                        gameOverDisplay.style.display = "flex";
                    }, 1000)
                };

            } else {

                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflippedCards();

                }, 1000)

            };

        };

    }

}



