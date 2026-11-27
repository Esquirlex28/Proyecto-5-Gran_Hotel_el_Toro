-- Vistas e índices de la base del hotel
USE GranHotelElToro;

-- Catálogo de habitaciones con su tipo, piso, tarifa, estado y comodidades.
-- Sirve para administrar habitaciones, mostrar el catálogo al cliente y buscar disponibilidad.
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


-- Estado actual de cada habitación, su color y el huésped que la ocupa.
-- Sirve para el rack por piso, el tablero de limpieza y elegir habitaciones ocupadas para cargar consumos.
CREATE OR REPLACE VIEW v_estado_habitaciones AS
SELECT
    p.ID_Piso,
    p.Nombre_Piso,
    h.ID_Habitacion,
    h.Numero_Habitacion,
    t.Nombre_Tipo,
    e.ID_Estado_Habitacion,
    e.Nombre_Estado,
-- Color del rack según el estado
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


-- Reservaciones con huésped, habitación, noches, monto y estado en texto.
-- Sirve para que el cliente vea sus reservaciones y para las llegadas del día en recepción.
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


-- Estado de cuenta de las habitaciones ocupadas: hospedaje hasta hoy más consumos sin facturar.
-- Sirve para el check-out y la liquidación de la cuenta.
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


-- Encabezado de cada factura con los datos SAR, el cliente, los impuestos y los métodos de pago.
-- Sirve para mostrar la factura y el historial de facturas.
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


-- Líneas de cada factura: alojamiento y consumos con su ISV e impuesto turístico.
-- Sirve para el detalle de la factura.
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


-- Ingresos por mes separados en hospedaje y servicios.
-- Sirve para las estadísticas del dashboard.
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

-- Índices (se crean una sola vez)

-- Búsqueda de estancias por habitación y fechas
CREATE INDEX IX_Estancias_Habitacion_Fechas ON Estancias (ID_Habitacion, Fecha_Entrada, Fecha_Salida);

-- Revisar si las fechas de una reservación chocan con otra
CREATE INDEX IX_Reservaciones_Fechas_Estado ON Reservaciones (Fecha_Entrada_Esperada, Fecha_Salida_Esperada, Estado);

-- Buscar facturas por fecha
CREATE INDEX IX_Facturas_Fecha_Emision ON Facturas_Fiscales (Fecha_Emision);


