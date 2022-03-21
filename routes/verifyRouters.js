const router = require('express').Router();
const verify = require('../controlers/verifyControler');

router.post('/email/sendotp', (req, res) => {
  verify.emailVerify(req, res);
});
router.post('/email/verifyotp', (req, res) => {
  verify.emailVerifyByOtp(req, res);
});

// router.get('/email/:id', (req, res) => {
//   verify.emailVerifyID(req, res);
// });

router.post('/pin', (req, res) => {
  verify.pinVerify(req, res);
});

module.exports = router;
