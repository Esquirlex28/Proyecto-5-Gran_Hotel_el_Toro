const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// 1. REGISTRO DE CREDENCIALES PARA EMPLEADO (POST /api/auth/empleados/registro)
const registroEmpleado = async (req, res) => {
  const { ID_Empleado, Usuario, Password } = req.body;

  if (!ID_Empleado || !Usuario || !Password) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Debe enviar ID_Empleado, Usuario y Password'
    });
  }

  try {
    // Verificamos que el empleado exista y esté activo antes de asignarle credenciales
    const [empleados] = await pool.query(
      'SELECT ID_Empleado, Estado FROM Empleados WHERE ID_Empleado = ?',
      [ID_Empleado]
    );

    if (empleados.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'No existe ningún empleado con ese ID_Empleado' });
    }

    if (empleados[0].Estado !== 1) {
      return res.status(403).json({ ok: false, mensaje: 'No se puede crear usuario a un empleado inactivo' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(Password, salt);

    const query = `
      INSERT INTO Usuarios_Empleado (ID_Empleado, Usuario, \`Contraseña_Hash\`, Estado)
      VALUES (?, ?, ?, 1)
    `;

    const [resultado] = await pool.query(query, [ID_Empleado, Usuario.trim(), passwordHash]);

    res.status(201).json({
      ok: true,
      mensaje: 'Credenciales de empleado registradas correctamente',
      datos: {
        id_usuario_empleado: resultado.insertId,
        id_empleado: ID_Empleado,
        usuario: Usuario.trim()
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ese nombre de usuario ya existe o el empleado ya tiene una cuenta asignada'
      });
    }
    res.status(500).json({ ok: false, mensaje: 'Error al registrar usuario de empleado', error: error.message });
  }
};

// 2. INICIO DE SESIÓN DE EMPLEADOS (POST /api/auth/empleados/login)
const loginEmpleado = async (req, res) => {
  const { Usuario, Password } = req.body;

  if (!Usuario || !Password) {
    return res.status(400).json({ ok: false, mensaje: 'Debe ingresar Usuario y Password' });
  }

  try {
    const query = `
      SELECT 
        u.ID_Usuario_Empleado,
        u.Usuario,
        u.\`Contraseña_Hash\` AS passwordHash,
        u.Estado AS estadoCuenta,
        e.ID_Empleado,
        e.Primer_Nombre,
        e.Primer_Apellido,
        e.Correo,
        e.Estado AS estadoEmpleado,
        c.ID_Cargo,
        c.Nombre_Cargo
      FROM Usuarios_Empleado u
      INNER JOIN Empleados e ON u.ID_Empleado = e.ID_Empleado
      INNER JOIN Cargos_Empleado c ON e.ID_Cargo = c.ID_Cargo
      WHERE u.Usuario = ?
    `;

    const [rows] = await pool.query(query, [Usuario.trim()]);

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }

    const empleado = rows[0];

    if (empleado.estadoCuenta !== 1 || empleado.estadoEmpleado !== 1) {
      return res.status(403).json({ ok: false, mensaje: 'La cuenta o el empleado se encuentra inactivo' });
    }

    const passwordCorrecta = await bcrypt.compare(Password, empleado.passwordHash);

    if (!passwordCorrecta) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }

    res.json({
      ok: true,
      mensaje: `Bienvenido, ${empleado.Primer_Nombre} ${empleado.Primer_Apellido}`,
      empleado: {
        id_usuario_empleado: empleado.ID_Usuario_Empleado,
        id_empleado: empleado.ID_Empleado,
        usuario: empleado.Usuario,
        nombre_completo: `${empleado.Primer_Nombre} ${empleado.Primer_Apellido}`,
        correo: empleado.Correo,
        id_cargo: empleado.ID_Cargo,
        cargo: empleado.Nombre_Cargo
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al iniciar sesión de empleado', error: error.message });
  }
};

module.exports = {
  registroEmpleado,
  loginEmpleado
};