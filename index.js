import Board from "./classes/board.js";

const board = new Board();


function keyDownHandler(e) {
    if (e.code.startsWith('Arrow')) {
        const direction = e.code.substring(5).toLowerCase();

        board.moveHandler(direction);
    }
}

window.addEventListener('keydown', keyDownHandler)
