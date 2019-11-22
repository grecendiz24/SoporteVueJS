<template>
  <v-card :elevation="30">
    <v-card :elevation="15" color="four" dark class="mx-auto text-center">
      <v-card-title>Registro</v-card-title>
    </v-card>

<template>
  <div>
    <v-alert
 v-model="alert"
   dismissible
   outlined
   type="success"
   text
    >
      Se agrego correctamente el  <strong>registro</strong> 
    </v-alert>
  </div>
</template>

    <v-form  @submit.prevent="addFicha(({operador,tel,licencia,identificacion,placas,eco,tipo,premolque,eremolque,pdremolque,edremolque,dolly,transportista,telempresa}))">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="8">
            <v-text-field v-model="operador" prepend-icon="fas fa-user" label="Nombre operador" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="tel" label="Telefono" outlined></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="licencia" counter="10" label="Num. licencia" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="identificacion" counter="10" label="Num. identificacion" outlined></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="placas" prepend-icon="fas fa-truck-moving"  label="Placas tractor" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" md="5">
            <v-text-field v-model="eco" label="Niv tractor" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-select v-model="tipo" :items="items" label="Tipo unidad" outlined></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="premolque" label="Placas remolque" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="eremolque" label="Niv remolque" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="pdremolque" label="Placas remolque 2" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="edremolque" label="Niv remolque 2" outlined></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="dolly" label="Placas dolly" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="transportista" label="Transportista" outlined></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="telempresa" label="Telefono empresa" outlined></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn   @click="alert = true "class="ma-2" outlined color="indigo" type="submit">Agregar</v-btn>
        </div>
        <br />
      </v-container>
    </v-form>
  </v-card>
</template>



 
<script>
import {mapActions} from 'vuex'
export default {
  name: 'ficha',
  
  data(){
    return{
      operador: "",
      tel: "",
      licencia: "",
      identificacion: "",
      placas: "",
      eco: "",
      tipo: "",
      premolque: "",
      eremolque: "",
      pdremolque: "",
      edremolque: "",
      dolly: "",
      transportista: "",
      telempresa: "",
      items: ["Auto", "Camioneta", "Torton", "Trailer", "Full"],
      alert: false,
      
    }
  },
  methods:{
    ...mapActions(['addFicha'])
  }
}

</script>

 