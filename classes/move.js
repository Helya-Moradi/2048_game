import Bounds from "./bounds.js";
import getBackgroundColors from "../utils/getBackgrounds.js";
import Tile from "./tile.js";

class Move {
    matrix;
    slots;
    slotsContainer;

    constructor(matrix, slots, slotsContainer) {
        this.matrix = matrix;
        this.slots = slots;
        this.slotsContainer = slotsContainer;

        window.addEventListener('keydown', this.keyHandler.bind(this))
    }

    keyHandler(e) {
        if (e.code.startsWith('Arrow')) {
            const direction = e.code.substring(5).toLowerCase();
            this.moveHandler(direction);
        }
    }

    moveHandler(direction) {
        const rotations = {
            up: 3,
            down: 1,
            left: 0,
            right: 2
        }[direction];

        let newMatrix = this.rotate(this.matrix, rotations);
        newMatrix = this.moveTiles(newMatrix);
        newMatrix = this.rotate(newMatrix, (4 - rotations) % 4);

        this.updateTiles(newMatrix)
    }

    rotate(matrix, rotations) {
        let newMatrix = matrix.map(row => [...row]);

        for (let i = 0; i < rotations; i++) {
            newMatrix = newMatrix[0].map((value, index) => newMatrix.map(row => row[index]).reverse());
        }

        return newMatrix;
    }

    moveTiles(matrix) {
        let newMatrix = [];

        for (let i = 0; i < matrix.length; i++) {
            let filledCells = matrix[i].filter(cell => cell.value !== null);
            let row = [];

            for (let j = 0; j < filledCells.length; j++) {
                const currentCell = filledCells[j];

                if (j < filledCells.length - 1) {
                    const nextCell = filledCells[j + 1];

                    if (nextCell.value === currentCell.value) {
                        currentCell.value *= 2;
                        currentCell.tile.textContent = currentCell.value.toString();

                        this.mergeAnimate(currentCell);

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

    updateTiles(newMatrix) {
        let hadMove = JSON.stringify(this.matrix) !== JSON.stringify(newMatrix);

        if (hadMove) {
            this.matrix = newMatrix;

            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    if (this.matrix[i][j].value) {
                        this.moveAnimate(i, j);
                    }
                }
            }

            const tile = new Tile(this.matrix, this.slots, this.slotsContainer);
            tile.generateRandomTile();
        }
    }

    moveAnimate(i, j) {
        const bounds = new Bounds(i, j, this.slotsContainer, this.slots);
        const tileBounds = bounds.calculateTileBounds();

        this.matrix[i][j].tile.animate(
            [
                {
                    left: `${tileBounds.left}px`,
                    top: `${tileBounds.top}px`
                },
            ],
            {
                duration: 200,
                fill: "forwards",
                easing: 'ease-in-out'
            }
        )
    }

    mergeAnimate(cell) {
        cell.tile.animate(
            [
                {
                    transform: 'scale(1.1)',
                },
                {
                    transform: 'scale(1)',
                    backgroundColor: getBackgroundColors(cell.value),
                    color: cell.value === 2 || cell.value === 4 ? '#776e65' : '#fff'
                }
            ],
            {
                duration: 200,
                fill: "forwards",
                easing: 'ease-in-out'
            }
        )
    }
}

export default Move;