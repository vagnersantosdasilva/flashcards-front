<template>
  <b-container>
    <b-row class="mt-4  d-flex justify-content-center" >
      <b-card class="col-12 com-md-6" v-if="estaCarregando">
        <b-card-body>
          <div class="loader-container md-6 text-center mt-4" >
            <i class="fas fa-hourglass fa-spin fa-3x"></i>
          </div>
        </b-card-body>

      </b-card>
      <b-card  class="col-12 col-md-6"  v-else>
        <b-card-title>Informe a nova senha:</b-card-title>
        <b-card-body>
            <form @submit.prevent="cadastrar">

              <b-form-group class="form-group mt-2" label="Nova Senha:" :invalid-feedback="errors.confirmPassword">
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

              <b-row class="d-flex justify-content-start col-12 col-md-3 ms-md-0 ms-0 mt-3">
                <b-button variant="primary" type="submit">Renovar</b-button>
              </b-row>
            </form>
        </b-card-body>
      </b-card>
    </b-row>
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