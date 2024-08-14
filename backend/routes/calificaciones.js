const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/calificacion', async (req, res) => {
    const {id_producto, usuario_cliente, calificacion_producto, comentario_producto} = req.body
    try {
        const newCalificacion = {id_producto, usuario_cliente, calificacion_producto, comentario_producto}
        const new_calificacion = await pool.query (`INSERT INTO productos_calificaciones set ?`, [newCalificacion])
        const calificaciones = await pool.query ('SELECT * FROM productos_calificaciones WHERE id = ?', [new_calificacion.insertId])

        return res.json ({
            calificacion: calificaciones[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/calificaciones/:begin/:amount', async (req, res) => {
    const {begin, amount} = req.params
    try {
        const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones JOIN info_clientes ON 
            productos_calificaciones.usuario_cliente = info_clientes.usuario ORDER BY productos_calificaciones.created_at ASC LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_calificaciones = await pool.query (`SELECT COUNT (productos_calificaciones.id) FROM productos_calificaciones JOIN info_clientes ON 
                productos_calificaciones.usuario_cliente = info_clientes.usuario`)

            return res.json ({
                total_calificaciones: total_calificaciones[0][`COUNT (productos_calificaciones.id)`],
                calificaciones: calificaciones,
                success: true
            })
        }else{
            return res.json ({
                calificaciones: calificaciones,
                success: false
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            calificaciones: [],
            success: false
        })
    }
})

router.get ('/api/calificaciones/producto/clientes/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones WHERE id_producto = ?
                ORDER BY created_at ASC`, [id_producto])
        return res.json ({
            calificaciones: calificaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/delete/calificacion/:id_calificacion', async (req, res) => {
    const {id_calificacion} = req.params
    
    try {
        await pool.query ('SELECT * FROM productos_calificaciones WHERE id = ?', [id_calificacion])
        return res.json ({
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router