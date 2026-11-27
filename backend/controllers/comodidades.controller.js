const pool = require('../config/db');

const obtenerComodidades = async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Catalogo_Comodidades');
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar el catálogo de comodidades' });
    }
};

const crearComodidad = async (req, res) => {
    try {
        const { Nombre_Comodidad } = req.body;
        if (!Nombre_Comodidad) {
            return res.status(400).json({ error: 'El nombre de la comodidad es obligatorio' });
        }

        const [resultado] = await pool.query(
            'INSERT INTO Catalogo_Comodidades (Nombre_Comodidad) VALUES (?)',
            [Nombre_Comodidad]
        );

        res.status(201).json({
            id: resultado.insertId,
            Nombre_Comodidad: Nombre_Comodidad,
            Estado: 1
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la comodidad' });
    }
};


module.exports = {
    obtenerComodidades,
    crearComodidad
};