function subtractionDiagonal(matrix: number[][]): number {
  let sumDiagonal1 = 0;
  let sumDiagonal2 = 0;

  for (let i = 0; i < matrix.length; i++) {
    sumDiagonal1 += matrix[i][i];
    sumDiagonal2 += matrix[i][matrix.length - 1 - i];
  }

  const result = sumDiagonal1 - sumDiagonal2;

  return result;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(subtractionDiagonal(matrix));
