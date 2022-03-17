const router = require('express').Router();
const transaction = require('../controlers/transactionControler');
const tokenAuth = require('../middlewares/tokenAuth');
//send money
router.post('/send', tokenAuth, (req, res) => {
  transaction.pay(req, res);
});

// All transactions
router.post('/transactions', tokenAuth, (req, res) => {
  transaction.transactions(req, res);
});

// transaction
router.post('/transaction', tokenAuth, (req, res) => {
  transaction.transaction(req, res);
});

// transaction payees
router.post('/payees', tokenAuth, (req, res) => {
  transaction.payees(req, res);
});

module.exports = router;
