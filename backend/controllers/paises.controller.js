const pool = require('../config/db');

// Función para listar los países activos
const obtenerPaises = async (req, res) => {
  try {
    const [paises] = await pool.query(
      'SELECT ID_Pais, Nombre_Pais, Nacionalidad, Estado FROM Paises WHERE Estado = 1 ORDER BY Nombre_Pais ASC'
    );
    res.json({ ok: true, datos: paises });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al consultar países', error: error.message });
  }
};

// Función para registrar un nuevo país
const crearPais = async (req, res) => {
  const { Nombre_Pais, Nacionalidad, Estado } = req.body;

  if (!Nombre_Pais || !Nacionalidad) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Nombre_Pais y Nacionalidad son obligatorios'
    });
  }

  try {
    const estadoFinal = Estado !== undefined ? Estado : 1;

    const [resultado] = await pool.query(
      'INSERT INTO Paises (Nombre_Pais, Nacionalidad, Estado) VALUES (?, ?, ?)',
      [Nombre_Pais.trim(), Nacionalidad.trim(), estadoFinal]
    );

    res.status(201).json({
      ok: true,
      mensaje: 'País registrado correctamente',
      id_pais: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al insertar país', error: error.message });
  }
};

// Exportamos ambas funciones para que las rutas puedan usarlas
module.exports = {
  obtenerPaises,
  crearPais
};