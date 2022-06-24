const mongoose = require('mongoose');
const { DB_URI } = require('../config/main');

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    return mongoose.connect(DB_URI, dbOptions);
};