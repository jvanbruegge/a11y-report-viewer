const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const reportFile = `${__dirname}/uploads/report.json`;
const reportPath = "uploads";

app.engine(".hbs", exphbs({ defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");
app.use(express.static("static"));
app.use(fileUpload());

app.get("/report", async (req, res) => {
  try {
    const uploadedFileBuffer = await fs.promises.readFile(reportFile);
    const data = JSON.parse(uploadedFileBuffer);
    fs.unlinkSync(reportFile);
    res.render("pages/report", { data });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.post("/upload", (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const sampleFile = req.files.report;

  if (sampleFile.mimetype !== "application/json") {
    return res.status(412).send("Filetype must be json.");
  }

  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath);
  }

  if (!fs.existsSync(reportFile)) {
    fs.writeFileSync(reportFile);
  }

  sampleFile.mv(reportFile, err => {
    if (err) return res.status(500).send(err);
    res.redirect("/report");
  });
});

app.listen(3000);
