<template>
  <v-card :elevation="25">
    <v-card :elevation="15" color="blue" dark class="mx-auto text-center">
      <v-card-title class>Catalogo Chofer</v-card-title>
    </v-card>

    <v-data-table :headers="headers" :items="choferes" sort-by="chofer" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Chofer</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="blue-grey lighten-1" dark class="mb-2" v-on="on">Agregar</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.paterno" label="Paterno"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.materno" label="Materno"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.licencia" label="Licencia"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.direccion" label="Direccion"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                    </v-col>

                      <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.evidencia" label="Evidencia"></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn class="ma-2" tile outlined color="success" @click="editItem(item)">
          <v-icon class="far fa-edit" small></v-icon>Editar
        </v-btn>

       <!-- <v-btn class="ma-2" tile outlined color="warning" @click="deleteItem">
          <v-icon class="fa fa-trash" small></v-icon>Borrar
        </v-btn>
        -->
        <v-btn class="ma-2" tile outlined color="warning" @click="deleteItem(item)">
      <v-icon class="fa fa-trash" small></v-icon>Borrar
      </v-btn>

      </template>
      <!--  <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>-->
    </v-data-table>

    

    <v-dialog v-model="dialogDelete" max-width="290">
      <v-card>
        <v-card-title class="headline">Realmente desea eliminarlo</v-card-title>

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
    name: "chofer",
    calories: "",
    fat: "",
    dialog: false,
    dialogDelete: false,

  
    search: "",
    headers: [
      {
        text: "Nombre",
      //  align: "left",
      //  sortable: false,
        value: "nombre"
      },
      { text: "Paterno",   value: "paterno" },
      { text: "Materno",   value: "materno" },
      { text: "Licencia",  value: "licencia" },
      { text: "Direccion", value: "direccion" },
      { text: "Telefono",  value: "telefono" },
      { text: "Correo",    value: "correo" },
      { text: "Evidencia", value: "evidencia" },
      { text: "Editar",    value: "action", sortable: false }
    ],
    // desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      paterno: 0,
      materno: 0,
      licencia: 0,
      direccion: 0,
      telefono: 0,
      correo: 0,
      evidencia: 0
    },
    defaultItem: {
      nombre: "",
      paterno: 0,
      materno: 0,
      licencia: 0,
      direccion: 0,
      telefono: 0,
      correo: 0,
      evidencia: 0
    }
  }),

  computed: {
    ...mapState(["choferes"]),

    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Chofer" : "Editar Chofer";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getChoferes(); 
  },

  methods: {
    ...mapActions([
      "agregarChofer",
      "getChoferes",
      "setChoferes",
      "editarChofer",
      "deleteChofer"
    ]),

    editItem(item) {
       
      this.editedIndex = this.choferes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.choferes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
     // var formTitle2='dfs';
      //this.deleteTarea(item);
       const index = this.choferes.indexOf(item);
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
        this.editarChofer(this.editedItem);
        Object.assign(this.choferes[this.editedIndex], this.editedItem);
       
      } else {
        //Agregar
        this.agregarChofer(this.editedItem);
        this.choferes.push(this.editedItem);
     this.getChoferes();
      }
      this.close();
    },
     save2() {
         
    this.deleteChofer(this.editedItem);
    this.getChoferes();
    this.close2();
    }
  }
};
</script>










