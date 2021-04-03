// *** Bolier-plate code
const express = require("express");
const app = express();
const cors = require("cors");

// *** .ENV
require("dotenv").config();

// *** CORS
app.options(cors());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// *** Addons
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json());
app.use(require("morgan")("dev"));
app.use(require("helmet")());

// *** Invalid JSON prevention
app.use(require("./tools/JSONValidator.tools.js"));

// *** Routes
app.use(require("./routes"));

// *** 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// *** Error resolver
app.use((error, req, res) => {
  res.status(error.status || 500);

  res.json({
    error: error.message,
  });
});

// *** App Starter
app.listen(process.env.DEV_PORT || 5000, () => {
  console.log(
    `[API] School managment API is up and running on port ${
      process.env.DEV_PORT || 5000
    }.`
  );
});
