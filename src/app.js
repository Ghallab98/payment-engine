require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const baseApiUrl = `/v${process.env.API_VERSION}`;

app.get(baseApiUrl, (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
