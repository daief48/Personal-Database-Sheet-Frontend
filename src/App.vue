<template>
  
<div>
  <router-view></router-view>
</div>
</template>

<script>
import '../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import '../node_modules/admin-lte/plugins/select2/css/select2.min.css';
import $ from 'jquery';
export default {
  
  name: "App",

  components: {},

  methods: {},

  mounted() {
    $('[data-toggle="tooltip"]').tooltip() 
  },

};

</script>

<style>

</style>