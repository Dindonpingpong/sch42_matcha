const { Router } = require('express');
const router = Router();
const { sign, getPassword, getEmail, getProfile, getViews, getLikes, sendMessage, getMessage, getCards } = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const fs = require('fs'); 
// const { sendMail } = require('../util/mail');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        getPassword(login)
            .then(data => {
                const len = data.length;
                let check;

                if (len > 0)
                    check = bcrypt.compareSync(password, data[0].password);

                if (len == 0 || check == false) {
                    res.status(500).json({
                        message: "Login or pass is incorrect",
                        success: false
                    })
                }
                else {
                    delete data[0].password;
                    res.status(200).json({
                        message: "Your logged",
                        profile: data[0],
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
                    success: true
                })
                // sendMail(email, )
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];

        getProfile(nickname)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data[0],
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        message: "Profile not found",
                        success: false
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/views/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];

        getViews(nickname)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data,
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        result: [],
                        message: "Profile not found",
                        success: false
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/likes/:nickname', async (req, res) => {
    try {
        const nickname = [req.params.nickname];

        getLikes(nickname)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data,
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        result: [],
                        message: "Profile not found",
                        success: false
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/message', async (req, res) => {
    try {
        const { from, to, message } = req.body;

        const params = [
            from,
            to,
            message
        ];

        sendMessage(params)
            .then(data => {
                res.status(200).json({
                    message: data.id,
                    success: true
                })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/message/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;

        getMessage([from, to])
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data,
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        result: [],
                        message: "No messages",
                        success: false
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/cards/:user/:page', async (req, res) => {
    try {
        const user = req.params.user;
        const page = (req.params.page - 1) * 6;

        getCards([user, page])
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data,
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        result: [],
                        message: "No messages",
                        success: false
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/image/:nickname/:position', upload.single('photo'), async (req, res) => {
    try {
        // console.log(req.params.id)
        console.log(req.file);
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
        // console.log(encode_image);
        var finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer.from(encode_image, 'base64')
        };

        // console.log(finalImg);

        res.contentType(finalImg.contentType);
        res.send(finalImg.image);
        // console.log(req.body);

        // const params = [
        //     file
        // ];
        // console.log(params);
        // sendMessage(params)
        //     .then(data => {
        //         res.status(200).json({
        //             message: data.id,
        //             success: true
        //         })
        //     })
        //     .catch((e) => {
        //         res.status(500).json({
        //             message: e.message,
        //             success: false
        //         })
        //     })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

module.exports = router