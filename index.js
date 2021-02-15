
/*----- variables to be declared -----*/
//here we will track each box
let board = [
    '', '', '',
    '', '', '',
    '', '', ''
];
let currentPlayer = 'X';
let counter = 0;

/*----- html element references -----*/
const boxes = document.querySelectorAll('#board div');
const player = document.querySelector('#player');
const gameStatus = document.getElementById('gameStatus');
const gameInProgress = "Game in progress...";

//sets each box on the board
function setBoxText(index) {
    boxes[index].innerText = board[index];
}

function setCurrentPlayerText(currentPlayer) {
    player.innerText = `Current Player: ${currentPlayer}`;
}

function setGameStatusText(text) {
    gameStatus.innerText = text;
}

function handleClickBox(index) {
    //if box is clicked already, do nothing
    if (board[index] !== "") {
        return;
    }

    //if game is over, do nothing
    if (gameStatus.innerText !== gameInProgress) {
        return;
    }

    //adds x or o for the current player in their choosen box
    board[index] = currentPlayer;
    setBoxText(index);
    counter++

    // changes players turns and alternative between X and O
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    setCurrentPlayerText(currentPlayer);

    let winner = handleWinner()

    if (winner) {
        setGameStatusText(`Player: ${winner} WON!`);
    } else if (counter >= 9) {
        setGameStatusText('IT IS A DRAW!!!');
    } else {
        setGameStatusText(gameInProgress);
    }
}

// check if there is a winner
function handleWinner() {
    // check whether there 3 matches between X and O
    const possibleWins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let index = 0; index < possibleWins.length; index++) {
        const [a, b, c] = possibleWins[index];
        if (board[a] && board[a] === board[b] &&
            board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

/*----- add and define event listeners -----*/
for (let index = 0; index < boxes.length; index++) {
    boxes[index].addEventListener('click', function (event) {
        handleClickBox(index)
    });
}


// handle restart game button
function restartTheGame() {
    document.getElementById("restart").addEventListener("click", function () {
    for (let index = 0; index < board.length; index++) {
        board[index] = "";
        setBoxText(index);
    }
    currentPlayer = 'X';
    counter = 0;
    // set player and gameStatus to the same values as when loading the page the first time
    setCurrentPlayerText(currentPlayer);
    setGameStatusText(gameInProgress);
});

// set player and gameStatus when loading the page the first time
setCurrentPlayerText(currentPlayer);
setGameStatusText(gameInProgress);