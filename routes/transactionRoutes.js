const router = require('express').Router();
const transaction = require('../controlers/transactionControler');

//send money
router.post('/send', (req, res) => {
  transaction.pay(req, res);
});

// All transactions
router.post('/transactions', (req, res) => {
  transaction.transactions(req, res);
});

// transaction
router.post('/transaction', (req, res) => {
  transaction.transaction(req, res);
});

module.exports = router;
