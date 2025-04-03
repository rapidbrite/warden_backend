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
    // User is authenticated at this point
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND}/login?error=authentication_failed`);
    }
    
    // Generate token directly here
    const token = require("../middleware/auth/create")(req.user._json.login);
    
    // This approach sends the token directly to the frontend in the URL
    // The frontend can extract it and save to localStorage
    res.redirect(`${process.env.FRONTEND}/auth?token=${token}`);
  }
);

module.exports = route;
