const express = require("express");
// Loading User Mongoose Models
const User = require("../models/user");
// importing dummy users data
const users = require("../../dummydata/users");

const router = new express.Router();

// End-Point for populating the database with users' dummy data
router.post("/users", async (req, res) => {
  try {
    for (let i = 0; i < users.length; i++) {
      const user = new User({
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email,
        gender: users[i].gender.toLowerCase(),
      });
      await user.save();
    }
    res.status(201).send("Database Populated Successfully!");
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).send({ error: error.message });
  }
});

// End-Point for fetching multiple users
// with query strings user can filter requested data
// GET /users?first_name=
// GET /users?last_name=
// GET /users?email=
// GET /users?gender=
// with query strings we can implement pagination.
// GET /users?limit=10&skip=0 "1st page of 10"
// GET /users?limit=3&skip=0 "1st page of 3"
// GET /users?limit=3&skip=3 "2nd page of 3"
// GET /users?limit=3&skip=6 "3rd page of 3"
// with query strings we can implement sorting data.
// we can sort by any property for example createdAt
// GET /users?sortBy=createdAt:desc
// GET /users?sortBy=createdAt:asc
router.get("/users", async (req, res) => {
  try {
    // getting query string values from the url
    const match = {};
    // getting sort value from query string
    const sort = {};

    // matching by first_name
    if (req.query.first_name) {
      const searchRegEx = new RegExp(`^${req.query.first_name}`, "i");
      match.firstName = searchRegEx;
    }
    // matching by last_name
    if (req.query.last_name) {
      const searchRegEx = new RegExp(`^${req.query.last_name}`, "i");
      match.lastName = searchRegEx;
    }
    // matching by email
    if (req.query.email) {
      const searchRegEx = new RegExp(`^${req.query.email}`, "i");
      match.email = searchRegEx;
    }
    // matching by email
    if (req.query.gender) {
      match.gender = req.query.gender;
    }
    // matching by created Date
    if (req.query.createdAt) {
      match.createdAt = { $gte: req.query.createdAt };
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      // parts[1] should be "asc" or "desc"
      // we are checking parts[1] and putting the value according to it
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    const users = await User.find(match, null, {
      // limiting population to get only specific number of users
      // transforming the string value into a number
      limit: parseInt(req.query.limit),
      // skiping specific number of users (Pagination)
      // if each page contains 10 users, this means if we are skipping the first 10 users that we are viewing the second 10 users which means the 2nd page
      skip: parseInt(req.query.skip),
      // to sort data according to specific sorting criteria
      // sort: { name of field to sort by: manner of sorting }
      // createdAt : -1 "means descending"
      // createdAt : 1 "means ascending"
      sort,
    });
    res.send(users);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
