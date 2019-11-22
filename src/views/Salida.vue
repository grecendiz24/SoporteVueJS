<template>
  <v-card :elevation="25">
    <v-card :elevation="15" color="primary" dark class="mx-auto text-center">
      <v-card-title class>Proximas Salidas</v-card-title>
    </v-card>

    <v-data-table :headers="headers" :items="entradas" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form
                    @submit.prevent="addSalidas(({date,time,cuota,nombreUsuario:usuario.email,id:editedItem.id,tipounidad:editedItem.tipo,fechaentrada:editedItem.fecha,horaentrada:editedItem.horaEntrada}))"
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.fecha" label="Fecha entrada" disabled></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.horaEntrada"
                          label="Hora entrada"
                          disabled
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              outlined
                              v-model="date"
                              label="Fecha salida"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="6" sm="12">
                        <v-text-field v-model="time" label="Hora" outlined></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field label="Cuota" prefix="$" v-model="cuota" outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="save" type="submit">Guardar</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn class="ma-2" tile outlined color="yellow darken-4" @click="editItem(item)">
          <v-icon class="fas fa-dollar-sign"></v-icon>Cobrar
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>




 
<script>
import { mapActions, mapState } from "vuex";
import { type } from "os";
var tiempo = new Date();
var hora = tiempo.getHours();
var minuto = tiempo.getMinutes();
var segundo = tiempo.getSeconds();
var dd = tiempo.getDate();
var mm = tiempo.getMonth() + 1;
var yyyy = tiempo.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
if (hora < 10) {
  hora = "0" + hora;
}
if (minuto < 10) {
  minuto = "0" + minuto;
}
export default {
  name: "salida",
  data: () => ({
    calories: "",
    dialog: false,
    dialogDelete: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    search: "",
    id: "",
    cuota: "",
    nombreUsuario: "",
    tipounidad: "",
    fechaentrada: "",
    horaentrada: "",
    time: hora + ":" + minuto,
    headers: [
      { text: "Fecha ingreso", value: "fecha" },
      { text: "Hora ingreso", value: "horaEntrada" },
      { text: "Conductor", value: "chofer" },
      { text: "Placas", value: "camion" },
      { text: "Tipo unidad", value: "tipo" },
       { text: "obsevaciones", value: "observaciones" },
      { text: "", value: "action", sortable: false }
    ],
    editedItem: {
      fecha: "",
      horaEntrada: 0,
      chofer: 0,
      camion: 0,
      tipo: 0
    }
  }),

  computed: {
    ...mapState(["entradas", "usuario"]),

    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Chofer" : "Cobro salida";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getEntradas();
  },

  methods: {
    ...mapActions([
      "getEntradas",
      "setEntradas",
      "editarEntrada",
      "addSalidas"
    ]),

    editItem(item) {
      this.editedIndex = this.entradas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
      this.editarEntrada(this.editedItem);

      Object.assign(this.entradas[this.editedIndex], this.editedItem);
      this.getEntradas();

      this.close();
    },
    save2() {
      this.getChoferes();
      this.close2();
    }
  }
};
</script>