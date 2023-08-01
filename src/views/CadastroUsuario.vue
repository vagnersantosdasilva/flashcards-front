<template>
  <div>
    <b-container>


      <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
        <alert-custom
            :show="showDismissibleAlert"
            :alert="erroResponse"
        >

        </alert-custom>
      </b-row>
      <b-row class="d-flex justify-content-center mt-2" v-if="cadastroFinalizado">
        <b-col md="6" style="margin: 40px;">
          <b-card class=" shadow-lg">
            <b-card-body>
              <p class="d-flex justify-content-start" style="font-size: 16px; color:darkgreen;">
                Agradecemos por se cadastrar em nosso sistema! Enviamos um link de ativação para o e-mail fornecido.
                Para concluir o processo, por favor, verifique sua caixa de entrada e clique no link de ativação.
                Assim, seu cadastro será efetivado com sucesso.
              </p>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <!--
      <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
              <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                {{erro}}
              </b-alert>
            </b-row>
       -->
      <b-row class="d-flex justify-content-center mt-2" v-else>
        <b-col md="6" style="margin: 40px;">
          <b-card class=" shadow-lg">
            <b-card-title>Cadastro</b-card-title>
            <b-card-body>
              <form>
                <b-form-group
                    class="form-group mt-2"
                    label="Email:"
                    :invalid-feedback="errors.username"
                >
                  <b-form-input
                      v-model="usuario.username"
                      autocomplete="false"
                      placeholder="Email"
                      class="form-control-lg"

                      type="email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group class="form-group mt-2" label="Confirmar senha:"
                              :invalid-feedback="errors.confirmPassword">
                  <b-input-group>
                    <b-form-input
                        v-model="usuario.password"
                        autocomplete="false"
                        :type="passwordInputType"
                        placeholder="Senha"
                        class="form-control-lg"

                    ></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text
                          @mousedown="changeInputType('text')"
                          @mouseup="changeInputType('password')"
                          style="height: 50px;">
                        <i
                            :class="
                                passwordInputType === 'password'
                                  ? 'far fa-eye'
                                  : 'far fa-eye-slash'
                              "
                        ></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-form-group
                    class="form-group mt-2"
                    label="Confirmar senha:"

                    :invalid-feedback="errors.confirmPassword"
                    :state="errors.state.confirmPassword"
                >
                  <b-input-group>
                    <b-form-input
                        v-model="usuario.confirmPassword"
                        autocomplete="false"
                        :type="passwordInputType"
                        placeholder="Confirme a senha"
                        class="form-control-lg"

                        :state="errors.state.confirmPassword"
                        trim
                    ></b-form-input>
                    <b-input-group-append>
                      <b-input-group-text
                          @mousedown="changeInputType('text')"
                          @mouseup="changeInputType('password')"
                          style="height: 50px;">
                        <i
                            :class="
                                passwordInputType === 'password'
                                  ? 'far fa-eye'
                                  : 'far fa-eye-slash'
                              "
                        ></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-row class="d-flex justify-content-start col-12 ms-0 mt-3">
                  <b-button variant="primary" @click="cadastrar" :disabled="estaCarregando">
                    Cadastrar
                      <i class="fas fa-hourglass fa-spin fa-3x"
                         v-show="estaCarregando"
                         style="font-size: 12px"
                      />
                  </b-button>
                </b-row>
              </form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import AlertCustom from "../components/AlertCustom.vue";

export default {
  components: {AlertCustom},
  computed: {
    steteConfirm() {
      if (this.confirmPassword) return this.confirmPassword.length >= 4
      if (this.confirmPassword == null) return null
      return null
    },
    confirmPasswordErro() {
      if (this.confirmPassword && this.confirmPassword.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    erro() {
      return this.messageError;
    }
  },

  data() {
    return {
      showDismissibleAlert: false,
      messageError: false,
      usuario: {

        username: null,
        password: null,
        confirmPassword: null,
      },
      errors: {

        username: null,
        password: null,
        confirmPassword: null,

        state: {
          username: null,
          password: null,
          confirmPassword: null,
        }
      },
      passwordInputType: 'password',
      erroResponse: {},
      cadastroFinalizado: false,
      estaCarregando: false,
    };
  },
  methods: {

    changeInputType(type) {
      this.passwordInputType = type;
    },

    validar() {
      if (this.usuario.firstName == null || this.usuario.firstName && this.usuario.firstName.length == 0)
        this.errors.firstName = 'Primeiro nome não pode ser vazio'
      if (this.usuario.confirmPassword == null || this.usuario.confirmPassword && this.usuario.confirmPassword == 0) {
        this.errors.confirmPassword = 'Confirmação de senha é obrigatória!';
        this.errors.state.confirmPassword = false;
        return false;
      }
      if (this.usuario.password !== this.usuario.confirmPassword) {
        this.errors.confirmPassword = 'Campo senha e confirmação de senha diferentes!';
        this.errors.state.confirmPassword = false;
        return false;
      }
      return true;
    },

    resetErros() {
      this.errors = {
        username: null,
        password: null,
        confirmPassword: null,

        state: {
          firstName: null,
          lastName: null,
          username: null,
          password: null,
          confirmPassword: null,
        }
      }
    },
    cadastrar() {
      //this.errors = {}; // Limpar os erros anteriores
      this.estaCarregando = true
      if (this.validar()) {
        this.showDismissibleAlert = false;
        this.$http.post(`api/public/usuario`, this.usuario).then(() => {
          this.cadastroFinalizado = true;
          this.estaCarregando = false;
        }).catch((error) => {
          this.erroResponse = error;
          this.showDismissibleAlert = true;
          this.estaCarregando = false;
        })

        this.resetErros();
      }


    },
  },
};
</script>

<style scoped>
.btn {
  width: 25%;
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

@media screen and (max-width: 960px) {
  .btn {
    width: 100%;
  }
}

.invalid-feedback {
  color: red;
}


</style>
