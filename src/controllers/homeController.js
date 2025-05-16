//IMPORTAR OS CONTATOS

const Contato = require('../models/ContatoModel');




//Controler pra Pagina Home

//EXPORTANDO A PAGINA INICIAL COM O FORMULÁRIO
exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index' , { contatos});
};


