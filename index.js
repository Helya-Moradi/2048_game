const board = document.querySelector('.gameBoard');
const scoreElem = document.querySelector('.score');
const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const newGameButtons = document.querySelectorAll('.newGame');

let matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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

function generateScoreElem() {
    scoreElem.innerHTML = score;
}

function newGame() {
    gameContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');

    generateScoreElem();
    generateBoard();
    addRandomTile();
    addRandomTile();
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

const isContinue = matrix.some(i => i.some(j => j === 0));

function gameOverCheck() {
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

function moveTo(direction, value, {row, col}) {

    if (direction === 'up') {

    }

    return {
        pos: {row: 0, col: 0},
        isMoveAllow: true
    }
}

function rotateMatrix(times = 1) {
    let newMat = []



    return newMat
}


function upMoveHandler() {
    const anotherRows = matrix.filter((i, index) => index !== 0);

    const isMoveAllow = anotherRows.some(row => row.some(cell => cell !== 0));

    if (isMoveAllow) {

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] !== 0) {
                    const columnArr = [];
                    for (let k = 0; k < matrix.length; k++) {
                        columnArr.push({row: k, column: j, value: matrix[k][j]});
                    }

                    for (let m = 0; m < columnArr.length; m++) {
                        if (m > 0 && columnArr[m].value > columnArr[m - 1].value) {
                            const buffer = columnArr[m];
                            // console.log(buffer)
                            matrix[columnArr[m - 1].row][columnArr[m - 1].column] = buffer.value;
                            matrix[buffer.row][buffer.column] = 0;
                            generateBoard()
                            console.log(matrix)
                        }
                    }
                }
            }
        }

        // const t = matrix[0].map((val, i) => matrix.map((row, j) => {
        //     return {val: row[i], row: i, column: j}
        // }))
        //
        // console.log(t)

    }
}

function downMoveHandler() {
}

function leftMoveHandler() {
}

function rightMoveHandler() {
}

window.addEventListener('keydown', moveHandler);


newGame();

// console.log(matrix[0])
// console.log(matrix[matrix.length-1])
// console.log(matrix.map(i=>i[0]))
// console.log(matrix.map(i=>i[i.length-1]))
