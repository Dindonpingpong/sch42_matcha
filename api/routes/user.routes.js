const { Router } = require('express');
const router = Router();
const { sign, getPassword, getEmail } = require('../models/user');
const bcrypt = require('bcrypt');
const { sendMail } = require('../util/mail');

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

router.get('/register/check/email/:email', async (req, res) => {
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

router.get('/register/check/login/:login', async (req, res) => {
    try {
        const email = [req.params.email];

        getLogin(email)
            .then(data => {
                if (data.length > 0)
                    res.status(200).json({
                        message: "Login is exist",
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
                // sendMail(email, )
            })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: true
        })
    }
})

router.get('/check/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        getProfile(nickname)
            .then(data => {
                if (data.length > 0)
                    res.status(200).json({
                        result: data[0],
                        message: "Ok",
                        error: false
                    })
                else
                    res.status(200).json({
                        message: "Profile not found",
                        error: true
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