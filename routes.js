const express = require('express');
const route = express.Router();

//IMPORTANDO O MODULO CONTROLLER HOME
const homeController = require('./src/controllers/homeController')

//IMPORTANDO O MODULO CONTROLLER CONTATO

const contatoController = require('./src/controllers/contatoController')


//ROTAS DA HOME

route.get ('/' , homeController.paginaInicial);

route.post('/' , homeController.paginaPost);

//ROTAS DE CONTATO

route.get ('/faleconosco' , contatoController.contato);

//EXPORTANDO O ROUTES

module.exports = route;




