const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/favorito', async (req, res) => {
    const {id_producto, usuario_cliente} = req.body
    try {
        const newFavorito = {id_producto, usuario_cliente}
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

router.get ('/api/favoritos/:begin/:amount', async (req, res) => {
    const {begin, amount} = req.params
    try {
        const favoritos = await pool.query (`SELECT * FROM productos_favorito JOIN info_clientes ON productos_favorito.usuario_cliente = info_clientes.usuario ORDER BY created_at ASC LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_favoritos = await pool.query ('SELECT COUNT (id) FROM productos_favorito JOIN productos_favorito.usuario_cliente = info_clientes.usuario')

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
    } catch (error) {
        console.log (error)
        return res.json ({
            favoritos: [],
            success: false
        })
    }
})

router.get ('/api/favorito/producto/clientes/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        const favoritos = await pool.query (`SELECT * FROM productos_favorito WHERE id_producto = ? ORDER BY created_at ASC`, [id_producto])
        return res.json ({
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

router.get ('/api/delete/favorito/:id_favorito', async (req, res) => {
    const {id_favorito} = req.params
    
    try {
        await pool.query ('SELECT * FROM productos_favorito WHERE id = ?', [id_favorito])
        return res.json ({
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