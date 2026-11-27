const pool = require('../config/db');

const obtenerTiposHabitacion = async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Tipos_Habitacion');
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar los tipos de habitaciones' });
    }
};


const crearTipoHabitacion = async (req, res) => {
    try {
        const { Nombre_Tipo, Capacidad_Maxima, Tarifa_Base } = req.body;
        if (!Nombre_Tipo || !Capacidad_Maxima || !Tarifa_Base) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (Capacidad_Maxima <= 0 || Tarifa_Base <= 0) {
            return res.status(400).json({ error: 'La capacidad máxima y la tarifa base deben ser mayores a 0' });
        }

        const [resultado] = await pool.query(
            'INSERT INTO Tipos_Habitacion(Nombre_Tipo, Capacidad_Maxima, Tarifa_Base) VALUES (?, ?, ?)',
            [Nombre_Tipo, Capacidad_Maxima, Tarifa_Base]
        );
        res.status(201).json({
            id: resultado.insertId,
            Nombre_Tipo,
            Capacidad_Maxima,
            Tarifa_Base
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el tipo de habitacion' });
    }
};



module.exports = {
    obtenerTiposHabitacion,
    crearTipoHabitacion
};