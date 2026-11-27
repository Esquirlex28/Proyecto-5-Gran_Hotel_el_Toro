const express = require('express');
const router = express.Router();
const {obtenerPisos,crearPiso} = 
    require('../controllers/pisos.controller');

router.get('/',obtenerPisos);
router.post('/',crearPiso);

module.exports=router;