-- REGISTROS DE PRUEBA: catálogos completos y pocas transacciones, para probar el frontend juan

USE GranHotelElToro;

-- Estos son los códigos de estado usados en los datos para los que piden en los datos en el fronted:
-- Reservaciones.Estado: 1 = Confirmada, 2 = En curso (check-in hecho), 3 = Finalizada, 4 = Cancelada
-- Reservacion_Servicios.Estado: 1 = Pendiente, 2 = Realizado (se cargó como consumo), 3 = Cancelado
-- Sexo: 1 = Masculino, 2 = Femenino | Estado en catálogos y usuarios: 1 = Activo, 0 = Inactivo

INSERT INTO Pisos (Codigo_Piso, Nombre_Piso, Capacidad_Habitaciones, Observaciones) VALUES
('P-01','Piso 1',5,'Lobby, recepción, restaurante y habitaciones de fácil acceso'),
('P-02','Piso 2',5,'Habitaciones sencillas y dobles deluxe'),
('P-03','Piso 3',5,'Habitaciones sencillas y dobles deluxe'),
('P-04','Piso 4',5,'Habitaciones familiares y dobles deluxe'),
('P-05','Piso 5',5,'Junior suites'),
('P-06','Piso 6',5,'Piso ejecutivo: suites ejecutivas y presidenciales, acceso con tarjeta');

INSERT INTO Estados_Habitacion (Nombre_Estado, Observaciones) VALUES
('Disponible','Limpia, inspeccionada y lista para asignar'),
('Reservada','Asignada a una reservación con llegada próxima'),
('Ocupada','Huésped alojado actualmente'),
('Sucia','Huésped salió, pendiente de limpieza'),
('En limpieza','Camarera trabajando en la habitación'),
('Mantenimiento','Fuera de venta por reparación');

INSERT INTO Catalogo_Comodidades (Nombre_Comodidad, Estado) VALUES
('Aire acondicionado',1),('WiFi de alta velocidad',1),('Smart TV',1),('Caja fuerte',1),
('Minibar',1),('Cafetera Nespresso',1),('Bata y pantuflas',1),('Escritorio de trabajo',1),
('Balcón privado',1),('Tina de hidromasaje',1),('Sala de estar',1),('Sofá cama',1),
('Cocineta',1),('Comedor privado',1),('Servicio de mayordomo',1),('Terraza con vista panorámica',1);

INSERT INTO Tipos_Habitacion (Nombre_Tipo, Capacidad_Maxima, Tarifa_Base) VALUES
('Sencilla Deluxe',1,3200.00),
('Doble Deluxe',2,4200.00),
('Junior Suite',3,6500.00),
('Suite Ejecutiva',2,8900.00),
('Familiar',5,7200.00),
('Suite Presidencial',4,16500.00);

INSERT INTO Tipo_Habitacion_Comodidades (ID_Tipo_Habitacion, ID_Comodidad, Observaciones) VALUES
(1,1,NULL),
(1,2,NULL),
(1,3,'Pantalla de 43 pulgadas'),
(1,4,NULL),
(1,5,NULL),
(1,7,NULL),
(1,8,NULL),
(2,1,NULL),
(2,2,NULL),
(2,3,'Pantalla de 50 pulgadas'),
(2,4,NULL),
(2,5,NULL),
(2,6,NULL),
(2,7,NULL),
(2,9,'Balcón con dos sillas'),
(3,1,NULL),
(3,2,NULL),
(3,3,'Pantalla de 55 pulgadas'),
(3,4,NULL),
(3,5,NULL),
(3,6,NULL),
(3,7,NULL),
(3,9,'Balcón con vista a las montañas'),
(3,11,NULL),
(3,12,'Sofá cama individual'),
(4,1,NULL),
(4,2,NULL),
(4,3,'Pantalla de 55 pulgadas'),
(4,4,NULL),
(4,5,NULL),
(4,6,NULL),
(4,7,NULL),
(4,8,'Escritorio ejecutivo con impresora'),
(4,10,'Tina de hidromasaje para dos personas'),
(4,11,NULL),
(5,1,NULL),
(5,2,NULL),
(5,3,'Dos pantallas de 50 pulgadas'),
(5,4,NULL),
(5,5,NULL),
(5,7,NULL),
(5,11,NULL),
(5,12,'Sofá cama matrimonial en sala'),
(5,13,'Microondas, refrigerador y vajilla'),
(6,1,NULL),
(6,2,NULL),
(6,3,'Pantallas de 65 pulgadas en sala y dormitorio'),
(6,4,NULL),
(6,5,NULL),
(6,6,NULL),
(6,7,NULL),
(6,8,NULL),
(6,10,'Tina de hidromasaje para dos personas'),
(6,11,NULL),
(6,14,NULL),
(6,15,'Mayordomo asignado las 24 horas'),
(6,16,'Terraza privada con vista a la ciudad y las montañas');

