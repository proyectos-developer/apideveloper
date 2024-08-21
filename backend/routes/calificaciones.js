const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/calificacion', async (req, res) => {
    const {id_producto, descripcion, url_foto, id_categoria, categoria, id_sub_categoria, sub_categoria, 
            id_unidad, unidad, id_servicio, servicio, producto, usuario_cliente, calificacion_producto, comentario_producto} = req.body
    try {
        const newCalificacion = {id_producto, descripcion, url_foto, id_categoria, categoria, id_sub_categoria, sub_categoria, 
                id_unidad, unidad, id_servicio, servicio, producto, usuario_cliente, calificacion_producto, comentario_producto}
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

router.get ('/api/calificaciones/search/:search/tipo/:tipo/:id_tipo/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, tipo, id_tipo, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && tipo === '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones GROUP BY id_producto
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones`)

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search === '0' && tipo === '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones GROUP BY id_producto
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones`)

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search === '0' && tipo !== '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) GROUP BY id_producto
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})`, [id_tipo])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search === '0' && tipo !== '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) GROUP BY id_producto
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})`, [id_tipo])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }
        else if (search !== '0' && tipo === '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' GROUP`)

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search !== '0' && tipo === '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`)

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search !== '0' && tipo !== '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'}) 
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                        sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`, [id_tipo])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search !== '0' && tipo !== '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones 
                    WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')
                    GROUP BY id_producto ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_tipo])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                        WHERE (${tipo === 'categoria' ? 'id_categoria = ?' : tipo === 'sub_categoria' ? 'id_sub_categoria = ?' :
                        tipo === 'unidad' ? 'id_unidad = ?' : 'id_servicio = ?'})
                        AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria LIKE '%${search}%' OR
                    sub_cagegoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR servicio LIKE '%${search}%')`, [id_tipo])
                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
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

router.get ('/api/calificaciones/producto/clientes/:id_producto/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {id_producto, search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones WHERE id_producto = ? 
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                     WHERE id_producto = ?`, [id_producto])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones WHERE id_producto = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                     WHERE id_producto = ?`, [id_producto])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones WHERE id_producto = ? 
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%') AND id_producto = ?`, [id_producto])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones WHERE id_producto = ? 
                    AND (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_producto])
            if (parseInt(begin) === 0){
                const total_calificaciones = await pool.query (`SELECT COUNT (id) FROM productos_calificaciones
                    WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR
                    categoria LIKE '%${search}%' OR sub_categoria LIKE '%${search}%' OR
                    unidad LIKE '%${search}%' OR servicio LIKE '%${search}%' OR 
                    descripcion LIKE '%${search}%') AND id_producto = ?`, [id_producto])

                return res.json ({
                    total_calificaciones: total_calificaciones[0][`COUNT (id)`],
                    calificaciones: calificaciones,
                    success: true
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
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

router.get ('/api/delete/calificacion/:id_calificacion', async (req, res) => {
    const {id_calificacion} = req.params
    
    try {
        await pool.query ('DELETE FROM productos_calificaciones WHERE id = ?', [id_calificacion])
        const calificaciones = await pool.query (`SELECT * FROM productos_calificaciones GROUP BY id_producto 
                ORDER BY created_at ASC LIMIT 0,16`)
        const total_calificaciones = await pool.query ('SELECT COUNT (id) FROM productos_calificaciones')
        
        return res.json ({
            total_calificaciones: total_calificaciones,
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

module.exports = router