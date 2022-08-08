const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

passport.use(
    new GithubStrategy({
        clientID: "3ff23d70d86e1d7583f0",
        clientSecret: "ea8d20f0f74fa16ca80121457eefd2ee0f8e70ef",
        callbackURL: "https://zwvqkv-3333.preview.csb.app/auth/github/callback"
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