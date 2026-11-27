const express = require('express');
const router = express.Router();
const {obtenerHabitaciones, crearHabitacion} = 
    require('../controllers/habitaciones.controller');

router.get('/',obtenerHabitaciones);
router.post('/',crearHabitacion);

module.exports = router;