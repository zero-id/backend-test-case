function findLongestWord(sentence: string): string {
  const words = sentence.split(" ");

  let longestWord = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }

  return longestWord;
}

const sentence = "Silahkan cari kata terpanjang dari kalimat ini";
const longestWord = findLongestWord(sentence);
console.log(longestWord);
