<template>
  <div class="login">

    <b-container>
      <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
        <alert-custom
            :show="showDismissibleAlert"
            :alert="erroResponse"
        >

        </alert-custom>
      </b-row>
      <div v-if="estaCarregando" >
        <b-row class="d-flex justify-content-center mt-4" >
          <div class="loader-container md-6 text-center mt-4" v-if="estaCarregando" >
            <i class="fas fa-hourglass fa-spin fa-3x"></i>
          </div>

        </b-row>
      </div>
      <div v-else>
        <FormularioResetPublico @onError="tratarErro"/>
      </div>
    </b-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FormularioResetPublico from "../components/FormularioResetPublico.vue";
import AlertCustom from "../components/AlertCustom.vue";

export default {
  components: {AlertCustom, FormularioResetPublico},
  data(){
    return {
      usuario:{
        username:null,
      },
      showDismissibleAlert:false,
      messageError:false,
      erroResponse:{},
      estaCarregando:false,
    };
  },

  methods:{
    tratarErro(erro) {
      //console.log("erro tratado", erro);
      this.showDismissibleAlert = true;
      if (erro) {
        this.erroResponse = erro;
      }
    },

    async enviarTokenReset(){
      this.estaCarregando=true;
      this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', true);
      this.emailEnviado = false;
      this.emailEnviadoSucesso=false;
      this.$http.get(`api/public/reset/usuario?email=${this.usuario.email}`)
          .then(()=>{
            this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', false);
            this.emailEnviado = true;
            this.emailEnviadoSucesso=true;
            this.estaCarregando=false;
          }).catch((erro)=>{
            this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', false);
            this.emailEnviado = false;
            this.emailEnviadoSucesso=false;
            this.estaCarregando=true;
            this.erroResponse = Object.assign({},erro);
      })
    }
  },
  mounted() {
    this.usuario = this.$store.state.usuario;
  },

  computed:{
    ...mapGetters(['estaCarregando'])
  }
}
</script>

<style scoped>
.login {
  margin: 100px auto;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(255, 255, 255, 0.8);*/
  z-index: 9999;
}

.loader-icon {
  max-width: 100px; /* Customize the size as needed */
}


.btn {
  width: 100%;
  height: 40px;
  border-radius: 0;
  border-radius: 0;
  font-family: Google Sans,arial,sans-serif;
  font-size: 14px;
  border-color:#c5d4e3;
}

input {
  border-radius: 0;
}

.form-control-lg {
  padding: 10px;
  font-size: 16px;
}

.input-group-append {
  border: 0;
}


</style>

