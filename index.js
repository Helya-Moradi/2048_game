const board = document.querySelector('.gameBoard');
const scoreElem = document.querySelector('.score');
const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const newGameButtons = document.querySelectorAll('.newGame');

let matrix = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;

function generateBoard() {
    board.innerHTML = '';

    matrix.map((row, i) => {
        row.map((column, j) => {
            const tile = document.createElement('div');
            tile.classList.add(`tile`, `tile${column}`);
            tile.innerHTML = column !== 0 ? column : null;

            if (column !== 0) {
                animate({
                    duration: 150,
                    timing: function (timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        tile.style.transform = `scale(${progress})`
                    }
                });
            }

            tile.setAttribute('data-position', `${i}-${j}`)
            board.appendChild(tile);
        })
    })
}

function animate(options) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = options.timing(timeFraction)

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function addRandomTile() {
    const randomI = Math.floor(Math.random() * matrix[0].length);
    const randomJ = Math.floor(Math.random() * matrix.length);

    const createRandom = (l, h) => Math.floor(Math.random() * (h - l + 1)) + l;

    if (matrix[randomI][randomJ] === 0) {
        matrix[randomI][randomJ] = createRandom(0, 10) < 9 ? 2 : 4;
        generateBoard();
        gameOverCheck();
    } else {
        addRandomTile();
    }
}

function resetMatrix() {
    matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function generateScoreElem(val) {
    score += val;
    scoreElem.innerHTML = score;
}

function newGame() {
    gameContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');

    generateScoreElem(0);
    generateBoard();
    // addRandomTile();
    // addRandomTile();
}

newGameButtons.forEach(newButton => {

    newButton.addEventListener('click', () => {
        score = 0;
        resetMatrix();
        newGame();

        gameContainer.classList.remove('hide');
        gameOverContainer.classList.add('hide');
    })
})

function gameOverCheck() {
    const isContinue = matrix.some(i => i.some(j => j === 0));

    if (isContinue) {
        gameContainer.classList.remove('hide');
        gameOverContainer.classList.add('hide');
    } else {
        gameContainer.classList.add('hide');
        gameOverContainer.classList.remove('hide');
    }
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

function findDests(value, {row, col}) {
    let dests = [{row, col, value}];

    for (let r = row - 1; r >= 0; r--) {
        if (matrix[r][col] === 0) {
            dests.push({row: r, col, value});
        } else if (matrix[r][col] === value) {
            dests.push({row: r, col, value: value * 2});
            generateScoreElem(value * 2);
        } else {
            break;
        }

    }

    return dests;
}

function moveWithAnimation(dests) {

    for (let i = 0; i < dests.length; i++) {
        matrix[dests[i].row][dests[i].col] = dests[i].value;

        if (i > 0) {
            matrix[dests[i - 1].row][dests[i - 1].col] = 0
        }
    }
}

function moveToUp() {
    let hasMove = false;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                const dests = findDests(matrix[i][j], {row: i, col: j});

                if (dests.length > 1) {
                    hasMove = true;
                    moveWithAnimation(dests);
                }
            }
        }
    }

    return hasMove;
}

const rightRotate = () => {
    matrix = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}
const leftRotate = () => {
    matrix = matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]));
}


function upMoveHandler() {
    const movable = moveToUp()
    if (movable) {
        addRandomTile();
    }
}

function downMoveHandler() {

    leftRotate();
    leftRotate();
    const movable = moveToUp()
    rightRotate();
    rightRotate();
    if (movable) {
        addRandomTile();
    }
}

function leftMoveHandler() {
    rightRotate();
    const movable = moveToUp()
    leftRotate();
    if (movable) {
        addRandomTile();
    }
}

function rightMoveHandler() {
    leftRotate();
    const movable = moveToUp()
    rightRotate();
    if (movable) {
        addRandomTile();
    }
}

window.addEventListener('keydown', moveHandler);

newGame();
