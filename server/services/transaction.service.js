const User = require("../models/User");
const {v4: uuidv4} = require('uuid');

const getTransactions = async ({ username }) => {
    const user = await User.findOne({ username: `${username}` });
    return user.transactions;
};

const addTransaction = async ({ username, type, category, amount }) => {
    const user = await User.findOne({ username: `${username}` });
    const newTransaction = {
        id: uuidv4(),
        type: type,
        category: category,
        amount: Number(amount),
        date: new Date(),
    };
    user.transactions.push(newTransaction);
    user.save();
    
    return newTransaction;
};

const deleteTransaction = async ( transactionId, username ) => {
    const user = await User.findOne({ username: username });
    user.transactions = user.transactions.filter(t => t.id !== transactionId); //this does not overwrite the transactions array
    user.save();
    return user.transactions;
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}