INSERT INTO Habitaciones (Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista, ID_Estado_Habitacion) VALUES
(101,1,1,'Vista al jardín',1),
(102,2,1,'Vista al jardín',3),
(103,2,1,'Vista al jardín',1),
(104,5,1,'Vista al jardín',1),
(105,5,1,'Vista al jardín',5),
(201,1,2,'Vista a la ciudad',1),
(202,1,2,'Vista a la ciudad',1),
(203,1,2,'Vista a la piscina',2),
(204,2,2,'Vista a las montañas',1),
(205,2,2,'Vista a las montañas',1),
(301,1,3,'Vista a la ciudad',1),
(302,1,3,'Vista a la ciudad',1),
(303,2,3,'Vista a la piscina',1),
(304,2,3,'Vista a las montañas',1),
(305,2,3,'Vista a las montañas',6),
(401,5,4,'Vista a la ciudad',1),
(402,5,4,'Vista a la ciudad',1),
(403,5,4,'Vista a la piscina',1),
(404,2,4,'Vista a las montañas',1),
(405,2,4,'Vista a las montañas',1),
(501,3,5,'Vista a la ciudad',1),
(502,3,5,'Vista a la ciudad',1),
(503,3,5,'Vista a la piscina',1),
(504,3,5,'Vista a las montañas',1),
(505,3,5,'Vista a las montañas',1),
(601,4,6,'Vista a la ciudad',1),
(602,4,6,'Vista a la ciudad',1),
(603,4,6,'Vista a la piscina',4),
(604,6,6,'Vista a las montañas',1),
(605,6,6,'Vista a las montañas',3);

INSERT INTO Paises (Nombre_Pais, Nacionalidad, Estado) VALUES
('Honduras','Hondureña',1),('Guatemala','Guatemalteca',1),('El Salvador','Salvadoreña',1),('Nicaragua','Nicaragüense',1),
('Costa Rica','Costarricense',1),('Panamá','Panameña',1),('México','Mexicana',1),('Estados Unidos','Estadounidense',1),
('Canadá','Canadiense',1),('Colombia','Colombiana',1),('España','Española',1),('Alemania','Alemana',1),
('Brasil','Brasileña',1),('Francia','Francesa',1),('Italia','Italiana',1),('Reino Unido','Británica',1),
('Japón','Japonesa',1),('República Dominicana','Dominicana',1),('Argentina','Argentina',1),('Chile','Chilena',1);

INSERT INTO Huespedes (ID_Pais, DNI, Pasaporte, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Correo, FechaNacimiento, Sexo) VALUES
(1,'0801198512345',NULL,'Juan','Carlos','Pérez','López','+504 9876-5432','juan.perez@correo.com','1985-03-12',1),
(1,'0501199023456',NULL,'María','José','Hernández','Flores','+504 9765-4321','maria.hernandez@correo.com','1990-07-25',2),
(1,'0101198834567',NULL,'Carlos','Eduardo','Mejía','Castillo','+504 9654-3210','carlos.mejia@correo.com','1988-11-02',1),
(1,'0301199366778',NULL,'Marvin','Josué','Ávila','Cortés','+504 9433-1003','marvin.avila@correo.com','1993-10-22',1),
(1,'0801198100112',NULL,'Héctor','Manuel','Rodríguez','Alvarado','+504 9433-1005','hector.rodriguez@correo.com','1981-08-08',1),
(1,'0801199912340',NULL,'Daniela','Sofía','Matamoros','Rivera','+504 9433-1006','daniela.matamoros@correo.com','1999-04-11',2),
(2,NULL,'G12345678','Luis','Fernando','Morales','Gómez','+502 5512-3456','luis.morales@correo.com','1980-01-30',1),
(5,NULL,'C45678901','Sofía','Alejandra','Vargas','Rojas','+506 8312-3456','sofia.vargas@correo.com','1995-04-04',2),
(6,NULL,'P56789012','Ricardo','Andrés','Castro','Mendoza','+507 6612-3456','ricardo.castro@correo.com','1983-08-15',1),
(14,NULL,'FR9900112','Camille','Sophie','Dubois','Laurent','+33 6 12 34 56 78','camille.dubois@correo.com','1988-02-02',2),
(8,NULL,'US5566778','David','Michael','Brown',NULL,'+1 212 555 0199','david.brown@correo.com','1969-11-02',1);

