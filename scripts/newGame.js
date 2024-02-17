import generateScoreElem from "./generateScoreElem.js";

function newGame(score, gameContainer, gameOverContainer, winContainer) {
    gameContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');
    winContainer.classList.add('hide');

    let resetMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    generateScoreElem(score, 0, 0);

    return resetMatrix;
}

export default newGame;