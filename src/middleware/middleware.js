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


exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
        
    }
    next(err); 
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};