const express = require('express');
const router = express.Router();
const {obtenerComodidadesPorTipo} = 
    require('../controllers/tipohabitacioncomodidades.controller');

router.get('/tipo/:idTipo',obtenerComodidadesPorTipo);

module.exports=router;