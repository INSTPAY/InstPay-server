const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth');

const account = require('../controlers/accountControler');

//get account
router.post('/', tokenAuth, (req, res) => {
  account.account(req, res);
});

// patch account
router.patch('/', tokenAuth, (req, res) => {
  account.patch(req, res);
});

// delete account
router.delete('/', tokenAuth, (req, res) => {
  account.delete(req, res);
});

module.exports = router;
