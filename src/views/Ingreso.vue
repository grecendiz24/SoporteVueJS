<template>
  <v-card>
    <v-img
      v-if="media"
      class="white--text"
      src="https://cdn.pixabay.com/photo/2018/04/28/16/40/network-3357642_960_720.jpg"
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
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/10/07/21/chat-2389223_960_720.png"
                  alt="User"
                />
              </v-avatar>
            </div>

            <br />
            <br />

            <v-form @submit.prevent="ingresoUsuario({email:email,pass:pass})">
 
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  placeholder="Usuario"
                  name="login"
                  label="Usuario"
                  type="text"
                  v-model="email"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  name="password"
                  id="password"
                  type="password"
                  v-model="pass"
                  label="Contraseña"
                  placeholder="Contraseña"
                  solo
                ></v-text-field>
              </v-col>

              <v-btn block color="four" type="submit">Entrar</v-btn>
            </v-form>

            <v-divider></v-divider>
          </v-card-text>
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
import { mapMutations, mapActions, mapState } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      pass: "",
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
    ...mapActions(["setUsuario", "ingresoUsuario"]),

    google() {
      console.log("google");
      const provider = firebase
        .auth()
        .signInWithEmailAndPassword("1@1.com", "123456")
        // new firebase.auth.GoogleAuthProvider();
        //this.ingresar(provider);

        .then(res => {
          console.log(res);
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          //  router.push({name: 'inicio'})
        })
        .catch(err => {
          console.log(err);
          commit("setError", err.message);
        });
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
  },
  computed: {
    ...mapState(["error"])
  }
};
</script>
