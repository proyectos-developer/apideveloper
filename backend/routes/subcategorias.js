const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/subcategoria', async (req, res) => {
    const {id_categoria, categoria, sub_categoria, descripcion} = req.body

    try {
        const newSubCategoria = {id_categoria, categoria, sub_categoria, descripcion}
        const new_subcategoria = await pool.query ('INSERT INTO sub_categorias set ?', newSubCategoria)
        const sub_categorias = await pool.query ('SELECT * FROM sub_categorias WHERE id = ?', [new_subcategoria.insertId])

        return res.json ({
            sub_categoria: sub_categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            sub_categoria: {},
            success: false
        })
    }
})

router.post ('/api/subcategoria/:id_subcategoria', async (req, res) => {
    const {id_categoria, categoria, sub_categoria, descripcion} = req.body
    const {id_subcategoria} = req.params

    try {
        const updateSubCategoria = {id_categoria, categoria, sub_categoria, descripcion}
        await pool.query ('UPDATE sub_categorias set ? WHERE id = ?', [updateSubCategoria, id_subcategoria])
        const sub_categorias = await pool.query ('SELECT  * FROM sub_categorias WHERE id = ?', [id_subcategoria])

        return res.json ({
            sub_categoria: sub_categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            sub_categoria: {}
        })
    }
})

router.get ('/api/subcategorias/search/:search/categoria/:id_categoria/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_categoria, order_by, order, begin, amount} = req.params
    try {
        if (id_categoria === '0' && order_by === '0' && search === '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query ('SELECT COUNT (id) FROM sub_categorias')

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria === '0' && order_by === '0' && search !== '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE 
                    (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                    WHERE (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%')`)

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria === '0' && order_by !== '0' && search === '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query ('SELECT COUNT (id) FROM sub_categorias')

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria === '0' && order_by !== '0' && search !== '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE 
                    (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                    WHERE (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%')`)

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }
        else if (id_categoria !== '0' && order_by === '0' && search === '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias 
                    WHERE id_categoria = ? ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                        WHERE id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria !== '0' && order_by === '0' && search !== '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE 
                    (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') AND id_categoria = ? ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                    WHERE (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') AND id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria !== '0' && order_by !== '0' && search === '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE id_categoria = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                        WHERE id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }else if (id_categoria !== '0' && order_by !== '0' && search !== '0'){
            const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE 
                    (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') AND id_categoria = ? ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_sub_categorias = await pool.query (`SELECT COUNT (id) FROM sub_categorias
                    WHERE (categoria LIKE '%${search}%' OR sub_categoria categoria LIKE '%${search}%' OR
                    descripcion categoria LIKE '%${search}%') AND id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_sub_categorias: total_sub_categorias[0][`COUNT (id)`],
                    sub_categorias: sub_categorias,
                    success: true
                })
            }else{
                return res.json ({
                    sub_categorias: sub_categorias,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            sub_categorias: [],
            success: true
        })
    }
})

router.get ('/api/subcategorias/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params
    try {
        const sub_categorias = await pool.query (`SELECT * FROM sub_categorias WHERE id_categoria = ? 
            ORDER BY sub_categoria ASC`, [id_categoria])
        return res.json ({
            sub_categorias: sub_categorias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            sub_categorias: [],
            success: true
        })
    }
})

router.get ('/api/subcategoria/:id_subcategoria', async (req, res) => {
    const {id_subcategoria} = req.params

    try {
        const sub_categorias = await pool.query ('SELECT * FROM sub_categorias WHERE id = ?', [id_subcategoria])
        return res.json ({
            sub_categoria: sub_categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            sub_categoria: {},
            success: true
        })
    }
})

router.get ('/api/delete/subcategoria/:id_subcategoria', async (req, res) => {
    const {id_subcategoria} = req.params

    try {
        await pool.query ('DELETE FROM sub_categorias WHERE id = ?', [id_subcategoria])
        const sub_categorias = await pool.query ('SELECT * FROM sub_categorias ORDER BY sub_categoria ASC LIMIT 0,16')
        const total_sub_categorias = await pool.query ('SELECT COUNT (id) FROM sub_categorias')
        return res.json ({
            total_sub_categorias: total_sub_categorias,
            sub_categorias: sub_categorias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            sub_categorias: [],
            success: true
        })
    }
})

module.exports = router