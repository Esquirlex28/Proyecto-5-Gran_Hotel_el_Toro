USE GranHotelElToro;

-- Consultas para el backend.

-- LOGIN 
SELECT u.ID_Usuario_Empleado, u.ID_Empleado, u.Usuario, u.Contraseña_Hash,
       CONCAT(e.Primer_Nombre, ' ', e.Primer_Apellido) AS Nombre,
       c.Nombre_Cargo AS Rol
FROM Usuarios_Empleado AS u
INNER JOIN Empleados AS e ON e.ID_Empleado = u.ID_Empleado
INNER JOIN Cargos_Empleado AS c ON c.ID_Cargo = e.ID_Cargo
WHERE u.Usuario = ? AND u.Estado = 1;

-- Cliente
SELECT u.ID_Usuario_Huesped, u.ID_Huesped, u.Usuario, u.Contraseña_Hash,
       CONCAT(h.Primer_Nombre, ' ', h.Primer_Apellido) AS Nombre
FROM Usuarios_Huesped AS u
INNER JOIN Huespedes AS h ON h.ID_Huesped = u.ID_Huesped
WHERE u.Usuario = ? AND u.Estado = 1;

-- Todas las habitaciones
SELECT * FROM v_catalogo_habitaciones ORDER BY Numero_Habitacion;

-- Todos los clientes
SELECT h.ID_Huesped, h.DNI, h.Pasaporte,
       CONCAT(h.Primer_Nombre, ' ', h.Primer_Apellido) AS Nombre,
       h.Telefono, h.Correo, p.Nombre_Pais
FROM Huespedes AS h
INNER JOIN Paises AS p ON p.ID_Pais = h.ID_Pais
ORDER BY h.Primer_Apellido;

-- Cambiar el estado de una habitacion 
UPDATE Habitaciones
SET ID_Estado_Habitacion = (SELECT ID_Estado_Habitacion FROM Estados_Habitacion WHERE Nombre_Estado = ?)
WHERE ID_Habitacion = ?;

-- RACK DE HABITACIONES 
SELECT * FROM v_estado_habitaciones ORDER BY ID_Piso, Numero_Habitacion;

-- Habitaciones libres entre dos fechas.
SELECT h.ID_Habitacion, h.Numero_Habitacion, t.Nombre_Tipo, t.Capacidad_Maxima, t.Tarifa_Base
FROM Habitaciones AS h
INNER JOIN Tipos_Habitacion AS t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion
INNER JOIN Estados_Habitacion AS e ON e.ID_Estado_Habitacion = h.ID_Estado_Habitacion
WHERE e.Nombre_Estado <> 'Mantenimiento'
  AND t.Capacidad_Maxima >= ?
  AND h.ID_Habitacion NOT IN (
        SELECT d.ID_Habitacion
        FROM Detalle_Reservacion AS d
        INNER JOIN Reservaciones AS r ON r.ID_Reservacion = d.ID_Reservacion
        WHERE r.Estado IN (1, 2)
          AND r.Fecha_Entrada_Esperada < ?
          AND r.Fecha_Salida_Esperada > ?
  );

-- Cotizacion: noches por tarifa
SELECT t.Tarifa_Base,
       DATEDIFF(?, ?) AS Noches,
       DATEDIFF(?, ?) * t.Tarifa_Base AS Total_Hospedaje
FROM Habitaciones AS h
INNER JOIN Tipos_Habitacion AS t ON t.ID_Tipo_Habitacion = h.ID_Tipo_Habitacion
WHERE h.ID_Habitacion = ?;

-- Guardar la reservacion
INSERT INTO Reservaciones (Codigo_Reservacion, ID_Huesped, Fecha_Entrada_Esperada, Fecha_Salida_Esperada, Estado)
VALUES (?, ?, ?, ?, 1);

INSERT INTO Detalle_Reservacion (ID_Habitacion, ID_Reservacion)
VALUES (?, LAST_INSERT_ID());

-- Anticipo
INSERT INTO Anticipos_Reservacion (ID_Reservacion, ID_Metodo_Pago, Monto)
VALUES (?, ?, ?);

-- Reservaciones de un cliente o llegadas de hoy
SELECT * FROM v_reservaciones_detalle WHERE ID_Huesped = ?;
SELECT * FROM v_reservaciones_detalle WHERE Fecha_Entrada_Esperada = CURDATE() AND Estado = 1;

-- Cancelar
UPDATE Reservaciones SET Estado = 4 WHERE ID_Reservacion = ? AND Estado = 1;

