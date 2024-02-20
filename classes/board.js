import Tile from "./tile.js";
import Move from "./move.js";

class Board {
    matrix;
    slots;

    constructor() {
        this.matrix = [];
        this.slots = [];

        this.slotsContainer = document.querySelector('.board .slots');
        this.generateBoard();

        const tile = new Tile(this.matrix, this.slots, this.slotsContainer);
        tile.generateRandomTile();
        tile.generateRandomTile();

        new Move(this.matrix, this.slots, this.slotsContainer);
    }

    generateBoard() {
        for (let i = 0; i < 4; i++) {
            const row = [];
            const matrixRow = [];

            for (let j = 0; j < 4; j++) {
                const slot = document.createElement('div');
                slot.classList.add('slot');

                this.slotsContainer.appendChild(slot);

                row.push(slot);
                matrixRow.push({
                    value: null,
                    tile: null
                });
            }
            this.matrix.push(matrixRow);
            this.slots.push(row);
        }
    }
}

export default Board;