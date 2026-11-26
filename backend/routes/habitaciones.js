const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/',async (req,res) => {
    try{
        const[filas]=await pool.query('SELECT * FROM Habitaciones');
        res.json(filas);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Error al consultas las habitaciones'});
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const[filas]= await pool.query('SELECT * FROM Habitaciones WHERE ID_Habitacion = ?',req.params.id); 

        if(filas.length === 0){
            return res.status(404).json({error: 'Habitacion no encontrada'});
        }

        res.json(filas[0]);
    }catch(error){
        res.status(500).json({error:'Error al obtener la habitaciones'});
    }
});

router.post('/',async (req,res)=>{
    try{
        const{Numero_Habitacion,ID_Tipo_Habitacion,ID_Piso,Tipo_Vista,ID_Estado_Habitacion} = req.body;
        if(!Numero_Habitacion || !ID_Tipo_Habitacion || !ID_Piso ||!Tipo_Vista ||!ID_Estado_Habitacion){
            return res.status(400).json({error:'Todos los campos son obligatorios'});
        }
        const[resultado] = await 
        pool.query
        ('INSERT INTO Habitaciones(Numero_Habitacion,ID_Tipo_Habitacion,ID_Piso,Tipo_Vista,ID_Estado_Habitacion) VALUES(?,?,?,?,?)',
            [Numero_Habitacion,ID_Tipo_Habitacion,ID_Piso,Tipo_Vista,ID_Estado_Habitacion]);
        res.status(201).json({id:resultado.insertId,Numero_Habitacion,ID_Tipo_Habitacion,ID_Piso,Tipo_Vista,
            ID_Estado_Habitacion});
    }catch(error){
        res.status(500).json({error:'Error al crear la Habitacion'});
    }
})

module.exports = router;
