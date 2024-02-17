function checkGame(matrix, gameContainer, gameOverContainer, winContainer) {
    const isContinue = matrix.some(i => i.some(j => j === 0));
    const isWin = matrix.some(i => i.some(j => j === 2048));

    if (isContinue && !isWin) {
        gameContainer.classList.remove('hide');
        gameOverContainer.classList.add('hide');
        winContainer.classList.add('hide');

    } else if (isContinue && isWin) {
        gameContainer.classList.add('hide');
        winContainer.classList.remove('hide');
        localStorage.clear();

    } else {
        gameContainer.classList.add('hide');
        winContainer.classList.add('hide');
        gameOverContainer.classList.remove('hide');
        localStorage.clear();
    }
}

export default checkGame;