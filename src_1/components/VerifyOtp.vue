<template>
	<div class="">
		<div class="container h-100">
			<div class="s-header">
				<div class="d-flex justify-content-center text-center">
					<img width="45" src="@/assets/img/govt_logo.png"> <h3 class="m-0 p-1">Department of Youth Development</h3>
				</div>
			</div>
			<div class="custom-bg">

				<div class="user_card mt-5">
					<div class="justify-content-center text-center">
						<h2 class="mt-2" style="color:#2D76B7">Verify OTP Number</h2>
						<p class="pl-5 pr-5" style="font-size: 16px;">OTP has sent to you given mobile number. Set your 6 digit OTP Number to verify your account. </p>
					</div>
					<div class="justify-content-center form_container mt-2 pl-5 pr-5 pt-2">
						<form class="otp-form">
							<div style="display: flex; flex-direction: row" class="pl-1">
								<v-otp-input
									ref="otpInput"
									v-model:value="otpCode"
									input-classes="otp-input"
									separator=":"
									:num-inputs="6"
									:should-auto-focus="true"
									input-type="letter-numeric"
									:conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
									:placeholder="['*', '*', '*', '*', '*', '*']"
								/>
							</div>
							<div class="mt-3">
								<button type="button" class="btn text-white btn-verify text-bold d-block w-100" v-if="saveStatus == 1"
									@click="onSubmit">Verify</button>
								<p class="mt-2" style="font-size:12px;">Estimated time <span class="text-danger"><strong>2 m</strong></span></p>
								<p class="text-danger mt-2" v-if="errorOTP">Please Provide otp code properly</p>
							</div>
						</form>
					</div>

					<div class="mt-4">
						
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
//import axios from "axios";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useStore, mapGetters } from "vuex"

export default {
	components:{
   
  	},
	data() {
		const store = useStore();
		return {
			url : this.backendUrl,
			phone: '',                             
			password: '',
			
			updateStatus: 0,                                
			saveStatus: 1,                                  
			// phone                                                          
			errorphone:0,                                                     
			phonemessage: '',

			// password                                                          
			errorPassword:0,                                                     
			Passwordmessage: '',
			invalidphonePassword:0,
			loader: false,
			reqDwn:{},
			store,
			otpCode:'',
			errorOTP:false

		};
  	},

	computed: {
    ...mapGetters(["otpUserId","otp"]) 
	},

  	methods: {
	  	onSubmit() {  
			console.log("OTP changed: ", this.otpCode);
			console.log("OTP length: ", this.otpCode.length);
			if(this.otpCode == '' || this.otpCode.length < 6){
				this.errorOTP = true;
			}else{
				this.axios.post(this.url+'/api/auth/otpVerify',{
				user_id: this.otpUserId,
				otp: this.otpCode
				})
				.then((result) => {
					console.log(result);
					this.$router.push({ path:'/request-under-processing'});
					
				}).catch((error)=>{
					console.log(error.response.data.errors);
				});
			}
		},

		checkOtpExist(){
			if(this.otp ==''){
				this.$router.push({ path:'/register'});
			}
		}
  	},

	created(){
		this.checkOtpExist();
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
.btn-verify{
	background: rgb(45, 118, 183);
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
.userInput{
	display: flex;
	justify-content: center;
}



</style>