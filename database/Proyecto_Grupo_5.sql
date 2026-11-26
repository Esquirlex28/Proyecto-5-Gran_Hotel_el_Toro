CREATE DATABASE IF NOT EXISTS GranHotelElToro
CHARACTER SET utf8mb4 -- Usa explicitamente el mapa de símbolos, incluye caracteres especiales
COLLATE utf8mb4_unicode_ci; -- Define la evaluación de textos para determinar si son iguales, ci no distingue entre mayúsculas y minúsculas, ni entre vocales con o sin tilde 

USE GranHotelElToro;

-- Creacion de Tablas Relacionadas a las Habitaciones

CREATE TABLE Pisos (
	ID_Piso INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Piso VARCHAR(25) UNIQUE NOT NULL,
    Nombre_Piso VARCHAR(50) NOT NULL,
    Capacidad_Habitaciones INT NOT NULL,
    Observaciones VARCHAR(500)
)ENGINE=InnoDB; -- ENGINE=InnoDB sirve para foregin key obligatorias y transacciones ACID

CREATE TABLE Estados_Habitacion (
	ID_Estado_Habitacion INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Estado VARCHAR(100) NOT NULL,
    Observaciones VARCHAR(500)
)ENGINE=InnoDB;

CREATE TABLE Catalogo_Comodidades (
	ID_Comodidad INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Comodidad VARCHAR(100) NOT NULL,
    Estado INT NOT NULL DEFAULT 1
)ENGINE=InnoDB;

CREATE TABLE Tipos_Habitacion (
	ID_Tipo_Habitacion INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Tipo VARCHAR(100) NOT NULL,
    Capacidad_Maxima INT NOT NULL,
    Tarifa_Base DECIMAL(10,2) NOT NULL,
    CONSTRAINT CK_Capacidad_Maxima CHECK (Capacidad_Maxima > 0),
    CONSTRAINT CK_Tarifa_Positiva CHECK (Tarifa_Base > 0)
)ENGINE=InnoDB;

CREATE TABLE Tipo_Habitacion_Comodidades (
	ID_Tipo_Habitacion_Comodidad INT AUTO_INCREMENT PRIMARY KEY,
    ID_Tipo_Habitacion INT NOT NULL,
    ID_Comodidad INT NOT NULL,
    Observaciones VARCHAR(250),
    CONSTRAINT FK_Tipo_Habitacion_Comodidad FOREIGN KEY (ID_Tipo_Habitacion) REFERENCES Tipos_Habitacion(ID_Tipo_Habitacion),
    CONSTRAINT FK_Comodidad FOREIGN KEY (ID_Comodidad) REFERENCES Catalogo_Comodidades(ID_Comodidad)
)ENGINE=InnoDB;

CREATE TABLE Habitaciones (
	ID_Habitacion INT AUTO_INCREMENT PRIMARY KEY,
    Numero_Habitacion INT NOT NULL UNIQUE,
    ID_Tipo_Habitacion INT NOT NULL,
    ID_Piso INT NOT NULL,
    Tipo_Vista VARCHAR(500) NOT NULL,
    ID_Estado_Habitacion INT NOT NULL,
	CONSTRAINT FK_Habitacion_Tipo FOREIGN KEY (ID_Tipo_Habitacion) REFERENCES Tipos_Habitacion(ID_Tipo_Habitacion),
	CONSTRAINT FK_Habitacion_Piso FOREIGN KEY (ID_Piso) REFERENCES Pisos(ID_Piso),
    CONSTRAINT FK_Habitacion_Estado FOREIGN KEY (ID_Estado_Habitacion) REFERENCES Estados_Habitacion(ID_Estado_Habitacion),
    CONSTRAINT CK_Numero_Valido CHECK (Numero_Habitacion > 0)
)ENGINE=InnoDB;

-- Creación de tablas relacionadas al Huésped

CREATE TABLE Paises(
	ID_Pais INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Pais VARCHAR(100) NOT NULL,
    Nacionalidad VARCHAR(100) NOT NULL,
    Estado INT NOT NULL DEFAULT 1
)ENGINE=InnoDB; 

CREATE TABLE Huespedes (
	ID_Huesped INT AUTO_INCREMENT PRIMARY KEY,
    ID_Pais INT NOT NULL,
    DNI VARCHAR(14) NULL UNIQUE,
    Pasaporte VARCHAR(30) NULL UNIQUE,
    Primer_Nombre VARCHAR(100) NOT NULL,
    Segundo_Nombre VARCHAR(100),
    Primer_Apellido VARCHAR(100) NOT NULL,
    Segundo_Apellido VARCHAR(100),
    Telefono VARCHAR(20) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo INT NOT NULL,
    CONSTRAINT FK_Huesped_Pais FOREIGN KEY (ID_Pais) REFERENCES Paises(ID_Pais),
    CONSTRAINT CK_Huesped_Valido CHECK(DNI IS NOT NULL OR Pasaporte IS NOT NULL)
)ENGINE=InnoDB;

