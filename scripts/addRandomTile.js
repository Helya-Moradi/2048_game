function addRandomTile(matrix,n) {
    for (let i = 0; i < n; i++) {
        const randomI = Math.floor(Math.random() * matrix.length);
        const randomJ = Math.floor(Math.random() * matrix.length);

        const createRandom = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;

        if (matrix[randomI][randomJ] === 0) {
            matrix[randomI][randomJ] = createRandom(0, 10) < 9 ? 2 : 4;
        } else {
            addRandomTile(matrix);
        }
    }
}

export default addRandomTile;