const express = require("express");
const route = express.Router();
const session = require("express-session")
const passport = require("passport");
const { initialize } = require("passport/lib");
const GitHubStrategy = require('passport-github2').Strategy
const authController = require("../../controller/auth")

route.use(
    session({
        secret:'keyboard dash dark',
        resave: false,
        saveUninitialized: false,
        cookie:{ httpOnly: true , secure: false , maxAge: 7*24*60*60*1000}
    })
);

route.use(passport.initialize());
route.use(passport.session());

passport.serializeUser(function(user,done){
    done(null,user._json)
})
passport.deserializeUser(function(id,done){
    done(null,id)
})
passport.use(new GitHubStrategy({
        clientID: "df5ae050a0da7df02ae8",
        clientSecret: "6a786c90864cc53b8e5f0225da261a72b5dedcf2",
        callbackURL: "https://zwvqkv-3333.preview.csb.app/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        done(null,profile)
    }
));

route.get("/github/success",authController.githubAuth)

route.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

route.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login',successRedirect : '/auth/github/success' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = route;

