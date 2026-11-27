const express = require('express');
const router = express.Router();
const {obtenerEstadosHabitacion,crearEstadoHabitacion} = 
    require('../controllers/estadoshabitacion.controller');

router.get('/',obtenerEstadosHabitacion);
router.post('/',crearEstadoHabitacion);

module.exports=router;