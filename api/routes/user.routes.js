const { Router } = require('express');
const router = Router();
const { sign, getPassword, getEmail, getLogin, getProfile, getViews, getLikes, sendMessage, 
    getMessage, getCards, getStatus, putImage, getImage,
    updateStatus, insertStatus } = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const fs = require('fs');
const c = require('config');
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
                    success: true
                })
            else
                res.status(200).json({
                    success: false
                })
        })
        .catch(() => {
            res.status(200).json({
                success: false
            })
        })
})

router.get('/register/check/login/:login', async (req, res) => {
    const login = [req.params.login];

    getLogin(login)
        .then(data => {
            if (data.length > 0)
                res.status(200).json({
                    success: true
                })
            else
                res.status(200).json({
                    success: false
                })
        })
        .catch(() => {
            res.status(200).json({
                success: false
            })
        })
})

router.post('/register', async (req, res) => {
    try {
        const { nickName, lastName, firstName, email, password, date } = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const params = [
            nickName,
            lastName,
            firstName,
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

router.post('/status', async (req, res) => {
    try {
        const { me, you } = req.body;

        getStatus([me, you])
            .then(data => {
                if (data.length > 0)
                    res.status(200).json({
                        result: data[0].status,
                        message: "Ok",
                        success: true
                    });
                else
                    res.status(200).json({
                        result: 'none',
                        message: "Ok",
                        success: true
                    })
            })
            .catch((e) => {
                res.status(500).json({
                    message: e.message,
                    success: false
                })
            })
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/update', async (req, res) => {
    try {
        const { me, you, status, newStatus } = req.body;

        // console.log("2", me, you, status, newStatus);
        if (status === 'like' || status === 'ignore' || status === 'unlike') {
            updateStatus([me, you, newStatus])
                .then(data => {
                    if (data)
                        res.status(200).json({
                            result: newStatus,
                            message: "Ok",
                            success: true
                        });
                })
                .catch((e) => {
                    res.status(500).json({
                        message: e.message,
                        success: false
                    })
                })

        }
        else {
            insertStatus([me, you, newStatus])
                .then(data => {
                    if (data) {
                        res.status(200).json({
                            result: newStatus,
                            message: "Ok",
                            success: true
                        });
                    }
                })
                .catch((e) => {
                    res.status(500).json({
                        message: e.message,
                        success: false
                    })
                })
        }
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/image/:nickname/:position', upload.single('photo'), async (req, res) => {
    try {
        const { nickname, position } = req.params;
        let { mimetype, path } = req.file;
        const newPath = path.split('/')[1];

        putImage(position, mimetype, newPath, nickname)
            .then(data => {
                res.status(200).json({
                    message: data.id,
                    success: true
                })
            })
            .catch(e => {
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

router.get('/image/:nickname/:position/:path', async (req, res) => {
    try {
        const { nickname, position, path } = req.params;
        var img = fs.readFileSync('uploads/' + path);
        var encode_image = img.toString('base64');
        var finalImg = new Buffer.from(encode_image, 'base64');

        getImage(nickname, position)
            .then(data => {
                res.contentType(data[0].photos)
                res.send(finalImg);
            })
            .catch(e => {
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

router.post('/view', async (req, res) => {
    try {
        const { me, you } = req.body;

        if (me != you) {
            getTimeView([me, you])
                .then(data => {
                    if (data.length > 0) {
                        updateViewFailed([me, you])
                            .then(data => {
                                if (data)
                                    res.status(200).json({
                                        message: "Ok",
                                        success: true
                                    });
                            })
                            .catch((e) => {
                                res.status(500).json({
                                    message: e.message,
                                    success: false
                                })
                            })
                    }
                    else {
                        insertViewFailed([me, you])
                            .then(data => {
                                if (data)
                                    res.status(200).json({
                                        message: "Ok",
                                        success: true
                                    });
                            })
                            .catch((e) => {
                                res.status(500).json({
                                    message: e.message,
                                    success: false
                                })
                            })
                    }
                })
        }
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

module.exports = router