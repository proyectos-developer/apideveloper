const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/categoria', async (req, res) => {
    const {url_foto, categoria, descripcion} = req.body

    try {
        const newCategoria = {url_foto, categoria, descripcion}
        const new_categoria = await pool.query ('INSERT INTO categorias set ?', newCategoria)
        const categorias = await pool.query ('SELECT * FROM categorias WHERE id = ?', [new_categoria.insertId])

        return res.json ({
            categoria: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categoria: {},
            success: false
        })
    }
})

router.post ('/api/categoria/:id_categoria', async (req, res) => {
    const {url_foto, categoria, descripcion} = req.body
    const {id_categoria} = req.params

    try {
        const updateCategoria = {url_foto, categoria, descripcion}
        await pool.query ('UPDATE categorias set ? WHERE id = ?', [updateCategoria, id_categoria])
        const categorias = await pool.query ('SELECT  * FROM categorias WHERE id = ?', [id_categoria])

        return res.json ({
            categoria: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            categoria: {}
        })
    }
})

router.get ('/api/categorias/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {order_by, order, search, begin, amount} = req.params
    try {
        if (order_by === '0' && search === '0'){
            const categorias = await pool.query (`SELECT * FROM categorias ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_categorias = await pool.query ('SELECT COUNT (id) FROM categorias')

                return res.json ({
                    total_categorias: total_categorias[0][`COUNT (id)`],
                    categorias: categorias,
                    success: true
                })
            }else{
                return res.json ({
                    categorias: categorias,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const categorias = await pool.query (`SELECT * FROM categorias WHERE (categoria LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_categorias = await pool.query (`SELECT COUNT (id) FROM categorias WHERE
                    (categoria LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_categorias: total_categorias[0][`COUNT (id)`],
                    categorias: categorias,
                    success: true
                })
            }else{
                return res.json ({
                    categorias: categorias,
                    success: true
                })
            }
        }else if (order_by !== '0' && search === '0'){
            const categorias = await pool.query (`SELECT * FROM categorias ODER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_categorias = await pool.query (`SELECT COUNT (id) FROM categorias`)

                return res.json ({
                    total_categorias: total_categorias[0][`COUNT (id)`],
                    categorias: categorias,
                    success: true
                })
            }else{
                return res.json ({
                    categorias: categorias,
                    success: true
                })
            }
        }else if (order_by !== '0' && search !== '0'){
            const categorias = await pool.query (`SELECT * FROM categorias WHERE (categoria LIKE '%${search}%' OR
                descripcion LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_categorias = await pool.query (`SELECT COUNT (id) FROM categorias WHERE
                    (categoria LIKE '%${search}%' OR descripcion LIKE '%${search}%')`)

                return res.json ({
                    total_categorias: total_categorias[0][`COUNT (id)`],
                    categorias: categorias,
                    success: true
                })
            }else{
                return res.json ({
                    categorias: categorias,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categorias: [],
            success: true
        })
    }
})

router.get ('/api/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params

    try {
        const categorias = await pool.query ('SELECT * FROM categorias WHERE id = ?', [id_categoria])
        return res.json ({
            categoria: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categoria: {},
            success: true
        })
    }
})

router.get ('/api/delete/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params

    try {
        await pool.query ('DELETE FROM categorias WHERE id = ?', [id_categoria])
        const categorias = await pool.query ('SELECT * FROM categorias ORDER BY categoria ASC LIMIT 0,16')
        const total_categorias = await pool.query ('SELECT COUNT (id) FROM categorias')
        return res.json ({
            total_categorias: total_categorias,
            categorias: categorias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categorias: [],
            success: true
        })
    }
})

module.exports = router