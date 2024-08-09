const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Tipo Proyecto */
router.post ('/api/tipo_proyecto', async (req, res) => {
    const {nombre, descripcion, url_tipo} = req.body

    try {
        const newTipoProyecto = {nombre, descripcion, url_tipo}

        await pool.query ('INSERT INTO tipo_proyecto set ?', [newTipoProyecto])
        const tipo_proyectos = await pool.query('SELECT * FROM tipo_proyecto ORDER BY nombre ASC')

        return res.json ({
            tipo_proyectos: tipo_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_proyectos: [],
            success: false
        })
        
    }
})

router.post ('/api/tipo_proyecto/:id_tipo', async (req, res) => {
    const {nombre, descripcion, url_tipo} = req.body
    const {id_tipo} = req.params

    try {
        const updateTipoProyecto = {nombre, descripcion, url_tipo}

        await pool.query ('UPDATE tipo_proyecto set ? WHERE id = ?', [updateTipoProyecto, id_tipo])
        const tipo_proyectos = await pool.query('SELECT * FROM tipo_proyecto ORDER BY nombre ASC')

        return res.json ({
            tipo_proyectos: tipo_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_proyectos: [],
            success: false
        })
        
    }
})

router.get ('/api/tipo_proyectos', async (req, res) => {
    try {
        const tipo_proyectos = await pool.query ('SELECT * FROM tipo_proyecto ORDER BY nombre ASC')
        return res.json({
            tipo_proyectos: tipo_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_proyectos: [],
            success: false
        })
    }
})

router.get ('/api/tipo_proyecto/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params
    try {
        const tipo_proyecto = await pool.query ('SELECT * FROM tipo_proyecto WHERE id = ?', [id_tipo])
        return res.json({
            tipo_proyecto: tipo_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/delete/tipo_proyecto/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params
    try {
        await pool.query ('DELETE FROM tipo_proyecto WHERE id = ?', [id_tipo])
        const tipo_proyectos = await pool.query ('SELECT * FROM tipo_proyecto ORDER BY nombre ASC')
        return res.json({
            tipo_proyectos: tipo_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_proyecto: [],
            success: false
        })
    }
})

/**Nuevo proyecto */
router.post ('/api/proyecto', async (req, res) => {
    const {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido} = req.body

    try {
        const newProyecto = {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido}

        await pool.query ('INSERT INTO proyectos set ?', [newProyecto])
        const proyectos = await pool.query('SELECT * FROM proyectos ORDER BY id ASC')

        return res.json ({
            proyectos: proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            proyectos: [],
            success: false
        })
        
    }
})

router.post ('/api/proyecto/:id_proyecto', async (req, res) => {
    const {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido} = req.body
    const {id_proyecto} = req.params

    try {
        const updateProyecto = {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido}

        await pool.query ('UPDATE proyectos set ? WHERE id = ?', [updateProyecto, id_proyecto])
        const proyectos = await pool.query('SELECT * FROM proyectos ORDER BY id ASC')

        return res.json ({
            proyectos: proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            proyectos: [],
            success: false
        })
        
    }
}) 

router.get ('/api/proyectos/search/:search/tipo/:id_tipo', async (req, res) => {
    const {search, id_tipo} = req.params

    try {
        if (search === '0' && id_tipo === '0'){
            const proyectos = await pool.query ('SELECT * FROM proyectos ORDER BY id ASC')
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search === '0' && id_tipo !== '0'){
            const proyectos = await pool.query ('SELECT * FROM proyectos WHERE tipo_proyecto = ?', [id_tipo])
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search !== '0' && id_tipo === '0'){
            const proyectos = await pool.query (`SELECT * FROM proyectos WHERE tipo_proyecto LIKE '%${search}%' OR nombre_proyecto LIKE '%${search}%' OR
                        descripcion LIKE '%${search}%'`)
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search !== '0' && id_tipo !== '0'){
            const proyectos = await pool.query (`SELECT * FROM proyectos WHERE (tipo_proyecto LIKE '%${search}%' OR nombre_proyecto LIKE '%${search}%' OR
                        descripcion LIKE '%${search}%') AND tipo_proyecto = ?`, [id_tipo])
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            proyectos: proyectos,
            success: false
        })
    }
})

router.get ('/api/proyectos/tipo_proyectos/clientes', async (req, res) => {
    try {
        const proyectos = await pool.query ('SELECT * FROM proyectos ORDER BY nombre_proyecto ASC')
        const tipo_proyectos = await pool.query ('SELECT * FROM tipo_proyecto ORDER BY nombre ASC')
        const negocios = await pool.query ('SELECT * FROM negocio_empresa ORDER BY nombre_negocio ASC')

        return res.json ({
            proyectos: proyectos,
            tipo_proyectos: tipo_proyectos,
            negocios: negocios,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            proyectos: [],
            tipo_proyectos: [],
            negocios: [],
            success: false
        })
    }
})

router.get ('/api/proyecto/:id_proyecto', async (req, res) => {
    const {id_proyecto} = req.params
    try {
        const proyectos = await pool.query ('SELECT * FROM proyectos WHERE id = ?', [id_proyecto])
        return res.json({
            proyecto: proyectos [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            proyecto: {},
            success: false
        })
    }
})

router.get ('/api/delete/proyecto/:id_proyecto', async (req, res) => {
    const {id_proyecto} = req.params
    try {
        await pool.query ('DELETE FROM proyectos WHERE id = ?', [id_proyecto])
        const proyectos = await pool.query ('SELECT * FROM proyectos ORDER BY nombre_proyecto ASC')
        return res.json({
            proyectos: proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            proyectos: [],
            success: false
        })
    }
})

module.exports = router