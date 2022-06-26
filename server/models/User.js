const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 9,
    },
     income: {
        type: Object,
        name: { type: String, default: '' },
        amount: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
     },
     expense: {
        type: Object,
        name: { type: String, default: '' },
        amount: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
     },
     transactions: {
        type: Array,
        type: { type: String, default: '' },
        name: { type: String, default: '' },
        amount: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
     }

});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);