const scoreElem = document.querySelector('.score');

function generateScoreElem(score, currentScore, val) {
    score = currentScore;
    score += val;
    localStorage.setItem('score', score);
    scoreElem.innerHTML = score;
}

export default generateScoreElem;