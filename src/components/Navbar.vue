<template>
  <v-card color="" flat height="50px" tile>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Servi-tech</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn @click="cerrarSesion" icon>
        <v-icon>fas fa-power-off</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer class="three" v-model="drawer" app>
      <v-layout column align-center mt-2>
        <v-flex>
          <v-avatar>
            <img :src="usuario.foto" alt="avatar" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="mt-3 white--text">{{usuario.nombre}}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-item-icon>
            <v-icon class="mt-3 white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="mt-3 white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Inicio",         icon: "fas fa-home",          to: { name: "home" } },
        { title: "Ficha registro", icon: "fas fa-id-card",       to: { name: "camion" } },
        //{ title: "Entradas",       icon: "fas fa-truck",         to: { name: "registro" } },
        { title: "Salidas",        icon: "fas fa-times-circle",  to: { name: "salida" } },
        
        { title: "Corte de caja",  icon: "fas fa-database",      to: { name: "corte" } },
      //  { title: "Nuevo Usuario",  icon: "fas fa-user-plus",     to: { name: "ingreso" } },
        { title: "Perfil",         icon: "fas fa-user-circle",   to: { name: "admin" } },
        { title: "Lector",         icon: "fa fa-camera",         to: { name: "scanqr" } },
        { title: "Chat",         icon: "fa fa-comment",         to: { name: "chat" } },
      ]
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
