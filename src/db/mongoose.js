
const mongoose = require("mongoose");

// connecting to the database
mongoose.connect(process.env.MONGODB_URL, {
  // These options are set To fix all deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("Mongoose successfully connected!");
}).catch(error => {
  console.log(error.message);
});