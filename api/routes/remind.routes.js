const router = require('express').Router();
const { insertRemind, getRemind, changePass } = require('../models/user');
const bcrypt = require('bcrypt');
const { sendMail } = require('../util/mail');

router.post('/', async (req, res) => {
    const { email } = req.body;
    const time = new Date();
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(email + time, salt);

    insertRemind([hash, time, email])
        .then(() => {
            const newHash = hash.replace(/\//g, "slash");
            sendMail(email, "Remind", 'You have 10 minutes to restore your account', `<a href='http://localhost:3000/remind/${email}/${newHash}'>Wow</a>`);
            res.status(200).json({
                message: "You have 10 minutes to restore your account",
                success: true
            })
        })
        .catch(() => {
            res.status(200).json({
                message: "Email does not exist",
                success: false
            })
        })
})

router.post('/check', async (req, res) => {
    const { email, hash } = req.body;
    const time = new Date();

    getRemind([email])
        .then((data) => {
            const oldHash = hash.replace(/slash/g, "/");
            const trueHash = data[0].remindhash;
            const oldHours = data[0].hours;
            const oldMinutes = data[0].minutes;

            if (oldHours !== time.getHours() || (time.getMinutes() - oldMinutes > 10)) {
                res.status(200).json({
                    message: "Your restore link is time out",
                    success: false
                })
            }

            if (oldHash === trueHash) {
                res.status(200).json({
                    message: "Cool",
                    success: true
                })
            }
            else {
                res.status(200).json({
                    message: "Timeout",
                    success: false
                })
            }
        })
})

router.post('/restore', async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    changePass([hash, email])
        .then((data) => {
            if (data[0].id) {
                res.status(200).json({
                    message: "Password changed successfully",
                    success: true
                })
            }
            else {
                res.status(200).json({
                    message: "Oopsy",
                    success: false
                })
            }
        })
        .catch((e) => {
            res.status(200).json({
                message: e.message,
                success: false
            })
        })
})

module.exports = router;