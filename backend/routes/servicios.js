const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/servicio', async (req, res) => {
    const {servicio, descripcion} = req.body

    try {
        const newServicio = {servicio, descripcion}
        const nueva = await pool.query ('INSERT INTO servicios set ?', newServicio)
        const servicios = await pool.query ('SELECT * FROM servicios WHERE id = ?', [nueva.insertId])

        return res.json ({
            servicio: servicios[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            servicio: {},
            success: false
        })
    }
})

router.post ('/api/servicio/:id_servicio', async (req, res) => {
    const {servicio, descripcion} = req.body
    const {id_servicio} = req.params

    try {
        const updateServicio = {servicio, descripcion}
        await pool.query ('UPDATE servicios set ? WHERE id = ?', [updateServicio, id_servicio])
        const servicios = await pool.query ('SELECT * FROM servicios WHERE id = ?', [id_servicio])

        return res.json ({
            servicio: servicios[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            servicio: {}
        })
    }
})

router.get ('/api/servicios', async (req, res) => {
    try {
        const servicios = await pool.query ('SELECT * FROM servicios ORDER BY servicio ASC')
        return res.json ({
            servicios: servicios,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            servicios: [],
            success: true
        })
    }
})

router.get ('/api/servicio/:id_servicio', async (req, res) => {
    const {id_servicio} = req.params

    try {
        const servicios = await pool.query ('SELECT * FROM servicios WHERE id = ?', [id_servicio])
        return res.json ({
            servicio: servicios[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            servicio: {},
            success: true
        })
    }
})

router.get ('/api/delete/servicio/:id_servicio', async (req, res) => {
    const {id_servicio} = req.params

    try {
        await pool.query ('DELETE FROM servicios WHERE id = ?', [id_servicio])
        const servicios = await pool.query ('SELECT * FROM servicios ORDER BY servicio ASC')
        return res.json ({
            servicios: servicios,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            servicios: [],
            success: true
        })
    }
})

module.exports = router