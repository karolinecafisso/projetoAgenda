exports.meuMiddleware = (req, res, next) => {
    
    
    if(req.body.cliente) {
        req.body.cliente = req.body.cliente.replace('Cafisso' , 'NÂO USE CAFISSO');
        console.log();
        console.log(`Vi que você postou ${req.body.cliente}`);
        console.log();
    }
    
    next();
};

exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    next();
};

//CHECANDO SE O TOKEN É VALIDO, SE NÃO FOR, ERRO 404
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
    
        return res.render('404');
      }
      next();  // Passa o erro adiante
    };

//CRIANDO UM MIDDLEWARE PARA DISPONIBILIZAR O TOKEN E DISPONIVEL NAS VIEWS (index.ejs)
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};