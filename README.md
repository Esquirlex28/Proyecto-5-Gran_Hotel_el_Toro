**PROYECTO 5: SISTEMA DE GESTIÓN HOTELERA**  
**SGBD y Stack Web: MySQL 8.0+ | React (Frontend), Node.js, Express, JavaScript.** 
**¿Qué debe hacer el sistema?:** Sistema integral de gestión operativa y administrativa para un 
hotel. Controla habitaciones categorizadas por tipo (Sencilla, Doble, Suite, Familiar) y su estado 
en tiempo real (Disponible, Reservada, Ocupada, Sucia, Mantenimiento), motor de reservaciones 
con calendario evitando colisiones de fechas, Check-in ágil con registro de huéspedes y 
acompañantes, carga de consumos adicionales a la habitación (room service, frigobar/minibar, 
lavandería, restaurante), Check-out con liquidación automática de estancia y consumos, y 
facturación legal SAR con desglose impositivo que incluya el 15% de ISV y el 4% de Impuesto 
Turístico aplicable a hotelería. 

**Entidades Principales:** Habitaciones, Tipos_Habitacion, Pisos, Reservaciones, Huespedes, 
Acompaniantes, Consumos_Habitacion, Catalogo_Servicios, Facturas_Hotel, Detalle_Factura, 
Pagos. 

**Campos Clave:** numero_habitacion, piso_numero, precio_por_noche, capacidad_maxima, 
estado_habitacion (Disponible, Reservada, Ocupada, Sucia, Mantenimiento), fecha_checkin, 
fecha_checkout, identidad_huesped, CAI, correlativo_SAR, impuesto_turismo_4, isv_15, total. 

**Consultas SQL Requeridas:** Porcentaje de ocupación mensual por tipo de habitación (JOINs + 
DATEDIFF + GROUP BY); Estado de cuenta en vivo de una habitación ocupada (Hospedaje + 
Consumos no facturados); Vista v_estado_habitaciones para camareras; Comparativa 
ingresos hospedaje vs servicios; e Índice compuesto en Reservaciones(habitacion_id, 
fecha_checkin, fecha_checkout).

**Módulos Obligatorios y Pantallas Necesarias del Sistema:**

**MÓDULO 1: SEGURIDAD Y CONTROL DE TURNOS DE RECEPCIÓN** 

* Pantalla 1.1 — Login de Recepcionistas y Gobernanta: Acceso autenticado por roles para recepcionistas de 
mostrador, personal de camareras y administradores. 

**MÓDULO 2: CATÁLOGO DE HABITACIONES Y TARIFAS** 

* Pantalla 2.1 — Administración de Habitaciones y Pisos: Registro de cuartos asignando número, piso, 
capacidad máxima de personas y comodidades (AC, WiFi, Balcón). 

* Pantalla 2.2 — Configuración de Tipos de Habitación y Tarifas: Gestión de tarifas por noche según 
temporada alta o baja para habitaciones Sencillas, Dobles, Suites y Familiares. 

**MÓDULO 3: RACK DE HABITACIONES Y MOTOR DE RESERVAS** 

* Pantalla 3.1 — Rack Visual Interactivo de Habitaciones (Plano del Hotel): Vista en cuadrícula organizada 
por piso donde cada habitación es una tarjeta interactiva con código de colores según su estado en tiempo 
real (Verde = Disponible, Azul = Ocupada, Naranja = En Limpieza, Rojo = Mantenimiento). 

* Pantalla 3.2 — Motor de Reservas y Disponibilidad: Calendario interactivo para seleccionar fechas de 
entrada y salida, número de huéspedes y cotización automática de la estancia con registro de anticipo. 

**MÓDULO 4: RECEPCIÓN, CHECK-IN Y GESTIÓN DE HUÉSPEDES** 

* Pantalla 4.1 — Registro de Huéspedes y Check-in: Formulario para capturar DNI/Pasaporte del titular, 
registro de acompañantes, asignación física de la habitación y entrega de llave. 

**MÓDULO 5: CARGA DE CONSUMOS A LA HABITACIÓN (ROOM SERVICE Y MINIBAR)** 

* Pantalla 5.1 — Registro de Consumos a la Habitación: Pantalla rápida para meseros o camareras donde se 
cargan pedidos de restaurante, reposición de minibar o lavandería directamente al folio de la habitación sin 
cobrar en efectivo en ese instante. 

**MÓDULO 6: CHECK-OUT Y FACTURACIÓN SAR HOTELERA** 

* Pantalla 6.1 — Check-out y Liquidación de Cuenta: Consolidación automática de noches hospedadas 
devengadas y consumos adicionales acumulados, aplicando descuentos de fidelidad. 

* Pantalla 6.2 — Emisión de Factura SAR con Impuesto Turístico: Emisión formal de la factura con CAI, 
correlativo SAR, RTN del huésped, desglose de ISV 15% y cálculo del **4% del Impuesto al Turismo (IHT)** con 
saldo en balance cero. 

**MÓDULO 7: PANEL DE GOBERNANTA Y LIMPIEZA** 

* Pantalla 7.1 — Tablero de Camareras y Limpieza de Habitaciones: Interfaz optimizada para tablet o móvil 
donde el personal de limpieza visualiza cuartos en estado "Sucia" y los cambia a "Limpia / Disponible" tras su 
aseo. 

**MÓDULO 8: DASHBOARD GERENCIAL Y ESTADÍSTICAS**

* Pantalla 8.1 — Dashboard Hotelero: Métricas de ocupación mensual, ingreso promedio por habitación 
disponible  y balance comparativo entre ingresos por alojamiento vs. consumos complementarios. 
