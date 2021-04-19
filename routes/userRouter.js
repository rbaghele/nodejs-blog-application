const express = require("express");
const redirectIfAuthenticated = require("./../middleware/redirectIfAuthenticated");
const usersController = require("./../controllers/usersController");

const router = express.Router();

router.get("/auth/register", redirectIfAuthenticated, usersController.newUser);
router.post(
  "/users/register",
  redirectIfAuthenticated,
  usersController.createUser
);

module.exports = router;
