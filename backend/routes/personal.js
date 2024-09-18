const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/personal', async (req, res) => {
    const {id_departamento, departamento, url_foto, nombres, apellidos, correo_personal, correo_empresa,
            nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
            direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
            universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, 
            sueldo_neto, cargo, nombre_familiar, telefono_familiar, genero, jefe_inmediato, id_jefe_inmediato,
            bonos, cominisiones, evaluaciones
    } = req.body

    try {
        const newPersonal = {id_departamento, departamento, url_foto, nombres, apellidos, correo_personal, correo_empresa,
                nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
                direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
                universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
                cargo, nombre_familiar, telefono_familiar, genero, jefe_inmediato, id_jefe_inmediato,
                bonos, cominisiones, evaluaciones
        }
        const new_personal = await pool.query ('INSERT INTO personal set ?', [newPersonal])
        const trabajador = await pool.query ('SELECT * FROM personal WHERE id = ?', [new_personal.insertId])

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

router.post ('/api/personal/:id_personal', async (req, res) => {
    const {id_departamento, departamento, url_foto, nombres, apellidos, correo_personal, correo_empresa,
            nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
            direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
            universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
            cargo, nombre_familiar, telefono_familiar, genero, jefe_inmediato, id_jefe_inmediato,
            bonos, cominisiones, evaluaciones
    } = req.body
    const {id_personal} = req.params

    try {
        const updatePersonal = {id_departamento, departamento, url_foto, nombres, apellidos, correo_personal, correo_empresa,
                nro_telefono, tipo_documento, nro_documento, fecha_nacimiento, pais, provincia, distrito,
                direccion, afp, seguro, banco, nro_cuenta_bancaria, nro_cuenta_interbancaria, estudios,
                universidad, colegio, titulo, estado_civil, hijos, estado_trabajo, fecha_inicio, sueldo_bruto, sueldo_neto,
                cargo, nombre_familiar, telefono_familiar, genero, jefe_inmediato, id_jefe_inmediato,
                bonos, cominisiones, evaluaciones
        }
        await pool.query ('UPDATE personal set ? WHERE id = ?', [updatePersonal, id_personal])
        const trabajador = await pool.query ('SELECT  * FROM personal WHERE id = ?', [id_personal])

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

router.post ('/api/personal/estado_trabajo/:id_personal', async (req, res) => {
    const {estado_trabajo
    } = req.body
    const {id_personal} = req.params

    try {
        const updateTrabajador = {estado_trabajo
        }
        await pool.query ('UPDATE personal set ? WHERE id = ?', [updateTrabajador, id_personal])
        const trabajador = await pool.query ('SELECT  * FROM personal WHERE id = ?', [id_personal])

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

router.get ('/api/personal/search/:search/empresa/:id_departamento/estado/:estado_trabajo/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_departamento, estado_trabajo, order_by, order, begin, amount} = req.params
    try {
        if (estado_trabajo === '0' && search === '0' && id_departamento === '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query ('SELECT COUNT (id) FROM personal')

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_departamento === '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal ORDER BY ${order_by} ${order} 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query ('SELECT COUNT (id) FROM personal')

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_departamento !== '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE id_departamento = ? 
                    ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [id_departamento])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE id_departamento = ?`, [id_departamento])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search === '0' && id_departamento !== '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE id_departamento = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_departamento])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal
                        WHERE id_departamento = ?`, [id_departamento])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_departamento === '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%')`)

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_departamento === '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%')`)

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo === '0' && search !== '0' && id_departamento !== '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_departamento = ?
                      ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_departamento])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_departamento = ?`, [id_departamento])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_departamento === '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE estado_trabajo = ?
                    ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query ('SELECT COUNT (id) FROM personal WHERE estado_trabajo = ?', [estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_departamento === '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE estado_trabajo = ? 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query ('SELECT COUNT (id) FROM personal WHERE estado_trabajo = ?', [estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_departamento !== '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE id_departamento = ? 
                    AND estado_trabajo = ? ORDER BY apellidos ASC LIMIT ${begin},${amount}`, [id_departamento, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE id_departamento = ? AND estado_trabajo = ?`, [id_departamento, estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search === '0' && id_departamento !== '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE id_departamento = ? 
                    AND estado_trabajo = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_departamento, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal
                        WHERE id_departamento = ? AND estado_trabajo = ?`, [id_departamento, estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_departamento === '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ? ORDER BY apellidos ASC 
                    LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?`, [estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_departamento === '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?
                     ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND estado_trabajo = ?`, [estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }else if (estado_trabajo !== '0' && search !== '0' && id_departamento !== '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_departamento = ?
                     AND estado_trabajo = ?
                      ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_departamento, estado_trabajo])
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal 
                    WHERE (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_documento
                     LIKE '%${search}%' OR tipo_documento LIKE '%${search}%' OR departamento  LIKE '%${search}%' OR 
                     seguro LIKE '%${search}%' OR afp LIKE '%${search}%') AND id_departamento = ?
                     AND estado_trabajo = ?`, [id_departamento, estado_trabajo])

                return res.json ({
                    total_personal: total_personal[0][`COUNT (id)`],
                    personal: personal,
                    success: true
                })
            }
            return res.json ({
                personal: personal,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            personal: [],
            success: true
        })
    }
})

router.get ('/api/personal/:id_personal', async (req, res) => {
    const {id_personal} = req.params

    try {
        const personal = await pool.query ('SELECT * FROM personal WHERE id = ?', [id_personal])
        return res.json ({
            trabajador: personal[0],
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

router.get ('/api/delete/personal/:id_personal', async (req, res) => {
    const {id_personal} = req.params

    try {
        await pool.query ('DELETE FROM personal WHERE id = ?', [id_personal])
        const personal = await pool.query ('SELECT * FROM personal ORDER BY apellidos ASC LIMIT 0,16')
        return res.json ({
            personal: personal,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            personal: [],
            success: true
        })
    }
})

module.exports = router