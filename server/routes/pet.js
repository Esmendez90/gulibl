const express = require("express");

// recordRoutes is an instance of the express router.
// we use it to DEFINE our routes.
// the router will added as a middleware and will take control
// ...of requests starting with path /pets.
const router = express.Router();

// helps us connect to the db
const db = require("../db/conn");

// helps us convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get a list of ALL the records
router.route("/record").get((req, res) => {
  let db_connect = db.getDb("pets");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// 