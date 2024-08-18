const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/negocio', async (req, res) => {
    const {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo} = req.body

    try {
        const newNegocio = {nombre_negocio, nro_ruc, nombre_contacto, correo, nro_telefono, url_logo}
        const new_negocio = await pool.query ('INSERT INTO negocio_empresa set ?', [newNegocio])
        const negocios = await pool.query ('SELECT * FROM negocio_empresa WHERE id = ?', [new_negocio.insertId])

        return res.json ({
            negocio: negocios[0],
            success: true
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
            success: true
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

router.get ('/api/negocios/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && order_by === '0'){
            const negocios = await pool.query (`SELECT * FROM negocio_empresa ORDER BY nombre_negocio ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa')
    
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
        }else if (search === '0' && order_by !== '0'){
            const negocios = await pool.query (`SELECT * FROM negocio_empresa ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa')
    
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
        }else if (search !== '0' && order_by === '0'){
            const negocios = await pool.query (`SELECT * FROM negocio_empresa WHERE (nombre_negocio LIKE 
                    '%${search}%' OR nombre_contacto LIKE '%${search}%') ORDER BY nombre_negocio ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa')
    
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
        }else if (search !== '0' && order_by !== '0'){
            const negocios = await pool.query (`SELECT * FROM negocio_empresa WHERE (nombre_negocio LIKE 
                    '%${search}%' OR nombre_contacto LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa')
    
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
            negocio: negocios[0],
            success: true
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

router.get ('/api/delete/negocio/:id_negocio', async (req, res) => {
    const {id_negocio} = req.params

    try {
        await pool.query ('DELETE FROM negocio_empresa WHERE id = ?', [id_negocio])
        const negocios = await pool.query ('SELECT * FROM negocio_empresa ORDER BY nombre_negocio ASC LIMIT 0,16')
        const total_negocios = await pool.query ('SELECT COUNT (id) FROM negocio_empresa')

        return res.json ({
            total_negocios: total_negocios[0][`COUNT (id)`],
            negocios: negocios,
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