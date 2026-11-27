const pool = require('../config/db');

const obtenerEstadosHabitacion = async (req,res)=>{
    try {
        const[filas] = await pool.query('SELECT * FROM Estados_Habitacion');
        res.status(200).json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar los estados de habitacion' });
    }
};

const crearEstadoHabitacion = async (req,res)=>{
    try {
      const{Nombre_Estado,Observaciones} = req.body;
      if(!Nombre_Estado){
        return res.status(400).json({error:'El nombre del estado es obligatorio'});
      }
      const[resultado] = await pool.query('INSERT INTO Estados_Habitacion(Nombre_Estado,Observaciones) VALUES (?,?)',
        [Nombre_Estado,Observaciones || null]
      );
      res.status(201).json({
        id: resultado.insertId,
        Nombre_Estado: Nombre_Estado,
        Observaciones: Observaciones || null
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el estado' });
    }
};

module.exports={
    obtenerEstadosHabitacion,
    crearEstadoHabitacion
}