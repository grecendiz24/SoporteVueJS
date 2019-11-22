<template>
  <v-layout>
    <v-flex>
      <v-card color="four" dark class="mx-auto text-center">
        <v-card-title class>Chat -- {{usuario.email}}</v-card-title>
      </v-card>


 <v-card-text style="height: 60vh; overflow:auto" v-chat-scroll>
      <div :class="item.nombre===usuario.email ? 'text-right':'text-left'"
      v-for="(item, index) in mensajes" :key="index">
          <v-chip>
              <v-avatar>
                  <img :src="item.foto" alt="">
              </v-avatar>{{item.mensaje}}
          </v-chip>
          <p class="caption">{{item.fecha}}</p>
      </div>
      </v-card-text>


       <v-card-text>
        <v-form @submit.prevent="envMensaje" v-model="valido">
            <v-text-field v-model="mensaje" label="Escribir mensaje"
            required
           autocomplete="off"
            :rules="reglas"
            ></v-text-field>
        </v-form>
        </v-card-text>


    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import moment from 'moment';

 


export default {
  data() {
    return {
        mensaje:'',
        valido:false,
        reglas:[
             v => !!v || 'Escribe tu mensaje...',
        ],
        mensajes:[]
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods:{
      envMensaje(){
          if(this.valido){
              console.log('enviado'+this.mensaje);

       db.collection("chats").add({
        mensaje: this.mensaje,
        nombre: this.usuario.email,
        foto:this.usuario.foto,
        fecha:Date.now()
      }).catch(error=> console.log(error))
    


              this.mensaje='';

          }else{
              console.log('sin mensaje');

          }
          
      }
  },

created(){
moment.locale('es');
let ref=db.collection('chats').orderBy('fecha',"desc").limit(10)
ref.onSnapshot(querySnapshot=>{
    this.mensajes=[]
    querySnapshot.forEach(doc=>{
        this.mensajes.unshift({
            mensaje:doc.data().mensaje,
            foto:doc.data().foto,
            nombre:doc.data().nombre,
            fecha:moment(doc.data().fecha).format('lll')
        })
    });
    console.log(this.mensajes);
})

}

};
</script>