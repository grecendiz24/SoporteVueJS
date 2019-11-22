<template>

     
 

 <v-card>
    <v-card color="four" dark class="mx-auto text-center">
      <v-card-title class>Registro entradas</v-card-title>
    </v-card>
 
    <v-form>
      <v-card>
        <v-container>
            <v-form @submit.prevent="addregistro(({date,time,chofer:chofer,camion:chofer,tipo,idChofer:0,nombreUsuario:usuario.email,obs}))">
          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    
                    v-model="computedDateFormatted"
                    label="Fecha"
                    hint="DD/MM/YYYY"
                    persistent-hint
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-dialog
                ref="Ingreso"
                v-model="modal22"
                :return-value.sync="time"
                persistent
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="time" label="Hora" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="modal22" v-model="time" full-width>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="modal22 = false">Cancelar</v-btn>
                  <v-btn text color="primary" @click="$refs.Ingreso.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete label="Unidad" :items="choferes1" v-model="chofer"></v-autocomplete>
            </v-col>
<v-col cols="12" md="12">
        <v-textarea
          outlined
          name="input-1-2"
          label="observaciones"
          v-model="obs" 
        ></v-textarea>
</v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select v-model="tipo" :items="items1" label="Tipo unidad" outlined  ></v-select>
          </v-col>
          </v-row>
             <div class="my-2">
            <v-btn  color="two" type="submit" dark>Agregar</v-btn>
          </div>
             </v-form>
        </v-container>
      </v-card>
    </v-form>
  </v-card>
</template>

    
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: vm => ({
       date: "",
      time: "",
      chofer: "",
      camion: "",
      tipo: "",
        idChofer: "",
        nombreUsuario: "",
        obs: "",

    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    time: null,
    menu22: false,
    modal22: false,
    select: null,
 
    items1: ["AUTO", "CAMIONETA TORTON ", "TRAILER", "FULL"],

    //  chofer: [ ],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    ...mapState(["choferes1", "camiones","usuario"])
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  created() {
    this.getChoferes();
    this.getTareas();
  },
  methods: {
    ...mapActions(["getChoferes", 
    "setChoferes1", 
    "getTareas", 
    "setCamiones",
    "addregistro"]),
    formatDate(date) {
      if (!date) return null;

      const [year,month,day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate (date) {
        if (!date) return null

        const [day,month , year] = date.split('/')
        return `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`
      },
 
  }
};
</script>