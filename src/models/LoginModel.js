const mongoose = require ('mongoose');
const validator = require('validator');

//Modelar e Tratar os Dados do Mongodb
const LoginSchema =  new mongoose.Schema({
   email: { type: String, required: true},
   password: { type: String, required: true},
    
});


//Criando o Model
const LoginModel = mongoose.model ('Login' , LoginSchema);
                                //NOME , SCHEMA (TRATAMENTO DE DADOS)

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
        }
    
    async register() { 
        this.valida();
        if(this.erros.length > 0 ) return;
        //Criando o usuário e senha no bando de dados
        //Para não perder a informação do usuário
        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
        
    }
    valida() {
        //Validação dos Campos
        this.cleanUp();
        //O email precisa ser válido
        if (!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido!');  
        //A senha precisa ter entre 3 e 50 caracteres
        if(this.body.senha.length <3 || this.body.senha.length > 50){
            this.erros.push('A senha deve ter entre 3 e 50 caracteres.');
        }
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
    
};

module.exports = Login;