const express = require('express');
const router = express.Router();
const { registroCliente, loginCliente } = require('../controllers/auth.clientes.controller');

router.post('/registro', registroCliente);
router.post('/login', loginCliente);

module.exports = router;