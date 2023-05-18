const ROCK = "Sten";
const SCISSORS = "Sax";
const PAPER = "Påse";
const DRAW = 0;
const COMPUTER_WINS = -1;
const PLAYER_WINS = 1;
const MAX_AMOUNT_GAMES = 3;
let GAME_HAS_REACHED_LIMIT = false;

const computerChoice = () => {
    const choices = [ROCK, PAPER, SCISSORS];
    const randomNumber = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomNumber];
    return computerChoice;
};

const decideWinner = (computer, player) => {
    if (
        (computer === ROCK && player === ROCK) ||
        (computer === PAPER && player === PAPER) ||
        (computer === SCISSORS && player === SCISSORS)
    ) {
        return DRAW;
    }

    if (
        (computer === ROCK && player === SCISSORS) ||
        (computer === PAPER && player === ROCK) ||
        (computer === SCISSORS && player === PAPER)
    ) {
        return COMPUTER_WINS;
    }

    if (
        (player === ROCK && computer === SCISSORS) ||
        (player === PAPER && computer === ROCK) ||
        (player === SCISSORS && computer === PAPER)
    ) {
        return PLAYER_WINS;
    }
};

const computeResult = (selector) => {
    let result = document.getElementById(selector);
    let score = Number(result.textContent);
    score++;
    result.textContent = score;
}

const displayChoice = (selector, value) => {
    let choiceElement = document.getElementById(selector);
    choiceElement.textContent = value;
}

const runGame = (player, computer) => {
    if (GAME_HAS_REACHED_LIMIT) {
        return;
    }

    const gameResult = decideWinner(computer, player);

    if (gameResult === COMPUTER_WINS) {
        computeResult("computer-count")
    }

    if (gameResult === PLAYER_WINS) {
        computeResult('player-count')
    }

    displayChoice('computer-choice', computer);
    displayChoice('player-choice', player);
    gameCount();

    return gameResult;
};

const gameCount = () => {
    let playerScore = Number(
        document.getElementById('player-count').innerText
    );
    let computerScore = Number(
        document.getElementById('computer-count').innerText
    );
    let resultElement = document.getElementById('result');
    let reloadElement = document.querySelector('.reload');
    reloadElement.addEventListener('click', () => {
        window.location.reload();
    })

    if (playerScore === MAX_AMOUNT_GAMES) {
        resultElement.textContent = "Grattis du vann!";
        result.style.color = 'green';
        GAME_HAS_REACHED_LIMIT = true;
        reloadElement.classList.remove('hide');
    }

    if (computerScore === MAX_AMOUNT_GAMES) {
        resultElement.textContent = "Du förlorade!";
        result.style.color = 'red'
        GAME_HAS_REACHED_LIMIT = true;
        reloadElement.classList.remove('hide');
    }
};

function start() {
    let startSection = document.querySelector('.start');
    let gameSection = document.querySelector('.game');
    let startButton = document.querySelector('.start button');
    let rockButton = document.querySelector('.rock');
    let paperButton = document.querySelector('.paper');
    let scissorsButton = document.querySelector('.scissors');

    startButton.addEventListener('click', (event) => {
        let playerName = document.getElementById('player').value;

        if (playerName === '' || player === undefined) {
            window.alert("Ditt namn kan inte vara tomt");
            event.preventDefault();
            return;
        }

        startSection.classList.add('hide');
        gameSection.classList.remove('hide');

        let headerElement = document.querySelector('.player-score h2');
        headerElement.innerText = playerName;
    });

    rockButton.addEventListener('click', () => {
        runGame(ROCK, computerChoice());
    });

    paperButton.addEventListener('click', () => {
        runGame(PAPER, computerChoice());
    });

    scissorsButton.addEventListener('click', () => {
        runGame(SCISSORS, computerChoice());
    });
}

start();