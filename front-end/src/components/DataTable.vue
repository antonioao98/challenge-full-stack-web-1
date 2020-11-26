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
              <v-icon small @click="atualizar(item)">mdi-border-color</v-icon>
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
                    label="Informe o registro acadêmico"
                    required
                  ></v-text-field>

                  <v-label class="">CPF:</v-label>
                  <v-text-field
                    v-model="cpf"
                    label="Informe o número do documento"
                    required
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="cadastrar"
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
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    textoSnackbar: "tes",
    dialog: false,
    valid: true,
    search: "",
    nome: "",
    email: "",
    ra: "",
    cpf: "",
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
    dados: [
      {
        ra: 1,
        nome: "Antônio Aragão de Oliveira",
        cpf: "067.928.266-18",
        email: "toninho.o.cara@hotmail.com",
      },
      {
        ra: 2,
        nome: "Matheus Aragão de Oliveira",
        cpf: "067.928.266-18",
        email: "toninho.o.cara84@gmail.com",
      },
      {
        ra: 3,
        nome: "Francy carneiro aragão",
        cpf: "067.928.266-18",
        email: "antonioao@unipam.edu.br",
      },
    ],
  }),
  methods: {
    deletar(item) {
      console.log(Object.values(item) + " chegou aqui");
    },
    atualizar(item) {
      this.nome = item.nome;
      this.email = item.email;
      this.ra = item.ra;
      this.cpf = item.cpf;
      this.dialog = true;
    },
    cadastrar() {
      if (
        (this.item.nome || this.item.email || this.item.ra || this.item.cpf) ==
        undefined
      ) {
        this.textoSnackbar = "Por favor, informe todos os dados !";
        this.snackbar = true;
      } else {
        console.log("insere no banco");
      }
    },
  },
};
</script>