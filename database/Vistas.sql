-- Vistas e índices que usa el frontend
USE GranHotelElToro;
-- PARTE 1: VISTAS
-- V1. Catálogo de habitaciones
-- Pantallas: 2.1 Administración de habitaciones, catálogo de la zona cliente,
-- base de la búsqueda de disponibilidad (C3 y C4)
CREATE OR REPLACE VIEW v_catalogo_habitaciones AS
SELECT
    h.ID_Habitacion,
    h.Numero_Habitacion,
    p.Nombre_Piso,
    t.ID_Tipo_Habitacion,
    t.Nombre_Tipo,
    t.Capacidad_Maxima,
    t.Tarifa_Base,
    h.Tipo_Vista,
    e.ID_Estado_Habitacion,
    e.Nombre_Estado,
    GROUP_CONCAT(c.Nombre_Comodidad ORDER BY c.Nombre_Comodidad SEPARATOR ', ') AS Comodidades
FROM Habitaciones h
    INNER JOIN Tipos_Habitacion t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion
    INNER JOIN Pisos p ON p.ID_Piso = h.ID_Piso
    INNER JOIN Estados_Habitacion e ON e.ID_Estado_Habitacion = h.ID_Estado_Habitacion
    LEFT JOIN Tipo_Habitacion_Comodidades tc ON tc.ID_Tipo_Habitacion = t.ID_Tipo_Habitacion
    LEFT JOIN Catalogo_Comodidades c ON c.ID_Comodidad = tc.ID_Comodidad AND c.Estado = 1
GROUP BY
    h.ID_Habitacion, h.Numero_Habitacion, p.Nombre_Piso,
    t.ID_Tipo_Habitacion, t.Nombre_Tipo, t.Capacidad_Maxima, t.Tarifa_Base,
    h.Tipo_Vista, e.ID_Estado_Habitacion, e.Nombre_Estado;


-- V2. Estado de habitaciones (rack por piso y tablero de camareras)
-- Pantallas: 3.1 Rack visual, 7.1 Tablero de gobernanta, 5.1 elegir habitación ocupada
CREATE OR REPLACE VIEW v_estado_habitaciones AS
SELECT
    p.ID_Piso,
    p.Nombre_Piso,
    h.ID_Habitacion,
    h.Numero_Habitacion,
    t.Nombre_Tipo,
    e.ID_Estado_Habitacion,
    e.Nombre_Estado,
-- Para que identifiquen los estados en el fronted esta biuen haci si no me dicen DarckDbz 
    CASE e.Nombre_Estado
        WHEN 'Disponible' THEN 'Verde'
        WHEN 'Ocupada' THEN 'Azul'
        WHEN 'Reservada' THEN 'Amarillo'
        WHEN 'Sucia' THEN 'Naranja'
        WHEN 'En limpieza' THEN 'Naranja'
        WHEN 'Mantenimiento' THEN 'Rojo'
        ELSE 'Gris'
    END AS Color,
    es.ID_Estancia,
    CONCAT(hu.Primer_Nombre, ' ', hu.Primer_Apellido) AS Huesped_Actual,
    es.Fecha_Entrada,
    r.Fecha_Salida_Esperada,
    CASE
        WHEN es.ID_Estancia IS NULL THEN NULL
        ELSE 1 + (SELECT COUNT(*) FROM Acompañantes a WHERE a.ID_Estancia = es.ID_Estancia)
    END AS Personas
FROM Habitaciones h
    INNER JOIN Pisos p ON p.ID_Piso = h.ID_Piso
    INNER JOIN Tipos_Habitacion t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion
    INNER JOIN Estados_Habitacion e ON e.ID_Estado_Habitacion = h.ID_Estado_Habitacion
    LEFT JOIN Estancias es ON es.ID_Habitacion = h.ID_Habitacion AND es.Fecha_Salida IS NULL
    LEFT JOIN Huespedes hu ON hu.ID_Huesped = es.ID_Huesped
    LEFT JOIN Reservaciones r ON r.ID_Reservacion = es.ID_Reservacion;


