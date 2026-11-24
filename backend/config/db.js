// conexion a la base de datos MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gran_hotel_el_toro', // Cambia esto por el nombre exacto de tu BD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;