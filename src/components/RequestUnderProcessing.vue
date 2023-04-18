<template>
	<div class="">
		<div class="container h-100">
			<div class="s-header">
				<div class="d-flex justify-content-center text-center">
					<img width="45" src="@/assets/img/govt_logo.png"> <h3 class="m-0 p-1">Department of Youth Development</h3>
				</div>
			</div>
			<div class="custom-bg">
				<div class="user_card mt-5 text-center">
					<img width="150" style="margin:0 auto" src="@/assets/img/processing.png">
					<h4 class="mt-3">Request under Processing</h4>
					<p>Your submitted application is under processing.<br>
					We w'll know you very shortly.</p>
					<button @click="goToLogin" class="mt-3 ml-5 mr-5 d-block btn btn-sm btn-bg p-2 text-white">Okay !</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
//import axios from "axios";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components:{
   
  	},
	data() {
		return {
			
		};
  	},

	computed: {
	},

  	methods: {
	  goToLogin(){
		this.$router.push({ path:'/login'});
	  }
  	},

	created(){
		
	}

}
</script>


<style scoped>

.s-header{
	position: absolute;
	top:0;
	left:0;
	width: 100%;
	padding: 20px 0;
	box-shadow: 0 0 5px 1px #cccccc;
	z-index: 9;
}
.custom-bg{
    position: absolute;
    width: 100%;
    height: 100%;
	z-index: 0;
	left: 0;
}

.user_card {
	left      : 50%;
	top       : 50%;
	position  : absolute;
	transform : translate(-50%, -50%);
	height: 400px;
	width: 450px;
	background: #EEFFFE;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 5px;

}
.brand_logo_container {
	position: absolute;
	height: 170px;
	width: 170px;
	top: -60px;
	border-radius: 50%;
	background: #ffffff;
	padding: 10px;
	text-align: center;
transform: scale(0.75);
}
.brand_logo {
	height: 130px;
	width: 130px;
	border-radius: 20%;
	/* border: 2px solid #0a466e; */
}
.btn-bg{
	background: rgb(45, 118, 183);
}

</style>