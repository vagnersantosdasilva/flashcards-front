const prerender = require('prerender-spa-plugin').default;
const path = require('path');


const PrerenderSPAPlugin = prerender({
    // caminho para o arquivo de configuração do plugin
    staticDir: path.join(__dirname, 'dist'),
    indexPath: path.join(__dirname, 'dist', 'index.html'),
    routes: ['/'],
});

PrerenderSPAPlugin.staticRoutes.forEach((route) => {
    PrerenderSPAPlugin.routes.push(route);
});

PrerenderSPAPlugin.routes.sort();

PrerenderSPAPlugin.renderer.on('beforeRender', (page) => {
    // customizações antes de renderizar a página
});

PrerenderSPAPlugin.renderer.on('afterRender', (page) => {
    // customizações após a renderização da página
});

PrerenderSPAPlugin.renderer.on('error', (error) => {
    console.error(error);
    process.exit(1);
});

PrerenderSPAPlugin.renderer.on('log', (log) => {
    console.log(log);
});

PrerenderSPAPlugin.renderer.on('warn', (warning) => {
    console.warn(warning);
});

PrerenderSPAPlugin.renderRoute('/').then(() => {
    console.log('Prerenderização concluída');
    process.exit();
});
