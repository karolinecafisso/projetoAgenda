const Login = require('../models/LoginModel');

//ROTA PADRÃO
exports.index = (req, res) => {
  if (req.session.user) return res.render('login-logado')
  res.render('login')
};

//REGISTRO

//Como o método register retorna uma promisse, aqui tbm temos que usar o async e o await
exports.register = async function(req, res) {
 

  try {
    const login = new Login (req.body);
    await login.register();
    if(login.errors.length > 0){
      req.flash('errors' , login.errors);
      req.session.save(function (){
        return res.redirect ('/login/index')
    });

    return;
  }
      req.flash('success' , 'Seu usuário foi criado com êxito!');
      req.session.save(function (){
        return res.redirect ('/login/index')
    });
  } catch(e) {
    console.log(e);
    res.render('404');
  }

  
};


//Criando o controller do login/login
exports.login = async function(req, res) {
 

  try {
    const login = new Login (req.body);
    await login.login();
    if(login.errors.length > 0){
      req.flash('errors' , login.errors);
      req.session.save(function (){
        return res.redirect ('/login/index')
    });

    return;
  }

      req.flash('success' , 'Você logou com sucesso!');
      req.session.user = login.user;
      req.session.save(function (){
        return res.redirect ('/login/index')
    });

  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

//CRIANDO O LOGOUT

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}