const { Router } = require('express');
const router = Router();
const { sign, getPassword, getEmail, getProfile } = require('../models/user');
const bcrypt = require('bcrypt');
// const { sendMail } = require('../util/mail');

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
                        success: false
                    })
                }
                else {
                    res.status(200).json({
                        message: "Your logged",
                        profile: data,
                        success: true
                    })
                }
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/register/check/email/:email', async (req, res) => {
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
        .catch(() => {
            res.status(200).json({
                message: "Ooopsy",
                error: true
            })
        })
})

router.post('/register', async (req, res) => {
    try {
        const { nickName, firstName, lastName, email, password, date } = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const params = [
            nickName,
            firstName,
            lastName,
            email,
            hash,
            date
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

router.get('/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];

        console.log(nickname);
        getProfile(nickname)
            .then(data => {
                console.log(data);
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

router.get('/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];

        console.log(nickname);
        getProfile(nickname)
            .then(data => {
                console.log(data);
                if (data.length > 0)
                    res.status(200).json({
                        result: data[0],
                        message: "Ok",
                        error: false
                    })
                else
                    res.status(500).json({
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