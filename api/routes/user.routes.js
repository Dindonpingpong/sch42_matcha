const router = require('express').Router();
const { getPassword, 
 getCards, getInfoLogin, getCountCards, insertReport, updateCountReports, updateLogs, getLogs } = require('../models/user');
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
            .catch(() => {
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

router.post('/users/page', async (req, res) => {
    try {

        const { nickname, mySex, mySexpref, page, sortType, ageFrom, ageTo, rateFrom, rateTo, sex, tags, distance } = req.body;
        let sqlSort = '',
            sqlFilter = '',
            sqlSortTags = '',
            limit = page * 6,
            params = [nickname, mySex, mySexpref, limit, tags];

        if (sortType === 'ageAsc' || sortType === 'ageDesc')
            sqlSort = (sortType === 'ageAsc') ? 'age ASC, count DESC, rate DESC' : 'age DESC, count DESC, rate DESC';
        else if (sortType === 'rateAsc' || sortType === 'rateDesc')
            sqlSort = (sortType === 'rateAsc') ? 'rate ASC, age ASC, count DESC' : 'rate DESC, age ASC, count DESC';
        else if (sortType === 'tagsAsc' || sortType === 'tagsDesc') {
            sqlSort = (sortType === 'tagsAsc') ? 'rate DESC, age ASC' : 'rate DESC, age ASC';
            sqlSortTags = (sortType === 'tagsAsc')
                ? 'GROUP BY t.nickName, t.firstName, t.lastName, t.age, t.rate, t.city, t.photos, t.sex, t.sexPreferences, t.tags, t.count, t.contact, t.distance, t.count_reports ORDER BY COUNT(t.tags) ASC, t.tags ASC'
                : 'GROUP BY t.nickName, t.firstName, t.lastName, t.age, t.rate, t.city, t.photos, t.sex, t.sexPreferences, t.tags, t.count, t.contact, t.distance, t.count_reports ORDER BY COUNT(t.tags) DESC';
        }
        if (sortType === 'locationAsc' || sortType === 'locationDesc')
            sqlSort = (sortType === 'locationAsc') ? 'distance ASC, age ASC, rate DESC, count DESC' : 'distance DESC, age ASC, rate DESC, count DESC';

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
            .catch(() => {
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

router.post('/users/count/pages', async (req, res) => {
    try {
        const { nickname, mySex, mySexpref, ageFrom, ageTo, rateFrom, rateTo, sex, tags, distance } = req.body;
        let sqlFilter = '',
            params = [nickname, mySex, mySexpref, tags];

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
            .catch(() => {
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

router.get('/notifications/:nickname', async (req, res) => {
    const login = req.params.nickname;

    getLogs([login])
        .then(data => {
            res.status(200).json({
                data: data,
                success: true
            })
        })
        .catch(() => {
            res.status(200).json({
                message: "Ooops! Something went wrong",
                success: false
            })
        })
})

router.get('/notif/update/:nickname', async (req, res) => {
    const login = req.params.nickname;

    updateLogs([login])
        .then(() => {
            getLogs([login])
                .then(data => {
                    res.status(200).json({
                        data: data,
                        success: true
                    })
                })
                .catch(() => {
                    res.status(200).json({
                        message: "Ooops! Something went wrong",
                        success: false
                    })
                })
        })
        .catch(() => {
            res.status(200).json({
                message: "Ooops! Something went wrong",
                success: false
            })
        })
})

module.exports = router;