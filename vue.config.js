const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
  configureWebpack: config => {
    //if (process.env.NODE_ENV !== 'production') return;

    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/login', '/cadastro_usuario','/home','/cadastro','/reset','/resetPrivado','/help','/perfil','/questao' ],
          renderer: new Renderer({
            renderAfterDocumentEvent: 'render-event' // aguardar até que o evento personalizado seja emitido pelo Vue.js após a renderização do HTML
          })
        })
      ]
    }
  }
}
