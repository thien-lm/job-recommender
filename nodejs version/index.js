const express = require("express");
const bodyParser = require("body-parser");
const calculateCosineSimilarityFromRawString = require("./utils/CosineSimilarity");
const { connect } = require("./db-config");
const { getAllJobs } = require("./repository/JobRepository");
const app = express();
const calculateDistance = require("./utils/EstimatingDistance");
const { saveUserInfo } = require("./repository/UserInfoRepository");
const cors = require("cors");

app.use(bodyParser.json());
connect();

let jobData;
// API endpoint để gợi ý công việc dựa trên mô tả công việc
app.post("/suggest-job", async (req, res) => {
  const userJob = req.body;
  //neu da co danh sach cong viec thi khong lay ra tu database nua
  if(!jobData) {
   jobData = await getAllJobs(req, res);
  }
  saveUserInfo(req, res);
  
  const cosineSimilarityMatrix = [];
  for (let i = 0; i < jobData.length; i++) {
    let job = jobData[i];
    //phan tu dau tien la id
    cosineSimilarityMatrix.push([jobData[i].id]);
    //duyet qua cac key trong object
    for (let key in jobData[i]) {
      if (key == "id" || key == "detailURL") continue;
      let similarity = calculateCosineSimilarityFromRawString(
        job[key],
        userJob[key]
      );
      if (key == "major") {
        similarity *= 4;
      }
      //tinh do do tuong dong giua hai diem tren ban do
      if (key === "address") {
        // let distance = await calculateDistance(userJob[key], job[key])
        // console.log(distance)
        // sigma = 1 //sigma cang cao su khac biet khoang cach cang nho
        // similarity = 3*Math.exp(-Math.pow(distance, 2) / (2 * Math.pow(sigma, 2)));
        similarity =
          10 *
          calculateCosineSimilarityFromRawString(job[key], userJob[key], true);
      }
      //xu li cho requirements
      //format: <edu, exp>
      if (key === "experience") {
        let requirements = userJob[key];
        let [education, experience] = requirements.split(",");
        if (
          requirements.includes(education) &&
          requirements.includes(experience)
        ) {
          similarity = 2;
        } else if (
          requirements.includes(education) ||
          requirements.includes(experience)
        ) {
          similarity = 1;
        } else {
          similarity = 0;
        }
      }

      cosineSimilarityMatrix[i].push(similarity);
    }
  }

  //tinh tong cua do tuong dong
  /// tuong lai them weight vao tung property
  let sumSimilarities = [];
  for (let jobSimilarityMatrix of cosineSimilarityMatrix) {
    let sum = 0;
    for (let i = 0; i < jobSimilarityMatrix.length; i++) {
      if (i == 0) continue;
      sum += jobSimilarityMatrix[i];
    }
    sumSimilarities.push({ id: jobSimilarityMatrix[0], sumSimilarity: sum });
  }
  sumSimilarities = sumSimilarities.sort(
    (a, b) => b["sumSimilarity"] - a["sumSimilarity"]
  );
  jobsToReturn = sumSimilarities.slice(0, 5);

  //chon cong viec co sum similarity cao nhat ( hoac top cao nhat ) trong sumSimilarities
  //const maxSimilarity = sumSimilarities.reduce((max, obj) => (obj.sumSimilarity > max.sumSimilarity ? obj : max), sumSimilarities[0]);
  //dua ra cong viec do
  // console.log(maxSimilarity)
  // Thuộc tính bạn muốn so sánh (ví dụ: 'id')
  let propertyName = "id";

  // Lọc các đối tượng có chung thuộc tính trong hai mảng
  let jobs = jobData.filter((obj1) =>
    jobsToReturn.some((obj2) => obj1[propertyName] === obj2[propertyName])
  );
  // const jobs = jobData.map(job => {
  //     for(let jobObject of jobsToReturn) {
  //         if(jobObject.id == job.id) return job;
  //     }
  // })

  // // Chọn công việc có sự tương đồng cao nhất
  // const recommendedJobIndex = similarities.indexOf(Math.max(...similarities));
  // const recommendedJob = jobData[recommendedJobIndex];

  res.json(jobs);
});

const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.all("/suggest-job", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
