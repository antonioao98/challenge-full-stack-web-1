<template>
  <v-app>
    <v-main>
      <h2 class="text-center">Tabela de alunos</h2>
      <v-row justify="center">
        <v-col cols="6">
          <v-row>
            <v-text-field
              v-model="search"
              label="Search"
              placeholder="Digite sua busca"
              single-line
              hide-details
            ></v-text-field>
            <v-btn class="font-weight-bold mt-2">Pesquisar</v-btn>
            <v-btn
              class="ml-3 font-weight-regular mt-2"
              :to="{ name: 'cadastrar' }"
              >Cadastar Alunos</v-btn
            >
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="7">
          <v-data-table
            :headers="headers"
            :items="dados"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.excluir="{ item }">
              <v-icon small @click="deletar(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.editar="{ item }">
              <v-icon small @click="carregar(item)">mdi-border-color</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" width="650">
            <v-card>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <input type="hidden" required v-model="id" />
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
                    label="Informe o E-mail"
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
                    class="mr-4"
                    @click="atualizar"
                  >
                    Cadastrar
                  </v-btn>

                  <v-btn
                    color="error"
                    class="mr-4"
                    @click.stop="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ textoSnackbar }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Fechar
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card>
          </v-dialog>

          <v-snackbar v-model="snackbarAPI" :timeout="timeout">
            {{ textAPI }}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Fechar
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    textoSnackbar: "",
    dialog: false,
    valid: true,

    timeout: 5000,
    snackbarAPI: false,
    textAPI: "",

    search: "",

    id: "",
    nome: "",
    email: "",
    ra: "",
    cpf: "",

    raRules: [(v) => !!v || "O registro acadêmico é obrigatório"],
    cpfRules: [(v) => !!v || "O CPF é obrigatório"],
    nameRules: [(v) => !!v || "O nome é obrigatório"],
    emailRules: [
      (v) => !!v || "E-mail é obrigat'roio",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
    headers: [
      { text: "Registro Acadêmico", value: "ra" },
      { text: "Nome", value: "nome" },
      { text: "CPF", value: "cpf" },
      { text: "Excluir", value: "excluir", sortable: false },
      { text: "Editar", value: "editar", sortable: false },
    ],
    dados: [],
  }),
  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("http://localhost:3000/aluno")
        .then((res) => {
          this.dados = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletar(item) {
      axios
        .delete("http://localhost:3000/deleteAluno/" + item.id)
        .then((res) => {
          this.dialog = false;
          this.textAPI = res.data.message;
          this.snackbarAPI = true;
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    },
    carregar(item) {
      this.id = item.id;
      this.nome = item.nome;
      this.email = item.email;
      this.ra = item.ra;
      this.cpf = item.cpf;
      this.dialog = true;
    },

    atualizar() {
      if (
        !this.nome ||
        this.nome == "" ||
        !this.email ||
        this.email == "" ||
        !this.ra ||
        this.ra == "" ||
        !this.cpf ||
        this.cpf == ""
      ) {
        this.textoSnackbar = "Por favor, informe todos os dados !";
        this.snackbar = true;
      } else {
        axios
          .put("http://localhost:3000/updateAluno/" + this.id, {
            nome: this.nome,
            email: this.email,
            ra: this.ra,
            cpf: this.cpf,
          })
          .then((res) => {
            this.dialog = false;
            this.textAPI = res.data.message;
            this.snackbarAPI = true;
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
      }
    },
  },
};
</script>