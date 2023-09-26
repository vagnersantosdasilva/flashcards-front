<template>
  <div class="login">

    <b-container>
      <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
        <alert-custom
            :show="showDismissibleAlert"
            :alert="erroResponse"
        />
      </b-row>
      <div v-if="resetAtivo">
        <FormularioResetPublico />
      </div>
      <div v-else >
        <b-row class="d-flex justify-content-center mt-4" >
          <div class="loader-container md-6 text-center mt-4" v-if="estaCarregando" >
            <i class="fas fa-hourglass fa-spin fa-3x"></i>
          </div>
          <b-col md="6" v-else>

            <b-card class="shadow-lg">
              <b-card-title>Recuperação de Senha</b-card-title>
              <b-card-body v-if="emailEnviado">
                <div class="text-start mb-4" style="font-size: 14px;color:#a2d34d;" v-if="emailEnviadoSucesso">
                  <b>
                    E-mail enviado com sucesso! Verifique sua caixa de e-mail.
                  </b>
                </div>
                <div class="text-start mb-4" style="font-size: 14px; color:indianred" v-else>
                  <b>Ocorreu um erro ao tentar enviar o link de redefinição de senha para
                  o e-mail informado. Verifique se você digitou o e-mail corretamente. Se o problema persistir, tente repetir o processo mais tarde.</b>
                </div>
              </b-card-body>
              <b-card-body  v-else>
                <div class="text-start mb-4" style="font-size: 14px;">
                  Para recuperar seu acesso, insira o seu e-mail cadastrado no campo abaixo e clique em enviar.
                  Uma nova senha será gerada automaticamente e enviada para seu e-mail.
                  Após reestabelecer o acesso você poderá modificar essa senha em configuração de perfil de usuário.
                </div>
                <div>
                  <form>
                    <div class="form-group mt-2">
                      <b-form-input placeholder="Email cadastrado " class="form-control-lg" v-model="usuario.email"></b-form-input>
                    </div>

                    <div class="form-group mt-2 ">
                      <b-button variant="primary" block size="lg" class="w-100 mb-2" @click.prevent="enviarTokenReset">Enviar</b-button>
                    </div>

                  </form>
                  <hr>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>

    </b-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FormularioResetPublico from "../components/FormularioResetPublico.vue";
import {decode} from "jsonwebtoken";
import AlertCustom from "../components/AlertCustom.vue";

export default {
  components: {AlertCustom, FormularioResetPublico},
  data(){
    return {
      showDismissibleAlert:false,
      erroResponse:{},
      usuario:{
        email:null,
      },
      resetAtivo:false,
      emailEnviado:false,
      emailEnviadoSucesso:false,
    };
  },

  methods:{
    async enviarTokenReset(){
      this.showDismissibleAlert=false;
      this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', true);
      this.emailEnviado = false;
      this.emailEnviadoSucesso=false;
      this.$http.get(`api/public/reset/usuario?email=${this.usuario.email}`)
          .then(()=>{
            this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', false);
            this.emailEnviado = true;
            this.emailEnviadoSucesso=true;
          }).catch((erro)=>{
            this.$store.commit('DEFINIR_ESTADO_DE_CARREGAMENTO', false);
            //console.log(erro);
            this.emailEnviado = false;
            this.emailEnviadoSucesso=false;
            this.showDismissibleAlert=true;
            this.erroResponse = Object.assign({},erro);

          })
    }
  },
  mounted() {
    if(this.$route.query.token) {
      const token = this.$route.query.token;
      //const username = this.$route.query.username;
      //console.log('token recuperado', token)
      const jwt_decoded = decode(token);
      this.$store.commit('DEFINIR_USUARIO_LOGADO', {
        token: token,
        usuario: {
          username:jwt_decoded.sub ,
          idUser:jwt_decoded.idUser
        }
      })
      this.resetAtivo =true;
    }
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
input {border-radius: 0}
.btn {border-radius: 0}
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
</style>

