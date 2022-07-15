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
     transactions: {
        type: Array,
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