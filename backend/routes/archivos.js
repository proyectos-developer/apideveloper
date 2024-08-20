const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

const fs = require ('fs')

router.post ('/api/upload/foto/:carpeta', (req, res) => {
    const {carpeta} = req.params
    const file = req.files.file
    if (fs.existsSync(`./${carpeta}`)){
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
    }
    else{
        fs.mkdirSync(`./${carpeta}`)
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
    }
})

module.exports = router