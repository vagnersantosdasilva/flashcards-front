const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
    // caminho para o diretório onde o projeto está compilado
    staticDir: path.join(__dirname, 'dist'),

    // lista de rotas que você quer pré-renderizar
    routes: ['/', '/login', '/cadastro_usuario','/home','/cadastro','/questao','/reset','/resetPrivado','/perfil','/help' ],

    // configuração do plugin
    // consulte a documentação do plugin para ver mais opções de configuração
    plugins: [
        new PrerenderSPAPlugin({
            // configuração do plugin
        })
    ]
};
