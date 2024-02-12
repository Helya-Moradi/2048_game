const board = document.querySelector('.gameBoard');
const scoreElem = document.querySelector('.score');
const gameContainer = document.querySelector('.gameContainer');
const gameOverContainer = document.querySelector('.gameOverContainer');
const newGameButton = document.querySelector('.newGame');

let rows = 4, columns = 4, score = 0, wonGame = false, matrix = [];

function generateBoard() {
    board.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    board.style.gridTemplateRows = ` repeat(${columns}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            const tileWrapper = document.createElement('div');
            tileWrapper.classList.add('tileWrapper');
            tileWrapper.setAttribute('data-position', `${i}_${j}`);
            board.appendChild(tileWrapper);
            row.push(0);
        }
        matrix.push(row)
    }
}

function addRandomTile() {
    const emptyTiles = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                emptyTiles.push([i, j]);
            }
        }
    }

    let [randomI, randomJ] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    matrix[randomI][randomJ] = Math.random() < .9 ? 2 : 4;
    addTileToPage(randomI, randomJ, matrix[randomI][randomJ]);
}

function addTileToPage(row, column, value) {
    let tile = document.createElement('div');
    tile.classList.add(
        'tile',
        `row${row + 1}`,
        `column${column + 1}`,
        `tile${value}`
    );
    tile.innerHTML = value;

    const tileWrappers = board.querySelectorAll('.tileWrapper');

    tileWrappers.forEach(tileWrapper => {
        const [i, j] = tileWrapper.dataset.position.split('_').map(Number);

        if (i === row && j === column) {
            tileWrapper.appendChild(tile);
            tile.classList.add('merged');
            tile.addEventListener('animationend', () => {
                tile.classList.remove('merged');
            })
        }
    })
}

generateBoard()



