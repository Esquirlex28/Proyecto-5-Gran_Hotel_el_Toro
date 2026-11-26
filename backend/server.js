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

//--- Rutas---
app.use('/api/habitaciones', require('./routes/habitaciones'));
app.use('/api/tiposhabitaciones', require('./routes/tiposhabitaciones'));

// --- ENCENDIDO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});