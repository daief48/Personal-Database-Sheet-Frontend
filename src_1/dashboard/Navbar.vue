<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="" role="button">
          <i class="fa fa-bars"></i>
        </a>
      </li>
      <li style="margin-bottom: -7px;">
        <button @click="logout()" class="btn btn-sm btn-secondary button-1" style="position: absolute;
         font-family: 'Russo One', sans-serif;
         right: 15px;
         top: 5px;
         padding: 8px 25px;
         font-size: 15px;
         background-color: #0a466e;
         border: none;
         color: white;
         "> <i class="fas fa-sign-out-alt" style="margin-top: 3px;
         margin-right: 5px;">
          </i> Logout
        </button>
        <button v-if="$route.path != '/dashboard'" @click="backToDashboard()" class="btn btn-sm btn-secondary button-1" style="position: absolute;
         font-family: 'Russo One', sans-serif;
         right: 165px;
         top: 5px;
         padding: 8px 25px;
         font-size: 15px;
         background-color: #0a466e;
         border: none;
         color: white;
         "> <i class="fa fa-backward" style="margin-top: 3px;
         margin-right: 5px;">
          </i> Back To Dashboard 
        </button>

      </li>
    </ul>
  </nav>
</template>

<script>
import "@/assets/css/design.css"
import { authHeader } from "../common/common";

export default {

    data() {
      return {
        baseUrl : this.backendUrl,
      }
    },
  methods: {
    logout(){
      this.axios.post(this.baseUrl + '/api/auth/logout',{},authHeader())
      .then(()=>{
        window.localStorage.removeItem('user');
        this.$router.push({path:'/'});
      }).catch(()=>{
        window.localStorage.removeItem('user');
        this.$router.push({path:'/'});
      })
    },

    backToDashboard() { 
      console.log(this.$router);
      this.$router.push({ path:'/dashboard'});
    }
  },
};
</script>
