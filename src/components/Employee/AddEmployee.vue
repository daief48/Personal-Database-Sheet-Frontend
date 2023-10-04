<template>
  <div>
    <div class="card card-default">
    <div class="card-header"><strong> Add New Employee {{ step }}</strong> <button class="btn btn-sm btn-secondary float-right" @click="cancelAdd">Cancel</button></div>
    <div class="card-body">
	<section class="register" v-if="!hasSeenCongrats">
		<div class="register-stepper">
			<div class="step" :class="{'step-active' : step === 1, 'step-done': step > 1}"><span class="step-number">1</span></div>
			<div class="step" :class="{'step-active' : step === 2, 'step-done': step > 2}"><span class="step-number">2</span></div>
			<div class="step" :class="{'step-active' : step === 3, 'step-done': step > 3}"><span class="step-number">3</span></div>
      <div class="step" :class="{'step-active' : step === 4, 'step-done': step > 4}"><span class="step-number">4</span></div>
      <div class="step" :class="{'step-active' : step === 5, 'step-done': step > 5}"><span class="step-number">5</span></div>
      <div class="step" :class="{'step-active' : step === 6, 'step-done': step > 6}"><span class="step-number">6</span></div>
		</div>

		<transition name="slide-fade">
			<section v-show="step === 1">
				<form class="form" method="post" action="#" @submit.prevent="next">
          <div class="p-2">
              <div class="row">
                <div class="col-md-4">
                  <div class="">
                    <div class="bg-light p-2 text-center" style="max-width: 270px; margin:0 auto">
                    <img :src="imgDataUrl" class="d-block" width="250">
                    <a class="btn d-block btn-info text-white mt-1" @click="toggleShow">Profile Image</a>
                  </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-4 mt-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Name:</span>
                    </div>
                    <input type="text" required class="form-control" v-model="basicInfo.name">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Mobile Number:</span>
                    </div>
                    <input type="text" required class="form-control" v-model="basicInfo.mobileNumber">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Email:</span>
                    </div>
                    <input type="email" required class="form-control" v-model="basicInfo.email">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Designation:</span>
                    </div>
                    <select v-model="basicInfo.designation" class="form-control">
                      <option value="1">Officer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
              <p class="cta-color text-right">
                <span class="link_wrap">
                  <input type="submit" value="Next >" class="link_text" />
                  <span class="arrow-next"></span>
                </span>
              </p>
            </div>
				</form>
			</section>
		</transition>
		<transition name="slide-fade">
			<section v-show="step === 2">

				<form class="form" method="post" action="#" @submit.prevent="next">
          <h3 class="text-center text-dark"><span class="s-title">Address</span></h3>
          <h5 class="text-left text-dark">Present Address</h5> <hr>
					<div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">House No:</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_houseno" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Area/Word</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_area" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">District:</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_district" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Road No:</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_houseno" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Upozila:</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_upazila" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Post Code:</span>
                    </div>
                    <input type="text" v-model="addressDetails.present_addr_postcode" class="form-control">
                  </div>

                </div>
              </div>

              <h5 class="mt-4 text-dark">Parmanent Address</h5> <hr>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">House No:</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_houseno" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Area/Word</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_area" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">District:</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_district" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Road No:</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_roadno" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Upozila:</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_upazila" class="form-control">
                  </div>

                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Post Code:</span>
                    </div>
                    <input type="text" v-model="addressDetails.permanent_addr_postcode" class="form-control">
                  </div>
                </div>
              </div>      

					<div class="form-group cta-step">
						<div class="cta prev">
							<p class="cta-color">
								<span class="link_wrap">
									<a class="link_text" href="#" @click.prevent="prev()"><span class="arrow-prev"></span>Previous
									</a>
								</span>
							</p>
						</div>
						<div class="cta">
							<p class="cta-color">
								<span class="text"></span>
								<span class="link_wrap">
									<input type="submit" value="Next" class="link_text" />
									<span class="arrow-next"></span>
								</span>
							</p>
						</div>
					</div>
				</form>
			</section>
		</transition>
		<transition name="slide-fade">
			<section v-show="step === 3">
				<form class="form" action="#" @submit.prevent="next">
					<div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Department Name:</span>
                    </div>
                    <select v-model="jobs.department" class="form-control">
                        <option :value="department.id" v-for="department in departments" :key="department.id">{{ department.dept_name }}</option>
                      </select>
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Designation:</span>
                    </div>
                    <select v-model="jobs.designation" class="form-control">
                        <option :value="designation.id" v-for="designation in designations" :key="designation.id">{{ designation.designation_name }}</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Joining Date:</span>
                    </div>
                    <input type="date" v-model="jobs.joining_date" class="form-control">
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-append">
                      <span class="input-group-text">Job Location:</span>
                    </div>
                    <input type="text" v-model="jobs.job_location" class="form-control">
                  </div>
                 
                </div>
              </div>
					
              <div class="form-group cta-step">
						<div class="cta prev">
							<p class="cta-color">
								<span class="link_wrap">
									<a class="link_text" href="#" @click.prevent="prev()"><span class="arrow-prev"></span>Previous
									</a>
								</span>
							</p>
						</div>
						<div class="cta">
							<p class="cta-color">
								<span class="text"></span>
								<span class="link_wrap">
									<input type="submit" value="Next" class="link_text" />
									<span class="arrow-next"></span>
								</span>
							</p>
						</div>
					</div>
				</form>
			</section>
		</transition>


    <transition name="slide-fade">
			<section v-show="step === 4">
				<form class="form" action="#" @submit.prevent="next">
					<button type="button" class="btn btn-outline-primary float-right mt-2 mb-2" @click="addNewEducationHistory">Add Education</button>
              <div class="" style="max-height: 700px; overflow-y: auto; overflow-x: hidden; max-width: 100%; clear:both">
                <draggable class="dragArea list-group w-full" :list="educationArr" @change="onDrag">
                <div class="bg-light mb-3 border-left-cz" v-for="(education,index) in educationArr" :key="index">
                  <div class="input-group m-0 p-3" style="width:calc( 100% - 30px )">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="">Exam Name</span>
                    </div>
                    <input type="text" v-model="education.exam_name" class="form-control" autocomplete="off"/>
                  </div>
                  <div class="p-4 jumbutton">
                    <div class="row">
                    <div class="col-md-6">
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Institute Name</span>
                        </div>
                        <input type="text" v-model="education.institute_name" class="form-control" autocomplete="off"/>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">District:</span>
                        </div>
                        <input type="text" v-model="education.district" class="form-control" autocomplete="off"/>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Subject</span>
                        </div>
                        <input type="text" v-model="education.subject" class="form-control" autocomplete="off"/>
                      </div>
                      
                    </div>
                    <div class="col-md-6">
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Upazila</span>
                        </div>
                        <input type="text" v-model="education.upazila" class="form-control" autocomplete="off"/>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Passing Year</span>
                        </div>
                        <input type="text" v-model="education.passing_year" class="form-control" autocomplete="off"/>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Grad</span>
                        </div>
                        <input type="text" v-model="education.grade" class="form-control" autocomplete="off"/>
                      </div>
                    </div>
                  </div>
                  </div>
                  
                  <button class="btn btn-sm btn-danger float-right ml-1" type="button" style="width:30px; line-height: 28px; position:absolute; top:16px; right:10px;" @click="removeEducationHistory (index)">X</button>
                </div>
                </draggable>
              </div>
            <div class="form-group cta-step">
              <div class="cta prev">
                <p class="cta-color">
                  <span class="link_wrap">
                    <a class="link_text" href="#" @click.prevent="prev()"><span class="arrow-prev"></span>Previous
                    </a>
                  </span>
                </p>
              </div>
              <div class="cta">
                <p class="cta-color">
                  <span class="text"></span>
                  <span class="link_wrap">
                    <input type="submit" value="Next" class="link_text" />
                    <span class="arrow-next"></span>
                  </span>
                </p>
              </div>
            </div>
				</form>
			</section>
		</transition>


    
    <transition name="slide-fade">
			<section v-show="step === 5">
				<form class="form" action="#" @submit.prevent="next">
					<div class="row">
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Father Name</span>
                </div>
                <input type="text" v-model="familly_info.father_name" class="form-control">
              </div>
            </div>
            <div class="col-md-6">   
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Mother Name</span>
                </div>
                <input type="text" v-model="familly_info.mother_name" class="form-control">
              </div>
            </div>
          </div>  
            
          <div class="row">
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Spouse Name</span>
                </div>
                <input type="text" v-model="familly_info.spouse_name" class="form-control" autocomplete="off"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Number Of Child</span>
                </div>
                <input type="text" v-model="familly_info.number_of_child" class="form-control">
              </div>
            </div>
          </div>     

            <div class="form-group cta-step">
              <div class="cta prev">
                <p class="cta-color">
                  <span class="link_wrap">
                    <a class="link_text" href="#" @click.prevent="prev()"><span class="arrow-prev"></span>Previous
                    </a>
                  </span>
                </p>
              </div>
              <div class="cta">
                <p class="cta-color">
                  <span class="text"></span>
                  <span class="link_wrap">
                    <input type="submit" value="Next" class="link_text" />
                    <span class="arrow-next"></span>
                  </span>
                </p>
              </div>
            </div>
				</form>
			</section>
		</transition>

    <transition name="slide-fade">
			<section v-show="step === 6">
				<form class="form" action="#" @submit.prevent="next">
          <div class="row">
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Name</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_name" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Relation</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_relation" class="form-control">
              </div>
            </div>
          </div> 
          <div class="row">
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Mobile No</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_phn_number" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Email</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_email" class="form-control">
              </div>
            </div>
          </div> 
          <div class="row">
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">Address</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_addr" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group mb-4">
                <div class="input-group-append">
                  <span class="input-group-text">District</span>
                </div>
                <input type="text" v-model="emergency_contact.emergency_district" class="form-control">
              </div>
            </div>
          </div> 
          <div class="form-group cta-step">
              <div class="cta prev">
                <p class="cta-color">
                  <span class="link_wrap">
                    <a class="link_text" href="#" @click.prevent="prev()"><span class="arrow-prev"></span>Previous
                    </a>
                  </span>
                </p>
              </div>
            </div>
				</form>
			</section>
		</transition>
	</section>
  </div>
