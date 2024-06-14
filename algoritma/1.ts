function reverseAlphabets(input: string): string {
  const alphabets: string[] = [];
  const digits: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (isNaN(+char)) {
      alphabets.push(char);
    } else {
      digits.push(char);
    }
  }

  const reversedAlphabets = alphabets.reverse().join("");  

  return reversedAlphabets + digits.join("");
}

const input1 = "NEGIE1";
const input2 = "orez25";
const input3 = "fitaL01"

console.log(reverseAlphabets(input1));
console.log(reverseAlphabets(input2));
console.log(reverseAlphabets(input3));
