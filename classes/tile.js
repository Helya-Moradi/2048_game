import Bounds from "./bounds.js";
import getBackgroundColors from '../utils/getBackgrounds.js'

class Tile {
    matrix;
    slots;
    slotsContainer;

    constructor(matrix, slots, slotsContainer) {
        this.matrix = matrix;
        this.slots = slots;
        this.slotsContainer = slotsContainer;

        this.tilesContainer = document.querySelector('.board .tiles')
    }

    generateRandomTile() {
        const emptyCells = this.matrix.map((row, i) => row.map((cell, j) => ({
            ...cell,
            i,
            j
        })).filter(cell => cell.value === null)).flat(2);

        const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < .75 ? 2 : 4;

        const tile = this.generateTile(i, j, value);

        this.tilesContainer.appendChild(tile);

        this.matrix[i][j].value = value;
        this.matrix[i][j].tile = tile;

        this.addAnimation(tile);
    }

    generateTile(i, j, value) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = value.toString();

        const bounds = new Bounds(i, j, this.slotsContainer, this.slots);
        const tileBounds = bounds.calculateTileBounds();

        tile.style.left = `${tileBounds.left}px`;
        tile.style.top = `${tileBounds.top}px`;
        tile.style.width = `${tileBounds.width}px`;
        tile.style.height = `${tileBounds.height}px`;

        tile.style.backgroundColor = getBackgroundColors(value);

        return tile;
    }

    addAnimation(tile) {
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
}

export default Tile;