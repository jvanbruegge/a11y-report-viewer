const express = require("express");
const fs = require("fs");
const path = require("path");

const middlewareHelper = require("./helpers/express-middleware");
const { PORT } = require("./config");
const app = express();

middlewareHelper(app);
app.use("/", require("./routes/home"));
app.use("/scan", require("./routes/scan"));
app.use("/upload", require("./routes/upload"));
app.use("/report", require("./routes/report"));
app.listen(PORT, () => console.info(`App running on port: ${PORT}`));
