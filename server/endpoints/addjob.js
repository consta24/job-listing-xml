const fs = require("fs");
const path = require("path");
const { create } = require("xmlbuilder2");
const { validateXML } = require("../helper/validateXML.js");

const addedJobsPath = path.join(__dirname, "../resources/jobs.xml");

function addJobToXML(job, callback) {
  const xmlString = buildXMLString(job);
  const xsdPath = path.join(__dirname, "../resources/job.xsd");

  error = verifyInput(job);
  if (error) {
    return callback(error, null);
  }

  validateXML(xmlString, xsdPath, (err, isValid) => {
    if (err) {
      callback(err, null);
    } else if (!isValid) {
      callback("Error: XML is not valid", null);
    } else {
      appendJobToXMLFile(xmlString, addedJobsPath, callback);
    }
  });
}

function verifyInput(job) {
  const regex = /^[A-Za-z\s]+$/;
  if (!job) {
    return "Error: Job is undefined";
  } else if (!regex.test(job.title)) {
    return "Error: Title cannot contain numbers or special characters";
  } else if (!job.title) {
    return "Error: Please add at least one skill";
  } else if (!job.skills) {
    return "Error: Please add at least one skill";
  } else if (!job.education) {
    return "Error: Please add at least one education";
  } else if (!job.companies) {
    return "Error: Please add at least one company";
  }
}

function buildXMLString(job) {
  const skillsArray = job.skills.split(",").map((skill) => skill.trim());
  const educationArray = job.education.split(",").map((edu) => edu.trim());
  const companiesArray = job.companies
    .split(",")
    .map((company) => company.trim());

  const jobXml = create()
    .ele("job")
    .ele("title")
    .txt(job.title)
    .up()
    .ele("description")
    .txt(job.description)
    .up();

  const skillsXml = jobXml.ele("skills");
  skillsArray.forEach((skill) => {
    skillsXml.ele("skill").txt(skill).up();
  });

  if (educationArray.length > 0) {
    const educationXml = jobXml.ele("education");
    educationArray.forEach((edu) => {
      educationXml.ele("field").txt(edu).up();
    });
  }

  jobXml.ele("experience").txt(job.experience);

  if (companiesArray.length > 0) {
    const companiesXml = jobXml.ele("companies");
    companiesArray.forEach((company) => {
      companiesXml.ele("company").txt(company).up();
    });
  }

  return jobXml.end({ prettyPrint: true, headless: true });
}

function appendJobToXMLFile(xmlString, filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // If the file does not exist, create it and add the job
        createJobsFileWithJob(xmlString, filePath, callback);
      } else {
        callback(err, null);
      }
    } else {
      if (data.trim() === "" || !data.includes("<jobs>")) {
        // If the file is empty or does not have the <jobs> tag, create a new file with the root <jobs> element and the new job
        createJobsFileWithJob(xmlString, filePath, callback);
      } else {
        const closingTag = "</jobs>";
        const newXmlString =
          data.replace(closingTag, "") + xmlString + closingTag;
        fs.writeFile(filePath, newXmlString, (err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, filePath);
          }
        });
      }
    }
  });
}

function createJobsFileWithJob(jobXmlString, filePath, callback) {
  const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jobs>
${jobXmlString}
</jobs>
`;
  fs.writeFile(filePath, xmlString, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, filePath);
    }
  });
}

module.exports = { addJobToXML };
