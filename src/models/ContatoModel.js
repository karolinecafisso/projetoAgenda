const mongoose = require ('mongoose');
const validator = require ('validator');

//Modelar e Tratar os Dados do Mongodb
const ContatoSchema =  new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now },
    
});


//Criando o Model
const ContatoModel = mongoose.model ('Contato' , ContatoSchema);
                                //NOME , SCHEMA (TRATAMENTO DE DADOS)

function Contato (body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}



Contato.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {

    //Validação dos Campos
    this.cleanUp();

    //O email precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');  
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone){
      this.errors.push('O campo do e-mail ou o telefone deve ser preenchido.');
    };
       
};

    // VAI FAZER UM FOR NO FORMS DO BODY PARA GARANTIR QUE TUDO O QUE ESTIVER SENDO
    //DIGITADO NÃO SEJA UMA STRING
Contato.prototype.cleanUp = function() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
};

//EDIT

Contato.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};



//Métodos Estáticos

//Buscar Contato por Id

Contato.buscaPorId = async function (id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
};


//LISTANDO OS CONTATOS DA AGENDA
Contato.buscaContatos = async function () {
    const contatos = await ContatoModel.find()
        .sort({  criadoEm: -1 });
    return contatos;
};


//DELETANDOS OS CONTATOS DA AGENDA 

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete( {_id: id});
    return contato;
};

module.exports = Contato;