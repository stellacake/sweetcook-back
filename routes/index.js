const express = require("express");
const router = express.Router();

const recipes = require("./recipes");
const users = require("./users");
const tastes = require("./tastes");

router.use("/recipes", recipes);
router.use("/users", users);
router.use("/tastes", tastes);

module.exports = router;
