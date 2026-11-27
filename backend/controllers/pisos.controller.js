const pool = require('../config/db');

const obtenerPisos = async (req,res) => {
    try {
        const[filas] = await pool.query('SELECT * FROM Pisos');
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar los Pisos' });
    }
};

const crearPiso = async (req, res) => {
    try {
        const { Codigo_Piso, Nombre_Piso, Capacidad_Habitaciones, Observaciones } = req.body;

        if (!Codigo_Piso || !Nombre_Piso || !Capacidad_Habitaciones) {
            return res.status(400).json({
                error: 'Codigo_Piso, Nombre_Piso y Capacidad_Habitaciones son obligatorios'
            });
        }

        if (Capacidad_Habitaciones <= 0) {
            return res.status(400).json({
                error: 'La capacidad de habitaciones debe ser mayor a 0'
            });
        }

        await pool.query(
            'INSERT INTO Pisos (Codigo_Piso, Nombre_Piso, Capacidad_Habitaciones, Observaciones) VALUES (?, ?, ?, ?)',
            [Codigo_Piso, Nombre_Piso, Capacidad_Habitaciones, Observaciones || null]
        );

        res.status(201).json({
            id: resultado.insertId,
            Codigo_Piso: Codigo_Piso,
            Nombre_Piso: Nombre_Piso,
            Capacidad_Habitaciones,
            Observaciones: Observaciones || null
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Ya existe un piso con ese Codigo_Piso' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al crear el piso' });
    }
};

module.exports={
    obtenerPisos,
    crearPiso
}