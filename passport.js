const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

passport.use(
    new GithubStrategy({
        clientID: "3ff23d70d86e1d7583f0",
        clientSecret: "a0fbd59d46dbff3e120a3d7489a56613582790f5",
        callbackURL: "http://localhost:3333/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        done(null,profile)
    }
));
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})