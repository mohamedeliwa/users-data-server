const express = require("express");

// Calling mongoose file to connect to the database
require("./db/mongoose");
// importing user router
const userRouter = require("./routers/user");


const app = express();

// Configuring express to automatically parse json data
app.use(express.json());



// Configuring express to use user router
app.use(userRouter);

module.exports = app;