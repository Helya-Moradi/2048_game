const board = document.querySelector('.gameBoard');
const scoreElem = document.querySelector('.score');
const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const newGameButtons = document.querySelectorAll('.newGame');

let matrix = [
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0]
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
        gameOverCheck()
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
        console.log('over')
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
    let dests = [{row, col, value}];


    if (direction === 'up') {
        // const previousItemsArray = [];
        //
        // for (let i = 0; i < row; i++) {
        //     previousItemsArray.push({row: i, col: col, value: matrix[i][col]});
        // }

        for (let r = row - 1; r >= 0; r--) {
            if (matrix[r][col] === 0) {
                dests.push({row: r, col, value})
            } else if (matrix[r][col] === value) {
                dests.push({row: r, col, value: value *2})
                break;
            }
        }
    }
    if (direction === 'down') {
        const previousItemsArray = [];

        for (let i = row + 1; i < matrix[row].length; i++) {
            previousItemsArray.push({row: i, col: col, value: matrix[i][col]});
        }

        for (let i = 0; i < previousItemsArray.length; i++) {
            const item = previousItemsArray[i];
            if (item.value === 0) {
                isMoveAllow = true;
                dest = {row: item.row, col: item.col, value: value}
            }
        }
    }

    return dests
}

function moveWithAnimation(dests) {

}


function upMoveHandler() {
    let hasMove = false;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                const dests = moveTo('up', matrix[i][j], {row: i, col: j});
                console.log(i,j,dests)

                if (dests.length > 1) {
                    // matrix[move.dest.row][move.dest.col] = move.dest.value;
                    // matrix[i][j] = 0;

                    // TODO: move with animation and update matrix

                }
            }
        }
    }

    if (hasMove) {
        // addRandomTile();
        generateBoard();
    }
}

function downMoveHandler() {
    let hasMove = false;

    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = matrix[i].length - 1; j >= 0; j--) {
            if (matrix[i][j] !== 0) {
                const move = moveTo('down', matrix[i][j], {row: i, col: j});
                hasMove = hasMove || move.isMoveAllow;

                if (move.isMoveAllow) {
                    matrix[move.dest.row][move.dest.col] = move.dest.value;
                    matrix[i][j] = 0;
                }
            }
        }
    }

    if (hasMove) {
        // addRandomTile();
        generateBoard();
    }
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
