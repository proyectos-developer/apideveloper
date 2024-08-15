const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/noticia', async (req, res) => {
    const {id_categoria_noticia, categoria_noticia, fecha, usuario, titulo, noticia, habilitar_comentarios} = req.body

    try {
        const newNoticia = {id_categoria_noticia, categoria_noticia, fecha, usuario, titulo, noticia, habilitar_comentarios}
        await pool.query ('INSERT INTO noticias set ?', [newNoticia])
        const noticias = await pool.query ('SELECT * FROM noticias ORDER BY created_at ASC')

        return res.json ({
            noticias: noticias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            noticias: []
        })
    }
})

router.post ('/api/noticia/:id_noticia', async (req, res) => {
    const {id_categoria_noticia, categoria_noticia, fecha, usuario, titulo, noticia, habilitar_comentarios} = req.body
    const {id_noticia} = req.params

    try {
        const updateNoticia = {id_categoria_noticia, categoria_noticia, fecha, usuario, titulo, noticia, habilitar_comentarios}
        await pool.query ('UPDATE noticias set ? WHERE id = ?', [updateNoticia, id_noticia])
        const noticias = await pool.query ('SELECT * FROM noticias WHERE id = ?', [id_noticia])

        return res.json ({
            noticias: noticias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            noticias: []
        })
    }
})

router.post ('/api/noticia/habilitar/:id_noticia', async (req, res) => {
    const {id_noticia} = req.params
    const {habilitar_comentarios} = req.body
    try {
        const updateNoticia = {habilitar_comentarios}
        await pool.query (`UPDATE noticias set ? WHERE id = ?`, [updateNoticia, id_noticia])
        const noticia = await pool.query ('SELECT * FROM noticias WHERE id = ?', [id_noticia])
        return res.json ({
            noticia: noticia,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            noticia: {},
            success: false
        })
    }
})

router.get ('/api/noticias/categoria/:id_categoria/search/:search/:begin/:amount', async (req, res) => {
    const {id_categoria, search, begin, amount} = req.params
    try {
        if (id_categoria === '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query ('SELECT COUNT (id) FROM noticias')

                return res.json ({
                    total_noticias: total_noticias[0][`COUNT (id)`],
                    noticias: noticias,
                    success: true
                })
            }else{
                return res.json ({
                    noticias: noticias,
                    success: true
                })
            }
        }else if (id_categoria === '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%'`)
                return res.json ({
                    total_noticias: total_noticias[0][`COUNT (id)`],
                    noticias: noticias,
                    success: true
                })
            }else{
                return res.json ({
                    noticias: noticias,
                    success: true
                })
            }
        }else if (id_categoria !== '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE id_categoria_noticia = ? 
                    LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                        WHERE id_categoria_noticia = ?`, [id_categoria])

                return res.json ({
                    total_noticias: total_noticias[0][`COUNT (id)`],
                    noticias: noticias,
                    success: true
                })
            }else{
                return res.json ({
                    noticias: noticias,
                    success: true
                })
            }
        }else if (id_categoria !== '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ?`, [id_categoria])
                return res.json ({
                    total_noticias: total_noticias[0][`COUNT (id)`],
                    noticias: noticias,
                    success: true
                })
            }else{
                return res.json ({
                    noticias: noticias,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            noticias: [],
            success: false
        })
    }
})

router.get ('/api/noticia/:id_noticia', async (req, res) => {
    const {id_noticia} = req.params

    try {
        const noticias = await pool.query ('SELECT * FROM noticias WHERE id = ?', [id_noticia])
        return res.json ({
            noticia: noticias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            noticia: {},
            success: false
        })
    }
})

router.get ('/api/delete/noticia/:id_noticia', async (req, res) => {
    const {id_noticia} = req.params

    try {
        await pool.query ('DELETE FROM noticias WHERE id = ?', [id_noticia])
        const noticias = await pool.query ('SELECT * FROM noticias LIMIT 0,16')
        return res.json ({
            noticias: noticias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            noticias: [],
            success: true
        })
    }
})

module.exports = router