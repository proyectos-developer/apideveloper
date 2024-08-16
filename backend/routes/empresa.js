const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/area_empresa', async (req, res) => {
    const {nombre_area, descripcion} = req.body

    try {
        const newAreaEmpresa = {nombre_area, descripcion}
        const nueva = await pool.query ('INSERT INTO areas_empresa set ?', newAreaEmpresa)
        const area_empresa = await pool.query ('SELECT * FROM areas_empresa WHERE id = ?', [nueva.insertId])

        return res.json ({
            area_empresa: area_empresa[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            area_empresa: {},
            success: false
        })
    }
})

router.post ('/api/area_empresa/:id_area_empresa', async (req, res) => {
    const {nombre_area, descripcion} = req.body
    const {id_area_empresa} = req.params

    try {
        const updateAreaEmpresa = {nombre_area, descripcion}
        await pool.query ('UPDATE areas_empresa set ? WHERE id = ?', [updateAreaEmpresa, id_area_empresa])
        const area_empresa = await pool.query ('SELECT  * FROM areas_empresa WHERE id = ?', [id_area_empresa])

        return res.json ({
            area_empresa: area_empresa[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            area_empresa: {}
        })
    }
})

router.get ('/api/areas_empresa', async (req, res) => {
    try {
        const areas_empresa = await pool.query ('SELECT * FROM areas_empresa ORDER BY mombre_area ASC')
        return res.json ({
            areas_empresa: areas_empresa,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            areas_empresa: [],
            success: true
        })
    }
})

router.get ('/api/area_empresa/:id_area_empresa', async (req, res) => {
    const {id_area_empresa} = req.params

    try {
        const areas_empresa = await pool.query ('SELECT * FROM areas_empresa WHERE id = ?', [id_area_empresa])
        return res.json ({
            area_empresa: areas_empresa[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            area_empresa: {},
            success: true
        })
    }
})

router.get ('/api/delete/area_empresa/:id_area_empresa', async (req, res) => {
    const {id_area_empresa} = req.params

    try {
        await pool.query ('DELETE FROM areas_empresa WHERE id = ?', [id_area_empresa])
        const areas_empresa = await pool.query ('SELECT * FROM areas_empresa ORDER BY nombre_area ASC')
        return res.json ({
            areas_empresa: areas_empresa,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            areas_empresa: [],
            success: true
        })
    }
})

module.exports = router