<template>

  <div>

      <!-- Navbar -->
      <Navbar />
      <div class="content-wrapper">
        <!-- <ContentHeader/> -->
        <section class="content">
          <div class="container-fluid">
         <br>
            <router-view></router-view>
          </div>
        </section>
      </div>
      <!-- Sidebar -->
      <Sidebar />
      <!-- Footer -->
      <Footer></Footer>

  </div>

</template>

<script>
import '../../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import '../../node_modules/admin-lte/plugins/select2/css/select2.min.css';
import Navbar from '../dashboard/Navbar.vue';
import Sidebar from '../dashboard/Sidebar.vue';
import Footer from '../dashboard/Footer.vue';
import { authHeader } from "../common/common";



import $ from 'jquery';

export default {
  name: "FullPageLayout",
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      test:0,
    }
  },
  methods: {
    run() { 
      this.test = 1;
    }
  },
  created() {
    this.run();
  },

  mounted() {
    authHeader();
    $('[data-widget="treeview"]').Treeview('init');
  }

}
</script>

<style>

</style>