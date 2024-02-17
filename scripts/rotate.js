const rotate = (matrix,n)=>{
    for (let i = 0; i < n; i++) {
        matrix = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    }
    return matrix;
}


export default rotate;