const User = require("../models/User");
const {v4: uuidv4} = require('uuid');

const getTransactions = async ({ username }) => {
    const user = await User.findOne({ username: `${username}` });
    return user.transactions;
};

const addTransaction = async ({ username, type, name, amount }) => {
    const user = await User.findOne({ username: `${username}` });
    const newTransaction = {
        id: uuidv4(),
        type: type,
        name: name,
        amount: Number(amount),
        date: new Date(),
    };
    user.transactions.push(newTransaction);
    user.save();
    
    return newTransaction;
};

const deleteTransaction = async ( transactionId, userId ) => {
    const user = await User.findById(userId);
    user.transactions = user.transactions.filter(t => t.id !== transactionId);
    user.save();
    return user.transactions;
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}
