const path = require('path');  //Importar o modulo path (Common JS)

module.exports = {
    mode: 'production' , 
    entry: './frontend/main.js',  //Arquivo de Entrada
    output: {
     path: path.resolve(__dirname, 'public', 'assets' , 'js'),
     filename: 'bundle.js'  //Arquivo Gerado
    },
    module: {
        rules: [{
            exclude: /node_modules/,   //Excluir a pasta do node
            test: /\.js$/,  //Qual arquivo vai ser analisado
            use: {  //O que ele vai usar
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                } 
            }  
        }, {
            test: /\.css$/,
            use: ['style-loader' , 'css-loader']
        }
    ]
    },
    devtool: 'source-map'  //Mapear o erro 
     
};
