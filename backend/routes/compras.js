const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/compra', async (req, res) => {
    const {id_producto, usuario, cantidad, precio_unidad, precio_total, shop_id,
        producto, descripcion, url_foto, id_categoria, categoria, id_sub_categoria, sub_categoria,
        id_unidad, unidad, id_servicio, servicio, fecha_compra
    } = req.body

    try {
        const newCompra = {id_producto, usuario, cantidad, precio_unidad, precio_total, shop_id,
            producto, descripcion, url_foto, id_categoria, categoria, id_sub_categoria, sub_categoria,
            id_unidad, unidad, id_servicio, servicio, fecha_compra
        }
        const new_compra = await pool.query ('INSERT INTO compras set ?', [newCompra])
        const compras = await pool.query ('SELECT * FROM compras WHERE id = ?', [new_compra.insertId])

        return res.json ({
            compra: compras[0],
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
    const {cantidad, precio_unidad, precio_total} = req.body
    const {id_compra} = req.params

    try {
        const updateCompra = {cantidad, precio_unidad, precio_total}
        await pool.query ('UPDATE compras set ? WHERE id = ?', [updateCompra, id_compra])
        const compras = await pool.query ('SELECT * FROM compras WHERE id = ?', [id_compra])

        return res.json ({
            compra: compras[0],
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

router.get ('/api/compras/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && order_by === '0'){
            const compras = await pool.query (`SELECT * FROM compras GROUP BY shop_id ORDER BY fecha_compra ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_compras = await pool.query ('SELECT COUNT (id) FROM compras')
    
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
        }else if (search === '0' && order_by !== '0'){
            const compras = await pool.query (`SELECT * FROM compras GROUP BY shop_id ORDER BY 
                    ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_compras = await pool.query ('SELECT COUNT (id) FROM compras')
    
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
        }else if (search !== '0' && order_by === '0'){
            const compras = await pool.query (`SELECT * FROM compras WHERE (producto LIKE '%${search}%' OR
                descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR sub_categoria
                LIKE '%${search}%' OR unidad LIKE '%${search}%') GROUP BY shop_id ORDER BY fecha_compra ASC 
                LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_compras = await pool.query (`SELECT COUNT (id) FROM compras 
                    WHERE (producto LIKE '%${search}%' OR
                descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR sub_categoria
                LIKE '%${search}%' OR unidad LIKE '%${search}%')`)
    
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
        }else if (search !== '0' && order_by !== '0'){
            const compras = await pool.query (`SELECT * FROM compras WHERE (producto LIKE '%${search}%' OR
                descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR sub_categoria
                LIKE '%${search}%' OR unidad LIKE '%${search}%') GROUP BY shop_id
                ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_compras = await pool.query (`SELECT COUNT (id) FROM compras 
                    WHERE (producto LIKE '%${search}%' OR
                descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR sub_categoria
                LIKE '%${search}%' OR unidad LIKE '%${search}%')`)
    
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

router.get ('/api/delete/producto/compra/:id_carrito/:shop_id', async (req, res) => {
    const {id_carrito, shop_id} = req.params

    try {
        await pool.query ('DELETE FROM compras WHERE id = ?', [id_carrito])
        const compras = await pool.query ('SELECT * FROM compras WHERE shop_id = ?', [shop_id])
        const total_compras = await pool.query ('SELECT COUNT (id) FROM compras WHERE shop_id = ?', [shop_id])

        return res.json ({
            total_compras: total_compras[0][`COUNT (id)`],
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