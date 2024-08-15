const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/compras', async (req, res) => {
    const {id_producto, usuario, cantidad, precio_unidad, precio_total, shop_id} = req.body

    try {
        const newCompra = {id_producto, usuario, cantidad, precio_unidad, precio_total, shop_id}
        await pool.query ('INSERT INTO compras set ?', [newCompra])
        const compras = await pool.query ('SELECT * FROM compras WHERE shop_id = ?', [shop_id])

        return res.json ({
            compras: compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            compras: []
        })
    }
})

router.post ('/api/compras/:id_compra', async (req, res) => {
    const {id_producto, usuario, cantidad, precio_unidad, precio_total} = req.body
    const {id_compra} = req.params

    try {
        const updateCompra = {id_producto, usuario, cantidad, precio_unidad, precio_total}
        await pool.query ('UPDATE compras set ? WHERE id = ?', [updateCompra, id_compra])
        const compras = await pool.query ('SELECT * FROM compras WHERE id = ?', [id_compra])

        return res.json ({
            compras: compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            compras: []
        })
    }
})

router.get ('/api/compras/:begin/:amount', async (req, res) => {
    const {begin, amount} = req.params
    try {
        const compras = await pool.query (`SELECT * FROM compras GROUP BY shop_id LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_compras = await pool.query ('SELECT COUNT (id) FROM compras GROUP BY shop_id')

            return res.json ({
                total_compras: total_compras[0][`COUNT (id)`],
                compras: compras,
                success: true
            })
        }else{
            return res.json ({
                compras: compras,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            compras: [],
            success: false
        })
    }
})

router.get ('/api/compras/productos/:shop_id/:begin/:amount', async (req, res) => {
    const {shop_id, begin, amount} = req.params

    try {
        const compras = await pool.query (`SELECT * FROM compras WHERE shop_id = ? LIMIT ${begin},${amount}`, [shop_id])
        if (parseInt(begin) === 0){
            const total_compras = await pool.query ('SELECT COUNT (id) FROM compras WHERE shop_id = ?', [shop_id])

            return res.json ({
                total_compras: total_compras[0][`COUNT (id)`],
                productos_compra: compras,
                success: true
            })
        }else{
            return res.json ({
                productos_compra: compras,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            productos_compra: []
        })
    }
})

router.get ('/api/delete/compras/:id_carrito/:shop_id', async (req, res) => {
    const {id_carrito, shop_id} = req.params

    try {
        await pool.query ('DELETE FROM compras WHERE id = ?', [id_carrito])
        const compras = await pool.query ('SELECT * FROM compras WHERE shop_id = ?', [shop_id])
        return res.json ({
            compras: compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            compras: [],
            success: true
        })
    }
})

module.exports = router