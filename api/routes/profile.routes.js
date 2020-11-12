const router = require('express').Router();
const { getProfile, getViews, getLikes,
    getStatus, getTimeView, updateView, insertView,
    updateStatus, insertStatus, editProfile, deleteTags, insertTags, insertLocation,
    updateRate, addLog, checkConnect } = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config');
const API_KEY = config.get('apiKey');
const fetch = require('node-fetch');

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
                res.status(200).json({
                    message: "Ooops! Something went wrong",
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
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
                res.status(200).json({
                    message: "Ooops! Something went wrong",
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
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
                res.status(200).json({
                    message: "Ooops! Something went wrong",
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
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
                res.status(200).json({
                    message: "Ooops! Something went wrong",
                    success: false
                })
            })
    }
    catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
            success: false
        })
    }
})

router.post('/status/update', async (req, res) => {
    try {
        const { me, you, status, newStatus } = req.body;
        const promise = (status === 'like' || status === 'ignore' || status === 'unlike') ? updateStatus([me, you, newStatus]) : insertStatus([me, you, newStatus]);
        let value = 10;
        let result = newStatus;

        if (newStatus === 'unlike' || newStatus === 'ignore')
            value = -10;

        promise
            .then(data => {
                if (data) {
                    const promise1 = updateRate([value, you]);
                    let promise2 = addLog([me, you, newStatus, `${newStatus}d your profile`]);

                    if (newStatus === 'like') {
                        checkConnect([me, you])
                            .then((data) => {
                                let promises = [promise1];
                                if (data.length == 2) {
                                    promise2 = addLog([me, you, newStatus, 'connected with you']);
                                    const promise3 = addLog([you, me, newStatus, 'connected with you`']);
                                    result = 'connect';
                                    promises.push(promise3);
                                }
                                promises.push(promise2);

                                Promise.all(promises)
                                    .then(() => {
                                        res.status(200).json({
                                            data: result,
                                            message: "Ok",
                                            success: true
                                        })
                                    })
                                    .catch((e) => {
                                        res.status(200).json({
                                            message: "Ooops! Something went wrong",
                                            success: false
                                        })
                                    })
                            })
                    }
                    else {
                        promise1
                            .then(() => {
                                res.status(200).json({
                                    data: newStatus,
                                    message: "Ok",
                                    success: true
                                })
                            })
                            .catch((e) => {
                                res.status(200).json({
                                    message: "Ooops! Something went wrong",
                                    success: false
                                })
                            })
                    }
                }
            })
            .catch((e) => {
                res.status(200).json({
                    message: "Ooops! Something went wrong",
                    success: false
                })
            })

    }
    catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
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
                    const promise1 = addLog([me, you, 'view', `visited you profile`]);
                    const promise2 = (data.length > 0) ? updateView([me, you]) : insertView([me, you]);

                    Promise.all([promise1, promise2])
                        .then(() => {
                            res.status(200).json({
                                message: "Ok",
                                success: true
                            });
                        })
                        .catch(() => {
                            res.status(200).json({
                                message: "Ooops! Something went wrong",
                                success: false
                            })
                        })
                })
        }
    }
    catch (e) {
        res.status(200).json({
            message: "Ooops! Something went wrong",
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
        if (value !== null && key !== 'newtags' && key !== 'newpass' && key !== 'oldtags' && key !== 'coords') {
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
            nickname: login,
            success: true
        })
        return;
    }

    const que = keys.join(', ');
    params.push(login);
    editProfile(que, params, i)
        .then(data => {
            res.status(200).json({
                message: "Ok",
                nickname: data.nickname,
                success: true
            })
        })
        .catch(e => {
            res.status(200).json({
                message: "Ooops! Something went wrong",
                success: false
            })
        })
})

router.post('/edit/tags/:nickname', async (req, res) => {
    const login = req.params.nickname;
    const { newtags, oldtags } = req.body;

    if (newtags === null || JSON.stringify(newtags) == JSON.stringify(oldtags)) {
        res.status(200).json({
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
                            d: data,
                            success: true
                        })
                    });
            }
            else {
                res.status(200).json({
                    success: true
                })
            }
        })
        .catch((e) => {
            res.status(200).json({
                msg: "Ooops! Something went wrong",
                success: false
            })
        })

})

router.post('/edit/location/:nickname', async (req, res) => {
    const login = req.params.nickname;

    if (req.body.coords === null) {
        res.status(200).json({
            message: "Nothing",
            success: true
        })
        return;
    }

    const { x, y } = req.body.coords;

    fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${y},${x}&lang=en_RU`)
        .then(res => res.json())
        .then(result => {
            let country = null,
                city = null;

            const tmp1 = result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

            tmp1.forEach(el => {
                if (el.kind === 'country')
                    country = el.name;
                else if (el.kind === 'locality')
                    city = el.name;
            })

            if (tmp1.length < 3 || !country || !city) {
                res.status(200).json({
                    message: "Ooopsy",
                    success: false
                });
                return;
            }

            const params = [country, city, x, y, login];

            insertLocation(params)
                .then((data) => {
                    if (data[0].id) {
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
                        message: "Ooops! Something went wrong",
                        success: false
                    })
                })
        })
        .catch((e) => {
            res.status(200).json({
                message: "Ooops! Something went wrong",
                success: false
            })
        })
})

module.exports = router;