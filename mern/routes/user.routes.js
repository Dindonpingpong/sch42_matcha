const { Router } = require('express');
const router = Router();
const { sign, auth } = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/:id', async (req, res) => {
    try {
        res.json({ message: 'ok', re: req.body });
    } catch (e) {
        res.status(500).json({
            text: e.message,
            message: "Oooops"
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        auth(email)
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
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
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
            .then(res = () => {
                res.status(200).json({
                    message: "Okay, br",
                    error: true
                })
            })

    } catch (error) {
        res.status(500).json({
            error: true,
            text: error.message,
            message: "Oooops"
        })
    }
})

module.exports = router