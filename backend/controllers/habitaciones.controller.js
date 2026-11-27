const pool = require('../config/db');

const obtenerHabitaciones = async (req, res) => {
    try {
        const [filas] = await pool.query(`
            SELECT 
                h.ID_Habitacion,
                h.Numero_Habitacion,
                h.Tipo_Vista,
                t.Nombre_Tipo,
                t.Capacidad_Maxima,
                t.Tarifa_Base,
                p.Nombre_Piso,
                e.Nombre_Estado
            FROM Habitaciones h
            INNER JOIN Tipos_Habitacion t ON h.ID_Tipo_Habitacion = t.ID_Tipo_Habitacion
            INNER JOIN Pisos p ON h.ID_Piso = p.ID_Piso
            INNER JOIN Estados_Habitacion e ON h.ID_Estado_Habitacion = e.ID_Estado_Habitacion
        `);
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar las habitaciones' });
    }
};

const crearHabitacion = async (req, res) => {
    try {
        const { Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista, ID_Estado_Habitacion } = req.body;
        if (!Numero_Habitacion || !ID_Tipo_Habitacion || !ID_Piso || !Tipo_Vista || !ID_Estado_Habitacion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const [resultado] = await
            pool.query
                ('INSERT INTO Habitaciones(Numero_Habitacion,ID_Tipo_Habitacion,ID_Piso,Tipo_Vista,ID_Estado_Habitacion) VALUES(?,?,?,?,?)',
                    [Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista, ID_Estado_Habitacion]);
        res.status(201).json({
            id: resultado.insertId, Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista,
            ID_Estado_Habitacion
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la Habitacion' });
    }
}

module.exports = {
    obtenerHabitaciones,
    crearHabitacion,
};