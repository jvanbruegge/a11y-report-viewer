const express = require("express");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");

const {
  TEMPLATE_ENGINE_MAIN_LAYOUT_FILE,
  TEMPLATE_ENGINE_EXTENTION
} = require("../config");

module.exports = function(app) {
  app.engine(
    TEMPLATE_ENGINE_EXTENTION,
    exphbs({ defaultLayout: TEMPLATE_ENGINE_MAIN_LAYOUT_FILE })
  );
  app.set("view engine", TEMPLATE_ENGINE_EXTENTION);
  app.use(express.static("static"));
  app.use(fileUpload());
};
