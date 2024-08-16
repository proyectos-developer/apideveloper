const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/administrador', async (req, res) => {
    const {id_trabajador, url_foto, nombres, apellidos, area_empresa, habilitado} = req.body

    try {
        const newAdministrador = {id_trabajador, url_foto, nombres, apellidos, area_empresa, habilitado}
        const nueva = await pool.query ('INSERT INTO administradores set ?', newAdministrador)
        const administrador = await pool.query ('SELECT * FROM administradores WHERE id = ?', [nueva.insertId])

        return res.json ({
            administrador: administrador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            administrador: {},
            success: false
        })
    }
})

router.post ('/api/administrador/:id_aministrador', async (req, res) => {
    const {id_aministrador} = req.params
    const {url_foto, nombres, apellidos, area_empresa} = req.body

    try {
        const updateAdministrador = {url_foto, nombres, apellidos, area_empresa}
        await pool.query ('UPDATE administradores set ? WHERE id = ?', [updateAdministrador, id_aministrador])
        const administrador = await pool.query ('SELECT  * FROM administradores WHERE id = ?', [id_aministrador])

        return res.json ({
            administrador: administrador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            administrador: {}
        })
    }
})

router.post ('/api/administrador/habilitado/:id_aministrador', async (req, res) => {
    const {id_aministrador} = req.params
    const {habilitado} = req.body

    try {
        const updateAdministrador = {habilitado}
        await pool.query ('UPDATE administradores set ? WHERE id = ?', [updateAdministrador, id_aministrador])
        const administrador = await pool.query ('SELECT  * FROM administradores WHERE id = ?', [id_aministrador])

        return res.json ({
            administrador: administrador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            administrador: {}
        })
    }
})

router.get ('/api/administradores/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && order_by === '0'){
            const administradores = await pool.query (`SELECT * FROM administradores 
                ORDER BY apellidos ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM administradores')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    administradores: administradores,
                    success: true
                })
            }
            return res.json ({
                administradores: administradores,
                success: true
            })
        }else if (search === '0' && order_by !== '0'){
            const administradores = await pool.query (`SELECT * FROM administradores 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM administradores')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    administradores: administradores,
                    success: true
                })
            }
            return res.json ({
                administradores: administradores,
                success: true
            })
        }else if (search !== '0' && order_by === '0'){
            const administradores = await pool.query (`SELECT * FROM administradores WHERE (nombres LIKE '%${search}%' OR
                apellidos LIKE '%${search}%' OR area_empresa  LIKE '%${search}%') ORDER BY apellidos ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM administradores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR area_empresa 
                    LIKE '%${search}%')`)

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    administradores: administradores,
                    success: true
                })
            }
            return res.json ({
                administradores: administradores,
                success: true
            })
        }else if (search !== '0' && order_by !== '0'){
            const administradores = await pool.query (`SELECT * FROM administradores WHERE (nombres LIKE '%${search}%' OR
                apellidos LIKE '%${search}%' OR area_empresa  LIKE '%${search}%') ORDER BY ${order_by} ${order} 
                LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM administradores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR area_empresa 
                    LIKE '%${search}%')`)

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    administradores: administradores,
                    success: true
                })
            }
            return res.json ({
                administradores: administradores,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            administradores: [],
            success: true
        })
    }
})

router.get ('/api/administrador/:id_aministrador', async (req, res) => {
    const {id_aministrador} = req.params

    try {
        const administradores = await pool.query ('SELECT * FROM administradores WHERE id = ?', [id_aministrador])
        return res.json ({
            administrador: administradores[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            administrador: {},
            success: true
        })
    }
})

router.get ('/api/delete/administrador/:id_aministrador', async (req, res) => {
    const {id_aministrador} = req.params

    try {
        await pool.query ('DELETE FROM administradores WHERE id = ?', [id_aministrador])
        const administradores = await pool.query ('SELECT * FROM administradores ORDER BY apellidos ASC')
        return res.json ({
            administradores: administradores,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            administradores: [],
            success: true
        })
    }
})

module.exports = router