const pool = require('../config/db');

const obtenerComodidadesPorTipo = async (req, res) => {
    try {
        const { idTipo } = req.params;

        const [filas] = await pool.query(`
            SELECT 
                thc.ID_Tipo_Habitacion_Comodidad,
                th.Nombre_Tipo,
                c.Nombre_Comodidad,
                thc.Observaciones
            FROM Tipo_Habitacion_Comodidades thc
            INNER JOIN Tipos_Habitacion th ON thc.ID_Tipo_Habitacion = th.ID_Tipo_Habitacion
            INNER JOIN Catalogo_Comodidades c ON thc.ID_Comodidad = c.ID_Comodidad
            WHERE thc.ID_Tipo_Habitacion = ?
        `, [idTipo]);
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar las comodidades de este tipo de habitacion' });
    }
};

module.exports = {
    obtenerComodidadesPorTipo
};