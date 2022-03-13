const router = require('express').Router();
const transaction = require('../controlers/transactionControler');

//send money
router.post('/send', (req, res) => {
  transaction.pay(req, res);
});

// All transactions
router.post('/', (req, res) => {
  transaction.transactions(req, res);
});

// transactionById
router.post('/:id', (req, res) => {
  transaction.transactionById(req, res);
});

module.exports = router;
