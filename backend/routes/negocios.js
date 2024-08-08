const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/negocio', async (req, res) => {
    const {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo} = req.body

    try {
        const newNegocio = {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo}
        await pool.query ('INSERT INTO negocio_empresa set ?', [newNegocio])
        const negocios = await pool.query ('SELECT * FROM negocio_empresa ORDER BY nombre_negocio ASC')

        return res.json ({
            negocios: negocios,
            success: false
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            negocios: []
        })
    }
})

router.post ('/api/negocio/:id_negocio', async (req, res) => {
    const {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo} = req.body
    const {id_negocio} = req.params

    try {
        const updateNegocio = {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo}
        await pool.query ('UPDATE negocio_empresa set ? WHERE id = ?', [updateNegocio, id_negocio])
        const negocios = await pool.query ('SELECT * FROM negocio_empresa WHERE id = ?', [id_negocio])

        return res.json ({
            negocio: negocios[0],
            success: false
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            negocio: {}
        })
    }
})

router.get ('/api/negocios/:begin/:amount', async (req, res) => {
    const {begin, amount} = req.params
    try {
        const negocios = await pool.query (`SELECT * FROM negocio_empresa LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa ORDER BY nombre_negocio ASC')

            return res.json ({
                total_negocios: total_negocios[0][`COUNT (id)`],
                negocios: negocios,
                success: true
            })
        }else{
            return res.json ({
                negocios: negocios,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            negocios: []
        })
    }
})

router.get ('/api/negocio/:id_negocio', async (req, res) => {
    const {id_negocio} = req.params

    try {
        const negocios = await pool.query (`SELECT * FROM negocio_empresa WHERE id = ?`, [id_negocio])

        return res.json ({
            producto: negocios[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            negocios: {}
        })
    }
})

router.get ('/api/delete/negocio/:id_negocio', async (req, res) => {
    const {id_negocio} = req.params

    try {
        await pool.query ('DELETE FROM negocio_empresa WHERE id = ?', [id_negocio])
        const negocios = await pool.query ('SELECT * FROM negocio_empresa ORDER BY nombre_negocio ASC')
        return res.json ({
            negocio: negocios,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            negocios: [],
            success: true
        })
    }
})

module.exports = router