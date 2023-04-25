const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { addJobToXML } = require("./endpoints/addjob.js");
const { searchJobs } = require("./endpoints/jobs.js");
const hbs = require("hbs");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json());
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../client/index.html");
  res.sendFile(indexPath);
});

app.get("/addjob", (req, res) => {
  const indexPath = path.join(__dirname, "../client/addjob/addjob.html");
  res.sendFile(indexPath);
});

app.post("/addjob", (req, res) => {
  const job = req.body;
  addJobToXML(job, (err, fileName) => {
    if (err) {
      res.status(500).send({ message: err.toString() });
    } else {
      res.send({ message: `Success: Job added successfully to ${fileName}` });
    }
  });
});

app.get("/jobs", (req, res) => {
  const searchQuery = {
    title: req.query.title || "",
    company: req.query.company || "",
    experienceComparison: req.query.experienceComparison || "=",
    experience: req.query.experience || "-1",
    education: req.query.education || "",
  };
  searchJobs(searchQuery, (html) => {
    res.send(html);
  });
});
app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
