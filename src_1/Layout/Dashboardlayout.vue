<template>
   <div>
    <div class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
      <!-- Navigation Top -->
      <Navbar></Navbar>

      <div class="content-wrapper">
        <!-- Container Panel -->
        <ContentHeader></ContentHeader>

        <!-- All Comp -->
        <section class="content">
          <div class="container-fluid">

           <router-view/>

          </div>
        </section>

      </div>

      <!-- Sidebar Left Corner -->
      <Sidebar></Sidebar>

      <!-- Footer -->
      <Footer></Footer>

      <!-- Control Sidebar [Like ->Home,Dashboard]  -->
      <!-- <ControlSidebar></ControlSidebar> -->
</div>
</div>
    </div>

</template>

<script>
import "../../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
import "../../node_modules/admin-lte/plugins/select2/css/select2.min.css"
import ContentHeader from "../dashboard/ContentHeader.vue"
import Navbar from "../dashboard/Navbar.vue";
import Sidebar from "../dashboard/Sidebar.vue";
import Footer from "../dashboard/Footer.vue";
import { authHeader } from "../common/common";


export default {
  name: "App",
  components: {
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,   
  },

  methods: {

  },

 
  mounted() {
    authHeader();
  }
};




</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>