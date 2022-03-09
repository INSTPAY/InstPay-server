const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // create jwt token
      const token = jwt.sign(
        {
          id: profile.id,
        },
        process.env.JWT_CLIENT_SECRET,
        { expiresIn: '1h' }
      );

      return done({ id: profile.id, token: token });
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
