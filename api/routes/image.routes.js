const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const fs = require('fs');
const { putImage, getImage } = require('../models/user');

router.post('/:nickname/:position', upload.single('photo'), async (req, res) => {
    try {
        const { nickname, position } = req.params;
        let { mimetype, path } = req.file;
        const newPath = path.split('/')[1];

        putImage(position, mimetype, newPath, nickname)
            .then(data => {
                res.status(200).json({
                    message: data,
                    success: true
                })
            })
            .catch(e => {
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

router.get('/:nickname/:position/:path', async (req, res) => {
    try {
        const { nickname, position, path } = req.params;
        const img = fs.readFileSync('uploads/' + path);
        const encode_image = img.toString('base64');
        const finalImg = new Buffer.from(encode_image, 'base64');

        getImage([position, nickname])
            .then(data => {
                res.contentType(data[0].photos)
                res.send(finalImg);
            })
            .catch(e => {
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