CREATE TABLE Usuarios_Huesped (
    ID_Usuario_Huesped INT AUTO_INCREMENT PRIMARY KEY,
    ID_Huesped INT NOT NULL UNIQUE,
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    Contraseña_Hash VARCHAR(500) NOT NULL,
    Estado INT NOT NULL,
    CONSTRAINT FK_Usuario_Huesped FOREIGN KEY (ID_Huesped) REFERENCES Huespedes(ID_Huesped)
) ENGINE=InnoDB;

-- Creación de tablas relacionadas a los empleados

CREATE TABLE Cargos_Empleado (
	ID_Cargo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Cargo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Salario_Base DECIMAL(10,2) NOT NULL,
    CONSTRAINT CK_Salario_Base_Valido CHECK (Salario_Base > 0)
)ENGINE=InnoDB;

CREATE TABLE Empleados (
	ID_Empleado INT AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(14) NOT NULL UNIQUE,
    Primer_Nombre VARCHAR(100) NOT NULL,
    Segundo_Nombre VARCHAR(100),
    Primer_Apellido VARCHAR(100) NOT NULL,
    Segundo_Apellido VARCHAR(100),
    Telefono VARCHAR(20) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo INT NOT NULL,
    ID_Cargo INT NOT NULL,
    Estado INT NOT NULL DEFAULT 1,
    Salario DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Empleado_Cargo FOREIGN KEY (ID_Cargo) REFERENCES Cargos_Empleado(ID_Cargo),
    CONSTRAINT CK_Salario_Valido CHECK (Salario > 0)
)ENGINE=InnoDB;

CREATE TABLE Usuarios_Empleado (
    ID_Usuario_Empleado INT AUTO_INCREMENT PRIMARY KEY,
    ID_Empleado INT NOT NULL UNIQUE,
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    Contraseña_Hash VARCHAR(500) NOT NULL,
    Estado INT NOT NULL,
    CONSTRAINT FK_Usuario_Empleado FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado)
) ENGINE=InnoDB;

-- Creación de tablas relacionadas a la reservación, servicios y estancias 

CREATE TABLE Reservaciones (
	ID_Reservacion INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Reservacion VARCHAR(20) NOT NULL UNIQUE,
    ID_Huesped INT NOT NULL,
    Fecha_Emision DATE NOT NULL DEFAULT (CURDATE()),
    Fecha_Entrada_Esperada DATE NOT NULL,
    Fecha_Salida_Esperada DATE NOT NULL,
    Estado INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Reservacion_Huesped FOREIGN KEY (ID_Huesped) REFERENCES Huespedes(ID_Huesped),
	CONSTRAINT CK_Reservacion_Fechas CHECK (
		Fecha_Entrada_Esperada >= Fecha_Emision 
		AND Fecha_Salida_Esperada > Fecha_Entrada_Esperada
)
)ENGINE=InnoDB;

CREATE TABLE Detalle_Reservacion (
	ID_Detalle_Reservacion INT AUTO_INCREMENT PRIMARY KEY,
    ID_Habitacion INT NOT NULL,
    ID_Reservacion INT NOT NULL,
    Descripcion VARCHAR(500),
    CONSTRAINT FK_Detalle_Habitacion FOREIGN KEY (ID_Habitacion) REFERENCES Habitaciones(ID_Habitacion),
    CONSTRAINT FK_Detalle_Reserva FOREIGN KEY (ID_Reservacion) REFERENCES Reservaciones(ID_Reservacion)
)ENGINE=InnoDB;

CREATE TABLE Categorias_Servicios (
	ID_Categoria_Servicio INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Categoria VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500),
    Estado INT NOT NULL DEFAULT 1
)ENGINE=InnoDB;

CREATE TABLE Servicios_Adicionales (
	ID_Servicio_Adicional INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Servicio VARCHAR(20) NOT NULL UNIQUE,
    Nombre_servicio VARCHAR(100) NOT NULL,
    ID_Categoria INT NOT NULL,
    Precio_Unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Servicio_Categoria FOREIGN KEY (ID_Categoria) REFERENCES Categorias_Servicios(ID_Categoria_Servicio),
    CONSTRAINT CK_Costo_Valido CHECK(Precio_Unitario > 0)
)ENGINE=InnoDB;

