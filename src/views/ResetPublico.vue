<template>
  <div class="login">

    <b-container>
      <div v-if="resetAtivo">

      </div>
      <div v-else >
        <b-row class="justify-content-center">

        <b-col md="6">

          <b-card class="shadow-lg">
            <b-card-title>Recuperação de Senha</b-card-title>
            <b-card-body>
              <div class="text-center mb-4">

              </div>
              <form>
                <div class="form-group mt-2">
                  <b-form-input placeholder="Email cadastrado " class="form-control-lg" v-model="usuario.email"></b-form-input>
                </div>

                <div class="form-group mt-2 ">
                  <b-button variant="primary" block size="lg" class="w-100 mb-2" @click.prevent="enviarTokenReset">Enviar</b-button>
                </div>

              </form>
              <hr>
              <div class="d-flex justify-content-sm-end">

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
export default {
  data(){
    return {
      usuario:{
        email:null
      },
      resetAtivo:false,
    };
  },

  methods:{
    async enviarTokenReset(){
      this.$http.get(`public/resetpassword?email=${this.usuario.email}`)
          .then(()=>{
        console.log("Sucesso no envio de email!");
      }).catch((erro)=>{
        console.log(erro);
      })
    }
  },
  mounted() {
    if(this.$route.query.token) {
      const token = this.$route.query.token;
      console.log('token recuperado', token)
      this.$store.commit('DEFINIR_USUARIO_LOGADO', {token:token});
      this.resetAtivo =true;
    }
  }
}
</script>

<style scoped>
.login {
  margin: 100px auto;
}
</style>