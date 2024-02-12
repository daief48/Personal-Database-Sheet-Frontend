<template>
		<div class="container h-100">
			<div class="s-header">
				<div class="d-flex justify-content-center text-center">
					<img width="45" src="@/assets/img/govt_logo.png"> <h3 class="m-0 p-1">Department of Youth Development</h3>
				</div>
			</div>
			<div class="">
				<div class="user_card mt-5">
					<div class="justify-content-center text-center">
						<h5 class="mt-5" style="color:#333333">Welcome To PDS System {{ otpUserId }} </h5>
						<h2 style="color:#2D76B7">Registration Here</h2>
					</div>
					<div class="justify-content-center form_container mt-2 pl-5 pr-5 pt-2">
						<form class="login-form">
							<div class="input-group mb-2">
								<div class="input-group-append">
									<span class="input-group-text"><font-awesome-icon icon="fa-solid  fa-user" /></span>
								</div>
								<input type="text" name="name" class="form-control input_user"
									placeholder="Name" v-model="name"  @keyup.enter="onSubmit" />
							</div>
							<p v-show="errorname == 1" class="text-danger">Name is required</p>
							<!-- phone field -->
							<div class="input-group mb-2">
								<div class="input-group-append">
									<span class="input-group-text"><font-awesome-icon icon="fa-solid  fa-mobile" /></span>
								</div>
								<input type="text" name="phone" class="form-control input_user"
									placeholder="Mobile Number" v-model="phone"  @keyup.enter="onSubmit" />
							</div>
							<p v-show="errorphone == 1" class="text-danger">phone is required</p>


							<!-- password field -->
							<div class="input-group mb-2 pt-1">
								<div class="input-group-append">
									<span class="input-group-text"><font-awesome-icon icon="fa-solid  fa-key" /></span>
								</div>
								<input type="password" name="password" class="form-control input_pass"
									placeholder="Password" v-model="password" @keyup.enter="onSubmit" />
							</div>
							<p v-show="errorPassword == 1" class="text-danger">Password is required</p>
							<p v-show="invalidphonePassword == 1" class="text-danger">Invalid phone and Password !</p>

							<!-- login button -->
							<div class="mt-3">
								<button type="button" class="btn login_btn text-white text-bold" v-if="saveStatus == 1"
									@click="onSubmit">Submit</button>
							</div>

							<p class="text-center mt-3" style="font-size:12px">Already have an account? <router-link to="/login">Login Here</router-link></p>
						</form>
					</div>

					<div class="mt-4">
						
					</div>
				</div>
			</div>
			<Loader v-if="loader" />
		</div>

</template>

<script>
//import axios from "axios";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useStore, mapGetters, mapActions } from "vuex"
export default {
	components:{
   
  	},
	data() {
		const store = useStore();
		return {
			url : this.backendUrl,
			name:'',
			phone: '',                             
			password: '',
			
			updateStatus: 0,                                
			saveStatus: 1,                                  
			// phone  
			errorname:0,                                                        
			errorphone:0,                                                     
			phonemessage: '',

			// password                                                          
			errorPassword:0,                                                     
			Passwordmessage: '',
			invalidphonePassword:0,
			loader: false,
			reqDwn:{},
			store,
		};
  	},

	computed: {
    	...mapGetters(["otpUserId","otp"]) 
	},

  	methods: {
		...mapActions(["setOtpUserId", "setOtp"]),

	  	onSubmit() {  
			if(this.phone !== '' && this.password !== '' &&  this.name !== ''){
				this.axios                                                             
					.post(this.url+'/api/auth/register',{
					name: this.name,	
					phone: this.phone,
					password: this.password,
					
					})
					.then((result) => {
						console.log(result);
						this.invalidphonePassword=''; 
						this.setOtpUserId(result.data.userId);
						this.setOtp(result.data.otp);
						this.$router.push({ path:'/verify-otp'});						
						
					}).catch((error)=>{
						this.errorname = 0;
						this.errorphone = 0;
						this.errorPassword = 0;
						this.invalidphonePassword = 1;
						console.log(error);
					});
			}
  		}
  	},

}
</script>

<style scoped>
.s-header{
	position: fixed;
	top:0;
	left:0;
	width: 100%;
	padding: 20px 0;
	box-shadow: 0 0 5px 1px #cccccc;
}
		.user_card {
			left      : 50%;
			top       : 50%;
			position  : absolute;
			transform : translate(-50%, -50%);
			height: 400px;
			width: 450px;
			background: #ffffff;
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
		.form_container {
			margin-top: 100px;
		}
		.login_btn {
			width: 100%;
			background: #007dac !important;
			color: #ffffff !important;
			/* //font-weight: 600; */
			font-family: 'Russo One',sans-serif;
				font-style: oblique;
					font-size: 15px;
		}
		.login_btn:hover {
			width: 100%;
			background: #00aeef !important;
			color: #007dac !important;
		}
		.login_btn:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.login_container {
			padding: 0 2rem;
		}
		.input-group-text {
			background: #007dac  !important;
			color: #00aeef !important;
			border: 0 !important;
			border-radius: 0.25rem 0 0 0.25rem !important;
		}
		.input_user,
		.input_pass:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
			background-color: #007dac !important;
		}
		.input_user{
			text-align: left;
		}
</style>