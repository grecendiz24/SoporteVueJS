<template>
     <v-form @submit.prevent="addregistro(({date,time,chofer,camion,tipo}))">
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

            <v-col cols="12" md="6">
              <v-autocomplete label="Chofer" :items="choferes1" v-model="chofer"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete label="Camion" :items="camiones" v-model="camion"></v-autocomplete>
            </v-col>
        <v-col cols="12" sm="12" md="6">
                      <v-select
                      v-model="tipo"
                        :items="items1"
                        :rules="[v => !!v || 'Item is required']"
                        label="Tipo de Unidad"
                        required
                      ></v-select>
                    </v-col>

 

          </v-row>

            <div class="my-2">
            <v-btn x-large color="success" type="submit" dark>Agregar</v-btn>
          </div>

       
       
            </v-form>
</template>