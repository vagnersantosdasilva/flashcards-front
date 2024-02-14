<template>
  <b-container>
    <div class="d-flex align-content-center justify-content-center" >
      <b-card class="col-12 com-md-6" v-if="estaCarregando">
        <b-card-body>
          <div class="loader-container md-6 text-center " >
            <i class="fas fa-hourglass fa-spin fa-3x"></i>
          </div>
        </b-card-body>

      </b-card>
      <b-card  class="col-12 col-md-6"  v-else>
        <b-card-title>Informe a nova senha:</b-card-title>
        <b-card-body>
            <form @submit.prevent="cadastrar">

              <b-form-group 
                class="form-group mt-2" 
                label="Nova Senha:" 
                :invalid-feedback="errors.password"
                :state="errors.state.password"
              >
                <b-input-group>
                  <b-form-input
                      v-model="usuario.password"
                      autocomplete="false"
                      :type="passwordInputType"
                      placeholder="Senha"
                      class="form-control-lg"
                      :state="errors.state.password"
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
                                  ? 'far fa-eye-slash'
                                  : 'far fa-eye'
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
                  <b-input-group-append style="border:0">
                    <b-input-group-text
                        @mousedown="changeInputType('text')"
                        @mouseup="changeInputType('password')"
                        style="height: 50px;">
                      <i
                          :class="
                                passwordInputType === 'password'
                                  ? 'far fa-eye-slash'
                                  : 'far fa-eye'
                              "
                      ></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>

              <b-row class="d-flex justify-content-start col-12 col-lg-3 ms-md-0 ms-0 mt-3">
                <b-button variant="primary" type="submit">Renovar</b-button>
              </b-row>
            </form>
        </b-card-body>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import {mapGetters} from "vuex";

export  default {
  props:{
    error:Object,
  },
  data() {
    return {
      usuario: {
        email: null,
        password: null,
        confirmPassword: null,
      },
      errors: {
        email: null,
        password: null,
        confirmPassword: null,

        state:{
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

      if ((this.usuario.password && (this.usuario.password.length <6 || this.usuario.password.length >255)))  {
        this.errors.password = 'Campo senha deve conter entre 6 e 255 caracteres!';
        this.errors.state.password = false;
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
          email: null,
          password: null,
          confirmPassword: null,
        }
      }
    },

    cadastrar() {
      this.resetErros();
      this.usuario.idUsuario = this.$store.state.usuario.idUser;
      this.usuario.username = this.$store.state.usuario.username;
      if(this.validar()) {
          this.estaCarregando=true;
          this.$http.post(`api/reset/usuario`, this.usuario).then(() => {
            this.$router.push({name:'home'})
            this.success=true;
          }).catch((error) => {
            this.error = Object.assign({},error)
            this.$emit("onError", error);
          });
          this.estaCarregando=false;
      }
    },
  },
  computed:{
    ...mapGetters(['estaCarregando'])
  },
  mounted() {
    this.success=false;
  }
}
</script>

<style scoped>
.card {
  border-radius:0;
}
.input-group-text{
  height: 100%;
  border-radius: 0;

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