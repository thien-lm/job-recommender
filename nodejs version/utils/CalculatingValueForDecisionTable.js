const calculateCosineSimilarityFromRawString = require("./utils/CosineSimilarity");

export const calculateTitle = (companyJobTitle, userJobtitle) => {
  return calculateCosineSimilarityFromRawString(companyJobTitle, userJobtitle);
};

export const calculateAddress = (companyAddress, userAddress) => {
  if (companyAddress.includes(userAddress)) {
    return 1;
  } else {
    return 0;
  }
};

export const calculateSalary = (companySalary, userSalary) => {
  if (companySalary >= 2 * userSalary) return 1;
  if (companySalary === "0") return 0.25;
  if (companySalary === "" || companySalary < userSalary) return 0;
  return (companySalary - userSalary) / userSalary;
};

export const calculateLevel = (companyLevel, userLevel) => {
  return Math.abs(companyLevel - userLevel);
};

export const calculateExperience = (companyExperience, userExperience) => {
  return Math.abs(companyExperience - userExperience);
};

export const calculateTimeDistance = (postedTime) => {
  const targetDateObject = new Date(
    parseInt(postedTime.split("-")[2]),
    parseInt(postedTime.split("-")[1]) - 1,
    parseInt(postedTime.split("-")[0])
  );
  const currentDate = new Date();
  const timeDifference = targetDateObject - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};
