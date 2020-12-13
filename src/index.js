const app = require("./app");

const port = process.env.PORT;

// starting the express app
app.listen(port, () => {
  console.log("Server is up and listening on port: " + port);
});
