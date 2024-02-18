function newGame(gameContainer, gameOverContainer, winContainer, generateScoreElem) {
    gameContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');
    winContainer.classList.add('hide');

    let resetMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    generateScoreElem(0, 0);

    return resetMatrix;
}

export default newGame;