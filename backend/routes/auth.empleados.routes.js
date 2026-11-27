const express = require('express');
const router = express.Router();
const { registroEmpleado, loginEmpleado } = require('../controllers/auth.empleados.controller');

router.post('/registro', registroEmpleado);
router.post('/login', loginEmpleado);

module.exports = router;