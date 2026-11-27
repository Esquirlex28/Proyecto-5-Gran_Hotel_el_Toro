const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Habitaciones');
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar las habitaciones' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Habitaciones WHERE ID_Habitacion = ?', req.params.id);

        if (filas.length === 0) {
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }

        res.json(filas[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las habitaciones' });
    }
});

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
    try {
        const { Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista, ID_Estado_Habitacion } = req.body;
        if (!Numero_Habitacion || !ID_Tipo_Habitacion || !ID_Piso || !Tipo_Vista || !ID_Estado_Habitacion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const [resultado] = await
            pool.query
                ('UPDATE Habitaciones SET Numero_Habitacion=?,ID_Tipo_Habitacion=?,ID_Piso=?,Tipo_Vista=?,ID_Estado_Habitacion=? WHERE ID_Habitacion = ?',
                    [Numero_Habitacion, ID_Tipo_Habitacion, ID_Piso, Tipo_Vista, ID_Estado_Habitacion, req.params.id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }
        res.status(200).json({ mensaje: 'Habitacion actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la Habitacion' });
    }
});

router.get('/estado/:idEstado', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Habitaciones WHERE ID_Estado_Habitacion = ?',
            [req.params.idEstado]);

        if (filas.length === 0) {
            return res.status(404).json({ error: 'No hay habitaciones con ese estado' });
        }
        res.status(200).json(filas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las Habitacion por estado' });
    }
});

router.patch('/:id/estado', async (req, res) => {
    try {
        const { ID_Estado_Habitacion } = req.body;
        if (!ID_Estado_Habitacion) {
            return res.status(400).json({ error: 'El estado es obligatorio' });
        }
        const [resultado] = await pool.query('UPDATE Habitaciones SET ID_Estado_Habitacion = ? WHERE ID_Habitacion = ? '
            , [ID_Estado_Habitacion, req.params.id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }
        res.status(200).json({ mensaje: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
});

module.exports = router;
