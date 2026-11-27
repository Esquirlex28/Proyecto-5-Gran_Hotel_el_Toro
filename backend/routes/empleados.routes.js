const express = require('express');
const router = express.Router();
const { obtenerEmpleados, crearEmpleado } = require('../controllers/empleados.controller');

router.get('/', obtenerEmpleados);
router.post('/', crearEmpleado);

module.exports = router;