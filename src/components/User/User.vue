<template>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title"><strong> Users</strong></h3>
    </div>
    <div class="card-body">

      <div class="row">
        <div class="col-md-3 form-bg">
          <Form @submit="handleUser" :validation-schema="userForm" ref="form">
            <div>
              <div class="form-group">
                <label for="username">Username*</label>
                <Field name="username" type="text" v-model="username" class="form-control" autocomplete="off"/>
                <ErrorMessage name="username" v-model="username" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="userrole">User Role*</label>
                <Field name="userrole" as="select" class="form-control" v-model="userrole">
                  <option value="">-- Select Role --</option>
                  <option value="1">Admin</option>
                  <option value="2">Editor</option>
                </Field>
                <ErrorMessage name="userrole" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="phone">Phone*</label>
                <Field name="phone" type="text" class="form-control" v-model="phone" autocomplete="off"/>
                <ErrorMessage name="phone" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control" v-model="email" autocomplete="off"/>
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="password">Password*</label>
                <Field name="password" type="password" class="form-control" v-model="password"/>
                <ErrorMessage name="password" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="userstatus">Status*</label>
                <Field name="userstatus" as="select" class="form-control" v-model="userstatus">
                  <option value="">-- Select Status --</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Field>
                <ErrorMessage name="userstatus" class="error-feedback" />
              </div>

              <a class="btn" @click="toggleShow">set avatar</a>
              <my-upload field="img"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    v-model="show"
                    :width="300"
                    :height="300"
                    :params="params"
                    :headers="headers"
                    :langExt="langExt"
                    langType="en"
                    img-format="png">
              </my-upload>
              <img :src="imgDataUrl">


              <div class="form-group">
                <button class="btn btn-primary mr-2" :disabled="isCreating || isUpdating">
                  <span v-show="isCreating" class="spinner-border spinner-border-sm"></span>
                  Submit
                </button>

                <button class="btn btn-danger ml-2" type="reset">Reset</button>
              </div>
            </div>
          </Form>

          <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'" >
            <!-- {{ message }} -->
          </div>

        </div>

        <div class="col-md-9">

          <div class="user-list" style="position:relative; top:-20px;">
            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
              <div class="col-8">
                
              </div>
              <div class="col-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Users..."
                  @input="searchUsers"
                  v-model="query.search"
                />
              </div>
            </div>

            <div class="pl-2 pr-2">
              <div class="" v-if="!isLoading" style="border:1px solid #eeeeee">
              <div class="col-md-12">
                <div class="row border-bottom border-top p-2 bg-light">
                  <div class="col-1 text-center">Sl</div>
                  <div class="col-3">User Name</div>
                  <div class="col-2">Phone</div>
                  <div class="col-2">User Email</div>
                  <div class="col-1 text-center">Role</div>
                  <div class="col-1 text-center">Status</div>
                  <div class="col-2">Actions</div>
                </div>
              </div>
                <div class="col-md-12 customize-border" v-for="(item, index) in usersPaginatedData.data" :key="item.id">
                  <div class="row border-bottom border-top p-2">
                    <div class="col-1 text-center">
                      {{ index + 1 }}
                    </div>
                    <div class="col-3">
                      {{ item.name }}
                    </div>
                    <div class="col-2">
                      <strong class="text-info">{{ item.phone }} </strong>
                    </div>
                    <div class="col-2">
                      <strong class="text-info">{{ item.email }} </strong>
                    </div>
                    <div class="col-1 text-center">
                      <span class="badge" :class="item.role_id == 1 ? 'badge-success' : 'badge-info'">{{ item.role_id == 1 ? 'Admin' : 'Editor'}}</span>
                    </div>
                    <div class="col-1 text-center">
                      <span class="badge" :class="item.status == 1 ? 'badge-success' : 'badge-info'">{{ item.status == 1 ? 'Active' : 'Inactive'}}</span>
                    </div>
                    <div class="col-2">
                      <button
                        class="btn btn-warning mx-2 btn-sm"
                        title="Delete User"
                        @click="onEdit(item)"
                      >
                      
                        <font-awesome-icon icon="fa-solid  fa-pencil" />
                      </button>
                      <button
                        class="btn btn-danger mx-2 btn-sm"
                        title="Delete User"
                        @click="deleteUserModal(item.id)">
                        <font-awesome-icon icon="fa-solid  fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="isLoading" class="text-center mt-5 mb-5">
                Loading Users...
                <div class="spinner-grow" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>

            <!-- Insert Pagination Part -->
            
            <div v-if="usersPaginatedData !== null" class="vertical-center mt-3 mb-5">
          
              <v-pagination
                v-model="query.page"
                :pages="usersPaginatedData.pagination.total_pages"
                :range-size="2"
                active-color="#DCEDFF"
                @update:modelValue="getResults"
                :class="justify-center"
              />
            </div>        
          </div>
        </div>
      </div>
    </div>

    <div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <button class="modal__close" @click="showModal = false">
        <mdi-close></mdi-close>
      </button>
      <span class="modal__title">Hello, vue-final-modal</span>
      <div class="modal__content">
        <p>Vue Final Modal is a renderless, stackable, detachable and lightweight modal component.</p>
      </div>
    </vue-final-modal>
    <v-button class="d-none" @click="showModal = true">Open modal</v-button>
  </div>

  </div>

