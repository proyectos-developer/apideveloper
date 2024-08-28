const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/mensaje', async (req, res) => {
    const {url_foto, nombres, apellidos, usuario_mensaje, titulo, mensaje, usuario_remitente, fecha_mensaje} = req.body

    try {
        const newMensaje = {url_foto, nombres, apellidos, usuario_mensaje, titulo, mensaje, usuario_remitente, fecha_mensaje}
        const new_notificacion = await pool.query ('INSERT INTO mensajes set ?', newMensaje)
        const chat = await pool.query ('SELECT * FROM mensajes WHERE id = ?', [new_notificacion.insertId])

        return res.json ({
            mensaje: chat[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            mensaje: {},
            success: false
        })
    }
})

router.post ('/api/mensaje/:id_mensaje', async (req, res) => {
    const {url_foto, nombres, apellidos, usuario_mensaje, titulo, mensaje, usuario_remitente, fecha_mensaje} = req.body
    const {id_mensaje} = req.params

    try {
        const updateMensaje = {url_foto, nombres, apellidos, usuario_mensaje, titulo, mensaje, usuario_remitente, fecha_mensaje}
        await pool.query ('UPDATE mensajes set ? WHERE id = ?',  [updateMensaje, id_mensaje])
        const chat = await pool.query ('SELECT  * FROM mensajes WHERE id = ?', [id_mensaje])

        return res.json ({
            mensaje: chat[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            mensaje: {}
        })
    }
})

router.get ('/api/mensajes/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const mensajes = await pool.query (`SELECT * FROM mensajes ORDER BY created_at DESC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_mensajes = await pool.query ('SELECT COUNT (id) FROM mensajes')

                return res.json ({
                    total_mensajes: total_mensajes[0][`COUNT (id)`],
                    mensajes: mensajes,
                    success: true
                })
            }
            return res.json ({
                mensajes: mensajes,
                success: true
            })
        }else if (search === '0' && order_by !== '0'){
            const mensajes = await pool.query (`SELECT * FROM mensajes ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_mensajes = await pool.query ('SELECT COUNT (id) FROM mensajes')

                return res.json ({
                    total_mensajes: total_mensajes[0][`COUNT (id)`],
                    mensajes: mensajes,
                    success: true
                })
            }
            return res.json ({
                mensajes: mensajes,
                success: true
            })
        }else if (search !== '0' && order_by === '0'){
            const mensajes = await pool.query (`SELECT * FROM mensajes 
                    WHERE (titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR mensaje LIKE '%${search}%') 
                    ORDER BY created_at DESC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_mensajes = await pool.query (`SELECT COUNT (id) FROM mensajes
                    WHERE (titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR mensaje LIKE '%${search}%')`)

                return res.json ({
                    total_mensajes: total_mensajes[0][`COUNT (id)`],
                    mensajes: mensajes,
                    success: true
                })
            }
            return res.json ({
                mensajes: mensajes,
                success: true
            })
        }else if (search !== '0' && order_by !== '0'){
            const mensajes = await pool.query (`SELECT * FROM mensajes 
                    WHERE (titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR mensaje LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_mensajes = await pool.query (`SELECT COUNT (id) FROM mensajes
                    WHERE (titulo LIKE '%${search}%' OR nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR mensaje LIKE '%${search}%')`)

                return res.json ({
                    total_mensajes: total_mensajes[0][`COUNT (id)`],
                    mensajes: mensajes,
                    success: true
                })
            }
            return res.json ({
                mensajes: mensajes,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            mensajes: [],
            success: true
        })
    }
})

router.get ('/api/mensaje/:id_mensaje', async (req, res) => {
    const {id_mensaje} = req.params

    try {
        const mensajes = await pool.query ('SELECT * FROM mensajes WHERE id = ?', [id_mensaje])
        return res.json ({
            mensaje: mensajes[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            mensaje: {},
            success: true
        })
    }
})

router.get ('/api/delete/mensaje/:id_mensaje', async (req, res) => {
    const {id_mensaje} = req.params

    try {
        await pool.query ('DELETE FROM mensajes WHERE id = ?', [id_mensaje])
        const mensajes = await pool.query (`SELECT * FROM mensajes 
                ORDER BY created_at DESC  LIMIT 0,16`)
        const total_mensajes = await pool.query (`SELECT COUNT (id) FROM mensajes`)

        return res.json ({
            total_mensajes: total_mensajes[0][`COUNT (id)`],
            mensajes: mensajes,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            mensajes: [],
            success: true
        })
    }
})

module.exports = router