-- Contraseñas guardadas con bcrypt (bcryptjs, costo 10), igual que en el backend.
-- Contraseña de cada cliente: Cliente#2026-<ID_Huesped>  (ejemplo: juan.perez -> Cliente#2026-1)
INSERT INTO Usuarios_Huesped (ID_Huesped, Usuario, Contraseña_Hash, Estado) VALUES
(1,'juan.perez','$2b$10$tor5yIv/8lqkxORITOLUJ.Im82gnMEfpJRFh1Q0iJpS2.ozj22ZIW',1),
(2,'maria.hernandez','$2b$10$Iz7e0973UCzA0jfIJUqWH.D2J3K1IoUjC57dCwS54wwTm5bHRLU5e',1),
(3,'carlos.mejia','$2b$10$MXlPhXAsuRJwWWhMu6PCWuOZVC21qRnLLo2ocP0CRPq4XtIggg6uG',1),
(4,'marvin.avila','$2b$10$0nQWO0N2BX6rw3i/HjEStOOcsohcayVqfPGTdGAGhb3gdgHLAZH6G',1),
(5,'hector.rodriguez','$2b$10$QY0vRCb6wrPTnia6OX7vs.SKzVQFwASZbsr1zRzz3PA0bCz3QvKWy',1),
(6,'daniela.matamoros','$2b$10$EW7ydd9zwzptQVeDz3exTOh/LJFie.QTP1hX3FsN81Pt1523vnvEa',1),
(7,'luis.morales','$2b$10$QR8nDFnhOfwPljDbYVKmhOgsZfKoPsnR9B09FMTaJmWTNeMkHsQIi',0),
(8,'sofia.vargas','$2b$10$X0Z8bnmT7.HYR.IX1VvLhOPVU8zg/k1DHf0xvsyXRQ85bGv9HWLtO',1),
(10,'camille.dubois','$2b$10$4Wvj45rxt98JTNeolNHNxuw99lyJ3rvJMi3uA1HkdTwwqIquSzBae',1),
(11,'david.brown','$2b$10$1hVc4X5JR8WgumGTEYwqfOqyD8zJB8xsqF4ayLk377PBJIMdvP7q.',1);

INSERT INTO Cargos_Empleado (Nombre_Cargo, Descripcion, Salario_Base) VALUES
('Gerente General','Dirige la operación total del hotel',45000.00),
('Recepcionista','Reservaciones, check-in, check-out y cobro',13000.00),
('Gobernanta','Supervisa la limpieza y el estado de las habitaciones',17000.00),
('Camarera','Limpieza de habitaciones y reposición de minibar',10000.00),
('Mesero','Atención en restaurante y room service',9500.00),
('Bartender','Preparación y servicio de bebidas en el bar',10500.00),
('Chef','Dirige la cocina del restaurante',24000.00),
('Terapeuta de Spa','Masajes y tratamientos de bienestar',15000.00),
('Concierge','Tours, traslados y solicitudes especiales',14000.00),
('Chofer','Traslados de huéspedes',11000.00),
('Técnico de Mantenimiento','Reparaciones de habitaciones e instalaciones',13500.00),
('Contador','Control contable y fiscal',25000.00),
('Auxiliar de Lavandería','Lavado y planchado de ropa de huéspedes',9800.00);

