import checkGame from "./checkGame.js";

const board = document.querySelector('.gameBoard');

function generateBoard(matrix, gameContainer, gameOverContainer, winContainer) {
    board.innerHTML = '';
    localStorage.setItem('matrix', JSON.stringify(matrix));

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
                        tile.style.transform = `scale(${progress})`;
                    }
                });
            }

            checkGame(matrix,gameContainer,gameOverContainer,winContainer);
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

        let progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}


export default generateBoard;