-- V3. Reservaciones con su detalle
-- Pantallas: "Mis reservaciones" (zona cliente), 4.1 llegadas del día en recepción
CREATE OR REPLACE VIEW v_reservaciones_detalle AS
SELECT
    r.ID_Reservacion,
    r.Codigo_Reservacion,
    r.ID_Huesped,
    CONCAT_WS(' ', hu.Primer_Nombre, hu.Primer_Apellido) AS Huesped,
    COALESCE(hu.DNI, hu.Pasaporte) AS Documento,
    r.Fecha_Emision,
    r.Fecha_Entrada_Esperada,
    r.Fecha_Salida_Esperada,
    DATEDIFF(r.Fecha_Salida_Esperada, r.Fecha_Entrada_Esperada) AS Noches,
    h.ID_Habitacion,
    h.Numero_Habitacion,
    t.Nombre_Tipo,
    t.Tarifa_Base,
    DATEDIFF(r.Fecha_Salida_Esperada, r.Fecha_Entrada_Esperada) * t.Tarifa_Base AS Monto_Hospedaje,
    r.Estado,
    CASE r.Estado
        WHEN 1 THEN 'Confirmada'
        WHEN 2 THEN 'En curso'
        WHEN 3 THEN 'Finalizada'
        WHEN 4 THEN 'Cancelada'
    END AS Estado_Reservacion
FROM Reservaciones r
    INNER JOIN Huespedes hu ON hu.ID_Huesped = r.ID_Huesped
    INNER JOIN Detalle_Reservacion d ON d.ID_Reservacion = r.ID_Reservacion
    INNER JOIN Habitaciones h ON h.ID_Habitacion = d.ID_Habitacion
    INNER JOIN Tipos_Habitacion t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion;


-- V4. Estado de cuenta en vivo de las habitaciones ocupadas
-- (hospedaje devengado hasta hoy + consumos todavía no facturados)
-- Pantalla: 6.1 Check-out y liquidación de cuenta
CREATE OR REPLACE VIEW v_estado_cuenta AS
SELECT
    b.*,
    ROUND((b.Hospedaje + b.Consumos) * 0.15, 2) AS ISV,
    ROUND(b.Hospedaje * 0.04, 2) AS Impuesto_Turismo,
    b.Hospedaje + b.Consumos
        + ROUND((b.Hospedaje + b.Consumos) * 0.15, 2)
        + ROUND(b.Hospedaje * 0.04, 2) AS Total_Estimado
FROM (
    SELECT
        es.ID_Estancia,
        h.Numero_Habitacion,
        es.ID_Huesped,
        CONCAT_WS(' ', hu.Primer_Nombre, hu.Primer_Apellido) AS Huesped,
        es.Fecha_Entrada,
        r.Fecha_Salida_Esperada,
        t.Tarifa_Base,
        GREATEST(DATEDIFF(CURDATE(), DATE(es.Fecha_Entrada)), 1) AS Noches_Devengadas,
        GREATEST(DATEDIFF(CURDATE(), DATE(es.Fecha_Entrada)), 1) * t.Tarifa_Base AS Hospedaje,
        COALESCE(cs.Cantidad_Consumos, 0) AS Cantidad_Consumos,
        COALESCE(cs.Total_Consumos, 0) AS Consumos
    FROM Estancias es
        INNER JOIN Habitaciones h ON h.ID_Habitacion = es.ID_Habitacion
        INNER JOIN Tipos_Habitacion t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion
        INNER JOIN Huespedes hu ON hu.ID_Huesped = es.ID_Huesped
        INNER JOIN Reservaciones r ON r.ID_Reservacion = es.ID_Reservacion
        LEFT JOIN (
            SELECT c.ID_Estancia, COUNT(*) AS Cantidad_Consumos, SUM(c.Total_Consumo) AS Total_Consumos
            FROM Consumos_Huesped c
            WHERE NOT EXISTS (SELECT 1 FROM Detalles_Factura d WHERE d.ID_Consumo = c.ID_Consumo)
            GROUP BY c.ID_Estancia
        ) cs ON cs.ID_Estancia = es.ID_Estancia
    WHERE es.Fecha_Salida IS NULL
) b;


