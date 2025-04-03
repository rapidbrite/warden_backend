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

route.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND}/login` }, (err, user, info) => {
    // Error handling
    if (err) {
      console.error('GitHub auth error:', err);
      return res.redirect(`${process.env.FRONTEND}/login?error=server_error`);
    }
    
    // No user found
    if (!user) {
      console.error('GitHub auth: No user returned');
      return res.redirect(`${process.env.FRONTEND}/login?error=authentication_failed`);
    }
    
    // Log successful authentication
    console.log('GitHub auth successful for:', user.username);
    
    // Set user in session
    req.login(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        return res.redirect(`${process.env.FRONTEND}/login?error=session_error`);
      }
      
      // Generate token
      const createJWT = require('../../middleware/auth/create');
      const token = createJWT(user._json.login);
      
      // Redirect with token
      return res.redirect(`${process.env.FRONTEND}/auth?token=${token}`);
    });
  })(req, res, next);
});

module.exports = route;
