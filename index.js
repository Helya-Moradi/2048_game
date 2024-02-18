import rotate from './scripts/rotate.js';
import generateBoard from "./scripts/generateBoard.js";
import newGame from "./scripts/newGame.js";
import addRandomTile from "./scripts/addRandomTile.js";
import generateTiles from "./scripts/generateTiles.js";

const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const winContainer = document.querySelector('.winContainer');
const newGameButtons = document.querySelectorAll('.newGame');
const scoreElem = document.querySelector('.score');

let score = parseInt(localStorage.getItem('score'));
if (!score) {
    generateScoreElem(0, 0);
}

let matrix = JSON.parse(localStorage.getItem('matrix'));
if (!matrix) {
    generateBoard();

    matrix = newGame( gameContainer, gameOverContainer, winContainer, generateScoreElem);

    addRandomTile(matrix,2);
    generateTiles(matrix, gameContainer, gameOverContainer, winContainer);

} else {
    generateBoard();

    generateScoreElem(score, 0);
    generateTiles(matrix, gameContainer, gameOverContainer, winContainer);
}

function generateScoreElem(currentScore, val) {
    score = currentScore;
    score += val;
    localStorage.setItem('score', score);
    scoreElem.innerHTML = score;
}

function moveHandler(e) {
    switch (e.code) {
        case 'ArrowUp':
            upMoveHandler();
            break;

        case 'ArrowDown':
            downMoveHandler();
            break;

        case 'ArrowLeft':
            leftMoveHandler();
            break;

        case 'ArrowRight':
            rightMoveHandler();
            break;
    }
}

function findDestinations(value, {row, col}) {
    let destinations = [{row, col, value}];

    for (let r = row - 1; r >= 0; r--) {
        if (matrix[r][col] === 0) {
            destinations.push({row: r, col, value});
        } else if (matrix[r][col] === value) {
            destinations.push({row: r, col, value: value * 2});
            generateScoreElem(score, value * 2);
        } else {
            break;
        }
    }

    return destinations;
}

function moveWithAnimation(destinations) {
    for (let i = 0; i < destinations.length; i++) {
        matrix[destinations[i].row][destinations[i].col] = destinations[i].value;

        if (i > 0) {
            matrix[destinations[i - 1].row][destinations[i - 1].col] = 0
        }
    }
}

function moveToUp() {
    let hasMove = false;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                const destinations = findDestinations(matrix[i][j], {row: i, col: j});

                if (destinations.length > 1) {
                    hasMove = true;
                    moveWithAnimation(destinations);
                }
            }
        }
    }

    return hasMove;
}

function updateBoard(isMove) {
    if (isMove) {
        addRandomTile(matrix,1);
        generateTiles(matrix, gameContainer, gameOverContainer, winContainer);
    }
}

function upMoveHandler() {
    const movable = moveToUp()

    updateBoard(movable);
}

function downMoveHandler() {
    matrix = rotate(matrix, 2);
    const movable = moveToUp();
    matrix = rotate(matrix, 2);

    updateBoard(movable);
}

function leftMoveHandler() {
    matrix = rotate(matrix, 1);
    const movable = moveToUp()
    matrix = rotate(matrix, 3);

    updateBoard(movable);
}

function rightMoveHandler() {
    matrix = rotate(matrix, 3);
    const movable = moveToUp()
    matrix = rotate(matrix, 1);

    updateBoard(movable);
}

window.addEventListener('keydown', moveHandler);

newGameButtons.forEach(newButton => {
    newButton.addEventListener('click', () => {
        matrix = newGame(gameContainer, gameOverContainer, winContainer, generateScoreElem);
        addRandomTile(matrix,2);
        generateTiles(matrix, gameContainer, gameOverContainer, winContainer);
    })
});