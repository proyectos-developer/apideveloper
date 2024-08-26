const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/noticia', async (req, res) => {
    const {id_categoria_noticia, categoria_noticia, url_foto, fecha, usuario, titulo, noticia_parrafo_1,
        noticia_parrafo_2, noticia_parrafo_3, noticia_parrafo_4, noticia_parrafo_5, noticia_parrafo_6,
        noticia_parrafo_7, noticia_parrafo_8, noticia_parrafo_9, noticia_parrafo_10, habilitar_comentarios} = req.body

    try {
        const newNoticia = {id_categoria_noticia, categoria_noticia, url_foto, fecha, usuario, titulo, noticia_parrafo_1,
            noticia_parrafo_2, noticia_parrafo_3, noticia_parrafo_4, noticia_parrafo_5, noticia_parrafo_6,
            noticia_parrafo_7, noticia_parrafo_8, noticia_parrafo_9, noticia_parrafo_10, habilitar_comentarios}
        const new_noticia = await pool.query ('INSERT INTO noticias set ?', [newNoticia])
        const noticias = await pool.query ('SELECT * FROM noticias WHERE id = ?', [new_noticia.insertId])

        return res.json ({
            noticia: noticias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            noticia: {}
        })
    }
})

router.post ('/api/noticia/:id_noticia', async (req, res) => {
    const {id_categoria_noticia, categoria_noticia, url_foto, fecha, usuario, titulo, noticia_parrafo_1,
        noticia_parrafo_2, noticia_parrafo_3, noticia_parrafo_4, noticia_parrafo_5, noticia_parrafo_6,
        noticia_parrafo_7, noticia_parrafo_8, noticia_parrafo_9, noticia_parrafo_10, habilitar_comentarios} = req.body
    const {id_noticia} = req.params

    try {
        const updateNoticia = {id_categoria_noticia, categoria_noticia, url_foto, fecha, usuario, titulo, noticia_parrafo_1,
            noticia_parrafo_2, noticia_parrafo_3, noticia_parrafo_4, noticia_parrafo_5, noticia_parrafo_6,
            noticia_parrafo_7, noticia_parrafo_8, noticia_parrafo_9, noticia_parrafo_10, habilitar_comentarios}
        await pool.query ('UPDATE noticias set ? WHERE id = ?', [updateNoticia, id_noticia])
        const noticias = await pool.query ('SELECT * FROM noticias WHERE id = ?', [id_noticia])

        return res.json ({
            noticia: noticia[0],
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
        const noticias = await pool.query ('SELECT * FROM noticias ORDER BY fecha DESC')
        return res.json ({
            noticia: noticias,
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

router.get ('/api/noticias/categoria/:id_categoria/fecha/:fecha/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {fecha, id_categoria, search, order_by, order, begin, amount} = req.params
    try {
        if (order_by === '0' && fecha === '0' && id_categoria === '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias ORDER BY fecha ASC LIMIT ${begin},${amount}`)
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
        }else if (order_by === '0' && fecha === '0' && id_categoria === '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%' 
                    ORDER BY fecha ASC LIMIT ${begin},${amount}`)
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
        }else if (order_by === '0' && fecha === '0' && id_categoria !== '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE id_categoria_noticia = ? 
                    ORDER BY fecha ASC LIMIT ${begin},${amount}`, [id_categoria])
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
        }else if (order_by === '0' && fecha === '0' && id_categoria !== '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? ORDER BY fecha ASC LIMIT ${begin},${amount}`, [id_categoria])
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
        else if (order_by === '0' && fecha !== '0' && id_categoria === '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE fecha = ? LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query ('SELECT COUNT (id) FROM noticias WHERE fecha = ?', [fecha])

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
        }else if (order_by === '0' && fecha !== '0' && id_categoria === '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND fecha = ? LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%') AND
                    fecha = ?`, [fecha])
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
        }else if (order_by === '0' && fecha !== '0' && id_categoria !== '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE id_categoria_noticia = ? 
                    AND fecha = ?
                    LIMIT ${begin},${amount}`, [id_categoria, fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                        WHERE id_categoria_noticia = ? AND fecha = ?`, [id_categoria, fecha])

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
        }else if (order_by === '0' && fecha !== '0' && id_categoria !== '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? AND fecha = ? LIMIT ${begin},${amount}`, [id_categoria, fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? AND fecha = ?`, [id_categoria, fecha])
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
        else if (order_by !== '0' && fecha === '0' && id_categoria === '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
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
        }else if (order_by !== '0' && fecha === '0' && id_categoria === '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias (WHERE titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
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
        }else if (order_by !== '0' && fecha === '0' && id_categoria !== '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE id_categoria_noticia = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
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
        }else if (order_by !== '0' && fecha === '0' && id_categoria !== '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
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
        else if (order_by !== '0' && fecha !== '0' && id_categoria === '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE fecha = ? 
                ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query ('SELECT COUNT (id) FROM noticias WHERE fecha = ?', [fecha])

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
        }else if (order_by !== '0' && fecha !== '0' && id_categoria === '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND fecha = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%') AND
                    fecha = ?`, [fecha])
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
        }else if (order_by !== '0' && fecha !== '0' && id_categoria !== '0' && search === '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE id_categoria_noticia = ? 
                    AND fecha = ? ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [id_categoria, fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                        WHERE id_categoria_noticia = ? AND fecha = ?`, [id_categoria, fecha])

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
        }else if (order_by !== '0' && fecha !== '0' && id_categoria !== '0' && search !== '0'){
            const noticias = await pool.query (`SELECT * FROM noticias WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? AND fecha = ? ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [id_categoria, fecha])
            if (parseInt(begin) === 0){
                const total_noticias = await pool.query (`SELECT COUNT (id) FROM noticias 
                    WHERE (titulo LIKE '%${search}%'
                    OR categoria_noticia LIKE '%${search}%' OR noticia LIKE '%${search}%')
                    AND id_categoria_noticia = ? AND fecha = ?`, [id_categoria, fecha])
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