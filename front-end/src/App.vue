<template>
  <v-app>
    <v-toolbar class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"
        ><a class="white--text text-decoration-none" href="/">
          Desafio Grupo A</a
        ></v-toolbar-title
      >
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute class="primary" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text text-center"
            >Módulo Acadêmico</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider class="white"></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <a class="text-decoration-none white--text" :href="`${item.link}`">
              <v-icon>{{ item.icon }}</v-icon>
            </a>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <a
                class="text-decoration-none white--text"
                :href="`${item.link}`"
              >
                <h3>{{ item.titulo }}</h3>
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="mt-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    items: [
      { titulo: "Home", link: "/", icon: "mdi-home" },
      {
        titulo: "Cadastro de alunos",
        link: "/cadastrar",
        icon: "mdi-hospital",
      },
    ],
  }),
};
</script>
