const router = require('express').Router();
const { getMessage, getCountMessage, sendMessage, getConnectedUsers, sendFileMessage, getChatImage } = require('../models/user');
const multer = require('multer');
const destFolder = "uploadChatFiles";
const upload = multer({ dest: destFolder });
const fs = require('fs');

router.post('/message', async (req, res) => {
    try {
        const { from, to, message, path } = req.body;

        const params = [
            from,
            to,
            message
        ];

        sendMessage(params)
            .then(data => {
                data.path = path
                res.status(200).json({
                    data: data,
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

router.get('/messages/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;

        getCountMessage([from, to])
            .then(data => {
                const pages = Math.ceil(data[0].count / 10);

                res.status(200).json({
                    data: pages,
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
    } catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

router.get('/users/:nickname', async (req, res) => {
    try {
        const nickname = req.params.nickname;

        getConnectedUsers([nickname])
            .then(data => {
                res.status(200).json({
                    data: data,
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
    } catch (e) {
        res.status(200).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/image/:from/:to', upload.single('photo'), async (req, res) => {
    try {
        let { mimetype, path } = req.file;
        const { message, avatar } = req.body;
        const { from, to } = req.params;
        const img = fs.readFileSync(path);
        const encode_image = img.toString('base64');
        const finalImg = new Buffer.from(encode_image, 'base64');
        const newPath = `${from}_${to}_${new Date().getTime()}`;

        fs.writeFile((`${destFolder}/${newPath}`), finalImg, function(err) {});
        fs.unlinkSync(path);

        sendFileMessage([ from, to, message, mimetype, newPath])
            .then(data => {
                data.path = avatar;
                res.json({
                    data: data,
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

router.get('/image/:path', async (req, res) => {
    try {
        const { path } = req.params;
        const img = fs.readFileSync(`${destFolder}/${path}`);
        const encode_image = img.toString('base64');
        const finalImg = new Buffer.from(encode_image, 'base64');

        getChatImage([path])
            .then((data) => {
                res.contentType(data[0].type)
                res.send(finalImg);
            })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

router.post('/getsound', async (req, res) => {
    try {
        let name = req.body.name;
        let path = `../sound/${name}`;
        res.sendFile(path, { root: '.' });
        //res.status(200).json({success:true})
        /*
                let image = req.body.img;
                let path = `${destFolder}/${image}`;
                var img2 = fs.readFileSync(path);
                var encode_image = img2.toString('base64');
                res.status(200).json({img:encode_image,success:true})*/
    } catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }
})

module.exports = router;