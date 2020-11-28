<template>
  <v-app>
    <v-card class="mt-5">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-label class="">Nome:</v-label>
          <v-text-field
            v-model="nome"
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
            @click="cadastrar"
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
        {{ textoSnackbar }}

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
  name: "AlunoCadastro",
  data: () => ({
    multiLine: true,
    snackbar: false,
    textoSnackbar: "",

    valid: true,

    timeout: 5000,
    snackbarAPI: false,
    textAPI: "",

    nome: "",
    email: "",
    ra: "",
    cpf: "",
    nameRules: [(v) => !!v || "O nome é obrigatório"],
    raRules: [(v) => !!v || "O registro acadêmico é obrigatório"],
    cpfRules: [(v) => !!v || "O CPF é obrigatório"],
    emailRules: [
      (v) => !!v || "E-mail é obrigat'roio",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    cadastrar() {
      if ((this.nome || this.email || this.ra || this.cpf) == undefined) {
        this.textoSnackbar = "Por favor, informe todos os dados !";
        this.snackbar = true;
      } else {
        axios
          .post("http://localhost:3000/newAluno", {
            nome: this.nome,
            email: this.email,
            ra: this.ra,
            cpf: this.cpf,
          })
          .then((res) => {
            this.valid = false;
            this.nome = " ";
            this.emailRules = false;
            this.email = " ";
            this.ra = " ";
            this.cpf = " ";
            this.dialog = false;
            this.textAPI = res.data.message;
            this.snackbarAPI = true;
            setTimeout(() => {
              location.href = "/";
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>