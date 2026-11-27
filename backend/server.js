const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del Gran Hotel El Toro activa' });
});

// --- REGISTRO DE RUTAS DE LA API ---
// Cada línea une un prefijo de URL con su archivo en /routes
app.use('/api/paises', require('./routes/paises.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/cargos', require('./routes/cargos.routes'));
app.use('/api/empleados', require('./routes/empleados.routes'));
app.use('/api/auth/clientes', require('./routes/auth.clientes.routes'));
app.use('/api/auth/empleados', require('./routes/auth.empleados.routes'));
app.use('/api/habitaciones', require('./routes/habitaciones.routes'));
app.use('/api/tiposhabitaciones', require('./routes/tiposhabitaciones.routes'));
app.use('/api/pisos', require('./routes/pisos.routes'));
app.use('/api/estadoshabitacion', require('./routes/estadoshabitacion.routes'));
app.use('/api/comodidades', require('./routes/comodidades.routes'));
app.use('/api/tipohabitacioncomodidades', require('./routes/tipohabitacioncomodidades.routes'));

// --- ENCENDIDO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});