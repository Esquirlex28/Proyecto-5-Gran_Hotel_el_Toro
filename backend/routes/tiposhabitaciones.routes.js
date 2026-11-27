const express = require('express');
const router = express.Router();
const {obtenerTiposHabitacion,crearTipoHabitacion} = 
    require('../controllers/tipohabitaciones.controller');

router.get('/',obtenerTiposHabitacion);
router.post('/',crearTipoHabitacion);

module.exports=router;