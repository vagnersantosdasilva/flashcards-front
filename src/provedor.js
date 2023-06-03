import Vuex from 'vuex';
import Vue from 'vue';
import http from "./http";

Vue.use(Vuex);

const estado = {
    token:null,
    refreshToken:null,
    usuario:{}
}

const mutations = {
    DEFINIR_USUARIO_LOGADO(state,{token,refreshToken,usuario}){
        state.usuario = usuario
        state.token = token
        state.refreshToken = refreshToken
    },

    DESLOGAR_USUARIO(state){
        state.token = null
        state.usuario = {}
        state.refreshToken = null
    }
}

const actions = {
    efetuarLogin ({ commit }, usuario) {
        return new Promise( (resolve, reject) => {

            const CLIENT_ID = 'cliente'
            const CLIENT_SECRET = '123'

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            };

            const data = {
                grant_type: 'password',
                username: usuario.email,
                password: usuario.password
            };

            http.post(`oauth/token?grant_type=password&username=${usuario.email}&password=${usuario.password}`, data, {headers})
                .then(response => {
                    console.log("autenticacao!!!",response.data);
                    commit('DEFINIR_USUARIO_LOGADO', {
                        token: response.data.access_token,
                        usuario: {username:response.data.username},
                        refreshToken:response.data.refresh_token,
                    })
                    resolve(response.data)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}

export default new Vuex.Store({
    state:estado,
    mutations,
    actions
})
