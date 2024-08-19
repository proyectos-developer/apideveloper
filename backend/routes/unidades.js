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

router.get ('/api/unidades/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {order_by, order, search, begin, amount} = req.params
    try {
        if (order_by === '0' && search === '0'){
            const unidades = await pool.query (`SELECT * FROM unidades ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_unidades = await pool.query ('SELECT COUNT (id) FROM unidades')

                return res.json ({
                    total_unidades: total_unidades[0][`COUNT (id)`],
                    unidades: unidades,
                    success: true
                })
            }else{
                return res.json ({
                    unidades: unidades,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const unidades = await pool.query (`SELECT * FROM unidades WHERE (unidad LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_unidades = await pool.query (`SELECT COUNT (id) FROM unidades WHERE
                    (unidad LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_unidades: total_unidades[0][`COUNT (id)`],
                    unidades: unidades,
                    success: true
                })
            }else{
                return res.json ({
                    unidades: unidades,
                    success: true
                })
            }
        }else if (order_by !== '0' && search === '0'){
            const unidades = await pool.query (`SELECT * FROM unidades ODER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_unidades = await pool.query (`SELECT COUNT (id) FROM unidades`)

                return res.json ({
                    total_unidades: total_unidades[0][`COUNT (id)`],
                    unidades: unidades,
                    success: true
                })
            }else{
                return res.json ({
                    unidades: unidades,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const unidades = await pool.query (`SELECT * FROM unidades WHERE (unidad LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_unidades = await pool.query (`SELECT COUNT (id) FROM unidades WHERE
                    (unidad LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_unidades: total_unidades[0][`COUNT (id)`],
                    unidades: unidades,
                    success: true
                })
            }else{
                return res.json ({
                    unidades: unidades,
                    success: true
                })
            }
        }
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
        const unidades = await pool.query ('SELECT * FROM unidades ORDER BY unidad ASC LIMIT 0,16')
        const total_unidades = await pool.query ('SELECT COUNT (id) FROM unidades')

        return res.json ({
            total_unidades: total_unidades,
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