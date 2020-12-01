<template>
  <v-app>
    <v-card class="mt-5">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-label class="">Nome:</v-label>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Informe o nome do aluno"
            required
          ></v-text-field>
          <v-label class="">E-mail:</v-label>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-label class="">Registro Acadêmico:</v-label>
          <v-text-field
            v-model="ra"
            :rules="raRules"
            label="Informe o registro acadêmico"
            required
          ></v-text-field>
          <v-label class="">CPF:</v-label>
          <v-text-field
            v-model="cpf"
            :rules="cpfRules"
            label="Informe o número do documento"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="register"
            class="mr-4"
          >
            Cadastrar
          </v-btn>

          <v-btn color="error" class="mr-4" :to="{ name: 'home' }">
            Cancelar
          </v-btn>

          <v-btn color="warning" @click="reset"> Limpar campos </v-btn>
        </v-form>
      </v-card-text>

      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ textSnackbar }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarAPI" :timeout="timeout">
        {{ textAPI }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    multiLine: true,
    valid: true,

    //variaveis responsáveis pela snackbar de aviso para os campos vázios ou com erros
    snackbar: false,
    textSnackbar: "",

    //variaveis responsáveis pela snackbar que vai executar após executar com sucesso alguma requisição no API
    timeout: 5000,
    snackbarAPI: false,
    textAPI: "",

    //variaveis dos inputs
    name: "",
    email: "",
    ra: "",
    cpf: "",

    //regras para validar os inputs
    nameRules: [(v) => !!v || "O nome é obrigatório"],
    raRules: [(v) => !!v || "O registro acadêmico é obrigatório"],
    cpfRules: [(v) => !!v || "O CPF é obrigatório"],
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
  }),

  methods: {
    //função responsavel por cadastrar um aluno novo
    register() {
      if ((this.name || this.email || this.ra || this.cpf) == undefined) {
        this.textSnackbar = "Por favor, informe todos os dados !";
        this.snackbar = true;
      } else {
        axios
          .post("http://localhost:3000/newStudent", {
            name: this.name,
            email: this.email,
            ra: this.ra,
            cpf: this.cpf,
          })
          .then((res) => {
            this.valid = false;
            this.reset();
            this.dialog = false;
            this.textAPI = res.data.message;
            this.snackbarAPI = true;
            setTimeout(() => {
              location.href = "/";
            }, 1000);
          })
          .catch((err) => {
            if (err.response.data.message) {
              this.textSnackbar = err.response.data.message[0];
              this.snackbar = true;
            }
            if (err.response.data.messageErr == "ra must be unique") {
              this.textSnackbar = `Já existe um registro acadêmico com ${this.ra}. Por favor, digite um registro válido`;
              this.snackbar = true;
              this.ra = "";
            }
          });
      }
    },
    //função responsável por resetar os campos do form
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>