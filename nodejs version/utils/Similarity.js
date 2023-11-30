const natural = require('natural');

// Hàm tính cosine similarity giữa hai chuỗi
function cosineSimilarity(str1, str2) {
    const vector1 = new natural.NounInflector().pluralize(str1).split(' '); // Chuyển chuỗi thành vector
    const vector2 = new natural.NounInflector().pluralize(str2).split(' ');

    const tfidf = new natural.TfIdf();
    tfidf.addDocument(vector1);
    tfidf.addDocument(vector2);

    const vec1 = tfidf.documents[0];
    const vec2 = tfidf.documents[1];
    console.log(tfidf)

    let dotProduct = 0;
    let normVec1 = 0;
    let normVec2 = 0;

    for (const term in vec1) {
        dotProduct += vec1[term] * (vec2[term] || 0);
        normVec1 += vec1[term] ** 2;
    }

    for (const term in vec2) {
        normVec2 += vec2[term] ** 2;
    }

    const similarity = dotProduct / (Math.sqrt(normVec1) * Math.sqrt(normVec2));
    return similarity;
}

// Hai vector đầu vào (mỗi phần tử là một chuỗi)
const vector1 = ["tôi là người học machine learning", "node.js là một môi trường chạy mã JavaScript"];
const vector2 = ["tôi học về machine learning", "node.js là một nền tảng phát triển JavaScript"];

// Tính cosine similarity giữa các chuỗi trong hai vector chính
const similarities = vector1.map((str1, index) => {
    const str2 = vector2[index];
    return cosineSimilarity(str1, str2);
});

console.log("Độ đo tương tự (cosine similarity) giữa các chuỗi là:", similarities);
