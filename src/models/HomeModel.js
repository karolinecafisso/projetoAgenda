const mongoose = require ('mongoose');


//Modelar e Tratar os Dados do Mongodb
const HomeSchema =  new mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
});


//Criando o Model
const HomeModel = mongoose.model ('Home' , HomeSchema);
                                //NOME , SCHEMA (TRATAMENTO DE DADOS)

class Home {

};

module.exports = Home;