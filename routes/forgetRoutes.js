const router = require('express').Router();
const forget = require('../controlers/frogetControler');

router.post('/account', (req, res) => {
  forget.account(req, res);
});

router.post('/pin', (req, res) => {
  forget.pin(req, res);
});

module.exports = router;
