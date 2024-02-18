import checkGame from "./checkGame.js";

function generateTiles( matrix, gameContainer, gameOverContainer, winContainer) {
    const tileContainers = document.querySelectorAll('.tileContainer');

    tileContainers.forEach(tileContainer => {
        tileContainer.innerHTML='';
    })

    localStorage.setItem('matrix', JSON.stringify(matrix));

    matrix.map((row, i) => {
        row.map((column, j) => {
            if (column) {

                const tile = document.createElement('div');
                tile.classList.add(`tile`, `tile${column}`);
                tile.innerHTML = column;

                animate({
                    duration: 150,
                    timing: function (timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        tile.style.transform = `scale(${progress})`;
                    }
                });

                checkGame(matrix, gameContainer, gameOverContainer, winContainer);
                const tileContainer = document.querySelector(`[data-position="${i}-${j}"]`);
                tileContainer.appendChild(tile);
            }
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


export default generateTiles;