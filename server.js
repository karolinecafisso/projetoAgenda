require('dotenv').config();
const express = require('express');
const app = express();
//EMITIR SINAL PRA FALAR QUE A BASE DE DADOS TÀ CONECTADA
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Conectei a Base de Dados');
        //CONEXÃO SÓ IRÁ OCORRER QUANDO O APP EMITIR O SINAL PRONTO
        app.emit ('pronto');
    })
    .catch (e => {console.error('Erro de Conexão com o MongoDB:' , e)});

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
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

//HELMET
app.use(helmet());
//Para tratar POST e PUT que for enviado e não vir como undefined
app.use(express.urlencoded({extended: true}));
//Conteudo Estático
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

//Configurando os views

app.set('views' , path.resolve (__dirname, 'src' , 'views'));
app.set('view engine' , 'ejs');

//CSURF
app.use(csrf());
    
//MIDDLEWARE
app.use(csrfMiddleware);
app.use(meuMiddleware);
app.use(middlewareGlobal);
//MIDDLEWARE DE ERRO DEVE SER O ULTIMO

app.use(checkCsrfError);

//DIZER PRO EXPRESS USAR AS ROTAS

app.use(routes);


//CONEXÃO OCORRENDO QUANDO O APP EMITIR PRONTO

app.on('pronto' , ()=> {
    app.listen(3000, ()=> {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor Executando na porta 3000');
    });
})


app.use((req, res,next) => {
    res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' https://cdn.jsdelivr.net"
    );
    next();
});
