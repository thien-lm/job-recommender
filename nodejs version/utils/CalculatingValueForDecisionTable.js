const calculateCosineSimilarityFromRawString = require("./CosineSimilarity");

const calculateTitle = (companyJobTitle, userJobtitle) => {
  return calculateCosineSimilarityFromRawString(companyJobTitle, userJobtitle);
};

const calculateAddress = (companyAddress, userAddress) => {
  try {
    if (companyAddress.includes(userAddress)) return 1;
    return 0;
  } catch (exception) {
    return 0;
  }
};

const calculateSalary = (companySalary, userSalary) => {
  if (companySalary >= 2 * userSalary) return 1;
  if (companySalary === "0") return 0.25;
  if (companySalary === "" || companySalary < userSalary) return 0;
  return (companySalary - userSalary) / userSalary;
};

const calculateLevel = (companyLevel, userLevel) => {
  return Math.abs(companyLevel - userLevel);
};

const calculateExperience = (companyExperience, userExperience) => {
  return Math.abs(companyExperience - userExperience);
};

const calculateTimeDistance = (postedTime) => {
  const targetDateObject = new Date(
    parseInt(postedTime.split("-")[2]),
    parseInt(postedTime.split("-")[1]) - 1,
    parseInt(postedTime.split("-")[0])
  );
  const currentDate = new Date();
  const timeDifference = targetDateObject - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return Math.abs(daysDifference) > 49 ? 49 : Math.abs(daysDifference);
};

module.exports = {
  calculateAddress,
  calculateExperience,
  calculateTimeDistance,
  calculateLevel,
  calculateTitle,
  calculateSalary,
};
