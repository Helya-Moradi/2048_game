const board = document.querySelector('.gameBoard');

function generateBoard() {
    const row = 4;
    const col = 4;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const tileContainer = document.createElement('div');
            tileContainer.classList.add(`tileContainer`);
            tileContainer.setAttribute('data-position', `${i}-${j}`)
            board.appendChild(tileContainer);
        }
    }
}

export default generateBoard;