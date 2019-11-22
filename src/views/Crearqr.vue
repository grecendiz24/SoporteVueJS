<template>
<div>
  <qrcode-vue :value="value" :size="size" level="H">

  </qrcode-vue>

 

</div>
</template>
<script>


import QrcodeVue from 'qrcode.vue';
 

export default {
  data() {
    return {
      drawer: false,
      value: this.$route.params.id,
    // value: 'https://pension01-df569.firebaseapp.com/fichainf/'+this.$route.params.id,
      //value: 'http://localhost:8080/fichainf/'+this.$route.params.id,
      size: 250,
     // foreground: '#bada55',
    }
  },
  components: {
    QrcodeVue
  }
}
</script> 