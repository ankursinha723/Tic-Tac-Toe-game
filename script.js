let body = document.querySelector('body');
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let restartBtn = document.querySelector("#restart");
let clickSound = new Audio('Tic-Tac-Toe-click-sound.wav');
let winningSound = new Audio('game-winning-sound.wav');
let turnX = true;

// Pattern matches to win
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to restart game
const resetGame = () => {
    turnX = true;
    enableBoxes();
    msg.style.visibility = 'hidden';
}

// Function triggers when a box is clicked
boxes.forEach(box => {
    box.addEventListener("click", function(event) {
        if(turnX) {
            box.innerText = 'X';
            box.style.color = 'blue';
            box.style.backgroundColor = 'lightblue';
            box.style.border = '2px solid blue';
            turnX = false;
        } else {
            box.innerText = 'O';
            box.style.color = 'red';
            box.style.backgroundColor = 'lightcoral';
            box.style.border = '2px solid red';
            turnX = true;
        }
        box.disabled = true;
        clickSound.play();
        checkWinner();
    })
})

// Function to disable boxes when a player wins
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

// Function to enable boxes when a game restarts
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = '';
        box.style.color = 'none';
        box.style.backgroundColor = 'white';
        box.style.border = '1px solid black';
    }
}

// Function to check winner
const checkWinner = () => {
    for(let pattern of winningPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                msg.innerText = `Player ${pos1Val} wins`;
                msg.style.visibility = 'visible';
                disableBoxes();
                body.style.backgroundColor = 'lightgreen';
                winningSound.play();

                setTimeout(function() {
                    body.style.backgroundColor = 'white';
                }, 1500);
            }
        }
    }
}

// Restart button
restartBtn.addEventListener('click', resetGame);