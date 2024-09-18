const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/departamento', async (req, res) => {
    const {departamento, descripcion, equipo, id_jefe, jefe} = req.body

    try {
        const new_departamento = {departamento, descripcion, equipo, id_jefe, jefe}
        const nueva = await pool.query ('INSERT INTO departamentos set ?', [new_departamento])
        const area = await pool.query ('SELECT * FROM departamentos WHERE id = ?', [nueva.insertId])

        return res.json ({
            departamento: area[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            departamento: {},
            success: false
        })
    }
})

router.post ('/api/departamento/:id_departamento', async (req, res) => {
    const {departamento, descripcion, equipo, id_jefe, jefe} = req.body
    const {id_departamento} = req.params

    try {
        const updateDepartamento = {departamento, descripcion, equipo, id_jefe, jefe}
        await pool.query ('UPDATE departamentos set ? WHERE id = ?', [updateDepartamento, id_departamento])
        const area = await pool.query ('SELECT  * FROM departamentos WHERE id = ?', [id_departamento])

        return res.json ({
            departamento: area[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            departamento: {}
        })
    }
})

router.get ('/api/departamentos/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const departamentos = await pool.query (`SELECT * FROM departamentos ORDER BY departamento ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_departamentos = await pool.query ('SELECT COUNT (id) FROM departamentos')

                return res.json ({
                    total_departamentos: total_departamentos[0][`COUNT (id)`],
                    departamentos: departamentos,
                    success: true
                })
            }
            return res.json ({
                departamentos: departamentos,
                success: true
            })
        }else if (search === '0' && order_by !== '0'){
            const departamentos = await pool.query (`SELECT * FROM departamentos ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_departamentos = await pool.query ('SELECT COUNT (id) FROM departamentos')

                return res.json ({
                    total_departamentos: total_departamentos[0][`COUNT (id)`],
                    departamentos: departamentos,
                    success: true
                })
            }
            return res.json ({
                departamentos: departamentos,
                success: true
            })
        }else if (search !== '0' && order_by === '0'){
            const departamentos = await pool.query (`SELECT * FROM departamentos 
                    WHERE (departamento LIKE '%${search}%' OR descripcion LIKE '%${search}%'
                    OR jefe LIKE '%${search}%') 
                    ORDER BY departamento ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_departamentos = await pool.query (`SELECT COUNT (id) FROM departamentos
                    WHERE (departamento LIKE '%${search}%' OR descripcion LIKE '%${search}%'
                    OR jefe LIKE '%${search}%')`)
                return res.json ({
                    total_departamentos: total_departamentos[0][`COUNT (id)`],
                    departamentos: departamentos,
                    success: true
                })
            }
            return res.json ({
                departamentos: departamentos,
                success: true
            })
        }else if (search !== '0' && order_by !== '0'){
            const departamentos = await pool.query (`SELECT * FROM departamentos 
                    WHERE (departamento LIKE '%${search}%' OR descripcion LIKE '%${search}%'
                    OR jefe LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_departamentos = await pool.query (`SELECT COUNT (id) FROM departamentos
                    WHERE (departamento LIKE '%${search}%' OR descripcion LIKE '%${search}%'
                    OR jefe LIKE '%${search}%')`)
                return res.json ({
                    total_departamentos: total_departamentos[0][`COUNT (id)`],
                    departamentos: departamentos,
                    success: true
                })
            }
            return res.json ({
                departamentos: departamentos,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            departamentos: [],
            success: true
        })
    }
})

router.get ('/api/departamento/:id_departamento', async (req, res) => {
    const {id_departamento} = req.params

    try {
        const departamentos = await pool.query ('SELECT * FROM departamentos WHERE id = ?', [id_departamento])
        return res.json ({
            departamento: departamentos[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            departamento: {},
            success: true
        })
    }
})

router.get ('/api/delete/departamento/:id_departamento', async (req, res) => {
    const {id_departamento} = req.params

    try {
        await pool.query ('DELETE FROM departamentos WHERE id = ?', [id_departamento])
        const departamentos = await pool.query (`SELECT * FROM departamentos 
                ORDER BY departamento ASC  LIMIT 0,16`)
        const total_departamentos = await pool.query (`SELECT COUNT (id) FROM departamentos`)

        return res.json ({
            total_departamentos: total_departamentos[0][`COUNT (id)`],
            departamentos: departamentos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            departamentos: [],
            success: true
        })
    }
})

module.exports = router