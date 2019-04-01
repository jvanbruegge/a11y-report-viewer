const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.render("pages/home", { page_title: "A11Y Crawler | Home" })
);
router.get("/:scan_id", (req, res) =>
  res.render("pages/home", { page_title: "A11Y Crawler | Home" })
);
router.post("/", (req, res) => {
  const site = req.body.scan_url;
  const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const isValidSite = site.match(URL_REGEX);
  if (!isValidSite) {
    return res.redirect("/");
  }
});

module.exports = router;
