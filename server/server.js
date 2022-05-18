const express = require("express");
const app = express();
const cors = require("cors");
// dotenv installs the module that loads environment variables from a .env file into process.env file. This lets you separate configuration files from the code.
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

// cors installs a Node.js package that allows cross origin resource sharing.
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// connect db driver
const db = require("./db/conn");

app.listen(port, () => {
  db.connectToServer((err) => {
    if (err) console.error(err);
  });
  console.log(`Server listening on port:${port}`);
});
