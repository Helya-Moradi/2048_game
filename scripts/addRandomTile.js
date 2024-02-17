function addRandomTile(matrix) {
    const randomI = Math.floor(Math.random() * matrix?.length);
    const randomJ = Math.floor(Math.random() * matrix?.length);

    const createRandom = (l, h) => Math.floor(Math.random() * (h - l + 1)) + l;

    if (matrix[randomI][randomJ] === 0) {
        matrix[randomI][randomJ] = createRandom(0, 10) < 9 ? 2 : 4;
    } else {
        addRandomTile(matrix);
    }
}

export default addRandomTile;