</div>


<!-- Modal End -->

<my-upload field="img"
  @crop-success="cropSuccess"
  @crop-upload-success="cropUploadSuccess"
  @crop-upload-fail="cropUploadFail"
  v-model="show"
  :width="300"
  :height="200"
  :noCircle=true
  :params="params"
  :headers="headers"
  :langExt="langExt"
  langType="en"
  img-format="png">
</my-upload>
            
</div>
</template>

<script>

import myUpload from 'vue-image-crop-upload';
import { VueDraggableNext } from 'vue-draggable-next';
import pImage from '@/assets/img/avatar.png';
export default {
  components: {
    myUpload,
    draggable: VueDraggableNext,
  },
  props: ['data'],
  data() {
    return {
      backend_url: process.env.VUE_APP_API_URL,
      //image cropper
      show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: pImage,

      langExt: {
          hint: 'Click or drag the file here to upload',
          loading: 'Uploading…',
          noSupported: 'Browser is not supported, please use IE10+ or other browsers',
          success: 'Upload success',
          fail: 'Upload failed',
          preview: 'Preview',
          btn: {
            off: 'Cancel',
            close: 'Close',
            back: 'Back',
            save: 'Crop'
          },
          error: {
            onlyImg: 'Image only',
            outOfSize: 'Image exceeds size limit: ',
            lowestPx: 'Image\'s size is too low. Expected at least: '
          }
      },

      empData:{},
      departments:[],
      designations:[],
      basicInfo:{
        name: '',
        mobileNumber:'',
        email:'',
        designation:'',
        designation_id:'',
        image:'',
      },

      addressDetails:{
        present_addr_houseno:'',
        present_addr_roadno:'',
        present_addr_area:'',
        present_addr_upazila:'',
        present_addr_district:'',
        present_addr_postcode:'',

        permanent_addr_houseno:'',
        permanent_addr_roadno:'',
        permanent_addr_area:'',
        permanent_addr_upazila:'',
        permanent_addr_district:'',
        permanent_addr_postcode:'',

      },
      jobs:{
        department:'',
        designation:'',
        joining_date:'',
        job_location:'',
      },

      educationArr:[{ exam_name: '', institute_name: '', district:'', upazila:'', subject:'', passing_year:'', grade:'' }],

      familly_info:{
        father_name:'',
        mother_name:'',
        spouse_name:'',
        number_of_child:'',
      },
      emergency_contact:{
        emergency_name:'',
        emergency_relation:'',
        emergency_phn_number:'',
        emergency_email:'',
        emergency_addr:'',
        emergency_district:'',
      },

      steps: {},
      step: 1,
    };
  },
  
  computed: { },

  methods: {

    prev() {
      this.step--;
    },

    next() {
      this.step++;
    },

    onDrag(){
      console.log(this.educationArr);
    },

    getDepartmentList(){
      this.axios
      .get(this.backend_url+'getDepartment')
      .then((res) => {
        this.departments = res.data.data;
        console.log(this.departments);
      })
    },
    getDesignationList(){
      this.axios
      .get(this.backend_url+'getDesignationMgt')
      .then((res) => {
        this.designations = res.data.data;
        console.log(this.designations);
      })
    },

    addNewEducationHistory: function () {
      this.educationArr.push({ exam_name: '', institute_name: '', district:'', upazila:'', subject:'', passing_year:'', grade:'' });
    },

    removeEducationHistory: function (index) {
      this.educationArr.splice(index,1);
    },
    cancelAdd() {
      this.$emit('cancel'); // Emit the 'cancel' event
    },
    saveProfile(type){
      let formData = new FormData;
      if(type == 'basicInfo'){
        formData.append('name', this.basicInfo.name);
        formData.append('mobile_number', this.basicInfo.mobileNumber);
        formData.append('email', this.basicInfo.email);
        formData.append('designation', this.basicInfo.designation);
        formData.append('image', this.basicInfo.image);
      }
      if(type == 'addressDetail'){
        formData.append('present_addr_houseno', this.addressDetails.present_addr_houseno);
        formData.append('present_addr_roadno', this.addressDetails.present_addr_roadno);
        formData.append('present_addr_area', this.addressDetails.present_addr_area);
        formData.append('present_addr_upazila', this.addressDetails.present_addr_upazila);
        formData.append('present_addr_district', this.addressDetails.present_addr_district);
        formData.append('present_addr_postcode', this.addressDetails.present_addr_postcode);

        formData.append('permanent_addr_houseno', this.addressDetails.permanent_addr_houseno);
        formData.append('permanent_addr_roadno', this.addressDetails.permanent_addr_roadno);
        formData.append('permanent_addr_area', this.addressDetails.permanent_addr_area);
        formData.append('permanent_addr_upazila', this.addressDetails.permanent_addr_upazila);
        formData.append('permanent_addr_district', this.addressDetails.permanent_addr_district);
        formData.append('permanent_addr_postcode', this.addressDetails.permanent_addr_postcode);
      }

      if(type == 'jobs'){
        formData.append('department', this.jobs.department);
        formData.append('designation', this.jobs.designation);
        formData.append('joining_date', this.jobs.joining_date);
        formData.append('job_location', this.jobs.job_location);
      }

      if(type == 'education_history'){
        formData.append('education_history', JSON.stringify(this.educationArr));
      }

      if(type == 'familly_info'){
        formData.append('father_name', this.familly_info.father_name);
        formData.append('mother_name', this.familly_info.mother_name);
        formData.append('spouse_name', this.familly_info.spouse_name);
        formData.append('number_of_child', this.familly_info.number_of_child);
      }

      if(type == 'emergency_contact'){
        formData.append('emergency_name', this.emergency_contact.emergency_name);
        formData.append('emergency_relation', this.emergency_contact.emergency_relation);
        formData.append('emergency_phn_number', this.emergency_contact.emergency_phn_number);
        formData.append('emergency_email', this.emergency_contact.emergency_email);
        formData.append('emergency_addr', this.emergency_contact.emergency_addr);
        formData.append('emergency_district', this.emergency_contact.emergency_district);
      }
      

      this.axios
      .post(this.backend_url+'user/updateProfile',formData)
      .then((res) => {
          console.log(res.data);
          this.$toast.success("Employee Updated successfully.", {
            position: "top-right",
          });
      })
      .error((res) => {
        this.$toast.error(res.message, {
            position: "top-right",
          });
      })
    },


    toggleShow() {
				this.show = !this.show;
			},
           
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
        this.basicInfo.image = imgDataUrl;
        console.log('field: ' + field);
        console.log('dataUrl: ' + imgDataUrl);
        this.show = !this.show;
			},
			
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
        
			},
			
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}

  },

  created() {
    this.getDepartmentList();
    this.getDesignationList();
  },

   
}


