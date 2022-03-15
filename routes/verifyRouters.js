const router = require('express').Router();
const verify = require('../controlers/verifyControler');

router.post('/email', (req, res) => {
  verify.emailVerify(req, res);
});

router.get('/email/:id', (req, res) => {
  verify.emailVerifyID(req, res);
});

router.post('/pin', (req, res) => {
  verify.pinVerify(req, res);
});

module.exports = router;