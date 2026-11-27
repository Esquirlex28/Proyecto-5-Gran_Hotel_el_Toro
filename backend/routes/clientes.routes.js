const express = require('express');
const router = express.Router();
const { obtenerClientes, registrarCliente } = require('../controllers/clientes.controller');

router.get('/', obtenerClientes);
router.post('/', registrarCliente);

module.exports = router;