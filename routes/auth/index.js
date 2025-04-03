const express = require("express");
const route = express.Router();
const session = require("express-session");
const passport = require("passport");
const authController = require("../../controller/auth");
// const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const CLI_URL = `${process.env.FRONTEND}/auth`;

route.get("/login/success", authController.githubAuth);

route.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

route.get("/logout", (req, res) => {
  res.json({
    status: "failed",
  });
});

route.get('/github',
  passport.authenticate('github', { session: true })
);

route.get('/github/callback',
  passport.authenticate('github', { 
    failureRedirect: `${process.env.FRONTEND}/login`, 
    session: true 
  }),
  (req, res) => {
    // Debug logging
    console.log("Auth callback, user:", req.user?.username);
    
    // Redirect to frontend with success
    res.redirect(`${process.env.FRONTEND}/auth`);
  }
);

module.exports = route;
