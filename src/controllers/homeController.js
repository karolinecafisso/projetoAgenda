
//Controler pra Pagina Home


//EXPORTANDO A PAGINA INICIAL COM O FORMULÁRIO
exports.paginaInicial = (req, res) => {
    res.render('index');
    return;
}

exports.paginaPost = (req, res) => {
    res.send (req.body);
    return;
}