CREATE TABLE Reservacion_Servicios (
    ID_Reservacion_Servicio INT AUTO_INCREMENT PRIMARY KEY,
    ID_Reservacion INT NOT NULL,
    ID_Servicio_Adicional INT NOT NULL,
    Fecha_Servicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10,2) NOT NULL,
    Total_Servicio DECIMAL(10,2) NOT NULL,
    Estado INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_ResServicio_Reservacion FOREIGN KEY (ID_Reservacion) REFERENCES Reservaciones(ID_Reservacion),
    CONSTRAINT FK_ResServicio_Servicio FOREIGN KEY (ID_Servicio_Adicional) REFERENCES Servicios_Adicionales(ID_Servicio_Adicional),
    CONSTRAINT CK_ResServicio_Valores CHECK (
        Cantidad > 0 AND Precio_Unitario > 0 AND Total_Servicio > 0
    )
) ENGINE=InnoDB;

CREATE TABLE Estancias (
	ID_Estancia INT AUTO_INCREMENT PRIMARY KEY,
    ID_Huesped INT NOT NULL,
    ID_Reservacion INT NOT NULL,
    Fecha_Entrada DATETIME NOT NULL,
    Fecha_Salida DATETIME,
    ID_Empleado INT NOT NULL,
    ID_Habitacion INT NOT NULL,
    CONSTRAINT FK_Estancia_Huesped FOREIGN KEY (ID_Huesped) REFERENCES Huespedes(ID_Huesped),
    CONSTRAINT FK_Estancia_Reservacion FOREIGN KEY (ID_Reservacion) REFERENCES Reservaciones(ID_Reservacion),
    CONSTRAINT FK_Estancia_Empleado FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado),
    CONSTRAINT FK_Estancia_Habitacion FOREIGN KEY (ID_Habitacion) REFERENCES Habitaciones(ID_Habitacion),
    CONSTRAINT CK_Estancia_Fechas CHECK (
		Fecha_Salida > Fecha_Entrada
)
)ENGINE=InnoDB;

-- Creacion de tablas relacionadas al acompañante y consumos 

CREATE TABLE Acompañantes (
	ID_Acompañante INT AUTO_INCREMENT PRIMARY KEY,
    ID_Estancia INT NOT NULL,
    DNI VARCHAR(14) NULL UNIQUE,
	Pasaporte VARCHAR(30) NULL UNIQUE,
	Primer_Nombre VARCHAR(100) NOT NULL,
    Segundo_Nombre VARCHAR(100),
    Primer_Apellido VARCHAR(100) NOT NULL,
    Segundo_Apellido VARCHAR(100),
    FechaNacimiento DATE NOT NULL,
    Sexo INT NOT NULL,
    CONSTRAINT FK_Acompañante_Estancia FOREIGN KEY (ID_Estancia) REFERENCES Estancias(ID_Estancia)
)ENGINE=InnoDB;

CREATE TABLE Consumos_Huesped (
	ID_Consumo INT AUTO_INCREMENT PRIMARY KEY,
    ID_Estancia INT NOT NULL,
    ID_Servicio_Adicional INT NOT NULL,
    ID_Empleado INT NOT NULL,
    Fecha_Consumo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Cantidad_Consumo INT NOT NULL,
    Precio_Unitario DECIMAL(10,2) NOT NULL,
    Total_Consumo  DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Consumo_Estancia FOREIGN KEY (ID_Estancia) REFERENCES Estancias(ID_Estancia),
    CONSTRAINT FK_Consumo_Servicio FOREIGN KEY (ID_Servicio_Adicional) REFERENCES Servicios_Adicionales(ID_Servicio_Adicional),
    CONSTRAINT FK_Consumo_Empleado FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado),
    CONSTRAINT CK_Valores_Validos CHECK (
		Cantidad_Consumo > 0 AND Precio_Unitario > 0 AND Total_Consumo > 0
)
)ENGINE=InnoDB;

-- Creación de tablas relacionadas a Facturación y Pagos

CREATE TABLE Facturas_Fiscales (
    ID_Factura INT AUTO_INCREMENT PRIMARY KEY,
    ID_Estancia INT NOT NULL,
    CAI VARCHAR(50) NOT NULL,
    Numero_Factura VARCHAR(20) NOT NULL UNIQUE,
    RTN VARCHAR(15) NULL,
    Fecha_Emision DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Subtotal DECIMAL(10,2) NOT NULL,
    Descuentos DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    Impuestos DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Factura_Estancia FOREIGN KEY (ID_Estancia) REFERENCES Estancias(ID_Estancia),
    CONSTRAINT CK_Factura_Montos CHECK (
        Subtotal >= 0 AND Descuentos >= 0 AND Impuestos >= 0 AND Total >= 0
    )
) ENGINE=InnoDB;

