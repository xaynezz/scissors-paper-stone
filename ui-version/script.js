const hand = ["scissors", "paper", "stone"];
let playerSelection;
let computerSelection;
let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    return hand[Math.floor(Math.random()*hand.length)];
}

function playRound(playerSelection, computerSelection) {
    let result = "lose";
    if (playerSelection == computerSelection) {
        result = "tie";
    } else {
        switch (playerSelection) {
            default:
                result = "lose";
            case "stone":
                if (computerSelection == "scissors") result = "win";
                break;
            case "paper": 
                if (computerSelection == "stone") result = "win";
                break;
            case "scissors":  
                if (computerSelection == "paper") result = "win";
                break;  
        }
    }
    console.log(result);
    return result;
}

function updateScore(score1, score2) {
    document.querySelector(".score .board").innerHTML = `${score1} - ${score2}`;
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    document.querySelector('.player .box').innerHTML = "";
    document.querySelector('.cpu .box').innerHTML = "";
    updateScore(playerScore, computerScore);
    document.querySelector(".score .message").innerHTML = "";
}

function updateImage(playerSelection, computerSelection) {
    let dict = {
        "stone": "🪨",
        "scissors": "🔪",
        "paper": "📄",
    };
    document.querySelector('.player .box').innerHTML = dict[playerSelection];
    document.querySelector('.cpu .box').innerHTML = dict[computerSelection];
}

let startButton = document.querySelector('.start');
let restartButton = document.querySelector('.restart');
let modeButton = document.querySelector('.mode');
let buttons = document.querySelectorAll('.buttons button');

function disableButtons() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

function enableButtons() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function checkWin() {
    if (playerScore == 5 || computerScore == 5) {
        disableButtons();

        if (playerScore == 5) {
            document.querySelector(".score .message").innerHTML = "You Won!";
        } else {
            document.querySelector(".score .message").innerHTML = "You Lost!";
        }
    }
}


disableButtons();

startButton.addEventListener('click', () => {
    restartGame();
    startButton.style.visibility = "hidden";
    restartButton.style.visibility = "visible";
    enableButtons();
})

hand.forEach((item) => {
    document.querySelector(`.player .${item}`).addEventListener('click', () => {
        playerSelection = item;
        computerSelection = computerPlay();
        result = playRound(playerSelection, computerSelection);
        if (result == "win") playerScore += 1;
        else if (result == "lose") computerScore += 1;
        updateScore(playerScore, computerScore);
        updateImage(playerSelection, computerSelection);
        checkWin();
    });
});

restartButton.addEventListener('click', () => {
    restartGame();
    document.querySelector(".score .board").innerHTML = "";
    startButton.style.visibility = "visible";
    restartButton.style.visibility = "hidden";
    disableButtons();
})

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (modeButton.innerHTML == "Light") {
        modeButton.innerHTML = "Dark";
    } else {
        modeButton.innerHTML = "Light";
    }
});



 