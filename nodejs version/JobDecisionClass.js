class JobDecisionClass {
  constructor(
    title,
    address,
    salary,
    level,
    experience,
    postedTime,
    url,
    score = 0
  ) {
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.level = level;
    this.experience = experience;
    this.postedTime = postedTime;
    this.url = url;
    this.score = score;
  }

  displayDetails() {
    console.log(`Title: ${this.title}`);
    console.log(`Address: ${this.address}`);
    console.log(`Salary: ${this.salary}`);
    console.log(`Level: ${this.level}`);
    console.log(`Experience: ${this.experience}`);
    console.log(`Posted Time: ${this.postedTime}`);
    console.log(`URL: ${this.url}`);
  }
}

module.exports = JobDecisionClass;
