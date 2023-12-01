const express = require("express");
const bodyParser = require("body-parser");
const calculateCosineSimilarityFromRawString = require("./utils/CosineSimilarity");
const { connect } = require("./db-config");
const { getAllJobs } = require("./repository/JobRepository");
const app = express();
const calculateDistance = require("./utils/EstimatingDistanceBetweenTwoLocation");
const { saveUserInfo } = require("./repository/UserInfoRepository");
const cors = require("cors");
const {
  calculateTitle,
  calculateAddress,
  calculateLevel,
  calculateSalary,
  calculateExperience,
  calculateTimeDistance,
} = require("./utils/CalculatingValueForDecisionTable");
const {
  convertSalary,
  convertExperience,
  convertLevel,
} = require("./utils/ConvertPropertyToStandardValue");
const JobDecisionClass = require("./JobDecisionClass");
const calculateWeightToApply = require("./utils/CalculateWeight")

app.use(bodyParser.json());
connect();

let jobData;
let weight = [0.3, 0.2, 0.2, 0.15, 0.1, 0.05];
// API endpoint để gợi ý công việc dựa trên mô tả công việc
app.post("/suggest-job", async (req, res) => {
  console.log("params is: ", req.query)
  //calculate weight
  citerialMatrix = [
    [1, parseInt(req.query.TvS), parseInt(req.query.TvA)],
    [1/parseInt(req.query.TvS), 1, parseInt(req.query.SvA)],
    [1/parseInt(req.query.TvA), 1/parseInt(req.query.SvA), 1],
  ];

  try{
    weight = calculateWeightToApply(citerialMatrix);
  }
  catch(error) {
    console.log(error)
  }
  console.log(weight)

  const userJob = req.body;
  //neu da co danh sach cong viec thi khong lay ra tu database nua
  if (!jobData) {
    jobData = await getAllJobs(req, res);
  }
  saveUserInfo(req, res);

  const PreNormalizeDecisionTable = [];
  maxLevel = 5;
  maxExp = 7;
  maxDate = 49;
  maxTitle = 0;
  for (let i = 0; i < jobData.length; i++) {
    let standardTitleValue = calculateTitle(jobData[i].title, userJob.title);
    let standardAddressValue = calculateAddress(
      jobData[i].address,
      userJob.address
    );
    let standardSalaryValue = calculateSalary(
      convertSalary(jobData[i].salary),
      parseInt(userJob.salary)
    );
    let standardLevelValue = calculateLevel(
      convertLevel(jobData[i].level),
      convertLevel(userJob.level)
    );
    let standardExperienceValue = calculateExperience(
      convertExperience(jobData[i].experience),
      convertExperience(userJob.experience)
    );
    let standardPostedTimeValue = calculateTimeDistance(
      jobData[i].refreshedTime
    );
    // normalize
    standardLevelValue = (maxLevel - standardLevelValue) / maxLevel;
    standardExperienceValue = (maxExp - standardExperienceValue) / maxExp;
    standardPostedTimeValue = (maxDate - standardPostedTimeValue) / maxDate;
    PreNormalizeDecisionTable.push(
      new JobDecisionClass(
        standardTitleValue,
        standardAddressValue,
        standardSalaryValue,
        standardLevelValue,
        standardExperienceValue,
        standardPostedTimeValue,
        jobData[i].detailURL
      )
    );
    //maintain maxValue for lv, exp and date
    if (maxDate < standardPostedTimeValue) maxDate = standardPostedTimeValue;
    if (maxExp < standardExperienceValue) maxExp = standardExperienceValue;
    if (maxLevel < standardLevelValue) maxLevel = standardLevelValue;
    if (maxTitle < standardTitleValue) maxTitle = standardTitleValue;
  } // decision table is now standardized
  //optimized solution is jobDecisionClass(1,1,1,1,1,1....) and the worst one is (0,0,0,0,0,0...) so it's useless to compute based on topsis

  for (let i = 0; i < jobData.length; i++) {
    // if (PreNormalizeDecisionTable[i].title > 0.95) console.log(PreNormalizeDecisionTable[i]);
      PreNormalizeDecisionTable[i].score = Math.sqrt(
        weight[0] *
          weight[0] *
          (1 - PreNormalizeDecisionTable[i].title / maxTitle) *
          (1 - PreNormalizeDecisionTable[i].title / maxTitle) +
          weight[1] *
            weight[1] *
            (1 - PreNormalizeDecisionTable[i].address) *
            (1 - PreNormalizeDecisionTable[i].address) +
          weight[2] *
            weight[2] *
            (1 - PreNormalizeDecisionTable[i].salary) *
            (1 - PreNormalizeDecisionTable[i].salary) +
          weight[3] *
            weight[3] *
            (1 - PreNormalizeDecisionTable[i].level) *
            (1 - PreNormalizeDecisionTable[i].level) +
          weight[4] *
            weight[4] *
            (1 - PreNormalizeDecisionTable[i].experience) *
            (1 - PreNormalizeDecisionTable[i].experience) +
          weight[5] *
            weight[5] *
            (1 - PreNormalizeDecisionTable[i].postedTime) *
            (1 - PreNormalizeDecisionTable[i].postedTime)
      );
      jobData[i].score = PreNormalizeDecisionTable[i].score;
  }
  const sortedDecisionTable =  PreNormalizeDecisionTable.sort((a, b) => {
    return a.score - b.score;
  });
  jobData.sort((a, b) => {
    return a.score - b.score;
  });
  console.log(PreNormalizeDecisionTable.length);
  res.json([sortedDecisionTable[0], jobData[0]]);
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
