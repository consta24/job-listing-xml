const fs = require("fs");
const libxmljs = require("libxmljs");
const path = require("path");
const handlebars = require("handlebars");

handlebars.registerHelper("lte", function (value1, value2) {
  return value1 <= value2;
});

function searchJobs(searchQuery, callback) {
  const xmlPath = path.join(__dirname, "../resources/jobs.xml");
  fs.readFile(xmlPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return;
    }
    const xmlDoc = libxmljs.parseXml(data);
    let query = `/jobs/job`;

    if (searchQuery.title) {
      const lowerCaseTitle = searchQuery.title.toLowerCase();
      query += `[contains(translate(title, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${lowerCaseTitle}')]`;
    }

    if (searchQuery.company) {
      const lowerCaseCompany = searchQuery.company.toLowerCase();
      query += `[contains(translate(companies/company, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${lowerCaseCompany}')]`;
    }

    if (searchQuery.experience != -1 && searchQuery.experienceComparison) {
      query += `[experience ${searchQuery.experienceComparison} ${searchQuery.experience}]`;
    }

    if (searchQuery.education) {
      query += `[education/field = '${searchQuery.education}']`;
    }

    const rawJobs = xmlDoc.find(query);

    const jobs = rawJobs.map((jobNode) => {
      const title = jobNode.get("title").text();
      const description = jobNode.get("description").text();
      const skills = jobNode
        .find("skills/skill")
        .map((skillNode) => skillNode.text());
      const education = jobNode
        .find("education/field")
        .map((fieldNode) => fieldNode.text());
      const experience = parseInt(jobNode.get("experience").text(), 10);
      const companies = jobNode
        .find("companies/company")
        .map((companyNode) => companyNode.text());

      return { title, description, skills, education, experience, companies };
    });

    const template = handlebars.compile(
      fs.readFileSync(
        path.join(__dirname, "../views/job-listing.handlebars"),
        "utf8"
      )
    );

    const html = template({ jobs });
    callback(html);
  });
}

module.exports = { searchJobs };