CREATE TABLE Detalles_Factura (
    ID_Detalle_Factura INT AUTO_INCREMENT PRIMARY KEY,
    ID_Factura INT NOT NULL,
    ID_Estancia INT NULL,
    ID_Consumo INT NULL,
    Tipo_Concepto VARCHAR(25) NOT NULL,
    Descripcion VARCHAR(250) NOT NULL,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    Descuentos DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    ISV DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_DetalleFactura_Factura FOREIGN KEY (ID_Factura) REFERENCES Facturas_Fiscales(ID_Factura),
    CONSTRAINT FK_DetalleFactura_Estancia FOREIGN KEY (ID_Estancia) REFERENCES Estancias(ID_Estancia),
    CONSTRAINT FK_DetalleFactura_Consumo FOREIGN KEY (ID_Consumo) REFERENCES Consumos_Huesped(ID_Consumo),
    CONSTRAINT CK_DetalleFactura_Origen CHECK (
        (Tipo_Concepto = 'ALOJAMIENTO' AND ID_Estancia IS NOT NULL AND ID_Consumo IS NULL) OR
        (Tipo_Concepto = 'CONSUMO' AND ID_Consumo IS NOT NULL AND ID_Estancia IS NULL)
    ),
    CONSTRAINT CK_DetalleFactura_Valores CHECK (
        Cantidad > 0 AND Precio_Unitario > 0 AND Subtotal > 0 AND Total >= 0
    )
) ENGINE=InnoDB;

CREATE TABLE Metodos_Pago (
    ID_Metodo_Pago INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Metodo VARCHAR(100) NOT NULL,
    Codigo VARCHAR(10) NOT NULL UNIQUE,
    Descripcion VARCHAR(500),
    Estado INT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE Tarjetas_Pago (
    ID_Tarjeta INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_Tarjeta VARCHAR(20) NOT NULL,
    Marca VARCHAR(50) NULL,
    Ultimos_Cuatro_Digitos VARCHAR(4) NOT NULL,
    Nombre_Titular VARCHAR(150) NOT NULL,
    Mes_Expiracion INT NOT NULL,
    Año_Expiracion INT NOT NULL,
    Banco_Emisor VARCHAR(100) NOT NULL,
    Token_Pasarela VARCHAR(250) NOT NULL,
    CONSTRAINT CK_Mes_Expiracion CHECK (Mes_Expiracion BETWEEN 1 AND 12)
) ENGINE=InnoDB;

CREATE TABLE Pagos_Factura (
    ID_Pago_Factura INT AUTO_INCREMENT PRIMARY KEY,
    ID_Factura INT NOT NULL,
    ID_Huesped INT NOT NULL,
    Monto_Total DECIMAL(10,2) NOT NULL,
    Fecha_Pago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Pago_Factura FOREIGN KEY (ID_Factura) REFERENCES Facturas_Fiscales(ID_Factura),
    CONSTRAINT FK_Pago_Huesped FOREIGN KEY (ID_Huesped) REFERENCES Huespedes(ID_Huesped),
    CONSTRAINT CK_Monto_Total_Pago CHECK (Monto_Total > 0)
) ENGINE=InnoDB;

CREATE TABLE Detalles_Pago_Factura (
    ID_Detalle_Pago INT AUTO_INCREMENT PRIMARY KEY,
    ID_Pago_Factura INT NOT NULL,
    ID_Metodo_Pago INT NOT NULL,
    Monto_Pagado DECIMAL(10,2) NOT NULL,
    Monto_Recibido DECIMAL(10,2) NULL,
    Cambio_Devuelto DECIMAL(10,2) NULL,
    Numero_Referencia VARCHAR(50) NULL,
    Banco VARCHAR(100) NULL,
    Cuenta_Origen VARCHAR(50) NULL,
    Numero_Cheque VARCHAR(30) NULL,
    Fecha_Referencia DATE NULL,
    ID_Tarjeta INT NULL,
    Codigo_Autorizacion VARCHAR(30) NULL,
    Observaciones VARCHAR(250) NULL,
    CONSTRAINT FK_DetallePago_PagoFactura FOREIGN KEY (ID_Pago_Factura) REFERENCES Pagos_Factura(ID_Pago_Factura),
    CONSTRAINT FK_DetallePago_Metodo FOREIGN KEY (ID_Metodo_Pago) REFERENCES Metodos_Pago(ID_Metodo_Pago),
    CONSTRAINT FK_DetallePago_Tarjeta FOREIGN KEY (ID_Tarjeta) REFERENCES Tarjetas_Pago(ID_Tarjeta),
    CONSTRAINT CK_Monto_Pagado_Valido CHECK (Monto_Pagado > 0)
) ENGINE=InnoDB;