</script>

<style>

.ui.inverted.dimmer {
  color: #009688 !important;

}

.cropper {
	height: 400px;
	width: 400px;
	background: #DDD;
}


.file-btn {
  position: relative;
  display: block;
  cursor: pointer;
}
.file-btn input {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}    
    

</style>

<style scoped>
  ::v-deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
  }
  .modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  </style>
  
  <style scoped>
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }

.table-borderless > tbody > tr > td,
.table-borderless > tbody > tr > th,
.table-borderless > tfoot > tr > td,
.table-borderless > tfoot > tr > th,
.table-borderless > thead > tr > td,
.table-borderless > thead > tr > th {
    border: none;
}

.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: #333333;
    background:none !important;
    font-weight: bold;
}
.nav-pills .nav-link{
font-size: 20px !important;
}
.border-left-cz{
    border-left:5px solid #7dacdb;
    cursor:grab;
    cursor:move;
    position: relative;
  }

  .pen-description {
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}
.pen-description h1 {
  text-align: center;
  margin-top: 2rem;
  color: #fff;
}
.pen-description p {
  margin: 0;
  line-height: 1;
}
.pen-description .pen-copyright img {
  border-radius: 25px;
  padding: 5px;
  margin: 5px;
  transition: box-shadow 0.5s ease-in-out;
}
.pen-description .pen-copyright:hover img {
  box-shadow: 0 10px 20px #0e2101;
}

