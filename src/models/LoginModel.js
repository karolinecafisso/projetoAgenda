const mongoose = require ('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


//Modelar e Tratar os Dados do Mongodb
const LoginSchema =  new mongoose.Schema({
   email: { type: String, required: true},
   password: { type: String, required: true},
    
});

//TRATAMENTO DOS DADOS DO LOGIN E FORMULÁRIO
//Criando o Model
const LoginModel = mongoose.model ('Login' , LoginSchema);
                                //NOME , SCHEMA (TRATAMENTO DE DADOS)

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
        }


    //METODO LOGIN

    async login() {
        this.valida();
        if(this.errors.length > 0 ) return;
        //Checar se o usuário existe
        this.user = await LoginModel.findOne( {email: this.body.email});
        if (!this.user) {
            this.errors.push("Usuário Não Existe.");
            return;
        }

        //CHECAR SE A SENHA É A MESMA CADASTRADA NO LOGIN

        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("Senha Inválida!");
            //Garantir que o usuário seja null pra não ter problema com os outros erros
            this.user = null;
            return;
        }
        
    }

    //MÉTODO REGISTER
    
    async register() { 
        this.valida();
        if(this.errors.length > 0 ) return;

        await this.userExists();

        if (this.errors.length > 0) return;

         //Antes de registrar o usuário no bd
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        
        //Criando o usuário e senha no bando de dados 
        //E criando uma variável para manter os dados do login na variável user
        this.user = await LoginModel.create(this.body);

    }


    //MÉTODO PRA CHECAR SE O USUÁRIO JÁ ESTA NA CADASTRADO NO BD
    
    async userExists() {
        this.user = await LoginModel.findOne( {email: this.body.email}) 
        if (this.user) this.errors.push('Usuário já existe');
    }

    //METODO PARA VALIDAR OS CAMPOS DE EMAIL E SENHA
    valida() {
        //Validação dos Campos
        this.cleanUp();
        //O email precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');  
        //A senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push('A senha deve ter entre 3 e 50 caracteres.');
        }
    }

    // VAI FAZER UM FOR NO FORMS DO BODY PARA GARANTIR QUE TUDO O QUE ESTIVER SENDO
    //DIGITADO NÃO SEJA UMA STRING
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        //GARANTIR QUE SÓ VAMOS USAR O EMAIL E SENHA, E NÃO O TOKEN
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
    
};

module.exports = Login;