-- Ver si el huesped ya esta registrado
SELECT ID_Huesped, Primer_Nombre, Primer_Apellido, Telefono, Correo
FROM Huespedes
WHERE DNI = ? OR Pasaporte = ?;

-- Registrar la estancia
INSERT INTO Estancias (ID_Huesped, ID_Reservacion, Fecha_Entrada, ID_Empleado, ID_Habitacion)
VALUES (?, ?, NOW(), ?, ?);

-- Acompañantes (uno por cada acompañante)
INSERT INTO Acompañantes (ID_Estancia, DNI, Pasaporte, Primer_Nombre, Primer_Apellido, FechaNacimiento, Sexo)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- La habitacion pasa a Ocupada y la reservacion a En curso
UPDATE Habitaciones
SET ID_Estado_Habitacion = (SELECT ID_Estado_Habitacion FROM Estados_Habitacion WHERE Nombre_Estado = 'Ocupada')
WHERE ID_Habitacion = ?;

UPDATE Reservaciones SET Estado = 2 WHERE ID_Reservacion = ?;

-- Servicios disponibles
SELECT s.ID_Servicio_Adicional, s.Nombre_servicio, s.Precio_Unitario, c.Nombre_Categoria
FROM Servicios_Adicionales AS s
INNER JOIN Categorias_Servicios AS c ON c.ID_Categoria_Servicio = s.ID_Categoria
WHERE c.Estado = 1
ORDER BY c.Nombre_Categoria;

-- Habitaciones ocupadas (para elegir a cual cargar)
SELECT ID_Estancia, Numero_Habitacion, Huesped_Actual
FROM v_estado_habitaciones
WHERE Nombre_Estado = 'Ocupada';

-- Cargar un consumo a la habitacion
INSERT INTO Consumos_Huesped (ID_Estancia, ID_Servicio_Adicional, ID_Empleado, Cantidad_Consumo, Precio_Unitario, Total_Consumo)
VALUES (?, ?, ?, ?, ?, ?);

-- Consumos de una estancia
SELECT c.Fecha_Consumo, s.Nombre_servicio, c.Cantidad_Consumo, c.Precio_Unitario, c.Total_Consumo
FROM Consumos_Huesped AS c
INNER JOIN Servicios_Adicionales AS s ON s.ID_Servicio_Adicional = c.ID_Servicio_Adicional
WHERE c.ID_Estancia = ?
ORDER BY c.Fecha_Consumo;

-- Estado de cuenta en vivo de una habitacion ocupada
SELECT * FROM v_estado_cuenta WHERE Numero_Habitacion = ?;

-- Consumos que todavia no se han facturado
SELECT c.ID_Consumo, s.Nombre_servicio, c.Cantidad_Consumo, c.Precio_Unitario, c.Total_Consumo
FROM Consumos_Huesped AS c
INNER JOIN Servicios_Adicionales AS s ON s.ID_Servicio_Adicional = c.ID_Servicio_Adicional
WHERE c.ID_Estancia = ?
  AND c.ID_Consumo NOT IN (SELECT ID_Consumo FROM Detalles_Factura WHERE ID_Consumo IS NOT NULL);

-- Ultimo numero de factura emitido 
SELECT Numero_Factura FROM Facturas_Fiscales ORDER BY ID_Factura DESC LIMIT 1;

-- Cerrar la estancia
UPDATE Estancias SET Fecha_Salida = NOW() WHERE ID_Estancia = ?;

-- Factura. Impuestos = ISV + Impuesto_Turismo
INSERT INTO Facturas_Fiscales (ID_Estancia, CAI, Numero_Factura, RTN, Subtotal, Descuentos, ISV, Impuesto_Turismo, Impuestos, Total)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Linea de alojamiento
INSERT INTO Detalles_Factura (ID_Factura, ID_Estancia, Tipo_Concepto, Descripcion, Cantidad, Precio_Unitario, Subtotal, Descuentos, ISV, Impuesto_Turismo, Total)
VALUES (?, ?, 'ALOJAMIENTO', ?, ?, ?, ?, ?, ?, ?, ?);

-- Linea de un consumo 
INSERT INTO Detalles_Factura (ID_Factura, ID_Consumo, Tipo_Concepto, Descripcion, Cantidad, Precio_Unitario, Subtotal, ISV, Total)
VALUES (?, ?, 'CONSUMO', ?, ?, ?, ?, ?, ?);

-- Pago
INSERT INTO Pagos_Factura (ID_Factura, ID_Huesped, Monto_Total) VALUES (?, ?, ?);

