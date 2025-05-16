exports.meuMiddleware = (req, res, next) => {
    next();
};

exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
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

//CHECANDO SE EXISTE UM USUÁRIO NA SESSÃO

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors' , 'Você precisa fazer login para continuar.');
        req.session.save( () => res.redirect('/'));
        return;
    }  
        next();
};