INSERT INTO Empleados (DNI, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Correo, FechaNacimiento, Sexo, ID_Cargo, Salario, Estado) VALUES
('0801197512340','Roberto','Antonio','Zelaya','Banegas','+504 9911-0001','roberto.zelaya@hoteltoro.com','1975-04-10',1,1,45000.00,1),
('0801199523451','Karla','Patricia','Ordóñez','Mejía','+504 9911-0002','karla.ordonez@hoteltoro.com','1995-08-21',2,2,13500.00,1),
('0501199034562','José','Manuel','Aguilar','Pineda','+504 9911-0003','jose.aguilar@hoteltoro.com','1990-01-15',1,2,14000.00,1),
('0501198523451','Sandra','Elizabeth','Moncada','Lara','+504 9911-0007','sandra.moncada@hoteltoro.com','1985-05-23',2,3,18000.00,1),
('0301199345673','Marta','Isabel','Cáceres','Rivera','+504 9911-0009','marta.caceres@hoteltoro.com','1993-06-30',2,4,10000.00,1),
('0501199778906','Daniela','Fernanda','Lagos','Ponce','+504 9911-0015','daniela.lagos@hoteltoro.com','1997-09-05',2,5,9500.00,1),
('0801199412378','Josué','Armando','Pavón','Erazo','+504 9911-0018','josue.pavon@hoteltoro.com','1994-04-21',1,5,9500.00,0),
('0301199689017','Oscar','Armando','Girón','Suazo','+504 9911-0019','oscar.giron@hoteltoro.com','1996-12-01',1,6,10500.00,1),
('0801198867895','Fernando','Luis','Bonilla','Paz','+504 9911-0021','fernando.bonilla@hoteltoro.com','1988-02-20',1,7,26000.00,1),
('0801199256784','Elena','Beatriz','Cabrera','Núñez','+504 9911-0023','elena.cabrera@hoteltoro.com','1992-12-19',2,8,15000.00,1),
('0801197945601','Alejandro','José','Mendoza','Reyes','+504 9911-0025','alejandro.mendoza@hoteltoro.com','1979-03-12',1,9,15000.00,1),
('0301198701267','Reynaldo','Josué','Bardales','Mejía','+504 9911-0027','reynaldo.bardales@hoteltoro.com','1987-11-06',1,10,11000.00,1),
('0801198712340','Wilmer','Josué','Torres','Amaya','+504 9911-0028','wilmer.torres@hoteltoro.com','1987-10-09',1,11,14000.00,1),
('0801198290128','Gabriela','María','Euceda','Rueda','+504 9911-0029','gabriela.euceda@hoteltoro.com','1982-07-17',2,12,25000.00,1),
('0101198323489','Teresa','de Jesús','Rápalo','Montoya','+504 9911-0030','teresa.rapalo@hoteltoro.com','1983-08-25',2,13,9800.00,1);

-- Contraseñas guardadas con bcrypt (bcryptjs, costo 10), igual que en el backend.
-- Contraseña de cada empleado: Hotel#2026-<ID_Empleado>  (ejemplo: kordonez -> Hotel#2026-2)
INSERT INTO Usuarios_Empleado (ID_Empleado, Usuario, Contraseña_Hash, Estado) VALUES
(1,'rzelaya','$2b$10$B54jR5o.RURd5ZDxdQ40wesccPlYpLJ1ccqXD4jHsr774eZPcBrpa',1),
(2,'kordonez','$2b$10$Sw8VwwRQt5VPHos4r79O.eRudiBQHkbzAVJdavgRsO4sfSmqs3VHq',1),
(3,'jaguilar','$2b$10$GZUTH1gVom.sTGM1VzMcC.YxSvPPll8elg94LViheySESVESQ5uCu',1),
(4,'smoncada','$2b$10$ySbq9Czbb07n88YYQRLjselaBCE4BzLm/wp0YumEpqnFnRvi6i572',1),
(5,'mcaceres','$2b$10$G1qrsOhfVZX0P3uuXE461upOmdDNDzHytfQNzcZS3PSJ6zPd7z40a',1),
(6,'dlagos','$2b$10$sJfVfYLe1gb1TnC3n3FHxePUz6OxrFXwN9Neg4ik1dr6IRIVL1qHW',1),
(7,'jpavon','$2b$10$0Z11TbPQykF8YE3eoeBRteGCj8lBUx.UnnJQ4RE4mSG1EaQktgQ/.',0),
(8,'ogiron','$2b$10$aP0xrwnFDHsI8YjSHCKaJOlaLEMSmbI19eVEKkDhQAwDs3DiOOnO2',1),
(10,'ecabrera','$2b$10$CnPtidtqIpFbLSxcTjOMxOK6ZLab7whlEwNFRsiwGP17yRCuFeJXe',1),
(11,'amendoza','$2b$10$G3/Vb1LxrTKzNriEaLUG2uCm9idkZqpY5vg8VRLKUMbuw2vJv30.C',1),
(13,'wtorres','$2b$10$FOfFlMETb9/KpYoTrkjqbewD/WTcMr0PipNCtX/fuCloFkEsKtegy',1),
(14,'geuceda','$2b$10$t3Reoo82Eu/WDKa/Gyauu.eiNI5Y/T6fVNEIxZ7C/WmZ1mRiJfn1q',1),
(15,'trapalo','$2b$10$A4yfb0OAe1aUKEDrJEkE1..000bGBEndqQfAj9ClT8icC/6hrJ./K',1);

