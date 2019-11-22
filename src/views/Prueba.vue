<template>
  <v-card>
    <v-img
      v-if="media"
      class="white--text"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/45b1f621324953.562ff4830fda5.png"
    >
      <v-layout justify-center mt-5>
        <v-flex xs12 sm8 md6 xl4>
          <br />
          <br />
          <br />
          <br />

          <v-card-text
            class="display-1 text-uppercase white--text text-xs-center"
            :class="registro"
          >
            <div class="text-center">
              <v-avatar size="200">
                <img src="https://aeealberta.org/wp-content/uploads/2018/10/profile.png" alt="John" />
              </v-avatar>
            </div>

            <br />
            <br />

            <v-form>
              <v-text-field
                class
                background-color="#59595bc7"
                color="white"
                name="login"
                label="Usuario"
                type="text"
              ></v-text-field>

              <v-text-field
                class="font-weight-medium"
                background-color="#59595bc7"
                outlined
                color="white"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>

              <v-btn block color="#ece8e291" @click="google">Entrar</v-btn>
            </v-form>

            <v-divider></v-divider>
            <v-card-text>
              <v-btn block color="#ab632b" dark @click="google">
                <v-icon left dark>fab fa-google</v-icon>Inicia con Google
              </v-btn>
            </v-card-text>
          </v-card-text>
          <!--  <v-card-text>
          <v-btn block @click="registro = true" v-if="!registro">¿No tienes cuenta? Registrate aquí</v-btn>
          <v-btn block @click="registro = false" v-if="registro">¿Ya tienes cuenta? Ingresa aquí</v-btn>
          </v-card-text>-->
        </v-flex>
      </v-layout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </v-img>
  </v-card>
</template>
 
<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      registro: false,
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      width: 344,
      height: undefined
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["setUsuario"]),

    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();

      this.ingresar(provider);
    },
    async ingresar(provider) {
      firebase.auth().languageCode = "es";

      try {
        //Ingreso Usuario
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);

        this.setUsuario(user);

        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

