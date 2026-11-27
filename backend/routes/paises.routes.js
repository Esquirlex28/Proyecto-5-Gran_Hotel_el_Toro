const express = require('express');
const router = express.Router();
const { obtenerPaises, crearPais } = require('../controllers/paises.controller');

router.get('/', obtenerPaises);
router.post('/', crearPais);

module.exports = router;