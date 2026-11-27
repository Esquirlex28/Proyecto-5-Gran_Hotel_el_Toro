const pool = require('../config/db');

// Listar todos los huéspedes
const obtenerClientes = async (req, res) => {
  try {
    const query = `
      SELECT 
        h.ID_Huesped,
        h.DNI,
        h.Pasaporte,
        h.Primer_Nombre,
        h.Segundo_Nombre,
        h.Primer_Apellido,
        h.Segundo_Apellido,
        h.Telefono,
        h.Correo,
        h.FechaNacimiento,
        h.Sexo,
        p.ID_Pais,
        p.Nombre_Pais,
        p.Nacionalidad
      FROM Huespedes h
      INNER JOIN Paises p ON h.ID_Pais = p.ID_Pais
      ORDER BY h.ID_Huesped DESC
    `;

    const [huespedes] = await pool.query(query);
    res.json({ ok: true, datos: huespedes });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener los clientes', error: error.message });
  }
};

// Registrar un huésped presencialmente (solo tabla Huespedes)
const registrarCliente = async (req, res) => {
  const {
    ID_Pais,
    DNI,
    Pasaporte,
    Primer_Nombre,
    Segundo_Nombre,
    Primer_Apellido,
    Segundo_Apellido,
    Telefono,
    Correo,
    FechaNacimiento,
    Sexo
  } = req.body;

  if (!ID_Pais || !Primer_Nombre || !Primer_Apellido || !Telefono || !Correo || !FechaNacimiento || Sexo === undefined) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos personales obligatorios del huésped' });
  }

  const dniLimpio = DNI && DNI.trim() !== '' ? DNI.trim() : null;
  const pasaporteLimpio = Pasaporte && Pasaporte.trim() !== '' ? Pasaporte.trim() : null;

  if (!dniLimpio && !pasaporteLimpio) {
    return res.status(400).json({ ok: false, mensaje: 'Debe ingresar DNI o Pasaporte' });
  }

  try {
    const query = `
      INSERT INTO Huespedes (
        ID_Pais, DNI, Pasaporte, Primer_Nombre, Segundo_Nombre,
        Primer_Apellido, Segundo_Apellido, Telefono, Correo, FechaNacimiento, Sexo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await pool.query(query, [
      ID_Pais,
      dniLimpio,
      pasaporteLimpio,
      Primer_Nombre.trim(),
      Segundo_Nombre ? Segundo_Nombre.trim() : null,
      Primer_Apellido.trim(),
      Segundo_Apellido ? Segundo_Apellido.trim() : null,
      Telefono.trim(),
      Correo.trim(),
      FechaNacimiento,
      Sexo
    ]);

    res.status(201).json({
      ok: true,
      mensaje: 'Huésped registrado correctamente',
      id_huesped: resultado.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ ok: false, mensaje: 'Ya existe un huésped con ese DNI o Pasaporte' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ ok: false, mensaje: 'El ID_Pais indicado no existe' });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al registrar huésped', error: error.message });
  }
};

module.exports = {
  obtenerClientes,
  registrarCliente
};