const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Tipos_Habitacion');
        res.status(200).json(filas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los tipos de habitaciones' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM Tipos_Habitacion WHERE ID_Tipo_Habitacion = ?', [req.params.id]);
        if (filas.length === 0) {
            return res.status(404).json({ error: 'Tipo de habitacion no encontrada' });
        }
        res.status(200).json(filas[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los tipos de habitaciones' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { Nombre_Tipo, Capacidad_Maxima, Tarifa_Base } = req.body;
        if (!Nombre_Tipo || !Capacidad_Maxima || !Tarifa_Base) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (Capacidad_Maxima <= 0 || Tarifa_Base <= 0) {
            return res.status(400).json({ error: 'La capacidad máxima y la tarifa base deben ser mayores a 0' });
        }

        const [resultado] = await
            pool.query('INSERT INTO Tipos_Habitacion(Nombre_Tipo,Capacidad_Maxima,Tarifa_Base) VALUES(?,?,?)',
                [Nombre_Tipo, Capacidad_Maxima, Tarifa_Base]);
        res.status(201).json({ id: resultado.insertId, Nombre_Tipo, Capacidad_Maxima, Tarifa_Base });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tipo de habitacion' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { Nombre_Tipo, Capacidad_Maxima, Tarifa_Base } = req.body;
        if (!Nombre_Tipo || !Capacidad_Maxima || !Tarifa_Base) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const [resultado] = await pool.query
            ('UPDATE Tipos_Habitacion SET Nombre_Tipo=?,Capacidad_Maxima=?,Tarifa_Base=? WHERE ID_Tipo_Habitacion = ?',
                [Nombre_Tipo, Capacidad_Maxima, Tarifa_Base, req.params.id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Tipo de habitacion no encontrado' });
        }
        res.status(200).json({ mensaje: 'Tipo de habitacion actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el tipo de habitacion' });
    }
});

module.exports = router;