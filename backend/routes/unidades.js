const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/unidad', async (req, res) => {
    const {unidad, descripcion} = req.body

    try {
        const newUnidad = {unidad, descripcion}
        const nueva = await pool.query ('INSERT INTO unidades set ?', newUnidad)
        const unidades = await pool.query ('SELECT * FROM unidades WHERE id = ?', [nueva.insertId])

        return res.json ({
            unidad: unidades[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            unidad: {},
            success: false
        })
    }
})

router.post ('/api/unidad/:id_unidad', async (req, res) => {
    const {unidad, descripcion} = req.body
    const {id_unidad} = req.params

    try {
        const updateUnidad = {unidad, descripcion}
        await pool.query ('UPDATE unidades set ? WHERE id = ?', [updateUnidad, id_unidad])
        const unidades = await pool.query ('SELECT  * FROM unidades WHERE id = ?', [id_unidad])

        return res.json ({
            unidad: unidades[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            unidad: {}
        })
    }
})

router.get ('/api/unidades', async (req, res) => {
    try {
        const unidades = await pool.query ('SELECT * FROM unidades ORDER BY unidad ASC')
        return res.json ({
            unidades: unidades,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            unidades: [],
            success: true
        })
    }
})

router.get ('/api/unidad/:id_unidad', async (req, res) => {
    const {id_unidad} = req.params

    try {
        const unidades = await pool.query ('SELECT * FROM unidades WHERE id = ?', [id_unidad])
        return res.json ({
            unidad: unidades[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            unidad: {},
            success: true
        })
    }
})

router.get ('/api/delete/unidad/:id_unidad', async (req, res) => {
    const {id_unidad} = req.params

    try {
        await pool.query ('DELETE FROM unidades WHERE id = ?', [id_unidad])
        const unidades = await pool.query ('SELECT * FROM unidades ORDER BY unidad ASC')
        return res.json ({
            unidades: unidades,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            unidades: [],
            success: true
        })
    }
})

module.exports = router