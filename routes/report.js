const express = require("express");
const fs = require("fs");
const router = express.Router();
const Parser = require("../helpers/parser");
const { REPORT_FILE } = require("../config");

router.get("/", async (req, res) => {
  try {
    const uploadedFileBuffer = await fs.promises.readFile(REPORT_FILE);
    const parserInstance = new Parser(uploadedFileBuffer);
    const parsedData = parserInstance.parse();
    fs.unlinkSync(REPORT_FILE);
    if (parsedData.length) {
      return res.render("pages/report", {
        page_title: "A11Y Crawler | Report view",
        data: parsedData
      });
    }

    res.render("pages/no-errors", {
      page_title: "A11Y Crawler | No errors found"
    });
  } catch (error) {
    res.redirect("/");
  }
});

module.exports = router;