</template>

<script>



import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {useStore, mapGetters, mapActions } from "vuex"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.bubble.css';

import { VueFinalModal } from 'vue-final-modal';


import myUpload from 'vue-image-crop-upload';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    VPagination,
    VueFinalModal,
    myUpload,
  },

  data() {
    const store = useStore();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationCreate = yup.object().shape({
          username: yup
            .string()
            .required("Username is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
          // email: yup
          //   .string()
          //   .required("Email is required!")
          //   .email("Email is invalid!")
          //   .max(50, "Must be maximum 50 characters!"),

          phone: yup
            .string()
            .required("Phone Number is required!")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(11, "too short")
            .max(11, "too long"),

          password: yup
            .string()
            .required("Password is required")
            .min(6, "Must be at least 6 characters!")
            .max(40, "Must be maximum 40 characters!"),

          userrole: yup
            .number()
            .typeError('User Role is required!')
            .required("User Role is required!"), 
          userstatus: yup
            .number()
            .typeError('User Status is required!')
            .required("User Role is required!")    
      });

      const validationEdit = yup.object().shape({
          username: yup
            .string()
            .required("Username is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),

          phone: yup
            .string()
            .required("Phone Number is required!")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(11, "too short")
            .max(11, "too long"),

          // email: yup
          //   .string()
          //   .required("Email is required!")
          //   .email("Email is invalid!")
          //   .max(50, "Must be maximum 50 characters!"),

          userrole: yup
            .number()
            .typeError('User Role is required!')
            .required("User Role is required!"), 
          userstatus: yup
            .number()
            .typeError('User Status is required!')
            .required("User Role is required!")    
      });

    return {
      backend_url: process.env.VUE_APP_API_URL, 
      store,
      url: this.backendUrl + "/api/users",
      users: {},
      username: '',
      email: '',
      userrole: '',
      password: '',
      userstatus: '',
      loading: false,
      id:0,
      query: {
        page: 1,
        search: "",
      },
      myValue: '',
      validationCreate: validationCreate,
      validationEdit: validationEdit,
      userForm: validationCreate, 
      image:"https://images.pexels.com/photos/4218687/pexels-photo-4218687.jpeg",
      showModal: false, 


      show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: '',

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
    };
  },

  
  
  computed: { ...mapGetters(["usersPaginatedData", "isLoading","isDeleting", "deletedData"
              , "isCreating", "createdData", "isUpdating", "updatedData", "formAction","message","successStatus"]) },

  methods: {
    ...mapActions(["fetchAllUsers", "deleteUser", "storeUser","updateUser",]),

    getResults() {
      this.fetchAllUsers(this.query);
    },

    searchUsers() {
      this.query.page = null;
      this.fetchAllUsers(this.query);
    },

    handleUser(user) {
      if (this.$store.getters.formAction == 'insert'){
        this.storeUser({
          name: user.username,
          role_id: user.userrole,
          email: user.email,
          phone: user.phone,
          password: user.password,
          status: user.userstatus,
        });                 
      }else{  //edit
        this.updateUser({
          id: this.id,
          name: user.username,
          role_id: user.userrole,
          email: user.email,
          phone: user.phone,
          password: user.password,
          status: user.userstatus,
        });
      }   
    },

    onEdit(user) {
      this.id = user.id;
      this.username = user.name;
      this.email = user.email;
      this.phone = user.phone,
      this.userrole = user.role_id;
      this.userstatus = user.status;
      this.$store.commit('fromActionStatus', 'edit');
      this.userForm = this.validationEdit;
    },

    deleteUserModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the user ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deleteUser(id);
            this.fetchAllUsers({
              page: 1,
              search: ''
            });
            this.$swal.fire({
              text: "Success, User has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });
          }
        });
    }, 



    closeModal(){

    },

    toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
        console.log('field: ' + field);
        console.log('dataUrl: ' + imgDataUrl);
        this.show = !this.show;
			},
			/**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
        
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}




  },

  created() {
    this.fetchAllUsers(this.query);
  },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.fetchAllUsers({
              page: 1,
              search: ''
            });
        this.$swal.fire({
          text: "Success, User has been added successfully.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
      }
    },

    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.fetchAllUsers({
              page: 1,
              search: ''
            });
        this.$store.commit('fromActionStatus', 'insert');
        this.userForm = this.validationCreate;
        this.$swal.fire({
          text: "Success, User has been Updated.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
      }
    },



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
  </style>