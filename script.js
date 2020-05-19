const round = document.querySelector('.round');
const result = document.querySelector('.result');
const container = document.querySelector('.container');
const cScoreOutput = document.querySelector('#cScoreOutput');
const pScoreOutput = document.querySelector('#pScoreOutput');
const circleComputer = document.querySelector('.circleComputer');
const circlePlayer = document.querySelector('.circlePlayer');

const comIcon = document.createElement('i');
const plIcon = document.createElement('i');

circleComputer.appendChild(comIcon);
circlePlayer.appendChild(plIcon);

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;

round.textContent = 'Round ' + roundNumber;
cScoreOutput.textContent = computerScore;
pScoreOutput.textContent = playerScore;

function computerPlay() {
    const words = ['rock', 'paper', 'scissors'];
    const number = Math.floor(Math.random()*words.length);
    const word = words[number];                           //shortened version let word = words[Math.floor(Math.random()*words.length)];
    return word;
}

function animateComScore() {
    cScoreOutput.style.animationName = 'scoreAn';
    cScoreOutput.addEventListener('animationend', removeComAnimation);
}

function animatePlScore() {
    pScoreOutput.style.animationName = 'scoreAn';
    pScoreOutput.addEventListener('animationend', removePlAnimation);
}

function removeComAnimation() {
    cScoreOutput.style.animationName = '';
}

function removePlAnimation() {
    pScoreOutput.style.animationName = '';
}

function playRound(e, computerSelection) {
    round.textContent = 'Round ' + ++roundNumber;
    
    computerSelection = computerPlay();
    let playerSelection = e.currentTarget.id;

    (computerSelection == 'rock') ? comIcon.setAttribute('class', 'fa fa-hand-rock-o'):
    (computerSelection == 'paper') ? comIcon.setAttribute('class', 'fa fa-hand-paper-o'):
    (computerSelection == 'scissors') ? comIcon.setAttribute('class', 'fa fa-hand-scissors-o'):
    '';
    
    (playerSelection == 'rock') ? plIcon.setAttribute('class', 'fa fa-hand-rock-o'):
    (playerSelection == 'paper') ? plIcon.setAttribute('class', 'fa fa-hand-paper-o'):
    (playerSelection == 'scissors') ? plIcon.setAttribute('class', 'fa fa-hand-scissors-o'):
    '';                

    if (playerSelection == computerSelection) {
        result.textContent = ('It\'s a tie!');
    } else if (playerSelection == 'rock' && computerSelection == 'paper') {
        computerScore++;
        cScoreOutput.textContent = computerScore;
        animateComScore();
        result.textContent = 'You Lose! Paper beats Rock.';
    } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
        computerScore++;
        cScoreOutput.textContent = computerScore;
        animateComScore();
        result.textContent = 'You Lose! Scissors beats Paper.';
    } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
        computerScore++;
        cScoreOutput.textContent = computerScore;
        animateComScore();
        result.textContent = 'You Lose! Rock beats Scissors.';
    } else if (playerSelection == 'paper' && computerSelection == 'rock') {
        playerScore++;
        pScoreOutput.textContent = playerScore;
        animatePlScore();
        result.textContent = 'You Win! Paper beats Rock.';
    } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
        playerScore++;
        pScoreOutput.textContent = playerScore;
        animatePlScore();
        result.textContent = 'You Win! Scissors beats Paper.';
    } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
        playerScore++;
        pScoreOutput.textContent = playerScore;
        animatePlScore();
        result.textContent = 'You Win! Rock beats Scissors.';
    } 

    if (roundNumber == 5) { 
        if (computerScore > playerScore) {
            result.textContent = 'Game Over!';
            result.style.animationName = 'GameOverAn';
        } else if (computerScore < playerScore) {
            result.textContent = 'Congartulations! You Win!';
            result.style.animationName = 'YouWinAn';
        } else {
            result.textContent = 'It\'s a tie.';
            result.style.animationName = 'TieAn';
        }

        buttons.forEach((button) => {
            button.removeEventListener('click', playRound);
        });

        const playBtn = document.createElement('button');
        playBtn.classList.add('playBtn');
        playBtn.textContent = 'Play Again';
        container.appendChild(playBtn);
        playBtn.addEventListener('click', () => {
            playAgain(); 
            playBtn.style.display = 'none';
        });
    } 
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', playRound);
});

function playAgain() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;

    round.textContent = 'Round ' + roundNumber;
    cScoreOutput.textContent = computerScore;
    pScoreOutput.textContent = playerScore;
    result.textContent = '';

    comIcon.setAttribute('class', '');
    plIcon.setAttribute('class', '');

    result.style.animationName = '';

    buttons.forEach((button) => {
        button.addEventListener('click', playRound);
    });

    playRound;
}