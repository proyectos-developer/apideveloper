const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/producto', async (req, res) => {
    const {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
        caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
        caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
        url_foto_uno, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
        precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku} = req.body

    try {
        const newProducto = {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
            url_foto_uno, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
            precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku}
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
        url_foto_uno, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
        precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku} = req.body
    const {id_producto} = req.params

    try {
        const updateProducto = {producto, descripcion, categoria, id_categoria, subcategoria, id_subcategoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, url_foto_principal, 
            url_foto_uno, url_foto_dos, url_foto_tres, url_foto_cuatro, url_foto_cinco,
            precio, oferta, precio_mensual, precio_anual, comentarios, codigo_sku}
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

router.get ('/api/productos/search/:search/categoria/:id_categoria/precio/:minimo/:maximo/orderby/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_categoria, order_by, order, begin, amount, minimo, maximo} = req.params
    try {
        if (minimo === '0' && search === '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
                        productos.url_foto_principal, productos.url_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
                        productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
                        productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
                        productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
                        productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria ORDER BY productos.created_at LIMIT ${begin},${amount}`)
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
        }else if (minimo === '0' && search === '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria ORDER BY ${order_by} ${order}  LIMIT ${begin},${amount}`)
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
        }else if (minimo === '0' && search === '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE productos.id_categoria = ? ORDER BY productos.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM productos WHERE id_categoria = ?', [id_categoria])

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
        }else if (minimo === '0' && search === '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE productos.id_categoria = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM productos WHERE id_categoria = ?', [id_categoria])

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
        }else if (minimo === '0' && search !== '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
                LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
                LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
                LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) ORDER BY productos.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
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
        }else if (minimo === '0' && search !== '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
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
        }else if (minimo === '0' && search !== '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND productos.id_categoria = ? ORDER BY productos.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ?`, [id_categoria])

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
        }else if (minimo === '0' && search !== '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND productos.id_categoria = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ?`, [id_categoria])

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
        }else if (minimo !== '0' && search === '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY productos.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (precio > ${minimo} AND precio < ${maximo})`)

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
        }else if (minimo !== '0' && search === '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY ${order_by} ${order}  LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (precio > ${minimo} AND precio < ${maximo})`)

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
        }else if (minimo !== '0' && search === '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo}) ORDER BY productos.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE productos.id_categoria = ? AND (productos.precio > ${minimo} AND productos.precio < ${maximo})`, [id_categoria])

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
        }else if (minimo !== '0' && search === '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE productos.id_categoria = ? AND (productos.precio > ${minimo} AND productos.precio < ${maximo})ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

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
        }else if (minimo !== '0' && search !== '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY productos.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${minimo} AND precio < ${maximo})`)

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
        }else if (minimo !== '0' && search !== '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${minimo} AND precio < ${maximo})`)

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
        }else if (minimo !== '0' && search !== '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND productos.id_categoria = ? AND (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY productos.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

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
        }else if (minimo !== '0' && search !== '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
            productos.url_foto_principal, l_foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
            productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
            productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
            productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku, 
            productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE (productos.producto LIKE '%${search}%' OR productos.descripcion LIKE '%${search}%' OR productos.categoria 
            LIKE '%${search}%' OR productos.caracteristica_1 LIKE '%${search}%' OR productos.caracteristica_2 LIKE '%${search}%' OR productos.caracteristica_3 LIKE '%${search}%' OR productos.caracteristica_4 
            LIKE '%${search}%' OR productos.caracteristica_5 LIKE '%${search}%' OR productos.caracteristica_6 LIKE '%${search}%' OR productos.caracteristica_7 LIKE '%${search}%' OR productos.caracteristica_8
            LIKE '%${search}%' OR productos.caracteristica_9 LIKE '%${search}%' OR productos.caracteristica_10) AND productos.id_categoria = ? AND (productos.precio > ${minimo} AND productos.precio < ${maximo}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM productos WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

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
        const productos = await pool.query (`SELECT productos.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, productos.producto,
        productos.url_foto_principal, productos.foto_uno, productos.url_foto_dos, productos.url_foto_tres, productos.url_foto_cuatro, productos.url_foto_cinco, 
        productos.descripcion as descripcion_producto, productos.caracteristica_1, productos.caracteristica_2, productos.caracteristica_3,
        productos.caracteristica_4, productos.caracteristica_5, productos.caracteristica_6, productos.caracteristica_7, productos.caracteristica_8,
        productos.caracteristica_9, productos.caracteristica_10, productos.precio, productos.oferta, productos.servicio, productos.codigo_sku,
        productos.comentarios, productos.id FROM productos JOIN categorias ON categorias.id = productos.id_categoria WHERE productos.id = ?`, [id_producto])

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
        const productos = await pool.query ('SELECT * FROM productos ORDER BY producto ASC, descripcion DESC')
        return res.json ({
            producto: productos,
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

module.exports = router