INSERT INTO Categorias_Servicios (Nombre_Categoria, Descripcion, Estado) VALUES
('Restaurante','Desayunos, almuerzos y cenas en el restaurante',1),
('Bar','Bebidas y coctelería en el bar del lobby',1),
('Room Service','Alimentos y bebidas servidos en la habitación',1),
('Minibar','Productos consumidos del minibar de la habitación',1),
('Lavandería','Lavado, planchado y lavado en seco',1),
('Spa y Bienestar','Masajes, faciales e hidroterapia',1),
('Transporte y Tours','Traslados, tours y vehículo con chofer',1);

INSERT INTO Servicios_Adicionales (Codigo_Servicio, Nombre_servicio, ID_Categoria, Precio_Unitario) VALUES
('SRV-001','Desayuno buffet',1,450.00),
('SRV-002','Almuerzo ejecutivo',1,520.00),
('SRV-003','Cena a la carta',1,950.00),
('SRV-004','Brunch del chef',1,780.00),
('SRV-005','Cóctel de autor',2,280.00),
('SRV-006','Copa de vino de la casa',2,250.00),
('SRV-007','Cerveza nacional',2,90.00),
('SRV-008','Botella de vino tinto reserva',2,1800.00),
('SRV-009','Desayuno continental en habitación',3,380.00),
('SRV-010','Club sándwich',3,340.00),
('SRV-011','Cena romántica en habitación',3,2400.00),
('SRV-012','Café y repostería',3,260.00),
('SRV-013','Agua mineral',4,60.00),
('SRV-014','Refresco',4,70.00),
('SRV-015','Snacks gourmet',4,150.00),
('SRV-016','Chocolates artesanales',4,180.00),
('SRV-017','Lavado y planchado por prenda',5,80.00),
('SRV-018','Planchado de traje',5,220.00),
('SRV-019','Lavado en seco',5,300.00),
('SRV-020','Servicio express mismo día',5,450.00),
('SRV-021','Masaje relajante 60 min',6,1800.00),
('SRV-022','Masaje con piedras calientes',6,2200.00),
('SRV-023','Facial hidratante',6,1500.00),
('SRV-024','Circuito de hidroterapia',6,900.00),
('SRV-025','Traslado aeropuerto',7,1200.00),
('SRV-026','Tour por la ciudad',7,1600.00),
('SRV-027','Excursión Valle de Ángeles y Santa Lucía',7,1900.00),
('SRV-028','Vehículo con chofer por día',7,4500.00);

INSERT INTO Reservaciones (Codigo_Reservacion, ID_Huesped, Fecha_Emision, Fecha_Entrada_Esperada, Fecha_Salida_Esperada, Estado) VALUES
('RES-2026-0001',1,'2026-08-25','2026-09-04','2026-09-07',3),
('RES-2026-0002',2,'2026-09-14','2026-09-24','2026-09-27',3),
('RES-2026-0003',10,'2026-09-25','2026-10-07','2026-10-11',3),
('RES-2026-0004',1,'2026-10-20','2026-10-29','2026-11-01',3),
('RES-2026-0005',4,'2026-10-25','2026-11-04','2026-11-07',3),
('RES-2026-0006',5,'2026-11-12','2026-11-21','2026-11-25',3),
('RES-2026-0007',6,'2026-11-15','2026-11-23','2026-11-28',2),
('RES-2026-0008',11,'2026-11-10','2026-11-24','2026-11-29',2),
('RES-2026-0009',8,'2026-11-20','2026-11-27','2026-11-30',1),
('RES-2026-0010',9,'2026-10-02','2026-10-20','2026-10-23',4);

INSERT INTO Detalle_Reservacion (ID_Habitacion, ID_Reservacion, Descripcion) VALUES
(9,1,'Doble Deluxe, 3 noches, 2 personas. Cama king size'),
(4,2,'Familiar, 3 noches, 4 personas. Viaje familiar'),
(22,3,'Junior Suite, 4 noches, 2 personas. Incluye sofá cama'),
(9,4,'Doble Deluxe, 3 noches, 2 personas. Cama king size'),
(18,5,'Familiar, 3 noches, 3 personas. Viaje familiar'),
(28,6,'Suite Ejecutiva, 4 noches, 1 persona. Piso ejecutivo'),
(2,7,'Doble Deluxe, 5 noches, 2 personas. Cama king size'),
(30,8,'Suite Presidencial, 5 noches, 2 personas. Servicio de mayordomo'),
(8,9,'Sencilla Deluxe, 3 noches, 1 persona. Huésped viaja solo'),
(15,10,'Doble Deluxe, 3 noches, 1 persona. Cama king size');

