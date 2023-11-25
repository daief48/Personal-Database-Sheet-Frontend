<template>
  <div class="card card-default" v-if="showEmpList">
    <div class="card-header">
      <h3 class="card-title">
        <button class="btn btn-sm btn-info" @click="enableAddEmployee">
          + Add Employee
        </button>
      </h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <div class="emp-list" style="position: relative; top: -20px">
            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
              <div class="col-8"></div>
              <div class="col-4 mt-1 mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Employee..."
                  @input="searchEmployee"
                  v-model="query.search"
                />
              </div>
            </div>

            <div class="">
              <div class="" v-if="!isLoading">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(emp, index) in employees" :key="index">
                          <td>{{ index++ }}</td>
                          <td>{{ emp.name }}</td>
                          <td>{{ emp.email }}</td>
                          <td>{{ emp.mobile_number }}</td>
                          <td>{{ emp.department_name }}</td>
                          <td>{{ emp.designation_name }}</td>
                          <td class="text-center">
                            <span
                              class="badge"
                              :class="
                                emp.status == 1
                                  ? 'badge-success'
                                  : 'badge-danger'
                              "
                              >{{
                                emp.status == 1 ? "Active" : "Inactive"
                              }}</span
                            >
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-warning"
                              @click="editEmp(emp)"
                            >
                              Edit
                            </button>
                            <button
                              class="btn btn-sm btn-info ml-1"
                              type="button"
                              data-toggle="modal"
                              data-target="#exampleModal"
                            >
                              Detail
                            </button>
                            <button
                              class="btn btn-sm btn-danger ml-1"
                              @click="deleteEmployee(emp.id, emp.user_id)"
                            >
                              Delete
                            </button>

                            <!-- Modal -->
                            <div
                              class="modal fade"
                              id="exampleModal"
                              tabindex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog" role="document">
                                <div class="modal-content" style="width: 40vw">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Employee Details
                                    </h5>
                                    <button
                                      type="button"
                                      class="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <div class="card" style="width: 100%">
                                      <div class="card-body">
                                        <h1
                                          class="card-title"
                                          style="font-size: 28px"
                                        >
                                          Basic Information
                                        </h1>
                                        <br />
                                        <br />
                                        <hr>
                                        <p>Name : {{ emp.name }}</p>
                                        <p>Email : {{ emp.email }}</p>
                                        <p>Phone : {{ emp.mobile_number }}</p>
                                        <p>
                                          Department : {{ emp.department_name }}
                                        </p>
                                        <p>
                                          Designation :
                                          {{ emp.designation_name }}
                                        </p>
                                      </div>
                                    </div>
                                    <div class="card">
                                      <div class="card-body">
                                        <h1
                                          class="card-title"
                                          style="font-size: 28px"
                                        >
                                        Present  Address
                                        </h1>
                                      
                                        <br />
                                        <br />
                                        <hr>
                                        <p>House Address : {{ emp.present_addr_houseno }}</p>
                                        <p>Road No : {{ emp.present_addr_roadno }}</p>
                                        <p>Area/Word:	 : {{ emp.present_addr_area }}</p>
                                        <p>
                                          Upazila : {{ emp.present_addr_upazila }}
                                        </p>
                                        <p>
                                          District :
                                          {{ emp.present_addr_district }}
                                        </p>
                                        <p>
                                          Post Code :
                                          {{ emp.present_addr_postcode }}
                                        </p>
                                      </div>
                                    </div>

                                    <div class="card">
                                      <div class="card-body">
                                        <h1
                                          class="card-title"
                                          style="font-size: 28px"
                                        >
                                        Permanent  Address
                                        </h1>
                                      
                                        <br />
                                        <br />
                                        <hr>
                                        <p>House Address : {{ emp.permanent_addr_houseno }}</p>
                                        <p>Road No : {{ emp.permanent_addr_roadno }}</p>
                                        <p>Area/Word:	 : {{ emp.permanent_addr_area }}</p>
                                        <p>
                                          Upazila : {{ emp.permanent_addr_upazila }}
                                        </p>
                                        <p>
                                          District :
                                          {{ emp.permanent_addr_district }}
                                        </p>
                                        <p>
                                          Post Code :
                                          {{ emp.permanent_addr_postcode }}
                                        </p>
                                      </div>
                                    </div>
                                    <div class="card">
                                      <div class="card-body">
                                        <h1
                                          class="card-title"
                                          style="font-size: 28px"
                                        >
                                        Job
                                        </h1>
                                      
                                        <br />
                                        <br />
                                        <hr>
                                        <p>Location : {{ emp.job_location }}</p>
                                        <p>Department : {{ emp.department_name }}</p>
                                        <p>Designation:	 : {{ emp.designation_name }}</p>
                                        <p>
                                          Joining Date : {{ emp.joining_date }}
                                        </p>
                                        
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Insert Pagination Part -->

            <div v-if="employees !== null" class="vertical-center mt-3 mb-5">
              <v-pagination
                v-model="query.current_page"
                :pages="query.page"
                :range-size="1"
                active-color="#DCEDFF"
                @update:modelValue="getEmployees"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
      >
        <button class="modal__close" @click="showModal = false">
          <mdi-close></mdi-close>
        </button>
        <span class="modal__title">Hello, vue-final-modal</span>
        <div class="modal__content">
          <p>
            Vue Final Modal is a renderless, stackable, detachable and
            lightweight modal component.
          </p>
        </div>
      </vue-final-modal>
      <v-button class="d-none" @click="showModal = true">Open modal</v-button>
    </div>
  </div>
  <EditEmployee v-if="editingEnabled" :data="empData" @cancel="cancelEdit" />
  <AddEmployee v-if="addingEnabled" @cancel="cancelAdd" />
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { VueFinalModal } from "vue-final-modal";

