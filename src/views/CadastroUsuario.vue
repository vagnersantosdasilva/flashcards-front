<template>
  <div>
    <b-container>
      <b-row class="justify-content-center mt-4">
        <form @submit.prevent="cadastrar">
          <b-form-group
              class="form-group mt-2"
              label="Primeiro nome:"
              :invalid-feedback="errors.firstName"
          >
            <b-form-input
                v-model="usuario.firstName"
                name="firstname"
                autocomplete="false"
                placeholder="Primeiro nome"
                class="form-control-lg"

            ></b-form-input>
          </b-form-group>

          <b-form-group
              class="form-group mt-2"
              label="Último nome:"
              :invalid-feedback="errors.lastName"
          >
            <b-form-input
                v-model="usuario.lastName"
                autocomplete="false"
                type="text"
                placeholder="Último nome"
                class="form-control-lg"

            ></b-form-input>
          </b-form-group>

          <b-form-group
              class="form-group mt-2"
              label="Email:"
              :invalid-feedback="errors.email"
          >
            <b-form-input
                v-model="usuario.email"
                autocomplete="false"
                placeholder="Email"
                class="form-control-lg"

                type="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group class="form-group mt-2" label="Confirmar senha:" :invalid-feedback="errors.confirmPassword">
            <b-input-group>
              <b-form-input
                  v-model="usuario.password"
                  autocomplete="false"
                  :type="passwordInputType"
                  placeholder="Senha"
                  class="form-control-lg"

              ></b-form-input>
              <b-input-group-append >
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
              <b-input-group-append >
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

          <b-row class="d-flex justify-content-start col-12 mt-3">
            <b-button variant="primary" type="submit">Cadastrar</b-button>
          </b-row>
        </form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  computed: {
    steteConfirm() {
      if (this.confirmPassword )return this.confirmPassword.length >= 4
      if (this.confirmPassword==null) return null
      return null
    },
    confirmPasswordErro() {
      if (this.confirmPassword  && this.confirmPassword.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },

  data() {
    return {
      usuario: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      errors: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,

        state:{
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          confirmPassword: null,
        }
      },
      passwordInputType:'password',
    };
  },
  methods: {

    changeInputType(type) {
      this.passwordInputType = type;
    },

    validar(){
      if (this.usuario.firstName == null || this.usuario.firstName && this.usuario.firstName.length ==0)
        this.errors.firstName = 'Primeiro nome não pode ser vazio'
      if (this.usuario.confirmPassword == null || this.usuario.confirmPassword && this.usuario.confirmPassword == 0 ) {
        this.errors.confirmPassword = 'Confirmação de senha é obrigatória!';
        this.errors.state.confirmPassword = false;
        return false;
      }
      if (this.usuario.password !== this.usuario.confirmPassword){
        this.errors.confirmPassword = 'Campo senha e confirmação de senha diferentes!';
        this.errors.state.confirmPassword = false;
        return false;
      }
      return true;
    },

    resetErros(){
      this.errors = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,

        state: {
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          confirmPassword: null,
        }
      }
    },
    cadastrar() {
      //this.errors = {}; // Limpar os erros anteriores
      if(this.validar()) {
        // Realizar o registro do usuário ou qualquer outra ação necessária
        console.log(this.usuario);

        this.$http.post(`public/registration/users`, this.usuario).then((response) => {
          console.log(response);
          this.$router.push({name:'login'})
        }).catch((error) => {
          console.log(error)
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
@media screen and (max-width: 960px) {
  .btn {
    width: 100%;
  }
}
.invalid-feedback {
  color: red;
}
</style>