INSERT INTO Reservacion_Servicios (ID_Reservacion, ID_Servicio_Adicional, Fecha_Servicio, Cantidad, Precio_Unitario, Total_Servicio, Estado) VALUES
(1,1,'2026-09-05 08:00:00',2,450.00,900.00,2),
(2,1,'2026-09-25 08:00:00',4,450.00,1800.00,2),
(3,23,'2026-10-08 15:00:00',1,1500.00,1500.00,2),
(4,11,'2026-10-30 20:00:00',1,2400.00,2400.00,2),
(7,1,'2026-11-24 08:00:00',2,450.00,900.00,2),
(8,22,'2026-11-25 15:00:00',2,2200.00,4400.00,2),
(8,25,'2026-11-29 09:00:00',1,1200.00,1200.00,1),
(9,25,'2026-11-27 13:00:00',1,1200.00,1200.00,1),
(10,26,'2026-10-21 09:00:00',2,1600.00,3200.00,3);

INSERT INTO Estancias (ID_Huesped, ID_Reservacion, Fecha_Entrada, Fecha_Salida, ID_Empleado, ID_Habitacion) VALUES
(1,1,'2026-09-04 15:00:00','2026-09-07 11:00:00',2,9),
(2,2,'2026-09-24 14:00:00','2026-09-27 11:00:00',2,4),
(10,3,'2026-10-07 15:00:00','2026-10-11 11:00:00',3,22),
(1,4,'2026-10-29 15:00:00','2026-11-01 11:00:00',3,9),
(4,5,'2026-11-04 15:00:00','2026-11-07 11:00:00',2,18),
(5,6,'2026-11-21 16:00:00','2026-11-25 11:00:00',2,28),
(6,7,'2026-11-23 15:00:00',NULL,2,2),
(11,8,'2026-11-24 16:00:00',NULL,3,30);

INSERT INTO Acompañantes (ID_Estancia, DNI, Pasaporte, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, FechaNacimiento, Sexo) VALUES
(1,'0801198700011',NULL,'Laura','Beatriz','Pérez','Maradiaga','1987-04-20',2),
(2,'0501199100022',NULL,'Diego','Alejandro','Hernández','Flores','1991-02-14',1),
(2,NULL,NULL,'Sofía',NULL,'Hernández','Flores','2016-08-09',2),
(2,NULL,NULL,'Mateo',NULL,'Hernández','Flores','2019-11-30',1),
(3,NULL,'FR1100998','Julien','Pierre','Dubois','Laurent','1986-09-06',1),
(4,'0801198900123',NULL,'Andrea','Carolina','Pérez','López','1989-03-17',2),
(5,'0301199500044',NULL,'Jorge','Luis','Ávila','Cortés','1995-10-01',1),
(5,NULL,NULL,'Valeria',NULL,'Ávila','Paz','2018-05-04',2),
(7,'0801199800456',NULL,'Kevin','Alexander','Matamoros','Rivera','1998-10-02',1),
(8,NULL,'US6655443','Linda','Marie','Brown',NULL,'1971-04-27',2);

INSERT INTO Consumos_Huesped (ID_Estancia, ID_Servicio_Adicional, ID_Empleado, Fecha_Consumo, Cantidad_Consumo, Precio_Unitario, Total_Consumo) VALUES
(1,1,6,'2026-09-05 08:00:00',2,450.00,900.00),
(1,5,8,'2026-09-05 20:00:00',2,280.00,560.00),
(2,1,6,'2026-09-25 08:00:00',4,450.00,1800.00),
(2,10,6,'2026-09-25 21:00:00',2,340.00,680.00),
(2,13,5,'2026-09-26 15:00:00',4,60.00,240.00),
(3,23,10,'2026-10-08 15:00:00',1,1500.00,1500.00),
(3,5,8,'2026-10-09 19:00:00',2,280.00,560.00),
(3,16,5,'2026-10-09 22:00:00',1,180.00,180.00),
(4,1,6,'2026-10-30 08:00:00',2,450.00,900.00),
(4,11,6,'2026-10-30 20:00:00',1,2400.00,2400.00),
(5,1,6,'2026-11-05 08:00:00',3,450.00,1350.00),
(5,15,5,'2026-11-05 21:00:00',2,150.00,300.00),
(6,2,6,'2026-11-22 13:00:00',2,520.00,1040.00),
(6,19,15,'2026-11-23 09:00:00',2,300.00,600.00),
(6,6,8,'2026-11-23 20:00:00',2,250.00,500.00),
(7,1,6,'2026-11-24 08:00:00',2,450.00,900.00),
(7,5,8,'2026-11-24 20:00:00',2,280.00,560.00),
(7,17,15,'2026-11-25 09:00:00',4,80.00,320.00),
(8,8,8,'2026-11-24 21:00:00',1,1800.00,1800.00),
(8,22,10,'2026-11-25 15:00:00',2,2200.00,4400.00);

