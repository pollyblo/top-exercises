const choices = document.querySelectorAll(".choice");
const resultat = document.getElementById("resultat");
const score = document.getElementById("score");

let playerCounter = 0;
let computerCounter = 0;

// DOM Events

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        tryAgain();
    
        let result = playRound(choice.id, getComputerChoice());
        game(result);
        displayCounter(playerCounter, computerCounter);
            
        if (playerCounter === 5) {
            resultat.textContent = 'Vous avez gagné la partie!';
        } else if (computerCounter === 5) {
            resultat.textContent = 'L\'ordinateur a gagné la partie!';
        }
            
        })
    })

function displayCounter(playerCounter, computerCounter) {
    score.textContent = `${playerCounter} - ${computerCounter}`;
}


// Game functions

function getComputerChoice() {
    let randInt = Math.floor(Math.random() * 3);
    switch (randInt) {
        case 0:
            return "Pierre";
        case 1:
            return "Feuille";
        case 2: 
            return "Ciseaux";
    }
}


function playRound(playerSelection, computerSelection) {
    const playerChoice = playerSelection.toLowerCase();
    const computerChoice = computerSelection.toLowerCase();

    if ((playerChoice === "pierre" && computerChoice === "ciseaux") || (playerChoice === "ciseaux" && computerChoice === "feuille") || (playerChoice === "feuille" && computerChoice === "pierre")) {
        return "Player win";
    } else if ((computerChoice === "pierre" && playerChoice === "ciseaux") || (computerChoice === "ciseaux" && playerChoice === "feuille") || (computerChoice === "feuille" && playerChoice === "pierre")) {
        return "Computer win"
    } else {
        return "Tie game";
    }

}


function game(result) {
    switch (result) {
        case "Player win":
            playerCounter += 1;
            resultat.textContent = 'Tu as gagné!';
            break;
        case "Computer win":
            computerCounter += 1;
            resultat.textContent = 'L\'ordinateur a gagné!';
            break;
        case "Tie game":
            resultat.textContent = 'Match nul';
            break;
    }
            
}

function tryAgain() {
    if (playerCounter === 5 || computerCounter === 5) {
        playerCounter = 0;
        computerCounter = 0;
        return true;
    } else {
        return false;
    }
}