const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/upload/foto/:carpeta', (req, res) => {
    const {carpeta} = req.params
    const file = req.files.file
    file.mv(`./${carpeta}/${file.name}`, err => {
        if (err){ 
            return res.json({
                error: err,
                success: false
            })
        }else{
            return res.json ({
                message: true,
                success: true
            })
        }
    })
})

module.exports = router