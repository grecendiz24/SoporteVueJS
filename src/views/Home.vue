<template>

 
  <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="600"
  > {{usuario.email}} 
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            ${{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">Detalles de Atencion</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn block text>Detalles del reporte</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
  export default {
    data: () => ({
      value: [
        0,
        3,
        7,
        2,
        6,
        7,
        3,
      ],
    }),
    computed: {
    ...mapState(["usuario"])
  },
  }
</script>