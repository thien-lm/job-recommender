const express = require('express');
const bodyParser = require('body-parser');
const similarity = require('cosine-similarity');
const calculateCosineSimilarityFromRawString = require('./CosineSimilarity')

const app = express();
app.use(bodyParser.json());

// Mô phỏng dữ liệu công việc
const jobData = [
    { id: 1, title: 'Software Engineer', description: 'Job description for Software Engineer...' },
    { id: 2, title: 'Data Scientist', description: 'Job description for Data Scientist...' },
    // Thêm các công việc khác ở đây
];

// API endpoint để gợi ý công việc dựa trên mô tả công việc
app.post('/suggest-job', (req, res) => {
    const { jobDescription } = req.body;
    console.log(jobDescription)
    const similarities = jobData.map(job => calculateCosineSimilarityFromRawString(job.description, jobDescription));
    console.log(similarities)

    // Chọn công việc có sự tương đồng cao nhất
    const recommendedJobIndex = similarities.indexOf(Math.max(...similarities));
    const recommendedJob = jobData[recommendedJobIndex];

    res.json({ suggestedJob: recommendedJob });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
