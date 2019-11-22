


<template>
  <v-card>
    <v-card color="four" dark class="mx-auto text-center">
      <v-card-title class>Corte de caja</v-card-title>
    </v-card>

    <v-card>
               <v-form>

      <v-container>

        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Fecha"
                  prepend-icon="far fa-calendar-alt"
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
        </v-row>
        <v-btn color="two" dark class="mb-6 text-lg-right"  type="submit">Buscar</v-btn>
      </v-container>
               </v-form>
    </v-card>
  </v-card>



</template>
 
<script>
import { mapActions, mapState } from "vuex";
export default {
    name: 'CorteCaja',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  }),
  methods: {
      ...mapActions(['getSalidas'])
  },
created(){
this.getSalidas()

}

}
</script>