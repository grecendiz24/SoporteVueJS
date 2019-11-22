<template>
  <div>
    <p class="error">{{ error }}</p>
<router-link :to="{name:'fichainf',params:{id:result}}">
    <p class="decode-result"> Registro: <b>{{ result }}</b>
      
          <v-icon>fa fa-id-card-o</v-icon>
        
</p>
</router-link>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream },

  data () {
    return {
      result: '',
      error: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    // router.push({name: result})
    },

    async onInit (promise) {
      try {
        await promise
       // router.push({name: 'home'})
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: Necesita otorgar permiso para usar la camara"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: No se encontro camara"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: Contexto no seguro (HTTPS no encontrado)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: La camara esta siendo usada por otra aplicacion"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: La camara disponible no es adecuada"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: No soportada con este navegador"
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>