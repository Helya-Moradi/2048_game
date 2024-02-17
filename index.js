import rotate from './scripts/rotate.js';
import generateBoard from "./scripts/generateBoard.js";
import newGame from "./scripts/newGame.js";
import generateScoreElem from "./scripts/generateScoreElem.js";
import addRandomTile from "./scripts/addRandomTile.js";

const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const winContainer = document.querySelector('.winContainer');
const newGameButtons = document.querySelectorAll('.newGame');

let score = parseInt(localStorage.getItem('score'));
if (!score) {
    generateScoreElem(score, 0, 0);
}

let matrix = JSON.parse(localStorage.getItem('matrix'));
if (!matrix) {
    matrix = newGame(score, gameContainer, gameOverContainer, winContainer);
    addRandomTile(matrix);
    addRandomTile(matrix);
    generateBoard(matrix, gameContainer, gameOverContainer, winContainer);

} else {
    generateScoreElem(score, 0, score);
    generateBoard(matrix, gameContainer, gameOverContainer, winContainer);
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
            generateScoreElem(score, value * 2, score);
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

function upMoveHandler() {
    const movable = moveToUp()

    if (movable) {
        addRandomTile(matrix);
        generateBoard(matrix, gameContainer, gameOverContainer, winContainer);
    }
}

function downMoveHandler() {
    matrix = rotate(matrix, 2);
    const movable = moveToUp();
    matrix = rotate(matrix, 2);

    if (movable) {
        addRandomTile(matrix);
        generateBoard(matrix, gameContainer, gameOverContainer, winContainer);
    }
}

function leftMoveHandler() {
    matrix = rotate(matrix, 1);
    const movable = moveToUp()
    matrix = rotate(matrix, 3);

    if (movable) {
        addRandomTile(matrix);
        generateBoard(matrix, gameContainer, gameOverContainer, winContainer);
    }
}

function rightMoveHandler() {
    matrix = rotate(matrix, 3);
    const movable = moveToUp()
    matrix = rotate(matrix, 1);

    if (movable) {
        addRandomTile(matrix);
        generateBoard(matrix, gameContainer, gameOverContainer, winContainer);
    }
}

window.addEventListener('keydown', moveHandler);

newGameButtons.forEach(newButton => {
    newButton.addEventListener('click', () => {
        matrix = newGame(score, gameContainer, gameOverContainer, winContainer);
        addRandomTile(matrix);
        addRandomTile(matrix);
        generateBoard(matrix, gameContainer, gameOverContainer, winContainer);

        gameContainer.classList.remove('hide');
        gameOverContainer.classList.add('hide');
        winContainer.classList.add('hide');
    })
});