const { Router } = require('express');
const router = Router();
const { sign, getPassword, getOnlyPass, getEmail, getLogin, getProfile, getViews, getLikes, sendMessage,
    getMessage, getCards, getStatus, putImage, getImage, getTimeView, updateViewFailed, insertViewFailed,
    updateStatus, insertStatus, editProfile, deleteTags, insertTags, getInfoLogin, insertLocation, insertRemind, getRemind, changePass } = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const fs = require('fs');
// const c = require('config');
// const { has } = require('config');
const { sendMail } = require('../util/mail');

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
                    res.status(200).json({
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

router.post('/register/check/pass', async (req, res) => {
    try {
        const { login, password } = req.body;

        getOnlyPass([login])
            .then(data => {
                const len = data.length;
                let check;

                if (len > 0)
                    check = bcrypt.compareSync(password, data[0].password);

                if (len == 0 || check == false) {
                    res.status(200).json({
                        message: "Pass is incorrect",
                        success: false
                    })
                }
                else {
                    res.status(200).json({
                        message: "Okay",
                        success: true
                    })
                }
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
                    login: data.nickname,
                    success: true
                })
                sendMail(email, 'Confirmation', 'You have 1 day to confirm your account', `<a href='http://localhost:3000/login/${nickName}/${newHash}'>1 day to confirm</a>`);
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

router.get('/profile/:nickname', async (req, res) => {
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

router.get('/profile/views/:nickname', async (req, res) => {
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

router.get('/profile/likes/:nickname', async (req, res) => {
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

router.post('/profile/status', async (req, res) => {
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

router.post('/profile/status/update', async (req, res) => {
    try {
        const { me, you, status, newStatus } = req.body;

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

router.post('/profile/view', async (req, res) => {
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

router.post('/edit/:nickname', async (req, res) => {
    const login = req.params.nickname;
    let keys = [];
    let params = [];
    let i = 1;

    for (const [key, value] of Object.entries(req.body)) {
        if (value !== null && key !== 'newtags' && key !== 'newpass' && key !== 'oldtags') {
            keys.push(`${key} = $${i++}`);
            params.push(value);
        }
        else if (value !== null && key === 'newpass') {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);

            keys.push(`password = $${i++}`);
            params.push(hash);
        }
    }

    if (params.length === 0) {
        res.status(200).json({
            msg: 'wow',
            success: true
        })
        return;
    }

    const que = keys.join(', ');
    params.push(login);

    editProfile(que, params, i)
        .then(data => {
            res.status(200).json({
                message: data.id,
                success: true
            })
        })
        .catch(e => {
            console.log(e.message);
            res.status(200).json({
                message: e.message,
                success: false
            })
        })
})

router.post('/edit/tags/:nickname', async (req, res) => {
    const login = req.params.nickname;
    const { newtags, oldtags } = req.body;

    // console.log(newtags, oldtags);
    if (newtags === null || JSON.stringify(newtags) == JSON.stringify(oldtags)) {
        res.status(200).json({
            msg: 'Ok1',
            success: true
        })
        return;
    }

    deleteTags([login])
        .then(() => {
            if (newtags.length > 0) {
                insertTags([login, newtags])
                    .then((data) => {
                        res.status(200).json({
                            msg: 'Ok2',
                            d: data,
                            success: true
                        })
                    });
            }
            else {
                res.status(200).json({
                    msg: 'Ok3',
                    success: true
                })
            }
        })
        .catch((e) => {
            res.status(200).json({
                msg: e.message,
                success: false
            })
        })

})

router.get('/login/:nickname', async (req, res) => {
    try {
        const nickname = req.params.nickname;

        getInfoLogin([nickname])
            .then(data => {
                res.status(200).json({
                    message: "Your logged",
                    profile: data[0],
                    success: true
                })
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/register/location/:nickname', async (req, res) => {
    const login = req.params.nickname;
    const { country, region, city } = req.body;

    const params = [country, region, city, login];

    insertLocation(params)
        .then((data) => {
            if (data.id) {
                res.status(200).json({
                    message: "Updated",
                    success: true
                })
            }
            else {
                res.status(200).json({
                    message: "Ooopsy",
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

router.post('/remind', async (req, res) => {
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
                message: "Ok",
                success: true
            })
        })
        .catch((e) => {
            res.status(200).json({
                message: e.message,
                success: false
            })
        })
})

router.post('/remind/check', async (req, res) => {
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

router.post('/remind/restore', async (req, res) => {
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

router.post('/users/page', async (req, res) => {
    try {
        // console.log(req.body);
        // const nickname = req.body.nickname;
        // const page = (req.body.page * 6);
        // const sort = req.body.sort;

        const { nickname, page, sort } = req.body;
        let sqlSort

        if (sort === 'ageAsc' || sort === 'ageDesc')
            sqlSort = (sort === 'ageAsc') ? 'age ASC, rate DESC, count DESC' : 'age DESC, rate DESC, count DESC';
        else if (sort === 'rateAsc' || sort === 'rateDesc')
            sqlSort = (sort === 'rateAsc') ? 'rate ASC, age ASC, count DESC' : 'rate DESC, age ASC, count DESC';
        else if (sort === 'tagsAsc' || sort === 'tagsDesc')
            sqlSort = (sort === 'tagsAsc') ? 'count ASC, rate DESC, age ASC' : 'count DESC, rate DESC, age ASC';
        // if (sort === 'locationAsc' || sort === 'locationDesc')
        //     let sqlSort = (sort === 'ageAsc') ? 'age ASC, rate DESC, count DESC' : 'age DESC, rate DESC, count DESC';

        getCards([nickname, page], sqlSort)
            .then(data => {
                console.log(data);
                if (data.length > 0) {
                    res.status(200).json({
                        result: data,
                        message: "Ok",
                        success: true
                    });
                }
                else
                    res.status(200).json({
                        message: "No users",
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

module.exports = router