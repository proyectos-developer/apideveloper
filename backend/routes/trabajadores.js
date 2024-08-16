const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/trabajador', async (req, res) => {
    const {id_area_empresa, area_empresa, url_foto, nombres, apellidos, correo_personal, correo_empresa,
            nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
            direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
            universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
            cargo
    } = req.body

    try {
        const newTrabajador = {id_area_empresa, area_empresa, url_foto, nombres, apellidos, correo_personal, correo_empresa,
                nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
                direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
                universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
                cargo
        }
        const nueva = await pool.query ('INSERT INTO trabajadores set ?', newTrabajador)
        const trabajador = await pool.query ('SELECT * FROM trabajadores WHERE id = ?', [nueva.insertId])

        return res.json ({
            trabajador: trabajador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador: {},
            success: false
        })
    }
})

router.post ('/api/trabajador/:id_trabajador', async (req, res) => {
    const {id_area_empresa, area_empresa, url_foto, nombres, apellidos, correo_personal, correo_empresa,
            nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
            direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
            universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
            cargo
    } = req.body
    const {id_trabajador} = req.params

    try {
        const updateTrabajador = {id_area_empresa, area_empresa, url_foto, nombres, apellidos, correo_personal, correo_empresa,
                nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
                direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
                universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
                cargo
        }
        await pool.query ('UPDATE trabajadores set ? WHERE id = ?', [updateTrabajador, id_trabajador])
        const trabajador = await pool.query ('SELECT  * FROM trabajadores WHERE id = ?', [id_trabajador])

        return res.json ({
            trabajador: trabajador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            trabajador: {}
        })
    }
})

router.post ('/api/trabajador/estado_trabajo/:id_trabajador', async (req, res) => {
    const {estado_trabajo
    } = req.body
    const {id_trabajador} = req.params

    try {
        const updateTrabajador = {estado_trabajo
        }
        await pool.query ('UPDATE trabajadores set ? WHERE id = ?', [updateTrabajador, id_trabajador])
        const trabajador = await pool.query ('SELECT  * FROM trabajadores WHERE id = ?', [id_trabajador])

        return res.json ({
            trabajador: trabajador[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            trabajador: {}
        })
    }
})

router.get ('/api/trabajadores/search/:search/empresa/:id_area_empresa/estado/:estado_trabajo/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_area_empresa, estado_trabajo, order_by, order, begin, amount} = req.params
    try {
        if (estado_trabajo === '0' && search === '0' && id_area_empresa === '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM trabajadores')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_area_empresa === '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM trabajadores')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_area_empresa !== '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE id_area_empresa = ? 
                    ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [id_area_empresa])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE id_area_empresa = ?`, [id_area_empresa])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_area_empresa !== '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE id_area_empresa = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_area_empresa])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores
                        WHERE id_area_empresa = ?`, [id_area_empresa])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_area_empresa === '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%')`)

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_area_empresa === '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%')`)

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_area_empresa !== '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_area_empresa = ?
                      ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_area_empresa])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_area_empresa = ?`, [id_area_empresa])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_area_empresa === '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE estado_trabajo = ?
                    ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM trabajadores WHERE estado_trabajo = ?', [estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_area_empresa === '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE estado_trabajo = ? ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM trabajadores WHERE estado_trabajo = ?', [estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_area_empresa !== '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE id_area_empresa = ? 
                    AND estado_trabajo = ? ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [id_area_empresa, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE id_area_empresa = ? AND estado_trabajo = ?`, [id_area_empresa, estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_area_empresa !== '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores WHERE id_area_empresa = ? 
                    AND estado_trabajo = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_area_empresa, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores
                        WHERE id_area_empresa = ? AND estado_trabajo = ?`, [id_area_empresa, estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_area_empresa === '0' && order_by === '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ? ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?`, [estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_area_empresa === '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?
                     ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?`, [estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_area_empresa !== '0' && order_by !== '0'){
            const trabajadores = await pool.query (`SELECT * FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_area_empresa = ?
                     AND estado_trabajo = ?
                      ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_area_empresa, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM trabajadores 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tip_documento LIKE '%${search}%' OR area_empresa  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_area_empresa = ?
                     AND estado_trabajo = ?`, [id_area_empresa, estado_trabajo])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores: trabajadores,
                    success: true
                })
            }
            return res.json ({
                trabajadores: trabajadores,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajadores: [],
            success: true
        })
    }
})

router.get ('/api/trabajador/:id_trabajador', async (req, res) => {
    const {id_trabajador} = req.params

    try {
        const trabajadores = await pool.query ('SELECT * FROM trabajadores WHERE id = ?', [id_trabajador])
        return res.json ({
            trabajador: trabajadores[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador: {},
            success: true
        })
    }
})

router.get ('/api/delete/trabajador/:id_trabajador', async (req, res) => {
    const {id_trabajador} = req.params

    try {
        await pool.query ('DELETE FROM trabajadores WHERE id = ?', [id_trabajador])
        const trabajadores = await pool.query ('SELECT * FROM trabajadores ORDER BY apellidos ASC')
        return res.json ({
            trabajadores: trabajadores,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajadores: [],
            success: true
        })
    }
})

module.exports = router