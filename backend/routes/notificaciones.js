const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/notificacion', async (req, res) => {
    const {id_tipo_notificacion, leido, descripcion, tipo_notificacion, usuario, nombres, apellidos, url_foto, titulo} = req.body

    try {
        const newNotificacion = {id_tipo_notificacion, leido, descripcion, tipo_notificacion, usuario, nombres, apellidos, url_foto, titulo}
        const new_notificacion = await pool.query ('INSERT INTO notificaciones set ?', [newNotificacion])
        const notificacion = await pool.query ('SELECT * FROM notificaciones WHERE id = ?', [new_notificacion.insertId])

        return res.json ({
            notificacion: notificacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            notificacion: {},
            success: false
        })
    }
})

router.post ('/api/notificacion/:id_notificacion', async (req, res) => {
    const {id_tipo_notificacion, leido, descripcion, tipo_notificacion, usuario, nombres, apellidos, url_foto, titulo} = req.body
    const {id_notificacion} = req.params

    try {
        const updateNotificacion = {id_tipo_notificacion, leido, descripcion, tipo_notificacion, usuario, nombres, apellidos, url_foto, titulo}
        await pool.query ('UPDATE notificaciones set ? WHERE id = ?', [updateNotificacion, id_notificacion])
        const notificacion = await pool.query ('SELECT  * FROM notificaciones WHERE id = ?', [id_notificacion])

        return res.json ({
            notificacion: notificacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            notificacion: {}
        })
    }
})

router.post ('/api/lectura/notificacion/:id_notificacion/:begin/:amount', async (req, res) => {
    const {id_notificacion, begin, amount} = req.params
    const {leido} = req.body

    try {
        const updateNotificacion = {leido}
        await pool.query ('UPDATE notificaciones set ? WHERE id = ?', [updateNotificacion, id_notificacion])
        const notificaciones = await pool.query (`SELECT * FROM notificaciones ORDER BY created_at DESC LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones')

            return res.json ({
                total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                notificaciones: notificaciones,
                success: true
            })
        }
        return res.json ({
            notificaciones: notificaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json({
            error: error,
            notificaciones: [false],
            success: false
        })
    }
})

router.get ('/api/notificaciones/search/:search/tipo/:id_tipo/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_tipo, order_by, order, begin, amount} = req.params

    try {
        if (id_tipo === '0' && search === '0' && order_by === '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones ORDER BY created_at DESC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones')

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo === '0' && search === '0' && order_by !== '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones')

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo === '0' && search !== '0' && order_by === '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones 
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR
                    apellidos  LIKE '%${search}%') 
                    ORDER BY created_at DESC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query (`SELECT COUNT (id) FROM notificaciones
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%')`)

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo === '0' && search !== '0' && order_by !== '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones 
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR
                    apellidos  LIKE '%${search}%') 
                    ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query (`SELECT COUNT (id) FROM notificaciones
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%')`)

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }
        else if (id_tipo !== '0' && search === '0' && order_by === '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones WHERE id_tipo_notificacion = ? ORDER BY created_at DESC
                    LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones WHERE id_tipo_notificacion = ?', [id_tipo])

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo !== '0' && search === '0' && order_by !== '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones WHERE id_tipo_notificacion = ? ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones WHERE id_tipo_notificacion = ?', [id_tipo])

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo !== '0' && search !== '0' && order_by === '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones 
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR
                    apellidos  LIKE '%${search}%') AND id_tipo_notificacion = ? 
                    ORDER BY created_at DESC 
                    LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query (`SELECT COUNT (id) FROM notificaciones
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%') AND id_tipo_notificacion = ?`, [id_tipo])

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }else if (id_tipo !== '0' && search !== '0' && order_by !== '0'){
            const notificaciones = await pool.query (`SELECT * FROM notificaciones 
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR
                    apellidos  LIKE '%${search}%') AND id_tipo_notificacion = ?
                    ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_notificaciones = await pool.query (`SELECT COUNT (id) FROM notificaciones
                    WHERE (tipo_notificacion LIKE '%${search}%' OR titulo LIKE '%${search}%') AND id_tipo_notificacion = ?`, [id_tipo])

                return res.json ({
                    total_notificaciones: total_notificaciones[0][`COUNT (id)`],
                    notificaciones: notificaciones,
                    success: true
                })
            }
            return res.json ({
                notificaciones: notificaciones,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            notificaciones: [],
            success: true
        })
    }
})

router.get ('/api/notificacion/:id_notificacion', async (req, res) => {
    const {id_notificacion} = req.params

    try {
        const notificaciones = await pool.query ('SELECT * FROM notificaciones WHERE id = ?', [id_notificacion])
        return res.json ({
            notificacion: notificaciones[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            notificacion: {},
            success: true
        })
    }
})

router.get ('/api/delete/notificacion/:id_notificacion', async (req, res) => {
    const {id_notificacion} = req.params

    try {
        await pool.query ('DELETE FROM notificaciones WHERE id = ?', [id_notificacion])
        const notificaciones = await pool.query (`SELECT * FROM notificaciones 
                ORDER BY created_at DESC  LIMIT 0,16`)
        const total_notificaciones = await pool.query (`SELECT COUNT (id) FROM notificaciones`)

        return res.json ({
            total_notificaciones: total_notificaciones[0][`COUNT (id)`],
            notificaciones: notificaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            notificaciones: [],
            success: true
        })
    }
})

router.get ('/api/nro/notificaciones', async (req, res) => {
    try {
        const total_notificaciones = await pool.query ('SELECT COUNT (id) FROM notificaciones WHERE leido = 0')

        return res.json ({
            total_notificaciones: total_notificaciones[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            nro_notificaciones: 0,
            success: false
        })
    }
})

module.exports = router