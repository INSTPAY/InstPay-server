const router = require('express').Router();
const passport = require('../controlers/googleAuth');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
