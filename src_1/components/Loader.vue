<template>

  <div class="container">
    <scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>
  </div>

</template>

<script>
import ScaleLoader from '../../node_modules/vue-spinner/src/ScaleLoader.vue';
export default {
  name: "Loader",
  components: {
    ScaleLoader
  },
  data() {
    return {
      color: '#0a466e',
    }
  },
    
}
</script>

<style scoped>
.v-spinner {
      position: fixed;
      top: 50%;
      left: 50%;
}

</style>