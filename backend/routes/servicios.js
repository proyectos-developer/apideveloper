const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/servicio', async (req, res) => {
    const {servicio, descripcion, url_foto} = req.body

    try {
        const newServicio = {servicio, descripcion, url_foto}
        const new_servicio = await pool.query ('INSERT INTO servicios set ?', newServicio)
        const servicios = await pool.query ('SELECT * FROM servicios WHERE id = ?', [new_servicio.insertId])

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
    const {servicio, descripcion, url_foto} = req.body
    const {id_servicio} = req.params

    try {
        const updateServicio = {servicio, descripcion, url_foto}
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

router.get ('/api/servicios/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {order_by, order, search, begin, amount} = req.params
    try {
        if (order_by === '0' && search === '0'){
            const servicios = await pool.query (`SELECT * FROM servicios ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_servicios = await pool.query ('SELECT COUNT (id) FROM servicios')

                return res.json ({
                    total_servicios: total_servicios[0][`COUNT (id)`],
                    servicios: servicios,
                    success: true
                })
            }else{
                return res.json ({
                    servicios: servicios,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const servicios = await pool.query (`SELECT * FROM servicios WHERE (servicio LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_servicios = await pool.query (`SELECT COUNT (id) FROM servicios WHERE
                    (servicio LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_servicios: total_servicios[0][`COUNT (id)`],
                    servicios: servicios,
                    success: true
                })
            }else{
                return res.json ({
                    servicios: servicios,
                    success: true
                })
            }
        }else if (order_by !== '0' && search === '0'){
            const servicios = await pool.query (`SELECT * FROM servicios ODER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_servicios = await pool.query (`SELECT COUNT (id) FROM servicios`)

                return res.json ({
                    total_servicios: total_servicios[0][`COUNT (id)`],
                    servicios: servicios,
                    success: true
                })
            }else{
                return res.json ({
                    servicios: servicios,
                    success: true
                })
            }
        }else if (order_by !== '0' && search !== '0'){
            const servicios = await pool.query (`SELECT * FROM servicios WHERE (servicio LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_servicios = await pool.query (`SELECT COUNT (id) FROM servicios WHERE
                    (servicio LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_servicios: total_servicios[0][`COUNT (id)`],
                    servicios: servicios,
                    success: true
                })
            }else{
                return res.json ({
                    servicios: servicios,
                    success: true
                })
            }
        }
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