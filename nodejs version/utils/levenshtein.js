function toLowercase(word) {
  return word.toLowerCase();
};

function omitPunctuations(word) {
  return word.replace(/[\!\.\,\?\-\?]/gi, '');
};

const stringFilter = (sourceString) => {
  return (outString = sourceString
    ? sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    : "no information gain");
};

function levenshteinDistance(str1, str2, isAddress=false) {
  str1 = stringFilter(str1);
  str2 = stringFilter(str2);
  if (str1.includes(str2)) return 1;
  // console.log(str1, str2)
  let str1Words;
  let str2Words;

  if (!isAddress) {
    str1Words = str1
      .trim()
      .split(" ")
      .map(omitPunctuations)
      .map(toLowercase);
    str2Words = str2
      .trim()
      .split(" ")
      .map(omitPunctuations)
      .map(toLowercase);
  } else {
    str1Words = str1
      .trim()
      .split(" ")
      .map(omitPunctuations)
      .map(toLowercase);
    str2Words = str2
      .trim()
      .split(" ")
      .map(omitPunctuations)
      .map(toLowercase);
  }

  str1 = str1Words.sort().join(" ")
  str2 = str2Words.sort().join(" ")
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1 // Deletion
        );
      }
    }
  }

  return matrix[len1][len2];
}

// var source = "backend developer";
// var target = "developer backend";

// console.log(levenshteinDistance(source, target));



module.exports = levenshteinDistance
