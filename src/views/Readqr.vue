<template>
<div>
 {{id}}

</div>
</template>
<script>

export default {
    name:'Readqr',
  data() {
      return{
          id:this.$route.params.id
      }
   
  }
}
</script> 