
CREATE DATABASE developer_ideas;

USE developer_ideas;

/**Usuarios página**/
CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

/**Usuarios página**/
CREATE TABLE negocio_empresa(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    nombre_negocio VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    nombre_contacto VARCHAR (100) NOT NULL,
    logo VARCHAR (500) NOT NULL
);

ALTER TABLE negocio_empresa
    ADD PRIMARY KEY(id);

ALTER TABLE negocio_empresa
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE negocio_empresa;

/**Suscripción página**/
CREATE TABLE suscripciones(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE suscripciones
    ADD PRIMARY KEY(id);

ALTER TABLE suscripciones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE suscripciones;

/**Tipo Proyecto **/
CREATE TABLE tipo_proyecto(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE tipo_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE tipo_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tipo_proyecto;

/**Proyectos **/
CREATE TABLE proyectos(
    id INT(11) NOT NULL,
    tipo_proyecto VARCHAR (100) NOT NULL,
    nombre_proyecto VARCHAR (100) NOT NULL,
    cliente VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    url_imagen VARCHAR (100) NOT NULL,
    url_contenido VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE proyectos
    ADD PRIMARY KEY(id);

ALTER TABLE proyectos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE proyectos;

/**Clientes página**/
CREATE TABLE clientes(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE clientes
    ADD PRIMARY KEY(id);

ALTER TABLE clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE clientes;

/**Info cliente página**/
CREATE TABLE info_clientes(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE info_clientes
    ADD PRIMARY KEY(id);

ALTER TABLE info_clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_clientes;

/**cotizacion**/
CREATE TABLE cotizacion(
    id INT(11) NOT NULL,
    nro_cotizacion INT (11) NOT NULL,

    cotizacion_domhost TINYINT (1) NOT NULL,
    cotizacion_web TINYINT (1) NOT NULL,
    cotizacion_app TINYINT (1) NOT NULL,
    cotizacion_marketing TINYINT (1) NOT NULL,
    cotizacion_software TINYINT (1) NOT NULL,
    cotizacion_cloud TINYINT (1) NOT NULL,

    tipo_negocio VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    rubro VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nombre_contacto VARCHAR (100) NOT NULL,

    tipo_dominio VARCHAR (100) NOT NULL,
    tipo_hosting VARCHAR (100) NOT NULL,
    informacion_domhost VARCHAR (1000) NOT NULL,

    tipo_web VARCHAR (100) NOT NULL,
    pestania_nosotros TINYINT (1) NOT NULL,
    pestania_servicios TINYINT (1) NOT NULL,
    pestania_productos TINYINT (1) NOT NULL,
    pestania_fotos TINYINT (1) NOT NULL,
    pestania_videos TINYINT (1) NOT NULL,
    pestania_contacto TINYINT (1) NOT NULL,
    pestania_cotizacion TINYINT (1) NOT NULL,
    pestania_tienda TINYINT (1) NOT NULL,
    pestania_carrito TINYINT (1) NOT NULL,
    pestania_pago TINYINT (1) NOT NULL,
    pestania_seguimiento TINYINT (1) NOT NULL,
    pestania_registro TINYINT (1) NOT NULL,
    pestania_login TINYINT (1) NOT NULL,
    pestania_perfil TINYINT (1) NOT NULL,
    pestania_favoritos TINYINT (1) NOT NULL,
    pestania_compras TINYINT (1) NOT NULL,
    pestania_administracion TINYINT (1) NOT NULL,
    informacion_web VARCHAR (1000) NOT NULL,

    tipo_aplicacion VARCHAR (100) NOT NULL,
    pantalla_login TINYINT (1) NOT NULL,
    pantalla_registro TINYINT (1) NOT NULL,
    pantalla_presentacion TINYINT (1) NOT NULL,
    pantalla_perfil TINYINT (1) NOT NULL,
    pantalla_productos TINYINT (1) NOT NULL,
    pantalla_carrito TINYINT (1) NOT NULL,
    pantalla_pago TINYINT (1) NOT NULL,
    pantalla_ubicacion TINYINT (1) NOT NULL,
    pantalla_localizacion TINYINT (1) NOT NULL,
    pantalla_categorias TINYINT (1) NOT NULL,
    pantalla_comentarios TINYINT (1) NOT NULL,
    pantalla_galeria TINYINT (1) NOT NULL,
    pantalla_chat TINYINT (1) NOT NULL,
    pantalla_estadisticas TINYINT (1) NOT NULL,
    pantalla_anuncios TINYINT (1) NOT NULL,
    pantalla_informativa TINYINT (1) NOT NULL,
    pantalla_calendario TINYINT (1) NOT NULL,
    pantalla_agenda TINYINT (1) NOT NULL,
    pantalla_favoritos TINYINT (1) NOT NULL,
    pantalla_otro TINYINT (1) NOT NULL,
    informacion_aplicacion VARCHAR (1000) NOT NULL,
    
    tipo_marketing VARCHAR (100) NOT NULL,
    informacion_marketing VARCHAR (1000) NOT NULL,
    
    tipo_software VARCHAR (100) NOT NULL,
    informacion_software VARCHAR (1000) NOT NULL,
    
    tipo_cloud VARCHAR (100) NOT NULL,
    informacion_cloud VARCHAR (1000) NOT NULL,

    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE cotizacion
    ADD PRIMARY KEY(id);

ALTER TABLE cotizacion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE cotizacion;

/**Productos**/
CREATE TABLE productos(
    id INT(11) NOT NULL,
    producto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    caracteristica_1 VARCHAR (100) NOT NULL,
    caracteristica_2 VARCHAR (100) NOT NULL,
    caracteristica_3 VARCHAR (100) NOT NULL,
    caracteristica_4 VARCHAR (100) NOT NULL,
    caracteristica_5 VARCHAR (100) NOT NULL,
    caracteristica_6 VARCHAR (100) NOT NULL,
    caracteristica_7 VARCHAR (100) NOT NULL,
    caracteristica_8 VARCHAR (100) NOT NULL,
    caracteristica_9 VARCHAR (100) NOT NULL,
    caracteristica_10 VARCHAR (100) NOT NULL,
    caracteristica_11 VARCHAR (100) NOT NULL,
    caracteristica_12 VARCHAR (100) NOT NULL,
    caracteristica_13 VARCHAR (100) NOT NULL,
    caracteristica_14 VARCHAR (100) NOT NULL,
    caracteristica_15 VARCHAR (100) NOT NULL,
    caracteristica_16 VARCHAR (100) NOT NULL,
    caracteristica_17 VARCHAR (100) NOT NULL,
    caracteristica_18 VARCHAR (100) NOT NULL,
    caracteristica_19 VARCHAR (100) NOT NULL,
    caracteristica_20 VARCHAR (100) NOT NULL,
    id_categoria INT (11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    id_subcategoria INT (11) NOT NULL,
    subcategoria VARCHAR (100) NOT NULL,
    servicio VARCHAR (100) NOT NULL,
    url_foto TEXT NOT NULL,
    precio DOUBLE NOT NULL,
    oferta DOUBLE NOT NULL,
    precio_mensual DOUBLE NOT NULL,
    precio_anual DOUBLE NOT NULL,
    comentarios VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE productos
    ADD PRIMARY KEY(id);

ALTER TABLE productos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos;

/**Productos favoritos**/
CREATE TABLE productos_favorito(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    producto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    usuario_cliente VARCHAR (100) NOT NULL,
    id_categoria INT(11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    id_sub_categoria INT(11) NOT NULL,
    sub_categoria VARCHAR (100) NOT NULL,
    id_unidad INT(11) NOT NULL,
    unidad VARCHAR (100) NOT NULL,
    id_servicio INT(11) NOT NULL,
    servicio VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE productos_favorito
    ADD PRIMARY KEY(id);

ALTER TABLE productos_favorito
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos_favorito;

/**Productos calificaciones**/
CREATE TABLE productos_calificaciones(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    usuario_cliente VARCHAR (100) NOT NULL,
    calificacion_producto INT (11) NOT NULL,
    comentario_producto VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE productos_calificaciones
    ADD PRIMARY KEY(id);

ALTER TABLE productos_calificaciones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos_calificaciones;

/**Categorías**/
CREATE TABLE categorias(
    id INT(11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE categorias
    ADD PRIMARY KEY(id);

ALTER TABLE categorias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE categorias;

/**Sub Categorías**/
CREATE TABLE sub_categorias(
    id INT(11) NOT NULL,
    id_categoria INT (11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    sub_categoria VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE sub_categorias
    ADD PRIMARY KEY(id);

ALTER TABLE sub_categorias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE sub_categorias;

/**Unidades**/
CREATE TABLE unidades(
    id INT(11) NOT NULL,
    unidad VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE unidades
    ADD PRIMARY KEY(id);

ALTER TABLE unidades
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE unidades;

/**Servicios**/
CREATE TABLE servicios(
    id INT(11) NOT NULL,
    servicio VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE servicios
    ADD PRIMARY KEY(id);

ALTER TABLE servicios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE servicios;

/**Carrito compras**/
CREATE TABLE compras(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    cantidad DOUBLE NOT NULL,
    precio_unidad DOUBLE NOT NULL,
    precio_total DOUBLE NOT NULL,
    shop_id VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE compras
    ADD PRIMARY KEY(id);

ALTER TABLE compras
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE compras;

/**Categorías noticias**/
CREATE TABLE categorias_noticias(
    id INT(11) NOT NULL,
    categoria_noticia VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE categorias_noticias
    ADD PRIMARY KEY(id);

ALTER TABLE categorias_noticias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE categorias_noticias;

/**noticias**/
CREATE TABLE noticias(
    id INT(11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    titulo VARCHAR (200) NOT NULL,
    noticia_parrafo_1 TEXT NOT NULL,
    noticia_parrafo_2 TEXT NOT NULL,
    noticia_parrafo_3 TEXT NOT NULL,
    noticia_parrafo_4 TEXT NOT NULL,
    noticia_parrafo_5 TEXT NOT NULL,
    noticia_parrafo_6 TEXT NOT NULL,
    noticia_parrafo_7 TEXT NOT NULL,
    noticia_parrafo_8 TEXT NOT NULL,
    noticia_parrafo_9 TEXT NOT NULL,
    noticia_parrafo_10 TEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE noticias
    ADD PRIMARY KEY(id);

ALTER TABLE noticias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE noticias;

/**Areas empresa**/
CREATE TABLE areas_empresa(
    id INT(11) NOT NULL,
    nombre_area VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE areas_empresa
    ADD PRIMARY KEY(id);

ALTER TABLE areas_empresa
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE areas_empresa;

/**Trabajador**/
CREATE TABLE trabajadores(
    id INT(11) NOT NULL,
    url_foto VARCHAR (500) NOT NULL,
    id_area_empresa INT (11) NOT NULL,
    area_empresa VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    correo_personal VARCHAR (100) NOT NULL,
    correo_empresa VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    tipo_documento VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    pais VARCHAR (100) NOT NULL,
    provincia VARCHAR (100) NOT NULL,
    distrito VARCHAR (100) NOT NULL,
    direccion VARCHAR (100) NOT NULL,
    afp VARCHAR (100) NOT NULL,
    seguro VARCHAR (100) NOT NULL,
    estudios VARCHAR (100) NOT NULL,
    universidad VARCHAR (100) NOT NULL,
    titulo VARCHAR (100) NOT NULL,
    colegio VARCHAR (100) NOT NULL,
    estado_civil VARCHAR (100) NOT NULL,
    hijos INT (11) NOT NULL,
    estado_trabajo VARCHAR (100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    sueldo_bruto DOUBLE NOT NULL,
    sueldo_neto DOUBLE NOT NULL,
    cargo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE trabajadores
    ADD PRIMARY KEY(id);

ALTER TABLE trabajadores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE trabajadores;

/**Administradores**/
CREATE TABLE administradores(
    id INT(11) NOT NULL,
    url_foto VARCHAR (500) NOT NULL,
    id_trabajador INT (11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    area_empresa VARCHAR (100) NOT NULL,
    habilitado TINYINT (1) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE administradores
    ADD PRIMARY KEY(id);

ALTER TABLE administradores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE administradores;

/**Notificaciones**/
CREATE TABLE notificaciones(
    id INT(11) NOT NULL,
    tipo_notificacion VARCHAR (100) NOT NULL,
    id_tipo VARCHAR (500) NOT NULL,
    titulo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE notificaciones
    ADD PRIMARY KEY(id);

ALTER TABLE notificaciones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE notificaciones;

/**Chat**/
CREATE TABLE mensajes(
    id INT(11) NOT NULL,
    url_foto VARCHAR (500) NOT NULL,
    usuario_mensaje VARCHAR (100) NOT NULL,
    titulo VARCHAR (500) NOT NULL,
    mensaje VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE mensajes
    ADD PRIMARY KEY(id);

ALTER TABLE mensajes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE mensajes;

/**Agenda**/
CREATE TABLE agenda(
    id INT(11) NOT NULL,
    titulo VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    lugar VARCHAR (100) NOT NULL,
    direccion VARCHAR (100) NOT NULL,
    id_organizador VARCHAR (100) NOT NULL,
    participantes VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE agenda
    ADD PRIMARY KEY(id);

ALTER TABLE agenda
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE agenda;


/**Gestión de Proyectos **/
/**Información**/
CREATE TABLE informacion_proyecto(
    id INT(11) NOT NULL,
    nombre_proyecto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    fecha_inicio VARCHAR (10) NOT NULL,
    fecha_finalizacion VARCHAR (10) NOT NULL,
    estado_proyecto VARCHAR (100) NOT NULL,
    prioridad INT (11) NOT NULL,
    presupuesto_proyecto DOUBLE NOT NULL,
    cliente VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE informacion_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE informacion_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE informacion_proyecto;

/**Equipo**/
CREATE TABLE equipo_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    id_trabajador INT (11) NOT NULL,
    rol_asignado VARCHAR (100) NOT NULL,
    id_tarea VARCHAR (100) NOT NULL,
    disponibilidad VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE equipo_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE equipo_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE equipo_proyecto;

/**Tareas actividades**/
CREATE TABLE tareas_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    tarea VARCHAR (100) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    fecha_inicio VARCHAR (10) NOT NULL,
    fecha_finalizacion VARCHAR (10) NOT NULL,
    estado VARCHAR (100) NOT NULL,
    dependencias VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE tareas_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE tareas_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tareas_proyecto;

/**Documentos archivos**/
CREATE TABLE documentos_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    carpeta VARCHAR (100) NOT NULL,
    versiones VARCHAR (100) NOT NULL,
    archivo VARCHAR (10) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE documentos_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE documentos_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE documentos_proyecto;

/**Comunicación**/
CREATE TABLE comunicacion_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    tipo_comunicacion VARCHAR (100) NOT NULL,
    usuario_comunica VARCHAR (100) NOT NULL,
    usuarios_receptores VARCHAR (1000) NOT NULL,
    notas VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE comunicacion_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE comunicacion_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE comunicacion_proyecto;

/**Riesgos**/
CREATE TABLE riesgos_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    riesgo VARCHAR (1000) NOT NULL,
    mitigacion VARCHAR (1000) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE riesgos_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE riesgos_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE riesgos_proyecto;

/**kpis proyecto**/
CREATE TABLE kpis_proyecto(
    id INT(11) NOT NULL,
    id_proyecto INT (11) NOT NULL,
    id_tarea INT (11) NOT NULL,
    porcentaje_tarea_completada DOUBLE NOT NULL,
    desviacion_presupuesto DOUBLE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE kpis_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE kpis_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE kpis_proyecto;