.register {
  display: block;
  color: #fff;
  max-width: auto;
  margin: 0 auto 2rem;
  padding: 2rem;
  background: #fff;
}
.register-icon {
  display: flex;
  background: #fff;
  border-radius: 2rem;
  width: 50px;
  height: 50px;
  padding: 1rem;
  margin: -50px auto 20px;
}
.register-icon-item {
  width: 100%;
}
.register-title {
  font-weight: 300;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-align: center;
  color: #fff;
  padding: 0 2rem;
  margin-top: 2rem;
}
.register-stepper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin: 0 auto 1.5em;
}
.register-stepper::before {
  z-index: 0;
  content: "";
  display: block;
  position: absolute;
  height: 2px;
  top: calc(50% - 1px);
  background: #275b8f;
  width: calc(100% - 20px);
}
.register-stepper .step {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 2px solid #275b8f;
  color: #000000;
  background-color: #fff;
  border-radius: 50%;
  min-width: 35px;
  min-height: 35px;
  line-height: 30px;
  font-size: 16px;
}
.register-stepper .step-active {
  color: #ffffff;
  background-color: #10477e;
  border-color: #275b8f;
}
.register-stepper .step-done {
  color: #a7e4b5;
  border-color: #a7e4b5;
}
.register-stepper .step-number {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  line-height: 1;
  vertical-align: middle;
}
.cta-step{
  text-align: center;
}
.cta-step div{
  display: inline-block;
  margin:20px
}
.link_text{
  padding: 5px 10px;
    background: #eeeeee;
    color: #333333;
    line-height: 24px;
    display: inline-block;
    border: none;
    border-radius: 5px;
    width: 83px;
    text-decoration: none;
}

.s-title{
  position: relative;
}
.s-title::after{
  position: absolute;
  bottom: -10px;
  content:'';
  height: 3px;
  background: #275b8f;
  left: 0;

}
  </style>