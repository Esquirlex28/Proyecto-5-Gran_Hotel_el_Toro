const pool = require('../config/db');

// Listar todos los cargos disponibles
const obtenerCargos = async (req, res) => {
  try {
    const [cargos] = await pool.query('SELECT * FROM Cargos_Empleado ORDER BY ID_Cargo ASC');
    res.json({ ok: true, datos: cargos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener cargos', error: error.message });
  }
};

// Crear un nuevo cargo (Ej: Recepcionista, Gerente, Administrador)
const crearCargo = async (req, res) => {
  const { Nombre_Cargo, Descripcion, Salario_Base } = req.body;

  if (!Nombre_Cargo || !Descripcion || !Salario_Base) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Nombre_Cargo, Descripcion y Salario_Base son obligatorios'
    });
  }

  // Validación previa para respetar la regla CK_Salario_Base_Valido del SQL
  if (Number(Salario_Base) <= 0) {
    return res.status(400).json({ ok: false, mensaje: 'El Salario_Base debe ser mayor a 0' });
  }

  try {
    const query = `
      INSERT INTO Cargos_Empleado (Nombre_Cargo, Descripcion, Salario_Base)
      VALUES (?, ?, ?)
    `;
    const [resultado] = await pool.query(query, [
      Nombre_Cargo.trim(),
      Descripcion.trim(),
      Salario_Base
    ]);

    res.status(201).json({
      ok: true,
      mensaje: 'Cargo registrado correctamente',
      id_cargo: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al registrar cargo', error: error.message });
  }
};

module.exports = {
  obtenerCargos,
  crearCargo
};