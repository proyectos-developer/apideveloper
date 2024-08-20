const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/producto', async (req, res) => {
    const {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
        caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
        caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
        url_foto_uno, id_unidad, unidad, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
        precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku, habilitar_producto, stock} = req.body

    try {
        const newProducto = {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
            url_foto_uno, id_unidad, unidad, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
            precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku, habilitar_producto, stock}
        const nuevo = await pool.query ('INSERT INTO productos set ?', [newProducto])
        const productos = await pool.query ('SELECT * FROM productos WHERE id = ?', [nuevo.insertId])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.post ('/api/producto/:id_producto', async (req, res) => {
    const {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
        caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
        caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
        url_foto_uno, id_unidad, unidad, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
        precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku, habilitar_producto, stock} = req.body
    const {id_producto} = req.params

    try {
        const updateProducto = {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
            url_foto_uno, id_unidad, unidad, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
            precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku, habilitar_producto, stock}
        await pool.query ('UPDATE productos set ? WHERE id = ?', [updateProducto, id_producto])
        const productos = await pool.query ('SELECT * FROM productos WHERE id = ?', [id_producto])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.post ('/api/producto/habilitar/:id_producto', async (req, res) => {
    const {id_producto} = req.params
    const {habilitar_producto} = req.body
    try {
        const updateProducto = {habilitar_producto}
        await pool.query (`UPDATE productos set ? WHERE id = ?`, [updateProducto, id_producto])
        const productos = await pool.query ('SELECT * FROM productos ORDER BY producto ASC LIMIT 0,16')
        const total_productos = await pool.query ('SELECT COUNT (id) FROM productos')

        return res.json ({
            total_productos: total_productos,
            productos: productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            producto: {},
            success: false
        })
    }
})

router.get ('/api/productos/search/:search/tipo/:tipo/:id_tipo/precio/:minimo/:maximo/orderby/:order_by/:order/:begin/:amount', async (req, res) => {
    const {tipo, id_tipo, search, order_by, order, begin, amount, minimo, maximo} = req.params
    try {
        if (tipo === '0' && minimo === '0' && search === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM productos')

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo === '0' && search === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM productos')

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo === '0' && search !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10)`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo === '0' && search !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10)`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo !== '0' && search === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) 
                    ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo !== '0' && search === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo !== '0' && search !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo === '0' && minimo !== '0' && search !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }
        else if (tipo !== '0' && minimo === '0' && search === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos 
                WHERE (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE
                    (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo === '0' && search === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE 
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE
                    (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo === '0' && search !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo === '0' && search !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND 
            (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
            ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo !== '0' && search === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) 
                    AND (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '}) ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE 
                    (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) AND
                    (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo !== '0' && search === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) AND 
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})
                    AND (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo !== '0' && search !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) AND
            (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                    ORDER BY producto ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)})
                AND (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (tipo !== '0' && minimo !== '0' && search !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
            LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
            caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
            LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
            LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) AND 
            (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR subcategoria LIKE '%${search}%' OR unidad LIKE '%${search}%' OR
                caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${parseDouble(minimo)} AND precio < ${parseDouble(maximo)}) AND
                (${tipo === 'categoria' ? 'id_categoria = ? ' : tipo === 'sub_categoria' ?
                    'id_subcategoria = ? ' : 'id_unidad = ? '})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            productos: []
        })
    }
})

router.get ('/api/producto/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        const productos = await pool.query (`SELECT * FROM productos WHERE id = ?`, [id_producto])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.get ('/api/delete/producto/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        await pool.query ('DELETE FROM productos WHERE id = ?', [id_producto])
        const productos = await pool.query ('SELECT * FROM productos ORDER BY producto ASC LIMIT 0,16')
        const total_productos = await pool.query ('SELECT COUNT (id) FROM productos')
        
        return res.json ({
            total_productos: total_productos,
            productos: productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            productos: [],
            success: false
        })
    }
})

router.get ('/api/producto/categorias/unidades/servicios', async (req, res) => {
    try {
        const categorias = await pool.query ('SELECT * FROM categorias ORDER BY categoria ASC')
        const servicios = await pool.query ('SELECT * FROM servicios ORDER BY servicio ASC')
        const unidades = await pool.query ('SELECT * FROM unidades ORDER BY unidad ASC')
        return res.json ({
            categorias: categorias,
            servicios: servicios,
            unidades: unidades,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categorias: [],
            servicios: [],
            unidades: [],
            success: false
        })
    }
})

module.exports = router