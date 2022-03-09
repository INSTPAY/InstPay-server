const router = require('express').Router();
const auth = require('../controlers/authControler');

router.post('/login', (req, res) => {
  auth.login(req, res);
});

router.post('/signup', (req, res) => {
  auth.signup(req, res);
});

module.exports = router;
