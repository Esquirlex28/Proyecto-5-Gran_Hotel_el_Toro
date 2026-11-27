const pool = require('../config/db');

// Listar empleados junto con el nombre de su cargo y si ya tienen usuario creado
const obtenerEmpleados = async (req, res) => {
  try {
    const query = `
      SELECT 
        e.ID_Empleado,
        e.DNI,
        e.Primer_Nombre,
        e.Segundo_Nombre,
        e.Primer_Apellido,
        e.Segundo_Apellido,
        e.Telefono,
        e.Correo,
        e.FechaNacimiento,
        e.Sexo,
        e.Estado,
        e.Salario,
        c.ID_Cargo,
        c.Nombre_Cargo,
        u.Usuario
      FROM Empleados e
      INNER JOIN Cargos_Empleado c ON e.ID_Cargo = c.ID_Cargo
      LEFT JOIN Usuarios_Empleado u ON e.ID_Empleado = u.ID_Empleado
      ORDER BY e.ID_Empleado DESC
    `;

    const [empleados] = await pool.query(query);
    res.json({ ok: true, datos: empleados });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener empleados', error: error.message });
  }
};

// Registrar un nuevo empleado
const crearEmpleado = async (req, res) => {
  const {
    DNI,
    Primer_Nombre,
    Segundo_Nombre,
    Primer_Apellido,
    Segundo_Apellido,
    Telefono,
    Correo,
    FechaNacimiento,
    Sexo,
    ID_Cargo,
    Salario
  } = req.body;

  // Validar campos NOT NULL definidos en la tabla Empleados
  if (!DNI || !Primer_Nombre || !Primer_Apellido || !Telefono || !Correo || !FechaNacimiento || Sexo === undefined || !ID_Cargo || !Salario) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Faltan campos obligatorios del empleado'
    });
  }

  // Validación previa para respetar CK_Salario_Valido
  if (Number(Salario) <= 0) {
    return res.status(400).json({ ok: false, mensaje: 'El Salario debe ser mayor a 0' });
  }

  try {
    const query = `
      INSERT INTO Empleados (
        DNI, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido,
        Telefono, Correo, FechaNacimiento, Sexo, ID_Cargo, Estado, Salario
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    `;

    const [resultado] = await pool.query(query, [
      DNI.trim(),
      Primer_Nombre.trim(),
      Segundo_Nombre ? Segundo_Nombre.trim() : null,
      Primer_Apellido.trim(),
      Segundo_Apellido ? Segundo_Apellido.trim() : null,
      Telefono.trim(),
      Correo.trim(),
      FechaNacimiento,
      Sexo,
      ID_Cargo,
      Salario
    ]);

    res.status(201).json({
      ok: true,
      mensaje: 'Empleado registrado correctamente',
      id_empleado: resultado.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un empleado con ese DNI' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ ok: false, mensaje: 'El ID_Cargo indicado no existe en Cargos_Empleado' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al registrar empleado', error: error.message });
  }
};

module.exports = {
  obtenerEmpleados,
  crearEmpleado
};