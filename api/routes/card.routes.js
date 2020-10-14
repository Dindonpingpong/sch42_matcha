const { Router } = require('express');
const router = Router();
const { getPage, getInfo } = require('../models/card');

router.get('/:nickname/:page', async (req, res) => {
    const { nickname, page } = req.params;
    console.log(nickname, page);
    const offset = (page - 1) * 9;

    getInfo(nickname)
        .then( data => {
            console.log(data);
            const { id, location } = data[0];
            return [id, location];
        })
        .then( res => {
            console.log(res);
            getPage(res[0], res[1], offset)
                .then( data => {
                    console.log(data);
                    res.send(200).json({
                        result: data
                    })
                })
        })
})

module.exports = router