const express = require('express');
const route = express.Router();

//IMPORTANDO O MODULO CONTROLLER HOME
const homeController = require('./src/controllers/homeController')
//CONTROLER
const loginController = require('./src/controllers/loginController')
//IMPORTANDO O MODULO CONTROLLER CONTATO

//ROTAS DA HOME

route.get ('/' , homeController.index);

// ROTAS DE LOGIN

route.get('/login/index', loginController.index);

route.post('/login/register' , loginController.register)

module.exports = route;