INSERT INTO Facturas_Fiscales (ID_Estancia, CAI, Numero_Factura, RTN, Fecha_Emision, Subtotal, Descuentos, ISV, Impuesto_Turismo, Total) VALUES
(1,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000001','08011985123450','2026-09-07 11:10:00',14060.00,0.00,2109.00,504.00,16673.00),
(2,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000002','05011990234560','2026-09-27 11:10:00',24320.00,0.00,3648.00,864.00,28832.00),
(3,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000003',NULL,'2026-10-11 11:10:00',28240.00,0.00,4236.00,1040.00,33516.00),
(4,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000004','08011985123450','2026-11-01 11:10:00',15900.00,1260.00,2196.00,453.60,17289.60),
(5,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000005','03011993667780','2026-11-07 11:10:00',23250.00,0.00,3487.50,864.00,27601.50),
(6,'35A4B2-C91D47-E85F10-A3C6D2-7B41E9-0F','000-001-01-00000006','08019020114527','2026-11-25 11:10:00',37740.00,0.00,5661.00,1424.00,44825.00);

INSERT INTO Detalles_Factura (ID_Factura, ID_Estancia, ID_Consumo, Tipo_Concepto, Descripcion, Cantidad, Precio_Unitario, Subtotal, Descuentos, ISV, Impuesto_Turismo, Total) VALUES
(1,1,NULL,'ALOJAMIENTO','Alojamiento Hab. 204 - Doble Deluxe (3 noches)',3,4200.00,12600.00,0.00,1890.00,504.00,14994.00),
(1,NULL,1,'CONSUMO','Desayuno buffet',2,450.00,900.00,0.00,135.00,0.00,1035.00),
(1,NULL,2,'CONSUMO','Cóctel de autor',2,280.00,560.00,0.00,84.00,0.00,644.00),
(2,2,NULL,'ALOJAMIENTO','Alojamiento Hab. 104 - Familiar (3 noches)',3,7200.00,21600.00,0.00,3240.00,864.00,25704.00),
(2,NULL,3,'CONSUMO','Desayuno buffet',4,450.00,1800.00,0.00,270.00,0.00,2070.00),
(2,NULL,4,'CONSUMO','Club sándwich',2,340.00,680.00,0.00,102.00,0.00,782.00),
(2,NULL,5,'CONSUMO','Agua mineral',4,60.00,240.00,0.00,36.00,0.00,276.00),
(3,3,NULL,'ALOJAMIENTO','Alojamiento Hab. 502 - Junior Suite (4 noches)',4,6500.00,26000.00,0.00,3900.00,1040.00,30940.00),
(3,NULL,6,'CONSUMO','Facial hidratante',1,1500.00,1500.00,0.00,225.00,0.00,1725.00),
(3,NULL,7,'CONSUMO','Cóctel de autor',2,280.00,560.00,0.00,84.00,0.00,644.00),
(3,NULL,8,'CONSUMO','Chocolates artesanales',1,180.00,180.00,0.00,27.00,0.00,207.00),
(4,4,NULL,'ALOJAMIENTO','Alojamiento Hab. 204 - Doble Deluxe (3 noches)',3,4200.00,12600.00,1260.00,1701.00,453.60,13494.60),
(4,NULL,9,'CONSUMO','Desayuno buffet',2,450.00,900.00,0.00,135.00,0.00,1035.00),
(4,NULL,10,'CONSUMO','Cena romántica en habitación',1,2400.00,2400.00,0.00,360.00,0.00,2760.00),
(5,5,NULL,'ALOJAMIENTO','Alojamiento Hab. 403 - Familiar (3 noches)',3,7200.00,21600.00,0.00,3240.00,864.00,25704.00),
(5,NULL,11,'CONSUMO','Desayuno buffet',3,450.00,1350.00,0.00,202.50,0.00,1552.50),
(5,NULL,12,'CONSUMO','Snacks gourmet',2,150.00,300.00,0.00,45.00,0.00,345.00),
(6,6,NULL,'ALOJAMIENTO','Alojamiento Hab. 603 - Suite Ejecutiva (4 noches)',4,8900.00,35600.00,0.00,5340.00,1424.00,42364.00),
(6,NULL,13,'CONSUMO','Almuerzo ejecutivo',2,520.00,1040.00,0.00,156.00,0.00,1196.00),
(6,NULL,14,'CONSUMO','Lavado en seco',2,300.00,600.00,0.00,90.00,0.00,690.00),
(6,NULL,15,'CONSUMO','Copa de vino de la casa',2,250.00,500.00,0.00,75.00,0.00,575.00);

INSERT INTO Metodos_Pago (Nombre_Metodo, Codigo, Descripcion, Estado) VALUES
('Efectivo','EFE','Pago en efectivo en recepción',1),
('Tarjeta de Crédito','TCR','Pago con tarjeta de crédito',1),
('Tarjeta de Débito','TDB','Pago con tarjeta de débito',1),
('Transferencia Bancaria','TRF','Transferencia a la cuenta del hotel',1),
('Crédito Corporativo','CCO','Cargo a empresa con convenio',1),
('PayPal','PPL','Pago en línea mediante PayPal',1);

INSERT INTO Tarjetas_Pago (Tipo_Tarjeta, Marca, Ultimos_Cuatro_Digitos, Nombre_Titular, Mes_Expiracion, Año_Expiracion, Banco_Emisor, Token_Pasarela) VALUES
('CREDITO','Visa','4821','Juan Carlos Pérez',1,2027,'BAC Honduras','tok_gh5_0001a9f3c2'),
('DEBITO','Visa','5194','María José Hernández',6,2028,'Banco Atlántida','tok_gh5_0002a9f3c2'),
('CREDITO','American Express','5567','Camille Sophie Dubois',11,2029,'BNP Paribas','tok_gh5_0003a9f3c2'),
('DEBITO','Visa','5940','Marvin Josué Ávila',4,2030,'Banpaís','tok_gh5_0004a9f3c2'),
('DEBITO','Visa','6313','Daniela Sofía Matamoros',9,2027,'BAC Honduras','tok_gh5_0005a9f3c2'),
('CREDITO','American Express','6686','David Michael Brown',2,2028,'Citibank','tok_gh5_0006a9f3c2'),
('CREDITO','Visa','7059','Sofía Alejandra Vargas',7,2029,'Banco Nacional de Costa Rica','tok_gh5_0007a9f3c2');

INSERT INTO Pagos_Factura (ID_Factura, ID_Huesped, Monto_Total, Fecha_Pago) VALUES
(1,1,16673.00,'2026-09-07 11:25:00'),
(2,2,28832.00,'2026-09-27 11:25:00'),
(3,10,33516.00,'2026-10-11 11:25:00'),
(4,1,17289.60,'2026-11-01 11:25:00'),
(5,4,27601.50,'2026-11-07 11:25:00'),
(6,5,44825.00,'2026-11-25 11:25:00');

INSERT INTO Detalles_Pago_Factura (ID_Pago_Factura, ID_Metodo_Pago, Monto_Pagado, Monto_Recibido, Cambio_Devuelto, Numero_Referencia, Banco, Cuenta_Origen, Numero_Cheque, Fecha_Referencia, ID_Tarjeta, Codigo_Autorizacion, Observaciones) VALUES
(1,2,16673.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'AUT-905101','Pago con tarjeta de crédito'),
(2,3,28832.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'AUT-905102','Pago con tarjeta de débito'),
(3,2,33516.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'AUT-905103','Pago con tarjeta de crédito'),
(4,2,17289.60,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'AUT-905104','Pago con tarjeta de crédito'),
(5,1,5000.00,5000.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Pago parcial en efectivo'),
(5,3,22601.50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'AUT-905105','Saldo con tarjeta de débito'),
(6,5,44825.00,NULL,NULL,'CCO-005-0006',NULL,NULL,NULL,'2026-11-25',NULL,NULL,'Cargo a empresa con convenio corporativo');
