const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("GitHub auth attempt, profile:", profile.username);
      return done(null, profile);
    }
  )
);

