const board = document.querySelector('.board')
const slotsContainer = document.querySelector('.board .slots')
const tilesContainer = document.querySelector('.board .tiles')

const slots = [];

let matrix = [];

function generateBoard() {
    for (let i = 0; i < 4; i++) {
        const row = [];
        const matrixRow = [];

        for (let j = 0; j < 4; j++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');

            slotsContainer.appendChild(slot);

            row.push(slot);
            matrixRow.push({
                value: null,
                tile: null
            });
        }
        matrix.push(matrixRow);
        slots.push(row);
    }
}

function calculateTileBounds(i, j) {
    const slotsContainerBounds = slotsContainer.getBoundingClientRect();
    const slotBounds = slots[i][j].getBoundingClientRect();

    return {
        left: slotBounds.left - slotsContainerBounds.left,
        top: slotBounds.top - slotsContainerBounds.top,
        width: slotBounds.width,
        height: slotBounds.height
    }
}

function generateTile(i, j, value) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = value.toString();

    const tileBounds = calculateTileBounds(i, j);

    tile.style.left = `${tileBounds.left}px`;
    tile.style.top = `${tileBounds.top}px`;
    tile.style.width = `${tileBounds.width}px`;
    tile.style.height = `${tileBounds.height}px`;

    return tile;
}

function generateRandomTile() {
    const emptyCells = matrix.map((row, i) => row.map((cell, j) => ({
        ...cell,
        i,
        j
    })).filter(cell => cell.value === null)).flat(2)
    const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    const value = Math.random() < .75 ? 2 : 4;

    const tile = generateTile(i, j, value);
    tilesContainer.appendChild(tile);

    matrix[i][j].value = value;
    matrix[i][j].tile = tile;

    tile.animate(
        [
            {transform: 'scale(0)'},
            {transform: 'scale(1)'},
        ],
        {
            duration: 200,
            easing: 'ease-in-out'
        }
    )
}

function keyHandler(e) {
    if(e.code.startsWith('Arrow')){
        const direction = e.code.substring(5).toLowerCase();
        moveHandler(direction);
    }
}

function moveHandler(direction) {
    const rotations = {
        up: 3,
        down: 1,
        left: 0,
        right: 2
    }[direction];

    let newMatrix = rotate(matrix, rotations);
    newMatrix = moveTiles(newMatrix);
    newMatrix = rotate(newMatrix, (4 - rotations) % 4);

    for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
            if(newMatrix[i][j].value){
                const tileBounds = calculateTileBounds(i, j);



                newMatrix[i][j].tile.animate(
                    [
                        {
                            left : `${tileBounds.left}px`,
                            top : `${tileBounds.top}px`
                        },
                    ],
                    {
                        duration: 200,
                        fill: "forwards",
                        easing: 'ease-in-out'
                    }
                )
            }
        }
    }
}

function rotate(matrix, rotations) {
    let newMatrix = matrix.map(row => [...row]);

    for (let i = 0; i < rotations; i++) {
        newMatrix = newMatrix[0].map((value, index) => newMatrix.map(row => row[index]).reverse());
    }

    return newMatrix;
}

function moveTiles(matrix) {
    let newMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        let nonEmptyCells = matrix[i].filter(cell => cell.value !== null);
        let row = [];

        for (let j = 0; j < nonEmptyCells.length; j++) {
            const currentCell = nonEmptyCells[j];

            console.log(currentCell)

            if (j < nonEmptyCells.length - 1) {
                const nextCell = nonEmptyCells[j + 1];

                if (nextCell.value === currentCell.value) {
                    currentCell.value *= 2;
                    currentCell.tile.textContent = currentCell.value.toString();
                    nextCell.tile.remove();

                    j += 1;
                }
            }

            row.push(currentCell);
        }

        const emptyCount = 4 - row.length;
        for (let k = 0; k < emptyCount; k++) {
            row.push({
                value: null,
                tile: null
            });
        }

        newMatrix.push(row);
    }

    return newMatrix;
}

generateBoard();

generateRandomTile();
generateRandomTile();

window.addEventListener('keydown', keyHandler);