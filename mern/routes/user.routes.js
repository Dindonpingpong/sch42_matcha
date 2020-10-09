const { Router } = require('express');
const router = Router();
const { sign, getPassword, getEmail } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        getPassword(email)
            .then(data => {
                const len = data.length;
                const check = bcrypt.compareSync(password, data[0].password);

                if (len == 0 || check == false) {
                    res.status(500).json({
                        message: "Email or pass is incorrect",
                        error: true
                    })
                }
                else {
                    res.status(200).json({
                        message: "Your logged",
                        error: false
                    })
                }
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: true
        })
    }
})

router.get('/register/check/:email', async (req, res) => {
    try {
        const email = [req.params.email];

        getEmail(email)
            .then(data => {
                if (data.length > 0)
                    res.status(200).json({
                        message: "Email is exist",
                        error: true
                    })
                else
                    res.status(200).json({
                        message: "Ok",
                        error: false
                    })
            })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: true
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const params = [
            firstName,
            lastName,
            email,
            hash,
            'fell in love'
        ];

        sign(params)
            .then(data => {
                res.status(200).json({
                    message: data.id,
                    error: false
                })
            })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: true
        })
    }
})

module.exports = router