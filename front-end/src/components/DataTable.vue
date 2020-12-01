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
              <v-icon
                small
                @click="
                  (idAux = item.id),
                    (dialogDelete = true),
                    (nameAux = item.name)
                "
                >mdi-delete</v-icon
              >
            </template>
            <template v-slot:item.editar="{ item }">
              <v-icon small @click="updateModal(item)">mdi-border-color</v-icon>
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
                    v-model="name"
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
                    @click="update"
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
                {{ textSnackbar }}

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

          <v-dialog v-model="dialogDelete" width="700">
            <v-card>
              <v-alert class="mb-0" prominent type="error">
                <v-row align="center">
                  <v-col class="grow" v-model="nameAux">
                    Deseja mesmo excluir o aluno: {{ nameAux }}
                  </v-col>
                  <v-col class="shrink">
                    <v-btn @click="del()">Confirmar</v-btn>
                  </v-col>
                  <v-col class="shrink">
                    <v-btn @click="dialogDelete = false">Cancelar</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
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
    valid: true,

    dialogDelete: false,
    //variavel responsável por abrir o model
    dialog: false,

    //variaveis responsáveis pela snackbar de aviso para os campos vázios
    snackbar: false,
    textSnackbar: "",

    //variaveis responsáveis pela snackbar que vai executar após executar com sucesso alguma requisição no API
    timeout: 5000,
    snackbarAPI: false,
    textAPI: "",

    //variavel responsavel pela pesquisa na table
    search: "",

    //variaveis dos inputs
    id: "",
    name: "",
    email: "",
    ra: "",
    cpf: "",

    idAux: "",
    nameAux: "",
    //regras para validar os inputs
    raRules: [(v) => !!v || "O registro acadêmico é obrigatório"],
    cpfRules: [(v) => !!v || "O CPF é obrigatório"],
    nameRules: [(v) => !!v || "O nome é obrigatório"],
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],

    //cabeçalhos da table onde o text é o nome que vai mostrar e value é o valor que terá que ter dentro do dados
    headers: [
      { text: "Registro Acadêmico", value: "ra" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Excluir", value: "excluir", sortable: false },
      { text: "Editar", value: "editar", sortable: false },
    ],
    //dados do banco apos executar a função listar
    dados: [],
  }),
  //o mounted irá executar toda vez que a página for carregada
  mounted() {
    this.getStudents();
  },

  methods: {
    //função responsável por pegar os registros no banco de dados
    getStudents() {
      axios
        .get("http://localhost:3000/Student")
        .then((res) => {
          this.dados = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //função responsável por deletar o registro do banco de dados passando o id como parâmetro
    del() {
      this.dialogDelete = false;
      axios
        .delete("http://localhost:3000/deleteStudent/" + this.idAux)
        .then((res) => {
          this.dialog = false;
          this.textAPI = res.data.message;
          this.snackbarAPI = true;
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    },
    //função responsável por carregar as variaveis para carregar no model
    updateModal(item) {
      this.id = item.id;
      this.name = item.name;
      this.email = item.email;
      this.ra = item.ra;
      this.cpf = item.cpf;
      this.dialog = true;
    },
    //função responsável por atualizar o registro no banco de dados
    update() {
      if (
        !this.name ||
        this.name == "" ||
        !this.email ||
        this.email == "" ||
        !this.ra ||
        this.ra == "" ||
        !this.cpf ||
        this.cpf == ""
      ) {
        this.textSnackbar = "Por favor, informe todos os dados !";
        this.snackbar = true;
      } else {
        axios
          .put("http://localhost:3000/updateStudent/" + this.id, {
            name: this.name,
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
          })
          .catch((err) => {
            if (err.response.data.message) {
              this.textSnackbar = err.response.data.message[0];
              this.snackbar = true;
            }

            if (err.response.data.message == "ra must be unique") {
              this.textSnackbar = `Já existe um registro acadêmico com ${this.ra}. Por favor, digite um válido`;
              this.snackbar = true;
              this.ra = "";
            }
          });
      }
    },
  },
};
</script>