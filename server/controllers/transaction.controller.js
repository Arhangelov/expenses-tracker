const router = require('express').Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../services/transaction.service');

router.post('/get', (req, res) => {
    console.log(req.body);
    getTransactions(req.body)
    .then((transactions) => {
        res.status(200)
        .json(transactions)
    }).catch((err) => {
        return res.status(400)
        .send({
            message: `${err.message}`,
            type: 'ERROR',
        });
    });
});

router.post('/add', (req, res) => {
    addTransaction(req.body)
    .then((newTransaction) => {
        res.status(201)
        .json(newTransaction);
    }).catch((err) => {
        return res.status(400)
        .send({
            message: `${err.message}`,
            type: 'ERROR',
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    const transactionId = req.params.id;
    const userId = req.body.userId;
    deleteTransaction( transactionId, userId )
    .then((transactions) => {
        res.status(200)
        .json(transactions)
    }).catch((err) => {
        return res.status(400)
        .send({
            message: `${err.message}`,
            type: 'ERROR',
        });
    });
});

module.exports = router;
