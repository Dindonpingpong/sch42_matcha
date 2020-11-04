const router = require('express').Router();
const { getMessage, getCountMessage, sendMessage, } = require('../models/user');

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

router.get('/message/:from/:to/:page', async (req, res) => {
    try {
        const { from, to } = req.params;
        const offset = (req.params.page - 1) * 10;

        getMessage([from, to, offset])
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

router.get('/messages/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;

        getCountMessage([from, to])
            .then(data => {
                const pages = Math.ceil(data[0].count / 10);

                res.status(200).json({
                    result: pages,
                    message: "Ok",
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

module.exports = router;