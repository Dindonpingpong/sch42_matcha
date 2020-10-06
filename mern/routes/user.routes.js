const { Router } = require('express');
const router = Router();
const sign = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/:id', async(req, res) => {
    try {
        // console.log(req.body);
        sign(req);
        res.json({message: 'ok', re: req.body});
    } catch (e) {
        res.status(500).json({
            text: e.message,
            message: "Oooops"
        })
    }
})

router.post('/register', async(req, res) => {
    try {
        const saltRounds = 10;
        this.salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, this.salt);

        const params = [
            req.body.lastName,
            req.body.firstName,
            req.body.email,
            hash,
            'fell in love'
        ];

        sign(params);
        res.status(200).json({
            message: "Okay, br",
            error: true
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