const express = require('express');
const router = express.Router();
const {obtenerComodidades,crearComodidad} = 
    require('../controllers/comodidades.controller');

router.get('/',obtenerComodidades);

module.exports=router;