const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.render("pages/home", {
    page_title: "A11Y Crawler | Home"
  })
);

module.exports = router;
