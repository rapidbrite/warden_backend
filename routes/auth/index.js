const express = require("express");
const route = express.Router();
const session = require("express-session")
const passport = require("passport");
const authController = require("../../controller/auth")
// const passport = require("passport");
const GitHubStrategy = require('passport-github2').Strategy

const CLI_URL = "http://localhost:3000/auth"


route.get("/login/success",authController.githubAuth);

route.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

route.get("/logout", (req, res) => {
    res.json({
        status : "failed"
    })
});


route.get("/github", passport.authenticate("github", { scope: ["profile"] }));

route.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLI_URL,
    failureRedirect: "/login/failed",
  })
);


module.exports = route;

