require('dotenv').config();
const express = require('express');
const app = express();
//EMITIR SINAL PRA FALAR QUE A BASE DE DADOS TÀ CONECTADA
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectei a Base de Dados');
        //CONEXÃO SÓ IRÁ OCORRER QUANDO O APP EMITIR O SINAL PRONTO
        app.emit ('pronto');
    })
    .catch (e => console.log(e));
//  IMPORTANDO O ROUTES PRA CÁ
const routes = require('./routes');
// IMPORTANDO O PATH
const path = require('path');
//IMPORTANDO O HELMET
const helmet = require('helmet');
//IMPORTANDO O CSURF
const csrf = require ('csurf');

//IMPORTANDO O MIDDELWaRE GLOBAL
const {middlewareGlobal, meuMiddleware, checkCsrfError, csrfMiddleware} = require('./src/middleware/middleware');
const { Console } = require('console');


//HELMET
app.use(helmet());
//Para tratar POST e PUT que for enviado e não vir como undefined

app.use(express.urlencoded({extended: true}));

//Conteudo Estático

app.use(express.static(path.resolve(__dirname, 'public')));

//Configurando os views

app.set('views' , path.resolve (__dirname, 'src' , 'views'));
app.set('view engine' , 'ejs');


//CSURF
app.use(csrf());
//MIDDLEWARE

app.use(meuMiddleware);
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);



//DIZER PRO EXPRESS USAR AS ROTAS

app.use(routes);


//CONEXÃO OCORRENDO QUANDO O APP EMITIR PRONTO

app.on('pronto' , ()=> {
    app.listen(3000, ()=> {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor Executando na porta 3000');
    });
})

