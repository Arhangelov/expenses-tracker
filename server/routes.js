const router = require('express').Router();

const userAuthController = require('./controllers/user-auth.controller');

router.use('/auth', userAuthController);

module.exports = router;