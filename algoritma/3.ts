function countQuery(input: string[], query: string[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < query.length; i++) {
    let count: number = 0;
    for (let j = 0; j < input.length; j++) {
      if (input[j] === query[i]) {
        count++;
      }
    }
    result.push(count);
  }

  return result;
}

const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

console.log(countQuery(input, query));