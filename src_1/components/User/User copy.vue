<template>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title"><strong> User Form </strong></h3>
    </div>
    <div class="card-body">

      <div class="row">
        <div class="col-md-3 form-bg">
          <Form @submit="handleUser" :validation-schema="userForm">
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
                <label for="email">Email*</label>
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
              <div class="form-group">
                <button class="btn btn-primary mr-2" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  Add User
                </button>
                <button class="btn btn-danger ml-2" @click="onClear">
                  <i class="fa fa-times"></i> Clear
                </button>
              </div>
            </div>
          </Form>

          <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'" >
            {{ message }}
          </div>

        </div>

        <div class="col-md-9">

          <div class="table-responsive">
            <table class="table table-bordered table-condensed table-striped table-hover" id="datatable">
              <thead>
                <tr>
                  <th id="table-desgin">SL</th>
                  <th id="table-desgin">User name </th>
                  <th id="table-desgin">Email</th>
                  <th id="table-desgin">Role</th>
                  <th id="table-desgin">Status</th>
                  <th id="table-desgin" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                  <td style="width: 5%;">{{ index+1 }}</td>
                  <td style="width: 15%;">{{ user.name }}</td>
                  <td style="width: 20%;">{{ user.email }}</td>
                  <td style="width: 15%;">{{ user.role_id }}</td>
                  <td style="width: 10%;">
                    <span v-if="user.status == 1" class="badge badge-success">Active</span>
                    <span v-if="user.status == 0" class="badge badge-danger">Inactive</span>
                  </td>

                  <td class="text-center" style="width: 20%;">
                    <button class="btn btn-primary btn-sm" @click="onEdit(user)">
                      <i class="fa fa-edit"></i> Edit
                    </button>
                    <button v-if="user.status == 0" @click="onActive(user.id)" class="btn btn-info btn-sm ml-2">
                      <i class="fa fa-check btn-icon"></i> Active
                    </button>
                    <button v-if="user.status == 1" @click="onInactive(user.id)" class="btn btn-dark btn-sm ml-2">
                      <i class="fa fa-times btn-icon"></i> Inactive
                    </button>
                    <button class="btn btn-danger btn-sm ml-2" @click="onDelete(user.id)">
                      <i class="fa fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "@/assets/css/design.css";
import $ from 'jquery';

import { authHeader } from "../../common/common";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {useStore } from "vuex"

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {

    const userForm = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
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

    const store = useStore();

    return {
      url: this.backendUrl + "/api/users",
      users: {},
      username: '',
      email: '',
      userrole: '',
      password: '',
      userstatus: '',
      loading: false,
      message: "",
      userForm,
      id:0,
      store,     
    };
  },
  methods: {
    handleUser(user) {
      this.message = "";
      this.loading = true;
      this.axios
          .post(this.backendUrl + '/api/addUser', {
            name: user.username,
            role_id: user.userrole,
            email: user.email,
            password: user.password,
            status: user.userstatus,
          }, authHeader())
          .then((result) => {
            this.message = result.message;
            this.loading = false;
            this.getUsers();
          }).catch((error) => {
            this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.loading = false;
          });
    },

    onClear() {
      this.username = '';
      this.email = '';
      this.userrole = '';
      this.password = '';
      this.userstatus = '';
      console.log(this.userForm);
    },

    getUsers() {
      $('#datatable').DataTable().destroy();
      this.axios.get(this.url, authHeader())
        .then((data) => {
          console.log(data);
          this.users = data.data.userList;
          $(document).ready(function () {
            $('#datatable').DataTable();
          });
        }).catch((error) => {         
          console.log(error.response.status);
            if(error.response.status == 401){
             this.$router.push({path:'/'});
            }
        });
    },

    onEdit(user) {
      this.id = user.id;
      this.username = user.name;
      this.email = user.email;
      this.userrole = user.role_id;
      this.userstatus = user.status;
    },


    onUpdate() {
      this.axios
        .put(`${this.url}/${this.id}`, {
          name: this.userName,
          email: this.email,
          password: this.password,
          status: this.userStatus,
          role_id: this.userRole,

        }, authHeader())
        .then((result) => {
          this.onClear();
          this.updateStatus = 0;
          this.saveStatus = 1;
          this.userStatus = 1;
          this.getUsers();
          this.$toast.success(result.data.message,
            {
              position: "bottom-right",
              duration: 1242,
              queue: true,
              max: false
            });
        }).catch((error) => {
          this.errorMsgname = 0;
          this.errorMsgemail = 0;
          this.errorMsgUserRole = 0;

          
          if(Object.prototype.hasOwnProperty.call(error.response.data.message, 'email')) {
            this.useremailmessage = error.response.data.message.email[0];
          } else {
            this.useremailmessage = 0;
          }

          if(Object.prototype.hasOwnProperty.call(error.response.data.message, 'name')) {
            this.usernamemessage = error.response.data.message.name[0];
          } else {
            this.usernamemessage = 0;
          }

          if(Object.prototype.hasOwnProperty.call(error.response.data.message, 'role_id')) {
            this.userRoleMsg = error.response.data.message.role_id[0];
          } else {
            this.userRoleMsg = 0;
          }

        });

    },


    onActive(id) {
      this.axios
        .patch(`${this.url}/active/${id}`, {}, authHeader())
        .then((response) => {
          this.getUsers();
          this.$toast.success(response.data.message,
            {
              position: "bottom-right",
              duration: 1819,
              queue: true,
              max: false
            });

        })
        .catch((e) => {
          alert(e);
        });
    },

    onInactive(id) {
      this.axios
        .patch(`${this.url}/inactive/${id}`, {}, authHeader())
        .then((response) => {
          this.getUsers();
          this.$toast.error(response.data.message,
            {
              position: "bottom-right",
              duration: 2000,
              queue: true,
              max: false
            });
        })
        .catch((e) => {
          alert(e);
        });
    },

    onDelete(id) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {'id': id};
          this.store.dispatch('deleteUser',data)
          // this.axios
          //   .delete(`${this.url}/${id}`, authHeader())
          //   .then(() => {
          //     this.getUsers();
          //   })
          //   .catch((error) => {
          //     this.$toast.error(error.response.data.message,
          //       {
          //         position: "bottom-right",
          //         duration: 1242,
          //         queue: true,
          //         max: false
          //       });

          //   });
        }
      })
    },    




  },



  created() {
    this.getUsers();
  },
};
</script>

<style>

.ui.inverted.dimmer {
  color: #009688 !important;

}

</style>