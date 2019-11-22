<template>
  <v-card :elevation="25">
    <v-card :elevation="15" color="four" dark class="mx-auto text-center">
      <v-card-title class>Catalogo registros</v-card-title>
    </v-card>

    <v-card-title>
      
    
      <v-text-field v-model="search" append-icon label="Buscar" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="tareas"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="two" dark class="mb-2" @click.stop.prevent="submit()">Agregar</v-btn>
            </template>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon @click="deleteItem(item)">fa fa-trash</v-icon>
        
      </template>
      <template v-slot:item.action2="{ item }">
         <router-link :to="{name:'crearqr',params:{id:item.id}}">
          <v-icon>fa-qrcode</v-icon>
        </router-link>
      </template>
      <template v-slot:item.action3="{ item }">
        <router-link :to="{name:'fichainf',params:{id:item.id}}">
          <v-icon>fa-address-book</v-icon>
        </router-link>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="480">
      <v-card>
        <v-card-title class="headline">¿Seguro que desea eliminar el registro?</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="save2">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>




 
<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    name: "camion",
    calories: "",
    dialog: false,
    dialogDelete: false,

    select: null,
    items: ["AUTO", "CAMIONETA TORTON ", "TRAILER", "FULL"],

    search: "",
    headers: [
      { text: "Operador", value: "Operador" },
      { text: "Placas", value: "Placas" },
      // {text:  "Economico", value: "Eco" },
      { text: "Tipo", value: "Tipo" },
      { text: "Transportista", value: "Transporte" },
      { text: "Eliminar", value: "action", sortable: false },
      { text: "QR", value: "action2", sortable: false },
       { text: "Registro", value: "action3", sortable: false }
    ],
    // desserts: [],
    editedIndex: -1,
    editedItem: {
      placas: "",
      nivTractor: 0,
      remolque1: 0,
      niv1: 0,
      remolque2: 0,
      niv2: 0,
      dolly: 0,
      utransporte: 0
    },
    defaultItem: {
      placas: "",
      nivTractor: 0,
      remolque1: 0,
      niv1: 0,
      remolque2: 0,
      niv2: 0,
      dolly: 0,
      utransporte: 0
    }
  }),

  computed: {
    ...mapState(["tareas"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getTareas();
    // console.log(this.getTareas);
    // this.setTareas();
    // console.log(this.setTareas);

    // this.busca_user();
  },

  methods: {
    ...mapActions(["getTareas", "setTareas", "editarTarea", "deleteTarea"]),

    editItem(item) {
      this.editedIndex = this.tareas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tareas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      // var formTitle2='dfs';
      //this.deleteTarea(item);
      const index = this.tareas.indexOf(item);

      //  confirm("Eliminar Camion") && this.tareas.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    close2() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex > -1) {
        //   Editar
        this.editarTarea(this.editedItem);
        Object.assign(this.tareas[this.editedIndex], this.editedItem);
      } else {
        //Agregar
        this.agregarTarea(this.editedItem);
        this.tareas.push(this.editedItem);
        this.getTareas();
      }
      this.close();
    },
    save2() {
      this.deleteTarea(this.editedItem);
      this.getTareas();
      //this.dialogDelete = false
      this.close2();
    },
    submit() {
      //if you want to send any data into server before redirection then you can do it here
      this.$router.push("/ficha?");
      //this.$router.push("/ficha?"+this.foobar);
    }
  }
};
</script>










