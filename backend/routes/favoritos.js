const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/favorito', async (req, res) => {
    const {id_producto, producto, id_categoria, categoria, id_sub_categoria, sub_categoria,
            id_unidad, unidad, id_servicio, servicio, descripcion, url_foto, usuario_cliente} = req.body
    try {
        const newFavorito = {id_producto, producto, id_categoria, categoria, id_sub_categoria, sub_categoria,
                id_unidad, unidad, id_servicio, servicio, descripcion, url_foto, usuario_cliente}
        const new_favorito = await pool.query (`INSERT INTO productos_favorito set ?`, [newFavorito])
        const favorito = await pool.query ('SELECT * FROM productos_favorito WHERE id = ?', [new_favorito.insertId])

        return res.json ({
            favorito: favorito[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/favoritos/search/:search/tipo/:tipo/:id_tipo/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, tipo, id_tipo, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && tipo === '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito GROUP BY id_producto
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito`)

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search === '0' && tipo === '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito GROUP BY id_producto
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito`)

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search === '0' && tipo !== '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) GROUP BY id_producto
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})`, [id_tipo])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search === '0' && tipo !== '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) GROUP BY id_producto
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})`, [id_tipo])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }
        else if (search !== '0' && tipo === '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`)

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search !== '0' && tipo === '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`)

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search !== '0' && tipo !== '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) 
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                        sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`, [id_tipo])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search !== '0' && tipo !== '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`, [id_tipo])
                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            favoritos: [],
            success: false
        })
    }
})

router.get ('/api/favorito/producto/clientes/:id_producto/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {id_producto, search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito WHERE id_producto = ? 
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                     WHERE id_producto = ?`, [id_producto])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito WHERE id_producto = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                     WHERE id_producto = ?`, [id_producto])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito WHERE id_producto = ? 
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%') AND id_producto = ?`, [id_producto])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const favoritos = await pool.query (`SELECT * FROM productos_favorito WHERE id_producto = ? 
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_favoritos = await pool.query (`SELECT COUNT (id) FROM productos_favorito
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%') AND id_producto = ?`, [id_producto])

                return res.json ({
                    total_favoritos: total_favoritos[0][`COUNT (id)`],
                    favoritos: favoritos,
                    success: true
                })
            }else{
                return res.json ({
                    favoritos: favoritos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/delete/favorito/:id_favorito', async (req, res) => {
    const {id_favorito} = req.params
    
    try {
        await pool.query ('DELETE FROM productos_favorito WHERE id = ?', [id_favorito])
        const favoritos = await pool.query (`SELECT * FROM productos_favorito GROUP BY id_producto 
                ORDER BY created_at ASC LIMIT 0,16`)
        const total_favoritos = await pool.query ('SELECT COUNT (id) FROM productos_favorito')
        
        return res.json ({
            total_favoritos: total_favoritos,
            favoritos: favoritos,
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