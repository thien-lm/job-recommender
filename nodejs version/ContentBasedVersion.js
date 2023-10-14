const express = require('express');
const bodyParser = require('body-parser');
const similarity = require('cosine-similarity');
const calculateCosineSimilarityFromRawString = require('./CosineSimilarity')

const app = express();
app.use(bodyParser.json());

// Mô phỏng dữ liệu công việc
const jobData = [
    { id: 1, title: 'Software Engineer', description: 'Job description for Software Engineer...', exp: "4+ years" },
    { id: 2, title: 'Data Scientist', description: 'Job description for Data Scientist...', exp: "3+ years" },
    // Thêm các công việc khác ở đây
];

// API endpoint để gợi ý công việc dựa trên mô tả công việc
app.post('/suggest-job', (req, res) => {
    const userJob = req.body;
    const cosineSimilarityMatrix = [];
    console.log(userJob)
    //duyet qua toan bo job
    for( let i = 0; i < jobData.length; i++) {
        let job = jobData[i]
        //phan tu dau tien la id
        cosineSimilarityMatrix.push([jobData[i].id]);
        //duyet qua cac key trong object
        for (let key in jobData[i]) {
            if(key == "id") continue;
            let similarity = calculateCosineSimilarityFromRawString(job[key], userJob[key])
            cosineSimilarityMatrix[i].push(similarity)
        }
    }

    //tinh tong cua do tuong dong
    /// tuong lai them weight vao tung property
    const sumSimilarities = []
    for(let jobSimilarityMatrix of cosineSimilarityMatrix) {
        let sum = 0;
        for(let i = 0; i < jobSimilarityMatrix.length; i++) {
            if(i == 0) continue;
            sum += jobSimilarityMatrix[i];
        }
        sumSimilarities.push({id: jobSimilarityMatrix[0], sumSimilarity: sum});
    }


    // const similarities = jobData.map(job => calculateCosineSimilarityFromRawString(job.description, jobDescription));
    

    // // Chọn công việc có sự tương đồng cao nhất
    // const recommendedJobIndex = similarities.indexOf(Math.max(...similarities));
    // const recommendedJob = jobData[recommendedJobIndex];

    res.json(sumSimilarities);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
