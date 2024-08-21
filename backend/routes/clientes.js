const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    host: 'developer-ideas.com',
    secure: true,
    port: 465,
    auth: {
        user: 'admin@developer-ideas.com',
        pass: '206@Dev2702ideas732'
    },
    tls: {
        rejectUnauthorized: false
    }
}))

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve (__dirname, 'template'),
        defaultLayout: false,
    },
    viewPath: path.resolve (__dirname, 'template'),
    extName: '.hbs'
};

transporter.use('compile', hbs(handlebarOptions))

router.post ('/api/cliente', async (req, res) => {
    const {url_foto, nombres, apellidos, correo, nro_telefono, fecha_nacimiento, sexo, usuario, direccion,
            provincia, distrito, pais, latitud, longitud, habilitado} = req.body
    try {
        const newCliente = {url_foto, nombres, apellidos, correo, nro_telefono, fecha_nacimiento, sexo, usuario, direccion,
                provincia, distrito, pais, latitud, longitud, habilitado}
        const new_cliente = await pool.query (`INSERT INTO info_clientes set ?`, [newCliente])
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE id = ?', [new_cliente.insertId])

        return res.json ({
            cliente: cliente[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/admin/cliente/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {habilitado} = req.body

    try {
        const updateCliente = {habilitado}
        await pool.query ('UPDATE info_clientes set ? WHERE usuario = ?', [updateCliente, usuario])
        const clientes = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        return res.json ({
            clientes: clientes,
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

router.post ('/api/cliente/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {url_foto, nombres, apellidos, correo, nro_telefono, fecha_nacimiento, sexo, direccion,
        provincia, distrito, pais, latitud, longitud, habilitado} = req.body

    try {
        const updateCliente = {url_foto, nombres, apellidos, correo, nro_telefono, fecha_nacimiento, sexo, direccion,
            provincia, distrito, pais, latitud, longitud, habilitado}
        await pool.query ('UPDATE info_clientes set ? WHERE usuario = ?', [updateCliente, usuario])
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        return res.json ({
            cliente: cliente[0],
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

router.get ('/api/clientes/search/:search/order_by/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (order_by === '0' && search === '0'){
            const clientes = await pool.query (`SELECT * FROM info_clientes ORDER BY apellidos ASC LIMIT ${begin},${amount}`)
            if(parseInt(begin) === 0){
                const total_clientes = await pool.query ('SELECT COUNT (id) FROM info_clientes')

                return res.json ({
                    total_clientes: total_clientes[0][`COUNT (id)`],
                    clientes: clientes,
                    success: true
                })
            }else{
                return res.json ({
                    clientes: clientes,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const clientes = await pool.query (`SELECT * FROM info_clientes WHERE (nombres LIKE '%${search}%' 
                        OR apellidos LIKE '%${search}%' OR nro_telefono LIKE '%${search}%' OR 
                        correo LIKE '%${search}%') ORDER BY apellidos ASC LIMIT ${begin},${amount}`)
            if(parseInt(begin) === 0){
                const total_clientes = await pool.query (`SELECT COUNT (id) FROM info_clientes WHERE (nombres 
                        LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_telefono LIKE 
                        '%${search}%' OR correo LIKE '%${search}%')`)

                return res.json ({
                    total_clientes: total_clientes[0][`COUNT (id)`],
                    clientes: clientes,
                    success: true
                })
            }else{
                return res.json ({
                    clientes: clientes,
                    success: true
                })
            }
        }else if (order_by === '0' && search === '0'){
            const clientes = await pool.query (`SELECT * FROM info_clientes ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if(parseInt(begin) === 0){
                const total_clientes = await pool.query ('SELECT COUNT (id) FROM info_clientes')

                return res.json ({
                    total_clientes: total_clientes[0][`COUNT (id)`],
                    clientes: clientes,
                    success: true
                })
            }else{
                return res.json ({
                    clientes: clientes,
                    success: true
                })
            }
        }else if (order_by === '0' && search !== '0'){
            const clientes = await pool.query (`SELECT * FROM info_clientes WHERE (nombres LIKE '%${search}%' 
                        OR apellidos LIKE '%${search}%' OR nro_telefono LIKE '%${search}%' OR 
                        correo LIKE '%${search}%') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if(parseInt(begin) === 0){
                const total_clientes = await pool.query (`SELECT COUNT (id) FROM info_clientes WHERE (nombres 
                        LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR nro_telefono LIKE 
                        '%${search}%' OR correo LIKE '%${search}%')`)

                return res.json ({
                    total_clientes: total_clientes[0][`COUNT (id)`],
                    clientes: clientes,
                    success: true
                })
            }else{
                return res.json ({
                    clientes: clientes,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/cliente/:usuario', async (req, res) => {
    const {usuario} = req.params
    
    try {
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        console.log (cliente)
        return res.json ({
            cliente: cliente[0],
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

router.post ('/api/suscripcion/cliente', async (req, res) => {
    const {correo} = req.body

    try {
        const suscripcion = await pool.query ('Select * from suscripcion where correo = ?', [correo])
        console.log (suscripcion)

        if (suscripcion.length > 0){
            return res.json ({
                message: '1',
                success: true
            })

        }else{
            const newSuscriptor = {correo}
            await pool.query('INSERT INTO suscripcion set ?', [newSuscriptor])
            
            
            var mailOptions = {
                from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
                to: correo, // list of receivers
                subject: 'Se a agregado a la lista de suscripción',
                template: 'suscripcion', // the name of the template file i.e email.handlebars
                context:{
                 // replace {{name}} with Adebola
            }
            }
    
        // trigger the sending of the E-mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return res.json ({
                        message: 'error: ' + error,
                        success: false
                    })
                }
            
                return res.json ({
                    success: true,
                    message: info
                })
            }); 
        }   
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })      
    }
})

module.exports = router