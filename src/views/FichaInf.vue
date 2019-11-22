 <template>
  <v-card>
    <v-card color="four" dark class="mx-auto text-center">
      <v-card-title class>Registro entradas  -- {{usuario.email}}</v-card-title>
    </v-card>
    <v-form>
      <v-card>
        <v-container>
          <v-form @submit.prevent="addregistro(({date,time,chofer:tarea.Operador,camion:tarea.Placas,tipo,idChofer:tarea.id,nombreUsuario:usuario.email,obs,sucursal:usuario.sucursal}))">
            <v-row>
              <v-col cols="12" md="6">
                   <v-text-field v-model="date" label="Fecha" outlined ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-text-field v-model="time" label="Hora" outlined ></v-text-field>
              </v-col>

             

              <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Operador"  v-model="tarea.Operador" readonly outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Placas"  v-model="tarea.Placas" readonly outlined></v-text-field>
              </v-col>

             <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Dolly"  v-model="tarea.Dolly" readonly outlined></v-text-field>
              </v-col>
               <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Transporte"  v-model="tarea.Transporte" readonly outlined></v-text-field>
              </v-col>
               <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Placas remolque"  v-model="tarea.PRemolque" readonly outlined></v-text-field>
              </v-col>
               <v-col cols="12" md="6" sm="12">
                <v-text-field  label="Placas remolque"  v-model="tarea.PRemolque2" readonly outlined></v-text-field>
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
            <v-select v-model="tipo" :items="items" label="Tipo unidad" outlined></v-select>
          </v-col>
            </v-row>

            <div class="my-2">
              <v-btn color="two" type="submit" dark>Agregar</v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-form>
  </v-card>
</template>

    
<script>
import { mapActions,mapState} from "vuex";
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
  name: "fichainf",
  data() {
    return {
       date: "",
      time: "",
      chofer: "",
      camion: "",
      tipo: "",
        idChofer: "",
        nombreUsuario: "",
        obs: "",
      id: this.$route.params.id,
      time: hora + ":" + minuto,
      date: yyyy + "-" + mm + "-" + dd,
      items: ["Auto", "Camioneta", "Torton", "Trailer", "Full"],
      tipo:"",

    
    }
  },
  computed:{
    ...mapState(['usuario','tarea'])


  },
  methods:{
    ...mapActions(['getTarea',"addregistro"])
  },
  created(){
    this.getTarea(this.id)
  }


}
</script> 