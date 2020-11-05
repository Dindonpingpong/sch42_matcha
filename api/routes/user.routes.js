const router = require('express').Router();
const { getPassword, getProfile, getViews, getLikes,
    getCards, getStatus, getTimeView, updateViewFailed, insertViewFailed,
    updateStatus, insertStatus, editProfile, deleteTags, insertTags, insertLocation,
    getCountCards, getCities, getCountires, getInfoLogin, updateRate, insertReport, updateCountReports } = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config');
const API_KEY = config.get('apiKey');
const fetch = require('node-fetch');

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
                else if (data[0].count_reports > 2) {
                    res.status(200).json({
                        message: `Your account has been banned. If you want to get your account back, 
                                    please, contact to admin.`,
                        success: false
                    })
                    return;
                }
                else if (!data[0].confirm) {
                    res.status(200).json({
                        message: "Confirm your account via email.",
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
            .catch((e) => {
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
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
            .catch((e) => {
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
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
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
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
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
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
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
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
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    }
    catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/profile/status/update', async (req, res) => {
    try {
        const { me, you, status, newStatus } = req.body;
        const promise = (status === 'like' || status === 'ignore' || status === 'unlike') ? updateStatus([me, you, newStatus]) : insertStatus([me, you, newStatus]);
        let value = 10;

        if (newStatus === 'unlike' || newStatus === 'ignore')
            value = -10;

        promise
            .then(data => {
                if (data) {
                    updateRate([value, you])
                        .then((data) => {
                            res.status(200).json({
                                result: newStatus,
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
                }
            })
            .catch((e) => {
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })

    }
    catch (e) {
        res.status(200).json({
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
                                res.status(200).json({
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
                                res.status(200).json({
                                    message: e.message,
                                    success: false
                                })
                            })
                    }
                })
        }
    }
    catch (e) {
        res.status(200).json({
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
                message: e.message,
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
                msg: e.message,
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
                        message: e.message,
                        success: false
                    })
                })
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

        const { nickname, mySex, mySexpref, page, sort, ageFrom, ageTo, rateFrom, rateTo, sex, tags, distance } = req.body;
        let sqlSort = '',
            sqlFilter = '',
            sqlSortTags = '',
            limit = page * 6,
            params = [nickname, mySex, mySexpref, limit, tags];

        if (sort === 'ageAsc' || sort === 'ageDesc')
            sqlSort = (sort === 'ageAsc') ? 'age ASC, count DESC, rate DESC' : 'age DESC, count DESC, rate DESC';
        else if (sort === 'rateAsc' || sort === 'rateDesc')
            sqlSort = (sort === 'rateAsc') ? 'rate ASC, age ASC, count DESC' : 'rate DESC, age ASC, count DESC';
        else if (sort === 'tagsAsc' || sort === 'tagsDesc') {
            sqlSort = (sort === 'tagsAsc') ? 'rate DESC, age ASC' : 'rate DESC, age ASC';
            sqlSortTags = (sort === 'tagsAsc')
                ? 'GROUP BY t.nickName, t.firstName, t.lastName, t.age, t.rate, t.city, t.photos, t.sex, t.sexPreferences, t.tags, t.count, t.contact, t.distance, t.count_reports ORDER BY COUNT(t.tags) ASC, t.tags ASC'
                : 'GROUP BY t.nickName, t.firstName, t.lastName, t.age, t.rate, t.city, t.photos, t.sex, t.sexPreferences, t.tags, t.count, t.contact, t.distance, t.count_reports ORDER BY COUNT(t.tags) DESC';
        }
        if (sort === 'locationAsc' || sort === 'locationDesc')
            sqlSort = (sort === 'locationAsc') ? 'distance ASC, age ASC, rate DESC, count DESC' : 'distance DESC, age ASC, rate DESC, count DESC';

        // тут проверку на A > B?
        sqlFilter = (sex === 'both')
            ? "AND (sex = 'female' OR sex = 'male') "
            : `AND sex = '${sex}' `;
        sqlFilter += `AND age > ${ageFrom} AND age < ${ageTo} AND rate > ${rateFrom} AND rate < ${rateTo} AND distance <= ${distance} `;
        if (tags.length > 0)
            sqlFilter += `AND tags && $5`;

        getCards(params, sqlSort, sqlSortTags, sqlFilter)
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
                        message: "No users",
                        success: false
                    })
            })
            .catch((e) => {
                // console.log(e.message);
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        // console.log(e.message);
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/users/count/pages', async (req, res) => {
    try {
        const { nickname, mySex, mySexpref, ageFrom, ageTo, rateFrom, rateTo, sex, tags, distance } = req.body;
        let sqlFilter = '',
            params = [nickname, mySex, mySexpref, tags];

        // тут проверку на A > B?
        sqlFilter = (sex === 'both')
            ? "AND (sex = 'female' OR sex = 'male') "
            : `AND sex = '${sex}' `;
        sqlFilter += `AND age > ${ageFrom} AND age < ${ageTo} AND rate > ${rateFrom} AND rate < ${rateTo} AND distance <= ${distance} `;
        if (tags.length > 0)
            sqlFilter += `AND tags && $4`;

        getCountCards(params, sqlFilter)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        result: data.length,
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
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    } catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/countries', async (req, res) => {
    getCountires()
        .then(data => {
            const result = [];
            if (data.length > 0) {
                data.forEach(el => {
                    result.push(el.location);
                })
            }
            res.status(200).json({
                data: result,
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

router.post('/cities', async (req, res) => {
    const countries = req.body.countries;

    getCities([countries])
        .then((data) => {
            const result = [];
            if (data.length > 0) {
                data.forEach(el => {
                    result.push(el.location);
                })
            }
            res.status(200).json({
                data: result,
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

router.post('/profile/report', async (req, res) => {
    try {
        const { me, you, reason, message } = req.body;

        const p1 = insertReport([me, you, reason, message]);
        const p2 = updateCountReports([you]);

        Promise.all([p1, p2])
            .then(() => {
                res.status(200).json({
                    message: "Ok",
                    success: true
                });
            })
            .catch((e) => {
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })
    }
    catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

module.exports = router;