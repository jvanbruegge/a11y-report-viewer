const express = require("express");
const fs = require("fs");
const router = express.Router();
const { REPORT_FILE, REPORT_FOLDER } = require("../config");

router.post("/", async (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const sampleFile = req.files.report;

  if (sampleFile.mimetype !== "application/json") {
    return res
      .status(412)
      .send("Filetype must be of mimetype 'application/json'.");
  }

  if (!fs.existsSync(REPORT_FOLDER)) {
    await fs.promises.mkdir(REPORT_FOLDER);
  }

  if (!fs.existsSync(REPORT_FILE)) {
    await fs.promises.writeFile(REPORT_FILE);
  }

  sampleFile.mv(REPORT_FILE, async err => {
    if (err) return res.status(500).send(err);
    res.redirect("/report");
  });
});

module.exports = router;
