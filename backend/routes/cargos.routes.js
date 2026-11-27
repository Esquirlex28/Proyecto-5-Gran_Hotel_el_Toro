const express = require('express');
const router = express.Router();
const { obtenerCargos, crearCargo } = require('../controllers/cargos.controller');

router.get('/', obtenerCargos);
router.post('/', crearCargo);

module.exports = router;