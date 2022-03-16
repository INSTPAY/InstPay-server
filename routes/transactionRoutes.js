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

// transaction with
router.post('/transactions/with', tokenAuth, (req, res) => {
  transaction.transactionWith(req, res);
});

// transaction with
router.post('/transaction/with', tokenAuth, (req, res) => {
  transaction.transactionWithId(req, res);
});

module.exports = router;
