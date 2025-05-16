const express = require('express');
const route = express.Router();

//IMPORTANDO O MODULO CONTROLLER HOME
const homeController = require('./src/controllers/homeController');
//CONTROLER DO LOGIN
const loginController = require('./src/controllers/loginController');
//CONTROLLER DO CONTATO
const contatoController = require('./src/controllers/contatoController');

//IMPORTANDO MIDDLAWARE QUE CHECA SE O USUÁRIO TA LOGADO
const { loginRequired } = require('./src/middleware/middleware');

//ROTAS DA HOME

route.get ('/' , homeController.index);

// ROTAS DE LOGIN

route.get('/login/index', loginController.index);

route.post('/login/register' , loginController.register);

route.post('/login/login' , loginController.login);

//ROTA DE LOGOUT

route.get('/login/logout' , loginController.logout);

//ROTA DE CADASTRO DE CONTATO

route.get('/contato/index', loginRequired, contatoController.index); 

route.post('/contato/register', loginRequired, contatoController.register);

//ROTA DE CONTATO PELO ID

route.get('/contato/index/:id', loginRequired, contatoController.indexId );

//EDIT

route.post('/contato/edit/:id', loginRequired, contatoController.edit);

//DELETE

route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;




