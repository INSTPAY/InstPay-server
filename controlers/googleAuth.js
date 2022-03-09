const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
GOOGLE_CLIENT_ID =
  '662493765404-0oajvj980hunskur71cuum9c9k6alfrv.apps.googleusercontent.com';

GOOGLE_CLIENT_SECRET = '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';
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
