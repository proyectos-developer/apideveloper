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

router.get ('/api/subcategorias', async (req, res) => {
    try {
        const sub_categorias = await pool.query ('SELECT * FROM sub_categorias ORDER BY sub_categoria ASC')
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
        const sub_categorias = await pool.query ('SELECT * FROM sub_categorias ORDER BY sub_categoria ASC')
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

module.exports = router