import EditEmployee from "./EditEmployee.vue";
import AddEmployee from "./AddEmployee.vue";

export default {
  components: {
    VPagination,
    VueFinalModal,
    EditEmployee,
    AddEmployee,
  },

  data() {
    return {
      showEmpList: true,
      employees: [],
      backend_url: process.env.VUE_APP_API_URL,
      url: this.backendUrl + "/api/employees",
      query: {
        page: 1,
        search: "",
        per_page: 10,
        current_page: 1,
      },
      showModal: false,
      editingEnabled: false,
      addingEnabled: false,
      empData: {},
    };
  },

  methods: {
    getEmployees(query = null) {
      let page = 1;
      let search = "";
      if (query !== null) {
        page = query;
        search = "";
        if (this.query.search != null) {
          search = this.query.search;
        }
      }
      var url = "";
      if (search === null) {
        url = this.backend_url + "getEmployeesList";
      } else {
        url =
          this.backend_url +
          "getEmployeesList?search=" +
          search +
          "&page=" +
          page;
      }
      this.axios
        .get(url)
        .then((res) => {
          this.employees = res.data.data.data;
          if (res.data.data.total > this.query.per_page) {
            this.query.page = Math.ceil(
              res.data.data.total / this.query.per_page
            );
          } else {
            this.query.page = 1;
          }
          this.query.current_page = res.data.data.current_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchEmployee() {
      var page = 1;
      this.getEmployees(page);
    },

    deleteEmployee(empid, userid) {
      this.axios
        .post(this.backend_url + `user/deleteEmployee/${empid}/${userid}`)
        .then((res) => {
          console.log(res.data);
          this.$toast.success("Employee and User deleted successfully.", {
            position: "top-right",
          });
          this.getEmployees(this.query);
        })
        .catch((error) => {
          // Changed `.error` to `.catch` for error handling
          this.$toast.error(error.response.data.message, {
            position: "top-right",
          });
        });
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
            this.deleteEmployee(id);
            this.getEmployees({
              page: 1,
              search: "",
            });
            this.$swal.fire({
              text: "Success, User has been deleted.",
              icon: "success",
              position: "top-end",
              timer: 1000,
            });
          }
        });
    },

    editEmp(emp) {
      this.empData = emp;
      this.editingEnabled = true;
      this.showEmpList = false;
    },
    cancelEdit() {
      this.editingEnabled = false;
      this.showEmpList = true;
      this.getEmployees(this.query);
    },

    enableAddEmployee() {
      this.addingEnabled = true;
      this.showEmpList = false;
    },

    cancelAdd() {
      this.addingEnabled = false;
      this.showEmpList = true;
      this.getEmployees(this.query);
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
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      console.log("field: " + field);
      console.log("dataUrl: " + imgDataUrl);
      this.show = !this.show;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },

  created() {
    this.getEmployees(this.query);
  },
};
</script>

<style>
.ui.inverted.dimmer {
  color: #009688 !important;
}

.cropper {
  height: 400px;
  width: 400px;
  background: #ddd;
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