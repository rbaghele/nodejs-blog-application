const express = require("express");
const redirectIfAuthenticated = require("./../middleware/redirectIfAuthenticated");
const sessionController = require("./../controllers/sessionController");

const router = express.Router();

router.get("/auth/login", redirectIfAuthenticated, sessionController.newLogin);
router.post(
  "/users/login",
  redirectIfAuthenticated,
  sessionController.createSession
);
router.get("/auth/logout", sessionController.destorySession);

module.exports = router;