INSERT INTO Detalles_Pago_Factura (ID_Pago_Factura, ID_Metodo_Pago, Monto_Pagado, Monto_Recibido, Cambio_Devuelto, Numero_Referencia)
VALUES (?, ?, ?, ?, ?, ?);

-- La reservacion termina y la habitacion queda Sucia
UPDATE Reservaciones SET Estado = 3 WHERE ID_Reservacion = ?;

UPDATE Habitaciones
SET ID_Estado_Habitacion = (SELECT ID_Estado_Habitacion FROM Estados_Habitacion WHERE Nombre_Estado = 'Sucia')
WHERE ID_Habitacion = ?;

-- Facturas ya emitidas
SELECT * FROM v_facturas_emitidas ORDER BY Fecha_Emision DESC;
SELECT * FROM v_factura_detalle WHERE ID_Factura = ?;

-- Revisar que la factura quede pagada completa
SELECT f.Total, SUM(p.Monto_Total) AS Pagado, f.Total - SUM(p.Monto_Total) AS Saldo
FROM Facturas_Fiscales AS f
INNER JOIN Pagos_Factura AS p ON p.ID_Factura = f.ID_Factura
WHERE f.ID_Factura = ?
GROUP BY f.ID_Factura, f.Total;

-- Habitaciones sucias
SELECT ID_Habitacion, Numero_Habitacion, Nombre_Piso, Nombre_Tipo
FROM v_estado_habitaciones
WHERE Nombre_Estado = 'Sucia'
ORDER BY ID_Piso, Numero_Habitacion;

-- Marcar como limpia
UPDATE Habitaciones
SET ID_Estado_Habitacion = (SELECT ID_Estado_Habitacion FROM Estados_Habitacion WHERE Nombre_Estado = 'Disponible')
WHERE ID_Habitacion = ?;

-- Para probar en Workbench se definen el año y el mes:
SET @anio = 2026;
SET @mes = 11;

-- Porcentaje de ocupacion del mes por tipo de habitacion
SELECT t.Nombre_Tipo,
       COUNT(DISTINCT h.ID_Habitacion) AS Habitaciones,
       COALESCE(SUM(DATEDIFF(e.Fecha_Salida, e.Fecha_Entrada)), 0) AS Noches_Ocupadas,
       ROUND(COALESCE(SUM(DATEDIFF(e.Fecha_Salida, e.Fecha_Entrada)), 0)
             / (COUNT(DISTINCT h.ID_Habitacion) * DAY(LAST_DAY(CONCAT(@anio, '-', @mes, '-01'))))
             * 100, 2) AS Porcentaje_Ocupacion
FROM Tipos_Habitacion AS t
INNER JOIN Habitaciones AS h ON h.ID_Tipo_Habitacion = t.ID_Tipo_Habitacion
LEFT JOIN Estancias AS e ON e.ID_Habitacion = h.ID_Habitacion
                     AND YEAR(e.Fecha_Entrada) = @anio
                     AND MONTH(e.Fecha_Entrada) = @mes
                     AND e.Fecha_Salida IS NOT NULL
GROUP BY t.ID_Tipo_Habitacion, t.Nombre_Tipo;

-- Ingresos de hospedaje contra servicios, por mes
SELECT * FROM v_ingresos_mensuales ORDER BY Mes;

-- Ingreso promedio por habitacion disponible del mes
SELECT ROUND(SUM(d.Subtotal - d.Descuentos) /
       ((SELECT COUNT(*) FROM Habitaciones) * DAY(LAST_DAY(CONCAT(@anio, '-', @mes, '-01')))), 2) AS Ingreso_Promedio_Habitacion
FROM Facturas_Fiscales AS f
INNER JOIN Detalles_Factura AS d ON d.ID_Factura = f.ID_Factura
WHERE d.Tipo_Concepto = 'ALOJAMIENTO'
  AND YEAR(f.Fecha_Emision) = @anio
  AND MONTH(f.Fecha_Emision) = @mes;

-- Resumen del dia
SELECT
  (SELECT COUNT(*) FROM Estancias WHERE Fecha_Salida IS NULL) AS Huespedes_en_hotel,
  (SELECT COUNT(*) FROM Reservaciones WHERE Fecha_Entrada_Esperada = CURDATE() AND Estado = 1) AS Llegadas_hoy,
  (SELECT COUNT(*) FROM v_estado_habitaciones WHERE Nombre_Estado = 'Sucia') AS Habitaciones_sucias;