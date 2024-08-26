const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/suscripcion', async (req, res) => {
    const {correo} = req.body

    try {
        const newSuscriptor = {correo}
        await pool.query ('INSERT INTO suscripciones set ?', [newSuscriptor])
        const suscripciones = await pool.query ('SELECT * FROM suscripciones ORDER BY created_at ASC')

        return res.json ({
            suscripciones: suscripciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            suscripciones: []
        })
    }
})

router.get ('/api/suscripciones/:begin/:amount', async (req, res) => {
    const {begin, amount} = req.params
    try {
        const suscripciones = await pool.query (`SELECT * FROM suscripciones ORDER BY created_at ASC LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_suscripciones = await pool.query ('SELECT COUNT (id) FROM suscripciones')

            return res.json ({
                total_suscripciones: total_suscripciones[0][`COUNT (id)`],
                suscripciones: suscripciones,
                success: true
            })
        }else{
            return res.json ({
                suscripciones: suscripciones,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            suscripciones: []
        })
    }
})

router.get ('/api/delete/suscripcion/:correo', async (req, res) => {
    const {correo} = req.params

    try {
        await pool.query ('DELETE FROM suscripciones WHERE id = ?', [correo])
        const suscripciones = await pool.query ('SELECT * FROM suscripciones ORDER BY created_at ASC')
        return res.json ({
            suscripciones: suscripciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            suscripciones: [],
            success: true
        })
    }
})

router.get ('/api/cliente/suscriptor/:correo', async (req, res) => {
    const {correo} = req.params

    try {
        const clientes = await pool.query ('SELECT * FROM info_clientes WHERE correo = ?', [correo])
        return res.json ({
            cliente: clientes[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            cliente: [],
            success: false
        })
    }
})

module.exports = router