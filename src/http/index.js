import axios from 'axios'
import provedor from "../provedor";
//import router from "../router";

const http = axios.create({
    //baseURL: 'https://api.memobeam.com.br'
    baseURL: 'http://localhost:8082'

})

http.interceptors.request.use(function (config) {
    const token = provedor.state.token
    let tokenLocal = localStorage.getItem('token')
    if (tokenLocal) tokenLocal = tokenLocal.replace('Bearer ','')
    if (token) {
        config.headers.Authorization = token
    }
    else{
        if (tokenLocal) config.headers.Authorization = token
    }
    return config
}, function (erro) {
    return Promise.reject(erro)
})

/*
http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        console.log('error config', error.config)
        console.log('error response', error)
        if (error && error.code === "ERR_NETWORK" && !originalRequest._retry) {
            originalRequest._retry = true;

            // Tentar obter um novo token usando o refresh token
            const refreshToken = provedor.state.refreshToken;
            const CLIENT_ID = 'cliente'
            const CLIENT_SECRET = '123'

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            };

            const data = {
                grant_type: 'refresh_token',
                refresh_token:refreshToken
            };

            if (refreshToken) {
                return http.post(`oauth/token?grant_type=${data.grant_type}&refresh_token=${refreshToken}`,data,{headers})
                    .then(response => {
                        console.log('token expirou refresh token chamado!',response.data)
                        // Atualizar o token no provedor Vuex
                        provedor.commit('DEFINIR_USUARIO_LOGADO', {
                        token: response.data.access_token,
                        refreshToken: refreshToken,
                        usuario: provedor.state.usuario
                    });

                    // Atualizar o cabeçalho da requisição com o novo token
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

                    // Reenviar a requisição original com o novo token
                    return http(originalRequest);
                }).catch(() => {
                    // Se ocorrer um erro ao obter o novo token, redirecionar para a tela de login
                    provedor.commit('DESLOGAR_USUARIO');
                    redirecionarParaTelaDeLogin();
                    return Promise.reject(error);
                });
            }
        }

        return Promise.reject(error);
    }
);*/



/*function redirecionarParaTelaDeLogin() {
    // Implemente a lógica de redirecionamento para a tela de login de acordo com a sua implementação real

    router.push("/login")
}*/

export default http