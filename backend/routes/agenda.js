const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/reunion', async (req, res) => {
    const {titulo, descripcion, modo, lugar, direccion, hora, id_organizador, nombres, apellidos, url_foto, participantes, fecha_reunion} = req.body

    try {
        const newReunion = {titulo, descripcion, modo, lugar, direccion, hora, id_organizador, nombres, apellidos, url_foto, participantes, fecha_reunion}
        const new_reunion = await pool.query ('INSERT INTO agenda set ?', newReunion)
        const reunion = await pool.query ('SELECT * FROM agenda WHERE id = ?', [new_reunion.insertId])

        return res.json ({
            reunion: reunion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            reunion: {},
            success: false
        })
    }
})

router.post ('/api/reunion/:id_reunion', async (req, res) => {
    const {titulo, descripcion, modo, lugar, direccion, hora, id_organizador, nombres, apellidos, url_foto, participantes, fecha_reunion} = req.body
    const {id_reunion} = req.params

    try {
        const updateReunion = {titulo, descripcion, modo, lugar, direccion, hora, id_organizador, nombres, apellidos, url_foto, participantes, fecha_reunion}
        await pool.query ('UPDATE agenda set ? WHERE id = ?', [updateReunion, id_reunion])
        const reunion = await pool.query ('SELECT  * FROM agenda WHERE id = ?', [id_reunion])

        return res.json ({
            reunion: reunion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            reunion: {}
        })
    }
})

router.post ('/api/lectura/reunion/:id_reunion/:begin/:amount', async (req, res) => {
    const {id_reunion, begin, amount} = req.params
    const {leido} = req.body

    try {
        const updateReunion = {leido}
        await pool.query ('UPDATE agenda set ? WHERE id = ?', [updateReunion, id_reunion])
        const reuniones = await pool.query (`SELECT * FROM agenda ORDER BY created_at DESC LIMIT ${begin},${amount}`)
        if (parseInt(begin) === 0){
            const total_reuniones = await pool.query ('SELECT COUNT (id) FROM agenda')

            return res.json ({
                total_reuniones: total_reuniones[0][`COUNT (id)`],
                reuniones: reuniones,
                success: true
            })
        }
        return res.json ({
            reuniones: reuniones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json({
            error: error,
            reuniones: [],
            success: false
        })
    }
})

router.get ('/api/reuniones/search/:search/fecha/:fecha/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, fecha, order_by, order, begin, amount} = req.params

    try {
        if (fecha === '0' && search === '0' && order_by === '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda ORDER BY fecha_reunion DESC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query ('SELECT COUNT (id) FROM agenda')

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha === '0' && search === '0' && order_by !== '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query ('SELECT COUNT (id) FROM agenda')

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha === '0' && search !== '0' && order_by === '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda 
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                     LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%') 
                    ORDER BY fecha_reunion DESC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query (`SELECT COUNT (id) FROM agenda
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar  
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%')`)

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha === '0' && search !== '0' && order_by !== '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda 
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query (`SELECT COUNT (id) FROM agenda
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%')`)

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }
        else if (fecha !== '0' && search === '0' && order_by === '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda WHERE fecha_reunion = ? ORDER BU cretaed_at DESC 
                    LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query ('SELECT COUNT (id) FROM agenda WHERE fecha_reunion = ?', [fecha])

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha !== '0' && search === '0' && order_by !== '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda WHERE fecha_reunion = ? ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query ('SELECT COUNT (id) FROM agenda WHERE fecha_reunion = ?', [fecha])

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha !== '0' && search !== '0' && order_by === '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda 
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                     LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%') AND fecha_reunion = ?
                    ORDER BY fecha_reunion DESC 
                    LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query (`SELECT COUNT (id) FROM agenda
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar  
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%') AND fecha_reunion = ?`, [fecha])

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }else if (fecha !== '0' && search !== '0' && order_by !== '0'){
            const reuniones = await pool.query (`SELECT * FROM agenda 
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%') AND fecha_reunion = ?
                    ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [fecha])
            if (parseInt(begin) === 0){
                const total_reuniones = await pool.query (`SELECT COUNT (id) FROM agenda
                    WHERE (titulo LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR fecha_reunion LIKE '%${search}% OR lugar 
                    LIKE '%${search}% OR nombres LIKE '%${search}% OR apellidos  LIKE '%${search}%') AND fecha_reunion = ?` ,[fecha])

                return res.json ({
                    total_reuniones: total_reuniones[0][`COUNT (id)`],
                    reuniones: reuniones,
                    success: true
                })
            }
            return res.json ({
                reuniones: reuniones,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            reuniones: [],
            success: true
        })
    }
})

router.get ('/api/reunion/:id_reunion', async (req, res) => {
    const {id_reunion} = req.params

    try {
        const reunion = await pool.query ('SELECT * FROM agenda WHERE id = ?', [id_reunion])
        return res.json ({
            reunion: reunion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            reunion: {},
            success: true
        })
    }
})

router.get ('/api/delete/reunion/:id_reunion', async (req, res) => {
    const {id_reunion} = req.params

    try {
        await pool.query ('DELETE FROM agenda WHERE id = ?', [id_reunion])
        const reuniones = await pool.query (`SELECT * FROM agenda 
                ORDER BY fecha_reunion DESC  LIMIT 0,6`)
        const total_reuniones = await pool.query (`SELECT COUNT (id) FROM agenda`)

        return res.json ({
            total_reuniones: total_reuniones[0][`COUNT (id)`],
            reuniones: reuniones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            reuniones: [],
            success: true
        })
    }
})

module.exports = router