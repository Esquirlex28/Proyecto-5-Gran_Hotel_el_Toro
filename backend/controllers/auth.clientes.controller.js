const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// 1. REGISTRO DE CLIENTE + CUENTA WEB (POST /api/auth/clientes/registro)
const registroCliente = async (req, res) => {
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
    Sexo,
    Usuario,
    Password
  } = req.body;

  // Verificamos tanto los datos obligatorios de Huespedes como las credenciales de Usuarios_Huesped
  if (
    !ID_Pais || !Primer_Nombre || !Primer_Apellido || !Telefono ||
    !Correo || !FechaNacimiento || Sexo === undefined || !Usuario || !Password
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Todos los datos personales obligatorios, Usuario y Password deben completarse'
    });
  }

  // Validación de CK_Huesped_Valido: debe tener DNI o Pasaporte
  const dniLimpio = DNI && DNI.trim() !== '' ? DNI.trim() : null;
  const pasaporteLimpio = Pasaporte && Pasaporte.trim() !== '' ? Pasaporte.trim() : null;

  if (!dniLimpio && !pasaporteLimpio) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Debe proporcionar DNI o Pasaporte para registrarse'
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Paso 1: Guardar los datos personales en Huespedes
    const insertHuesped = `
      INSERT INTO Huespedes (
        ID_Pais, DNI, Pasaporte, Primer_Nombre, Segundo_Nombre,
        Primer_Apellido, Segundo_Apellido, Telefono, Correo, FechaNacimiento, Sexo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [resHuesped] = await connection.query(insertHuesped, [
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

    const idHuesped = resHuesped.insertId;

    // Paso 2: Encriptar contraseña y crear registro en Usuarios_Huesped
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(Password, salt);

    const insertUsuario = `
      INSERT INTO Usuarios_Huesped (ID_Huesped, Usuario, \`Contraseña_Hash\`, Estado)
      VALUES (?, ?, ?, 1)
    `;

    const [resUsuario] = await connection.query(insertUsuario, [
      idHuesped,
      Usuario.trim(),
      passwordHash
    ]);

    await connection.commit();

    res.status(201).json({
      ok: true,
      mensaje: 'Cuenta de cliente registrada exitosamente',
      datos: {
        id_huesped: idHuesped,
        id_usuario_huesped: resUsuario.insertId,
        usuario: Usuario.trim()
      }
    });
  } catch (error) {
    await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El DNI, Pasaporte o nombre de Usuario ya se encuentra en uso'
      });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El ID_Pais seleccionado no existe'
      });
    }

    res.status(500).json({ ok: false, mensaje: 'Error al registrar cliente', error: error.message });
  } finally {
    connection.release();
  }
};

// 2. INICIO DE SESIÓN DE CLIENTES (POST /api/auth/clientes/login)
const loginCliente = async (req, res) => {
  const { Usuario, Password } = req.body;

  if (!Usuario || !Password) {
    return res.status(400).json({ ok: false, mensaje: 'Debe ingresar Usuario y Password' });
  }

  try {
    const query = `
      SELECT 
        u.ID_Usuario_Huesped,
        u.Usuario,
        u.\`Contraseña_Hash\` AS passwordHash,
        u.Estado,
        h.ID_Huesped,
        h.Primer_Nombre,
        h.Primer_Apellido,
        h.Correo,
        h.Telefono
      FROM Usuarios_Huesped u
      INNER JOIN Huespedes h ON u.ID_Huesped = h.ID_Huesped
      WHERE u.Usuario = ?
    `;

    const [rows] = await pool.query(query, [Usuario.trim()]);

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }

    const cliente = rows[0];

    if (cliente.Estado !== 1) {
      return res.status(403).json({ ok: false, mensaje: 'Esta cuenta de cliente está desactivada' });
    }

    const passwordCorrecta = await bcrypt.compare(Password, cliente.passwordHash);

    if (!passwordCorrecta) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }

    res.json({
      ok: true,
      mensaje: `Bienvenido, ${cliente.Primer_Nombre} ${cliente.Primer_Apellido}`,
      cliente: {
        id_usuario_huesped: cliente.ID_Usuario_Huesped,
        id_huesped: cliente.ID_Huesped,
        usuario: cliente.Usuario,
        nombre_completo: `${cliente.Primer_Nombre} ${cliente.Primer_Apellido}`,
        correo: cliente.Correo,
        telefono: cliente.Telefono
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  registroCliente,
  loginCliente
};