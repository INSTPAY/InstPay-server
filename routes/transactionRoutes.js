const router = require('express').Router();
const transaction = require('../controlers/transactionControler');

//send money
router.post('/send', (req, res) => {
  transaction.pay(req, res);
});

//send money
router.post('/', (req, res) => {
  transaction.transactions(req, res);
});

module.exports = router;
