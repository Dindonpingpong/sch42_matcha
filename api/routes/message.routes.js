const router = require('express').Router();
const { getMessage, getCountMessage, sendMessage, getConnectedUsers } = require('../models/user');
const multer = require('multer');
let destFolder = "uploadChatFiles";
const upload = multer({ dest: destFolder });

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
                console.log('1',e.message);
                res.status(200).json({
                    message: e.message,
                    success: false
                })
            })

    } catch (e) {
        console.log('g',e.message);
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
                    result: data,
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

router.post('/chatimage/:from/:to', upload.single('photo'), async (req, res) => {
    try {
        let { mimetype, path, filename } = req.file;
        const { from, to } = req.params;
        var img = fs.readFileSync(path);
        var encode_image = img.toString('base64');
        var finalImg = new Buffer.from(encode_image, 'base64');
        fs.writeFile((destFolder + '/' + req.file.originalname), finalImg, function (err) { });
        fs.unlinkSync(path)
        const params = [
            from,
            to,
            req.file.originalname,
            'photo'
        ];
        sendMessage(params)
            .then(data => {
                console.log('DATAAA', data)
                res.json({
                    message: data,
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
        res.status(501).json({
            message: e.message,
            success: false
        })
    }

})

router.post('/getchatimage', async (req, res) => {
    try {
        console.log('loop')
        let image = req.body.img;
        let path = `${destFolder}/${image}`;
        var img2 = fs.readFileSync(path);
        var encode_image = img2.toString('base64');
        res.status(200).json({
                img: encode_image,
                success: true
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