import Vuex from 'vuex';
import Vue from 'vue';
import http from "./http";
import { decode } from 'jsonwebtoken';
Vue.use(Vuex);

const estado = {
    token:null,
    refreshToken:null,
    usuario:{},
    isLoading:null,
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
    },

    DEFINIR_ESTADO_DE_CARREGAMENTO(state,isLoading){
        state.isLoading = isLoading
    }
}

const actions = {
    efetuarLogin ({ commit }, usuario) {
        return new Promise( (resolve, reject) => {

            //const CLIENT_ID = 'cliente'
            //const CLIENT_SECRET = '123'

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            };

            const data = {
                grant_type: 'password',
                username: usuario.email,
                password: usuario.password
            };

            http.post(`api/public/login`, data, {headers})
                .then(response => {
                    //console.log("autenticacao!!!",response.data);
                    const jwt_decoded = decode(response.data.token.replace("Bearer ",""));
                    commit('DEFINIR_USUARIO_LOGADO', {
                        token: response.data.token,
                        usuario: {
                            username:jwt_decoded.sub ,
                            idUser:jwt_decoded.idUser
                        }
                    })
                    localStorage.setItem('token',response.data.token);
                    resolve(response.data)
                })
                .catch(err => {
                    //console.log(err)
                    reject(err)
                })
        })
    }
}

const getters = {
    estaCarregando: state => state.isLoading
};

export default new Vuex.Store({
    state:estado,
    mutations,
    actions,
    getters
})


