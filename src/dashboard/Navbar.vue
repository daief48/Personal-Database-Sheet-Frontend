<template>
  <nav class="main-header navbar navbar-expand" style="background: rgb(217 235 251);padding: 17px;border-bottom: none;">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="" role="button" style="background: #c3c3c3; border-radius: 5px;">
          <i class="fa fa-bars" style="color:black; font-size: 24px;"></i>
        </a>
      </li>
      <li style="margin-bottom: -7px;">
        <button @click="logout()" class="btn btn-sm btn-secondary button-1" style="position: absolute;
         font-family: 'Russo One', sans-serif;
         right: 15px;
         top: 17px;
         padding: 8px 25px;
         font-size: 15px;
         background-color: #0a466e;
         border: none;
         color: white;
         "> <i class="fas fa-sign-out-alt" style="margin-top: 3px;
         margin-right: 5px;">
          </i> Logout
        </button>
        <button v-if="$route.path != '/dashboard'" @click="backToDashboard()" class="btn btn-sm btn-secondary button-1"
          style="position: absolute;
         font-family: 'Russo One', sans-serif;
         right: 165px;
         top: 17px;
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
      baseUrl: this.backendUrl,
    }
  },
  methods: {
    logout() {
      this.axios.post(this.baseUrl + '/api/auth/logout', {}, authHeader())
        .then(() => {
          window.localStorage.removeItem('user');
          this.$router.push({ path: '/' });
        }).catch(() => {
          window.localStorage.removeItem('user');
          this.$router.push({ path: '/' });
        })
    },

    backToDashboard() {
      console.log(this.$router);
      this.$router.push({ path: '/dashboard' });
    }
  },
};
</script>
