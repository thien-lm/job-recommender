const { mod } = require("mathjs");

// const str1 = 'Job description for Data Scientist';
// const str2 = 'Job description for Software Engineer';

// //
// // Preprocess strings and combine words to a unique collection
// //

// const str1Words = str1.trim().split('').map(omitPunctuations).map(toLowercase);
// const str2Words = str2.trim().split('').map(omitPunctuations).map(toLowercase);
// const allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));



//
// Calculate IF-IDF algorithm vectors
//

// const str1Vector = calcTfIdfVectorForDoc(str1Words, [str2Words], allWordsUnique);
// const str2Vector = calcTfIdfVectorForDoc(str2Words, [str1Words], allWordsUnique);

//caculate based on raw string

const calculateCosineSimilarityFromRawString = (str1, str2) => {
    str1 = stringFilter(str1)
    str2 = stringFilter(str2)
    // console.log(str1, str2)
    const str1Words = str1.trim().split('').map(omitPunctuations).map(toLowercase);
    const str2Words = str2.trim().split('').map(omitPunctuations).map(toLowercase);
    //console.log(str1Words, str2Words)
    const allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));
    const str1Vector = calcTfIdfVectorForDoc(str1Words, [str2Words], allWordsUnique);
    const str2Vector = calcTfIdfVectorForDoc(str2Words, [str1Words], allWordsUnique);
    // console.log(str1Vector, str2Vector)
    return cosineSimilarity(str1Vector, str2Vector)
}

//
// Main
//

// console.log('Cosine similarity', cosineSimilarity(str1Vector, str2Vector));
const stringFilter = (sourceString) => {
    return outString = sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}


//
// Main function
//

function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.map((val, i) => val * vec2[i]).reduce((accum, curr) => accum + curr, 0);
  const vec1Size = calcVectorSize(vec1);
  const vec2Size = calcVectorSize(vec2);

  return dotProduct / (vec1Size * vec2Size);
};

module.exports = calculateCosineSimilarityFromRawString


//
// tf-idf algorithm implementation (https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
//

function calcTfIdfVectorForDoc(doc, otherDocs, allWordsSet) {
  return Array.from(allWordsSet).map(word => {
    return tf(word, doc) * idf(word, doc, otherDocs);
  });
};

function tf(word, doc) {
  const wordOccurences = doc.filter(w => w === word).length;
  return wordOccurences / doc.length;
};

function idf(word, doc, otherDocs) {
  const docsContainingWord = [doc].concat(otherDocs).filter(doc => {
    return !!doc.find(w => w === word);
  });

  return (1 + otherDocs.length) / docsContainingWord.length;
};



//
// Helper functions
//

function omitPunctuations(word) {
  return word.replace(/[\!\.\,\?\-\?]/gi, '');
};

function toLowercase(word) {
  return word.toLowerCase();
};

function calcVectorSize(vec) {
  return Math.sqrt(vec.reduce((accum, curr) => accum + Math.pow(curr, 2), 0));
};