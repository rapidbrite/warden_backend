const express = require("express");
const route = express.Router();
const session = require("express-session")
const passport = require("passport");
const authController = require("../../controller/auth")
// const passport = require("passport");
const GitHubStrategy = require('passport-github2').Strategy

const CLI_URL = "https://qkblch-3000.preview.csb.app/dashboard"

// route.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });
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

// route.get("/github/success",authController.githubAuth)

// route.get('/github',
// passport.authenticate('github', { scope: [ 'user:email' ] }));


// route.get('/github/callback', 
// passport.authenticate('github', { failureRedirect: '/login/failed',successRedirect : CLI_URL }));



module.exports = route;

