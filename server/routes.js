const router = require('express').Router();

const userAuthController = require('./controllers/user-auth.controller');
const transactionController = require('./controllers/transaction.controller');

router.use('/auth', userAuthController);
router.use('/transaction', transactionController);

module.exports = router;