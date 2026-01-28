var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const EventoController = require('../controls/EventoController');
var eventoController = new EventoController();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
var auth = function middleware(req, res, next) {
  const token = req.headers['x-api-token'];
  if (token) {
    require('dotenv').config();
    const llave = process.env.KEY_SQ;

    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          msg: "TOKEN NO VALIDO",
          code: 401
        });
      } else {
        var models = require('../models');
        var cuenta = models.cuenta;
        req.decoded = decoded;
        let aux = await cuenta.findOne({ where: { external_id: req.decoded.external } })
        if (aux === null) {
          res.status(401);
          res.json({
            msg: "TOKEN NO VALIDO O EXPIRADO",
            code: 401
          });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401);
    res.json({
      msg: "NO EXISTE TOKEN",
      code: 401
    });
  }

}

/*-----------------------------------------------------------------RUTAS------------------------------------------------------------------*/


/*EVENTO CONTROLLER */
router.get('/evento/listar', eventoController.listar);
router.post('/evento/guardar', eventoController.guardar);

module.exports = router;
