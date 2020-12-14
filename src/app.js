const express = require("express");
const cors = require("cors");
// Calling mongoose file to connect to the database
require("./db/mongoose");
// importing user router
const userRouter = require("./routers/user");

const app = express();

// Configuring express to automatically parse json data
app.use(express.json());
/**
 * Enabling CORS for local testing purposes.
 * to be disabled on production
 */
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
// app.options("*", cors());
app.use(cors(corsOptions));

// Configuring express to use user router
app.use(userRouter);

module.exports = app;
