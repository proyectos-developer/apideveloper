const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Nuevo proyecto informacion, equipo, actividad, documentos, comunicacion, riesgos, kpis */
router.post ('/api/gestion/informacion/proyecto', async (req, res) => {
    const {nombre_proyecto, descripcion, fecha_inicio, fecha_finalizacion, estado_proyecto, prioridad, moneda, presupuesto_proyecto, id_cliente} = req.body

    try {
        const newInfoProyecto = {nombre_proyecto, descripcion, fecha_inicio, fecha_finalizacion, estado_proyecto, prioridad, moneda, presupuesto_proyecto, id_cliente}
        const new_info_proyecto = await pool.query ('INSERT INTO informacion_proyecto set ?', [newInfoProyecto])
        const gestion_proyecto = await pool.query ('SELECT * FROM informacion_proyecto WHERE id = ?', [new_info_proyecto.insertId])

        return res.json ({
            gestion_proyecto: gestion_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            gestion_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/trabajador/proyecto', async (req, res) => {
    const {id_proyecto, id_trabajador, rol_asignado, id_tarea, disponibilidad} = req.body

    try {
        const newEquipoProyecto = {id_proyecto, id_trabajador, rol_asignado, id_tarea, disponibilidad}
        const new_equipo_proyecto = await pool.query ('INSERT INTO equipo_proyecto set ?', [newEquipoProyecto])
        const trabajador_proyecto = await pool.query ('SELECT * FROM equipo_proyecto WHERE id = ?', [new_equipo_proyecto.insertId])

        return res.json ({
            trabajador_proyecto: trabajador_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/actividad/proyecto', async (req, res) => {
    const {id_proyecto, tarea, descripcion, fecha_inicio, fecha_finalizacion, estado, dependencias} = req.body

    try {
        const newTareaProyecto = {id_proyecto, tarea, descripcion, fecha_inicio, fecha_finalizacion, estado, dependencias}
        const new_tarea_proyecto = await pool.query ('INSERT INTO tareas_proyecto set ?', [newTareaProyecto])
        const tarea_proyecto = await pool.query ('SELECT * FROM tareas_proyecto WHERE id = ?', [new_tarea_proyecto.insertId])

        return res.json ({
            tarea_proyecto: tarea_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tarea_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/documento/proyecto', async (req, res) => {
    const {id_proyecto, descripcion, carpeta, versiones, archivo} = req.body

    try {
        const newDocumentoProyecto = {id_proyecto, descripcion, carpeta, versiones, archivo}
        const new_documento_proyecto = await pool.query ('INSERT INTO documentos_proyecto set ?', [newDocumentoProyecto])
        const documento_proyecto = await pool.query ('SELECT * FROM documentos_proyecto WHERE id = ?', [new_documento_proyecto.insertId])

        return res.json ({
            documento_proyecto: documento_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            documento_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/comunicacion/proyecto', async (req, res) => {
    const {id_proyecto, tipo_comunicacion, usuario_comunica, usuarios_receptores, notas} = req.body

    try {
        const newComunicacionProyecto = {id_proyecto, tipo_comunicacion, usuario_comunica, usuarios_receptores, notas}
        const new_comunicacion_proyecto = await pool.query ('INSERT INTO comunicacion_proyecto set ?', [newComunicacionProyecto])
        const comunicacion_proyecto = await pool.query ('SELECT * FROM comunicacion_proyecto WHERE id = ?', [new_comunicacion_proyecto.insertId])

        return res.json ({
            comunicacion_proyecto: comunicacion_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            comunicacion_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/riesgo/proyecto', async (req, res) => {
    const {id_proyecto, riesgo, mitigacion} = req.body

    try {
        const newRiesgoProyecto = {id_proyecto, riesgo, mitigacion}
        const new_riesgo_proyecto = await pool.query ('INSERT INTO riesgos_proyecto set ?', [newRiesgoProyecto])
        const riesgo_proyecto = await pool.query ('SELECT * FROM riesgos_proyecto WHERE id = ?', [new_riesgo_proyecto.insertId])

        return res.json ({
            riesgo_proyecto: riesgo_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            riesgo_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/kpi/proyecto', async (req, res) => {
    const {id_proyecto, id_tarea, porcentaje_tarea_completada, desviacion_presupuesto} = req.body

    try {
        const newKpiProyecto = {id_proyecto, id_tarea, porcentaje_tarea_completada, desviacion_presupuesto}
        const new_kpi_proyecto = await pool.query ('INSERT INTO kpis_proyecto set ?', [newKpiProyecto])
        const kpi_proyecto = await pool.query ('SELECT * FROM kpis_proyecto WHERE id = ?', [new_kpi_proyecto.insertId])

        return res.json ({
            kpi_proyecto: kpi_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            kpi_proyecto: {},
            success: false
        })
    }
})

/**Actualizar proyecto informacion, equipo, actividad, documentos, comunicacion, riesgos, kpis */
router.post ('/api/gestion/informacion/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {nombre_proyecto, descripcion, fecha_inicio, fecha_finalizacion, estado_proyecto, prioridad, moneda, presupuesto_proyecto, id_cliente} = req.body

    try {
        const updateInformacion = {nombre_proyecto, descripcion, fecha_inicio, fecha_finalizacion, estado_proyecto, prioridad, moneda, presupuesto_proyecto, id_cliente}
        await pool.query ('UPDATE informacion_proyecto set ? WHERE id = ?', [updateInformacion, id])
        const gestion_proyecto = await pool.query ('SELECT * FROM informacion_proyecto WHERE id = ?', [id])

        return res.json ({
            gestion_proyecto: gestion_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            gestion_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/trabajador/proyecto/:id_proyecto/:id_trabajador', async (req, res) => {
    const {id_trabajador, id_proyecto} = req.params
    const {rol_asignado, id_tarea, disponibilidad} = req.body

    try {
        const newEquipoProyecto = {rol_asignado, id_tarea, disponibilidad}
        await pool.query ('UPDATE equipo_proyecto set ? WHERE id_trabajador = ? AND id_proyecto = ?', [newEquipoProyecto, id_trabajador, id_proyecto])
        const trabajador_proyecto = await pool.query ('SELECT * FROM equipo_proyecto WHERE id_trabajador = ? AND id_proyecto = ?', [id_trabajador, id_proyecto])

        return res.json ({
            trabajador_proyecto: trabajador_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/actividad/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {id_proyecto, tarea, descripcion, fecha_inicio, fecha_finalizacion, estado, dependencias} = req.body

    try {
        const newTareaProyecto = {id_proyecto, tarea, descripcion, fecha_inicio, fecha_finalizacion, estado, dependencias}
        await pool.query ('UPDATE tareas_proyecto set ? WHERE id = ?', [newTareaProyecto, id])
        const tarea_proyecto = await pool.query ('SELECT * FROM tareas_proyecto WHERE id = ?', [id])

        return res.json ({
            tarea_proyecto: tarea_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tarea_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/documento/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {id_proyecto, descripcion, carpeta, versiones, archivo} = req.body

    try {
        const newDocumentoProyecto = {id_proyecto, descripcion, carpeta, versiones, archivo}
        await pool.query ('UPDATE documentos_proyecto set ? WHERE id = ?', [newDocumentoProyecto, id])
        const documento_proyecto = await pool.query ('SELECT * FROM documentos_proyecto WHERE id = ?', [id])

        return res.json ({
            documento_proyecto: documento_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            documento_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/comunicacion/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {id_proyecto, tipo_comunicacion, usuario_comunica, usuarios_receptores, notas} = req.body

    try {
        const newComunicacionProyecto = {id_proyecto, tipo_comunicacion, usuario_comunica, usuarios_receptores, notas}
        await pool.query ('UPDATE comunicacion_proyecto set ? WHERE id = ?', [newComunicacionProyecto, id])
        const comunicacion_proyecto = await pool.query ('SELECT * FROM comunicacion_proyecto WHERE id = ?', [id])

        return res.json ({
            comunicacion_proyecto: comunicacion_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            comunicacion_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/riesgo/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {id_proyecto, riesgo, mitigacion} = req.body

    try {
        const newRiesgoProyecto = {id_proyecto, riesgo, mitigacion}
        await pool.query ('UPDATE riesgos_proyecto set ? WHERE id = ?', [newRiesgoProyecto, id])
        const riesgo_proyecto = await pool.query ('SELECT * FROM riesgos_proyecto WHERE id = ?', [id])

        return res.json ({
            riesgo_proyecto: riesgo_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            riesgo_proyecto: {},
            success: false
        })
    }
})

router.post ('/api/gestion/kpi/proyecto/:id', async (req, res) => {
    const {id} = req.params
    const {id_proyecto, id_tarea, porcentaje_tarea_completada, desviacion_presupuesto} = req.body

    try {
        const newKpiProyecto = {id_proyecto, id_tarea, porcentaje_tarea_completada, desviacion_presupuesto}
        await pool.query ('UPDATE kpis_proyecto set ? WHERE id = ?', [newKpiProyecto, id])
        const kpi_proyecto = await pool.query ('SELECT * FROM kpis_proyecto WHERE id = ?', [id])

        return res.json ({
            kpi_proyecto: kpi_proyecto[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            kpi_proyecto: {},
            success: false
        })
    }
})

/**Obtener proyectos informacion, equipo, actividades, documentos, comunicaciones, riesgos, kpis */
router.get ('/api/gestion/informacion/proyectos/search/:search/fecha/:fecha/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount, fecha} = req.params
    const fecha_reemplazada = fecha.replace('-', '/').replace('-', '/')
    try {
        if (search === '0' && columna === '0' && fecha === '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query ('SELECT COUNT (id) FROM informacion_proyecto')

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if(search === '0' && columna === '0' && fecha === '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query ('SELECT COUNT (id) FROM informacion_proyecto')

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna === '0' && fecha !== '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) ORDER BY created_at ASC LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?)`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna === '0' && fecha !== '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?)`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha === '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''})`, [valor])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha === '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''})`, [valor])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha !== '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha !== '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }
        else if (search !== '0' && columna === '0' && fecha === '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                        WHERE (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`)

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if(search !== '0' && columna === '0' && fecha === '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto
                WHERE (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                     ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                    WHERE (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`)

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna === '0' && fecha !== '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) AND 
                    (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                    (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna === '0' && fecha !== '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) AND 
                    (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                    (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha === '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND
                        (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                    ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND
                        (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha === '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND 
                        (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                    ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND
                        (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha !== '0' && order_by === '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        AND (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                        ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)
                        AND (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha !== '0' && order_by !== '0'){
            const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        AND (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')
                        ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_proyectos = await pool.query (`SELECT COUNT (id) FROM informacion_proyecto 
                    WHERE (${columna === 'estado_proyecto' ? 'estado_proyecto = ?' : columna === 'prioridad' ?
                        'prioridad = ?' : ''}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                        (nombre_proyecto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado_proyecto LIKE '%${search}%' OR presupuesto_proyecto LIKE '%${search}%')`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_proyectos: total_proyectos[0][`COUNT (id)`],
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    gestion_proyectos: gestion_proyectos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            gestion_proyectos: [],
            success: false
        })
    }
})

router.get ('/api/gestion/trabajadores/proyecto/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {columna, valor, order_by, order, begin, amount} = req.params
    try {
        if (columna === '0' && order_by === '0'){
            const trabajadores_proyecto = await pool.query (`SELECT * FROM equipo_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM equipo_proyecto')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }
        }else if(columna === '0' && order_by !== '0'){
            const trabajadores_proyecto = await pool.query (`SELECT * FROM equipo_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM equipo_proyecto')

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && order_by === '0'){
            const trabajadores_proyecto = await pool.query (`SELECT * FROM equipo_proyecto WHERE 
                (${columna === 'rol_asignado' ? 'rol_asignado = ?' : columna === 'disponibilidad' ?
                    'disponibilidad = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM equipo_proyecto WHERE
                    (${columna === 'rol_asignado' ? 'rol_asignado = ?' : columna === 'disponibilidad' ?
                    'disponibilidad = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && order_by !== '0'){
            const trabajadores_proyecto = await pool.query (`SELECT * FROM equipo_proyecto WHERE 
                (${columna === 'rol_asignado' ? 'rol_asignado = ?' : columna === 'disponibilidad' ?
                    'disponibilidad = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_trabajadores = await pool.query (`SELECT COUNT (id) FROM equipo_proyecto WHERE
                    (${columna === 'rol_asignado' ? 'rol_asignado = ?' : columna === 'disponibilidad' ?
                    'disponibilidad = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_trabajadores: total_trabajadores[0][`COUNT (id)`],
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    trabajadores_proyecto: trabajadores_proyecto,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            equipo_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/actividades/proyecto/search/:search/fecha/:fecha/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount, fecha} = req.params
    const fecha_reemplazada = fecha.replace('-', '/').replace('-', '/')
    try {
        if (search === '0' && columna === '0' && fecha === '0' && order_by === '0'){
            const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas = await pool.query ('SELECT COUNT (id) FROM tareas_proyecto')

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }
        }else if(search === '0' && columna === '0' && fecha === '0' && order_by !== '0'){
            const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query ('SELECT COUNT (id) FROM tareas_proyecto')

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna === '0' && fecha !== '0' && order_by === '0'){
            const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) ORDER BY created_at ASC LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?)`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna === '0' && fecha !== '0' && order_by !== '0'){
            const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?)`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha === '0' && order_by === '0'){
            const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 
                        columna === 'dependencias' ? 'dependencias = ?' : ''}) ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 
                        columna === 'dependencias' ? 'dependencias = ?' : ''})`, [valor])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyecto: tareas_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha === '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha !== '0' && order_by === '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && fecha !== '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }
        else if (search !== '0' && columna === '0' && fecha === '0' && order_by === '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                        WHERE (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`)

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if(search !== '0' && columna === '0' && fecha === '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto
                WHERE (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                     ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                    WHERE (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`)

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna === '0' && fecha !== '0' && order_by === '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) AND 
                    (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                    (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna === '0' && fecha !== '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto WHERE (fecha_inicio = ? OR
                    fecha_finalizacion = ?) AND 
                    (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto
                    WHERE (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                    (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha === '0' && order_by === '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                    ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha === '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND 
                        (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                    ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha !== '0' && order_by === '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        AND (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                        ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?)
                        AND (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && fecha !== '0' && order_by !== '0'){
            const tareas_proyectos = await pool.query (`SELECT * FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) 
                        AND (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')
                        ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor, fecha_reemplazada, fecha_reemplazada])
            if (parseInt(begin) === 0){
                const total_tareas =  await pool.query (`SELECT COUNT (id) FROM tareas_proyecto 
                    WHERE (${columna === 'estado' ? 'estado = ?' : columna === 'dependencias' ?
                        'dependencias = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND (fecha_inicio = ? OR fecha_finalizacion = ?) AND
                        (tarea LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR 
                    estado LIKE '%${search}%' OR dependencias LIKE '%${search}%')`, [valor, fecha_reemplazada, fecha_reemplazada])

                return res.json ({
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tareas_proyectos: [],
            success: false
        })
    }
})

router.get ('/api/gestion/documentos/proyecto/search/:search/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount} = req.params
    try {
        if (columna === '0' && search === '0' && order_by === '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query ('SELECT COUNT (id) FROM documentos_proyecto')

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search === '0' && order_by !== '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query ('SELECT COUNT (id) FROM documentos_proyecto')

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by === '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto WHERE 
                (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                archivo LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto WHERE
                    (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                    archivo LIKE '%${search}%')`)

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by !== '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto WHERE 
                (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                archivo LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto WHERE
                    (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                    archivo LIKE '%${search}%')`)

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search === '0' && order_by === '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto WHERE 
                    (${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) 
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto
                    WHERE (${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search === '0' && order_by !== '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto 
                    WHERE (${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) 
                    ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto
                    WEHRE (${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by === '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto WHERE 
                (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                archivo LIKE '%${search}%') AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} 
                ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto WHERE
                    (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                    archivo LIKE '%${search}%') AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by !== '0'){
            const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto WHERE 
                (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                archivo LIKE '%${search}%') AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} 
                ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_documentos = await pool.query (`SELECT COUNT (id) FROM documentos_proyecto WHERE
                    (descripcion LIKE '%${search}%' OR carpeta LIKE '%${search}%' OR versiones LIKE '%${search}%' OR
                    archivo LIKE '%${search}%') AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_documentos: total_documentos[0][`COUNT (id)`],
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    documentos_proyecto: documentos_proyecto,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            documentos_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/comunicaciones/proyecto/search/:search/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount} = req.params
    try {
        if (search === '0' && columna === '0' && order_by === '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query ('SELECT COUNT (id) FROM comunicacion_proyecto')

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }else if(search === '0' && columna === '0' && order_by !== '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query ('SELECT COUNT (id) FROM comunicacion_proyecto')

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && order_by === '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }else if (search === '0' && columna !== '0' && order_by !== '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'})`, [valor])

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }
        else if (search !== '0' && columna === '0' && order_by === '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto 
                    WHERE (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')
                    ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) FROM comunicacion_proyecto
                        WHERE (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')`)

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }else if(search !== '0' && columna === '0' && order_by !== '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto
                WHERE (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')
                     ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) FROM comunicacion_proyecto
                    WHERE (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')`)

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    tareas_proyectos: tareas_proyectos,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && order_by === '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')
                    ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }else if (search !== '0' && columna !== '0' && order_by !== '0'){
            const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND 
                        (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')
                    ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_comunicaciones = await pool.query (`SELECT COUNT (id) FROM comunicacion_proyecto 
                    WHERE (${columna === 'tipo_comunicacion' ? 'tipo_comunicacion = ?' : columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}) AND
                        (tipo_comunicacion LIKE '%${search}%' OR notas LIKE '%${search}%')`, [valor])

                return res.json ({
                    total_comunicaciones: total_comunicaciones[0][`COUNT (id)`],
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    comunicaciones_proyecto: comunicaciones_proyecto,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            comunicaciones: [],
            success: false
        })
    }
})

router.get ('/api/gestion/riesgos/proyecto/search/:search/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount} = req.params
    try {
        if (columna === '0' && search === '0' && order_by === '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query ('SELECT COUNT (id) FROM riesgos_proyecto')

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search === '0' && order_by !== '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query ('SELECT COUNT (id) FROM riesgos_proyecto')

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by === '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto WHERE 
                (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto WHERE
                    (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%')`)

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by !== '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto WHERE 
                (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto WHERE
                    (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%')`)

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }
        else if (columna !== '0' && search === '0' && order_by === '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto 
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search === '0' && order_by !== '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto 
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by === '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto WHERE 
                (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') 
                AND WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} 
                ORDER BY created_at ASC LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto WHERE
                    (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') AND
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by !== '0'){
            const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto WHERE 
                (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') 
                AND WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} 
                ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_riesgos = await pool.query (`SELECT COUNT (id) FROM riesgos_proyecto WHERE
                    (riesgo LIKE '%${search}%' OR mitigacion LIKE '%${search}%') AND
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_riesgos: total_riesgos[0][`COUNT (id)`],
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    riesgos_proyecto: riesgos_proyecto,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            riesgos_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/kpis/proyecto/search/:search/columna/:columna/:valor/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, columna, valor, order_by, order, begin, amount} = req.params
    try {
        if (columna === '0' && search === '0' && order_by === '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query ('SELECT COUNT (id) FROM kpis_proyecto')

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search === '0' && order_by !== '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query ('SELECT COUNT (id) FROM kpis_proyecto')

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by === '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto WHERE 
                (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%') ORDER BY created_at ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto WHERE
                    (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%')`)

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna === '0' && search !== '0' && order_by !== '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto WHERE 
                (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto WHERE
                    (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%')`)

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }
        else if (columna !== '0' && search === '0' && order_by === '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto 
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} ORDER BY created_at ASC
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search === '0' && order_by !== '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto 
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} 
                    ORDER BY ${order_by} ${order}
                    LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto
                    WHERE ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by === '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto WHERE 
                (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%') 
                AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} ORDER BY created_at ASC 
                LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto WHERE
                    (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%')
                    AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }else if (columna !== '0' && search !== '0' && order_by !== '0'){
            const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto WHERE 
                (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%') 
                AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'} ORDER BY ${order_by} ${order} 
                LIMIT ${begin},${amount}`, [valor])
            if (parseInt(begin) === 0){
                const total_kpis = await pool.query (`SELECT COUNT (id) FROM kpis_proyecto WHERE
                    (porcentaje_tarea_completada LIKE '%${search}%' OR desviacion_presupuesto LIKE '%${search}%')
                    AND ${columna === 'proyecto' ? 'id_proyecto = ?' : 'id = ?'}`, [valor])

                return res.json ({
                    total_kpis: total_kpis[0][`COUNT (id)`],
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }else{
                return res.json ({
                    kpis_proyecto: kpis_proyecto,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            kpis_proyecto: [],
            success: false
        })
    }
})

/**Obtener proyecto informacion, trabajador equipo, actividad, documento, comunicacion, riesgo, kpi */
router.get ('/api/gestion/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const gestion_proyecto = await pool.query ('SELECT * FROM informacion_proyecto WHERE id = ?', [id])

        return res.json ({
            gestion_proyecto: gestion_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            gestion_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/trabajador/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const trabajador_proyecto = await pool.query ('SELECT * FROM equipo_proyecto WHERE id = ?', [id])

        return res.json ({
            trabajador_proyecto: trabajador_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/datos/trabajador/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const trabajador_proyecto = await pool.query ('SELECT * FROM equipo_proyecto WHERE id = ?', [id])

        return res.json ({
            trabajador_proyecto: trabajador_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            trabajador_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/actividad/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const tarea_proyecto = await pool.query ('SELECT * FROM tareas_proyecto WHERE id = ?', [id])

        return res.json ({
            tarea_proyecto: tarea_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tarea_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/trabajador/actividad/proyecto/:id_proyecto/:id_trabajador', async (req, res) => {
    const {id_proyecto, id_trabajador} = req.params

    try {
        const tarea_proyecto = await pool.query ('SELECT * FROM tareas_proyecto WHERE id_proyecto = ? AND id_trabajador = ?', [id_proyecto, id_trabajador])

        return res.json ({
            tarea_proyecto: tarea_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tarea_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/documento/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const documento_proyecto = await pool.query ('SELECT * FROM documentos_proyecto WHERE id = ?', [id])

        return res.json ({
            documento_proyecto: documento_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            documento_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/comunicacion/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const comunicacion_proyecto = await pool.query ('SELECT * FROM comunicacion_proyecto WHERE id = ?', [id])

        return res.json ({
            comunicacion_proyecto: comunicacion_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            comunicacion: {},
            success: false
        })
    }
})

router.get ('/api/gestion/riesgo/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const riesgo_proyecto = await pool.query ('SELECT * FROM riesgos_proyecto WHERE id = ?', [id])

        return res.json ({
            riesgo_proyecto: riesgo_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            riesgo_proyecto: {},
            success: false
        })
    }
})

router.get ('/api/gestion/kpi/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        const kpi_proyecto = await pool.query ('SELECT * FROM kpis_proyecto WHERE id = ?', [id])

        return res.json ({
            kpi_proyecto: kpi_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            kpi_proyecto: {},
            success: false
        })
    }
})

/**Borrar proyecto informacion, trabajador equipo, actividad, documento, comunicacion, riesgo, kpi */
router.get ('/api/gestion/delete/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM informacion_proyecto WHERE id = ?', [id])
        const gestion_proyectos = await pool.query (`SELECT * FROM informacion_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_proyectos = await pool.query ('SELECT COUNT (id) FROM informacion_proyecto')

        return res.json ({
            total_proyectos: total_proyectos[0][`COUNT (id)`],
            gestion_proyectos: gestion_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            gestion_proyectos: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/equipo/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM equipo_proyecto WHERE id = ?', [id])
        const trabajadores_proyecto = await pool.query (`SELECT * FROM equipo_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_trabajadores = await pool.query ('SELECT COUNT (id) FROM equipo_proyecto')

        return res.json ({
            total_trabajadores: total_trabajadores[0][`COUNT (id)`],
            trabajadores_proyecto: trabajadores_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            equipo_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/actividad/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM tareas_proyecto WHERE id = ?', [id])
        const tareas_proyecto = await pool.query (`SELECT * FROM tareas_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_tareas = await pool.query ('SELECT COUNT (id) FROM tareas_proyecto')

        return res.json ({
            total_tareas: total_tareas[0][`COUNT (id)`],
            tareas_proyecto: tareas_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            tareas_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/documento/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM documentos_proyecto WHERE id = ?', [id])
        const documentos_proyecto = await pool.query (`SELECT * FROM documentos_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_documentos = await pool.query ('SELECT COUNT (id) FROM documentos_proyecto')

        return res.json ({
            total_documentos: total_documentos[0][`COUNT (id)`],
            documentos_proyecto: documentos_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            documentos_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/comunicacion/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM comunicacion_proyecto WHERE id = ?', [id])
        const comunicaciones_proyecto = await pool.query (`SELECT * FROM comunicacion_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const tota_comunicaciones = await pool.query ('SELECT COUNT (id) FROM comunicacion_proyecto')

        return res.json ({
            tota_comunicaciones: tota_comunicaciones[0][`COUNT (id)`],
            comunicaciones_proyecto: comunicaciones_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            comunicaciones_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/riesgo/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM riesgos_proyecto WHERE id = ?', [id])
        const riesgos_proyecto = await pool.query (`SELECT * FROM riesgos_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_riesgos = await pool.query ('SELECT COUNT (id) FROM riesgos_proyecto')

        return res.json ({
            total_riesgos: total_riesgos[0][`COUNT (id)`],
            riesgos_proyecto: riesgos_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            riesgos_proyecto: [],
            success: false
        })
    }
})

router.get ('/api/gestion/delete/kpi/proyecto/:id', async (req, res) => {
    const {id} = req.params

    try {
        await pool.query ('DELETE FROM kpis_proyecto WHERE id = ?', [id])
        const kpis_proyecto = await pool.query (`SELECT * FROM kpis_proyecto ORDER BY created_at ASC
            LIMIT 0, 16`)
        const total_kpis = await pool.query ('SELECT COUNT (id) FROM kpis_proyecto')

        return res.json ({
            total_kpis: total_kpis[0][`COUNT (id)`],
            kpis_proyecto: kpis_proyecto,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            kpis_proyecto: [],
            success: false
        })
    }
})

module.exports = router