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
    next();
};

//CHECANDO SE O TOKEN É VALIDO, SE NÃO FOR, ERRO 404
exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        console.error('Erro de CSRF:', err);  // Log completo do erro
        return res.render('404');
      }
      next(err);  // Passa o erro adiante
    };

//CRIANDO UM MIDDLEWARE PARA DISPONIBILIZAR O TOKEN E DISPONIVEL NAS VIEWS (index.ejs)
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};