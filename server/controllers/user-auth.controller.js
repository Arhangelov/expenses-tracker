const router = require('express').Router();
const { COOKIE_NAME } = require('../config/main');
const { register, login } = require('../services/user-auth.service');
const { registerUserReqValidation, loginUserReqValidation } = require("../middleware/user-auth.validator");
const { validationResult } = require("express-validator");

router.post('/register',
    registerUserReqValidation,
    (req, res) => {
        const errors = validationResult(req) // Saving any occurred errors.
        // If there're errors mark as Bad Request 400 and return error list.
         if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
        else validationResult(req).throw(); // Else clear validation results and continue with the response.

        register(req.body)
        .then(({ newUserDTO, token }) => {
            res.status(201)
            .cookie(COOKIE_NAME, token, { httpOnly: true })
            .json({newUserDTO, token})
        }).catch((err) => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR",
            });
        });
    });

router.post('/login',
    loginUserReqValidation,
    (req, res) => {
        const errors = validationResult(req); // Saving any occurred errors.
        // If there're errors mark as Bad Request 400 and return error list.
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
        else validationResult(req).throw(); // Else clear validation results and continue with the response.

        login(req.body.email)
        .then(({userDTO, token}) => {
            res.status(200)
            .cookie(COOKIE_NAME, token, { httpOnly: true })
            .json({userDTO, token})
        }).catch((err) => {
            return res.status(400).send({
               message: `${err.message}`,
               type: "ERROR",
            });
        });
    });

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: `You successfully logged out.` })
});

module.exports = router;