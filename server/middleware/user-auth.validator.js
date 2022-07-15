const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const registerUserReqValidation = [
    body('email')
    .exists({ checkFalsy: true })
    .withMessage("Email is required.")
    .isEmail()
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("Email address is invalid.")
    .custom(async email => {
        // Checking if the inputed email already exists.
        const existingEmail = await User.findOne({ email: email });
        // Rejecting the request if there is a duplicate.
        if (existingEmail) return Promise.reject(`Email ${email} already exists.`);
    }),

    body('username')
    .exists({ checkFalsy: true })
    .withMessage("Username is required.")
    .custom(async username => {
        // Checking if the inputed username already exists.
        const existingUser = await User.findOne({ username });
        // Rejecting the request if there is a duplicate.
        if (existingUser) return Promise.reject(`Username ${username} is already taken.`);
    })
    .isAlphanumeric()
    .withMessage("Username can't include any special symbols.")
    .isLength({ min: 5, max: 28 })
    .withMessage("Username should be between 5 and 28 characters long."),

    body('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/)
    .withMessage("Password must be between 8 and 32 characters long, must contain at least 1 uppercase and 1 lowercase letter, 1 digit and 1 special character."),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match.");
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
];

const loginUserReqValidation = [
    body('email')
    .exists({ checkFalsy: true })
    .withMessage("Email is required.")
    .isEmail()
    .custom(async email => {
        // Checking if the inputed email already exists.
        const existingUser = await User.findOne({ email });
        // Rejecting the request if there is no such user found.
        if (!existingUser) return Promise.reject(`No such user.`);
    }),

    body('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required.")
    .custom(async ( password, { req }) => {
        const usernameOrEmail = req.body.usernameOrEmail;
        const user = await User.findOne({ usernameOrEmail });
        // Checking if the compared passwords are equal. 
        const passwordCompare = bcrypt.compare(password, user.password);
        // Rejecting the request if the passwords are not equal.
        if (!passwordCompare) return Promise.reject("Invalid password.");
    }),
];

module.exports = {
    registerUserReqValidation,
    loginUserReqValidation
};