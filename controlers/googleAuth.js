const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {

      //     return done(err, user);
      //   });

      return done('ok');
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(err, user);
});

module.exports = passport;