-- V5. Facturas emitidas (encabezado)
-- Pantallas: 6.2 Encabezado de la factura SAR, 5.2 Historial de facturas, factura del cliente
CREATE OR REPLACE VIEW v_facturas_emitidas AS
SELECT
    f.ID_Factura,
    f.Numero_Factura,
    f.CAI,
    f.Fecha_Emision,
    f.RTN,
    hu.ID_Huesped,
    CONCAT_WS(' ', hu.Primer_Nombre, hu.Segundo_Nombre, hu.Primer_Apellido, hu.Segundo_Apellido) AS Cliente,
    COALESCE(hu.DNI, hu.Pasaporte) AS Documento,
    h.Numero_Habitacion,
    es.Fecha_Entrada,
    es.Fecha_Salida,
    f.Subtotal,
    f.Descuentos,
    f.Subtotal - f.Descuentos AS Importe_Gravado,
    f.ISV,
    f.Impuesto_Turismo,
    f.Total,
    (SELECT GROUP_CONCAT(DISTINCT m.Nombre_Metodo SEPARATOR ', ')
     FROM Pagos_Factura pf
        INNER JOIN Detalles_Pago_Factura dp ON dp.ID_Pago_Factura = pf.ID_Pago_Factura
        INNER JOIN Metodos_Pago m ON m.ID_Metodo_Pago = dp.ID_Metodo_Pago
     WHERE pf.ID_Factura = f.ID_Factura) AS Metodos_Pago
FROM Facturas_Fiscales f
    INNER JOIN Estancias es ON es.ID_Estancia = f.ID_Estancia
    INNER JOIN Huespedes hu ON hu.ID_Huesped = es.ID_Huesped
    INNER JOIN Habitaciones h ON h.ID_Habitacion = es.ID_Habitacion;


-- V6. Líneas de cada factura
-- Pantalla: 6.2 Cuerpo de la factura SAR (debajo del encabezado de V5)
CREATE OR REPLACE VIEW v_factura_detalle AS
SELECT
    d.ID_Factura,
    f.Numero_Factura,
    d.ID_Detalle_Factura,
    d.Tipo_Concepto,
    COALESCE(cat.Nombre_Categoria, 'Alojamiento') AS Categoria,
    d.Descripcion,
    d.Cantidad,
    d.Precio_Unitario,
    d.Subtotal,
    d.Descuentos,
    d.ISV,
    d.Impuesto_Turismo,
    d.Total
FROM Detalles_Factura d
    INNER JOIN Facturas_Fiscales f ON f.ID_Factura = d.ID_Factura
    LEFT JOIN Consumos_Huesped c ON c.ID_Consumo = d.ID_Consumo
    LEFT JOIN Servicios_Adicionales s ON s.ID_Servicio_Adicional = c.ID_Servicio_Adicional
    LEFT JOIN Categorias_Servicios cat ON cat.ID_Categoria_Servicio = s.ID_Categoria;


-- V7. Ingresos por mes: hospedaje contra servicios
-- Pantalla: 8.1 Dashboard gerencial
CREATE OR REPLACE VIEW v_ingresos_mensuales AS
SELECT
    DATE_FORMAT(f.Fecha_Emision, '%Y-%m') AS Mes,
    COUNT(DISTINCT f.ID_Factura) AS Facturas,
    SUM(CASE WHEN d.Tipo_Concepto = 'ALOJAMIENTO' THEN d.Cantidad ELSE 0 END) AS Noches_Vendidas,
    SUM(CASE WHEN d.Tipo_Concepto = 'ALOJAMIENTO' THEN d.Subtotal - d.Descuentos ELSE 0 END) AS Ingreso_Hospedaje,
    SUM(CASE WHEN d.Tipo_Concepto = 'CONSUMO' THEN d.Subtotal - d.Descuentos ELSE 0 END) AS Ingreso_Servicios,
    SUM(d.Subtotal - d.Descuentos) AS Ingreso_Neto,
    SUM(d.ISV) AS ISV,
    SUM(d.Impuesto_Turismo) AS Impuesto_Turismo,
    SUM(d.Total) AS Total_Facturado
FROM Facturas_Fiscales f
    INNER JOIN Detalles_Factura d ON d.ID_Factura = f.ID_Factura
GROUP BY DATE_FORMAT(f.Fecha_Emision, '%Y-%m');

-- PARTE 2: ÍNDICES DE OPTIMIZACIÓN 
CREATE INDEX IX_Estancias_Habitacion_Fechas ON Estancias (ID_Habitacion, Fecha_Entrada, Fecha_Salida);

-- Cruce de fechas en el motor de reservas (C3 y C4)
CREATE INDEX IX_Reservaciones_Fechas_Estado ON Reservaciones (Fecha_Entrada_Esperada, Fecha_Salida_Esperada, Estado);

-- Historial de facturas por fecha (C12) e ingresos por mes (V7)
CREATE INDEX IX_Facturas_Fecha_Emision ON Facturas_Fiscales (Fecha_Emision);


