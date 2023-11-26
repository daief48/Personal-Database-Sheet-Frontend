<template>
  <div>
    <h5><i class="fa fa-thin fa-arrow-left"></i> Transfer</h5>
    <div class="card card-default">
      <div class="card-body">
        <div style="display: flex;justify-content: space-between;">
          <h3>My Transfer History</h3>
          <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
            @click="clear()">+ Add
            Transfer</a>

          <!-- hidden model  -->
          <!-- Add and Edit Modal -->

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="exampleModalLabel">Add Transfer</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <Form @submit.prevent="saveTranfer" :validation-schema="schema" v-slot="{ errors, resetForm }"
                    ref="form">
                    <div>
                      <div class="row">
                        <!-- {{ tansfer }} -->
                        <div class="col-4">
                          <div class="form-group">
                            <input type="text" v-model="tansfer.employee_id" style="display:none;" autocomplete="off">
                            <!-- <div class="invalid-feedback">{{ errors.name }}</div> -->

                            <label for="exampleFormControlSelect1">Transfer Type </label>



                            <Field name="transfer_type" as="select" v-model="tansfer.transfer_type" class="form-control"
                              :class="{ 'is-invalid': errors.transfer_type }" autocomplete="off">
                              <option v-for="transferType in transferType" :key="transferType.id"
                                v-bind:value="transferType.id">
                                {{ transferType.title }}</option>
                            </Field>
                            <div class="invalid-feedback">{{ errors.transfer_type }}</div>

                          </div>

                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Department</label>
                              <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                v-model="tansfer.to_department" name="to_department"
                                :class="{ 'is-invalid': errors.to_department }">
                                <option v-for="department in departments" :key="department.id"
                                  v-bind:value="department.id">{{
                                    department.dept_name }}</option>
                              </Field>
                              <div class="invalid-feedback">{{ errors.to_department }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Department</label>
                              <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                v-model="tansfer.from_department" name="from_department"
                                :class="{ 'is-invalid': errors.from_department }">
                                <option v-for="department in departments" :key="department.id"
                                  v-bind:value="department.id">{{
                                    department.dept_name }}</option>
                              </Field>
                              <div class="invalid-feedback">{{ errors.from_department }}</div>

                            </div>


                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Transfer Date</label>
                            <Field type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Enter email" v-model="tansfer.transfer_date" name="transfer_date"
                              :class="{ 'is-invalid': errors.transfer_date }" />
                            <div class="invalid-feedback">{{ errors.transfer_date }}</div>

                          </div>
                        </div>

                        <div class="col-4">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Transfer Order Number</label>
                            <Field type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Transfer Order Number" v-model="tansfer.transfer_order_number"
                              name="transfer_order_number" :class="{ 'is-invalid': errors.transfer_order_number }" />
                            <div class="invalid-feedback">{{ errors.transfer_order_number }}</div>

                          </div>


                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Designation</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="tansfer.to_designation" name="to_designation"
                                :class="{ 'is-invalid': errors.to_designation }">

                                <option v-for="designation in designations" :key="designation.id"
                                  v-bind:value="designation.id">
                                  {{ designation.designation_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.to_designation }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Designation</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="tansfer.from_designation" name="from_designation"
                                :class="{ 'is-invalid': errors.from_designation }">

                                <option v-for="designation in designations" :key="designation.id"
                                  v-bind:value="designation.id">
                                  {{ designation.designation_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.from_designation }}</div>

                            </div>

                          </div>

                          <div class="form-group">
                            <label for="exampleInputEmail1">Join Date</label>
                            <Field type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Enter email" v-model="tansfer.join_date" name="join_date"
                              :class="{ 'is-invalid': errors.join_date }" />
                            <div class="invalid-feedback">{{ errors.join_date }}</div>

                          </div>
                        </div>



                        <div class="col-4">
                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Office</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="tansfer.to_office" name="to_office" :class="{ 'is-invalid': errors.to_office }">

                                <option v-for="office in office" :key="office.id" v-bind:value="office.id">
                                  {{ office.office_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.to_office }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Office</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="tansfer.from_office" name="from_office"
                                :class="{ 'is-invalid': errors.from_office }">

                                <option v-for="office in office" :key="office.id" v-bind:value="office.id">
                                  {{ office.office_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.from_office }}</div>

                            </div>

                          </div>

                          <div class="form-group">
                            <label for="exampleFormControlSelect1">Transfer Order</label>
                            <Field type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Transfer Order" v-model="tansfer.transfer_order" name="transfer_order"
                              :class="{ 'is-invalid': errors.transfer_order }" />
                            <div class="invalid-feedback">{{ errors.transfer_order }}</div>

                          </div>

                          <div class="mb-3">
                            <label for="formFileSm" class="form-label">Transfer Letter</label>
                            <div class="input-group">
                              <input type="file" class="form-control" id="formFileSm" @change="handleFileChange"
                                aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click="resetForm()">Cancel</button>
                      <button type="submit" class="btn btn-primary" @click="saveTranfer()">Add</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <!--End Add and Edit Modal -->
          <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="exampleModalLabel">Edit Transfer</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <Form @submit.prevent="EditTranfer" :validation-schema="schema" v-slot="{ errors }">
                    <div>
                      <div class="row">
                        <!-- {{ tansfer }} -->
                        <div class="col-4">
                          <div class="form-group">
                            <input type="text" v-model="edittansfer.employee_id" style="display:none;" autocomplete="off">
                            <!-- <div class="invalid-feedback">{{ errors.name }}</div> -->

                            <label for="exampleFormControlSelect1">Transfer Type </label>



                            <Field name="transfer_type" as="select" v-model="edittansfer.transfer_type"
                              class="form-control" :class="{ 'is-invalid': errors.transfer_type }" autocomplete="off">
                              <option v-for="transferType in transferType" :key="transferType.id"
                                v-bind:value="transferType.id">
                                {{ transferType.title }}</option>
                            </Field>
                            <div class="invalid-feedback">{{ errors.transfer_type }}</div>

                          </div>

                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Department</label>
                              <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                v-model="edittansfer.to_department" name="to_department"
                                :class="{ 'is-invalid': errors.to_department }">
                                <option v-for="department in departments" :key="department.id"
                                  v-bind:value="department.id">{{
                                    department.dept_name }}</option>
                              </Field>
                              <div class="invalid-feedback">{{ errors.to_department }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Department</label>
                              <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                v-model="edittansfer.from_department" name="from_department"
                                :class="{ 'is-invalid': errors.from_department }">
                                <option v-for="department in departments" :key="department.id"
                                  v-bind:value="department.id">{{
                                    department.dept_name }}</option>
                              </Field>
                              <div class="invalid-feedback">{{ errors.from_department }}</div>

                            </div>


                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Transfer Date</label>
                            <Field type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Enter email" v-model="edittansfer.transfer_date" name="transfer_date"
                              :class="{ 'is-invalid': errors.transfer_date }" />
                            <div class="invalid-feedback">{{ errors.transfer_date }}</div>

                          </div>
                        </div>

                        <div class="col-4">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Transfer Order Number</label>
                            <Field type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Transfer Order Number" v-model="edittansfer.transfer_order_number"
                              name="transfer_order_number" :class="{ 'is-invalid': errors.transfer_order_number }" />
                            <div class="invalid-feedback">{{ errors.transfer_order_number }}</div>

                          </div>


                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Designation</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="edittansfer.to_designation" name="to_designation"
                                :class="{ 'is-invalid': errors.to_designation }">

                                <option v-for="designation in designations" :key="designation.id"
                                  v-bind:value="designation.id">
                                  {{ designation.designation_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.to_designation }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Designation</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="edittansfer.from_designation" name="from_designation"
                                :class="{ 'is-invalid': errors.from_designation }">

                                <option v-for="designation in designations" :key="designation.id"
                                  v-bind:value="designation.id">
                                  {{ designation.designation_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.from_designation }}</div>

                            </div>

                          </div>

                          <div class="form-group">
                            <label for="exampleInputEmail1">Join Date</label>
                            <Field type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Enter email" v-model="edittansfer.join_date" name="join_date"
                              :class="{ 'is-invalid': errors.join_date }" />
                            <div class="invalid-feedback">{{ errors.join_date }}</div>

                          </div>
                        </div>



                        <div class="col-4">
                          <div class="d-flex">
                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">To Office</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="edittansfer.to_office" name="to_office"
                                :class="{ 'is-invalid': errors.to_office }">

                                <option v-for="office in office" :key="office.id" v-bind:value="office.id">
                                  {{ office.office_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.to_office }}</div>

                            </div>

                            <div class="form-group mr-2 w-50">
                              <label for="exampleFormControlSelect1">From Office</label>
                              <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                v-model="edittansfer.from_office" name="from_office"
                                :class="{ 'is-invalid': errors.from_office }">

                                <option v-for="office in office" :key="office.id" v-bind:value="office.id">
                                  {{ office.office_name }}</option>

                              </Field>
                              <div class="invalid-feedback">{{ errors.from_office }}</div>

                            </div>

                          </div>

                          <div class="form-group">
                            <label for="exampleFormControlSelect1">Transfer Order</label>
                            <Field type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              placeholder="Transfer Order" v-model="edittansfer.transfer_order" name="transfer_order"
                              :class="{ 'is-invalid': errors.transfer_order }" />
                            <div class="invalid-feedback">{{ errors.transfer_order }}</div>

                          </div>

                          <div class="mb-3">
                            <label for="formFileSm" class="form-label">Transfer Letter</label>
                            <div class="input-group">
                              <input type="file" class="form-control" id="formFileSm" @change="edithandleFileChange"
                                aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-primary" @click="EditTranfer()">Edit</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          <!-- Transter Details Modal -->

          <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="width: 121%; top: 164px;">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body card">
                  <div class="card-body d-flex flex-column">
                    <h5 class="modal-title text-center" id="exampleModalLabel" style="font-size: 25px;">Transfer Details
                    </h5>
                    <hr>
                    <h1 class="card-title ">Name: {{ tansfer.employee_name }}</h1>
                    <h1 class="card-title ">Transfer Type: {{ tansfer.transfer_type }}</h1>
                    <h5 class="card-title">Transfer Order: {{ tansfer.transfer_order }}</h5>
                    <h5 class="card-title">Transfer Order Number: {{ tansfer.transfer_order_number }}</h5>
                    <h5 class="card-title">To Office: {{ tansfer.to_office }}</h5>
                    <h5 class="card-title">From Office: {{ tansfer.from_office }}</h5>
                    <h5 class="card-title">To Designation: {{ tansfer.to_designation }}</h5>
                    <h5 class="card-title">From Designation: {{ tansfer.from_designation }}</h5>
                    <h5 class="card-title">Transfer Date: {{ tansfer.transfer_date }}</h5>
                    <h5 class="card-title">Join Date: {{ tansfer.join_date }}</h5>
                    <h5 class="card-title">Transfer Letter: {{ tansfer.transfer_letter }}</h5>
                    <h5 class="card-title">To Department: {{ tansfer.to_department }}</h5>
                    <h5 class="card-title">From Department: {{ tansfer.from_department }}</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <!-- End Transter Details Modal -->


        </div>

        <hr>

        <div class="row">
          <div class="col-md-12">

            <table class="table text-center" id="datatable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>To Department</th>
                  <th>From Department</th>
                  <th>To Designation</th>
                  <th>From Designation</th>
                  <th>Transfer Type</th>
                  <th>Transfer Order</th>
                  <th>To Office</th>
                  <th>From office</th>
                  <th>Transfer Date</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Transfer Letter</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in transferList1" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.employee_name }}</td>
                  <td>{{ item.to_department }}</td>
                  <td>{{ item.from_department }}</td>
                  <td>{{ item.to_designation }}</td>
                  <td>{{ item.from_designation }}</td>
                  <td>{{ item.t_type }}</td>
                  <td>{{ item.transfer_order }}</td>
                  <td>{{ item.to_office }}</td>
                  <td>{{ item.from_office }}</td>
                  <td>{{ item.transfer_date }}</td>
                  <td>{{ item.join_date }}</td>
                  <td>
                    <p v-if="item.status == 1" class="text-warning font-weight-bold"> Verified</p>
                    <p v-else class="text-success font-weight-bold">Pending</p>
                  </td>
                  <td>
                    <a :href="'http://localhost/pds-backend/public/transferLetters/' + item.transfer_letter"
                      download="transfer_letter.pdf" class="btn btn-success" target="blank">Download</a>
                  </td>
                  <td style="width: 185px;">
                    <button v-if="item.status === 1" @click="viewDetails(item)" class="btn btn-outline-primary mr-2"
                      style="border: 3px solid;font-weight: bolder; width: 124px;" data-toggle="modal"
                      data-target="#exampleModal2">
                      View Details
                    </button>
                    <div v-else>
                      <button @click="editbutton(item.id)" class="btn btn-primary mr-2" data-toggle="modal"
                        data-target="#exampleModal1">
                        Edit
                      </button>
                      <button @click="deletebutton(item.id)" class="btn btn-danger mr-2">
                        Delete
                      </button>
                    </div>


                  </td>

                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Start -->



  </div>
</template>
  
<script>

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Form, Field } from 'vee-validate';
import * as Yup from "yup";



// DataTable.use(DataTablesCore);
export default {
  components: {
    // DataTable,
    Form, Field

  },


  data() {
    const storageData = JSON.parse(localStorage.getItem('user'));

    const schema = Yup.object().shape({
      transfer_type: Yup.string().required("Transfer Type is required"),
      to_department: Yup.string().required("To Department is required"),
      from_department: Yup.string().required("From Department is required"),
      transfer_date: Yup.date().required("Transfer Date is required").typeError("Invalid date format"),
      transfer_order_number: Yup.string().required("Transfer Order Number is required"),
      to_designation: Yup.string().required("To Designation is required"),
      from_designation: Yup.string().required("From Designation is required"),
      join_date: Yup.date().required("Join Date is required").typeError("Invalid date format"),
      to_office: Yup.string().required("To Office is required"),
      from_office: Yup.string().required("From Office is required"),
      transfer_order: Yup.string().required("Transfer Order is required"),
      transfer_letter: Yup.string().required("Transfer Letter is required"),
    });



    return {
      schema,
      backend_url: process.env.VUE_APP_API_URL,
      storageData,
      user: "",
      departments: "",
      designations: "",
      transferType: "",
      office: "",
      pdf: [],
      url: this.backendUrl + "/api/users",
      basicInfo: {
        name: '',
        mobileNumber: '',
        email: '',
        designation: '',
        designation_id: '',
        image: '',
      },
      transferRecordById: [],
      transferList1: [],
      tansfer: {
        employee_id: "",
        transfer_type: "",
        transfer_order: "",
        transfer_order_number: "",
        to_office: "",
        from_office: "",
        to_department: "",
        from_department: "",
        to_designation: "",
        from_designation: "",
        transfer_date: "",
        join_date: "",
        transfer_letter: ""
      },
      edittansfer: {
        employee_id: "",
        transfer_type: "",
        transfer_order: "",
        transfer_order_number: "",
        to_office: "",
        from_office: "",
        to_department: "",
        from_department: "",
        to_designation: "",
        from_designation: "",
        transfer_date: "",
        join_date: "",
        transfer_letter: ""
      }

    };
  },

  computed: {},

  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.tansfer.transfer_letter = selectedFile;
    },
    edithandleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.edittansfer.transfer_letter = selectedFile;
    },

    editbutton(id) {
      console.log(id);
      this.axios
        .get(this.backend_url + 'specificUserTransferRecord/' + id)
        .then((response) => {
          this.transferRecordById = response.data.data;
          console.log(this.transferRecordById);
          this.edittansfer.id = id;
          this.edittansfer.employee_name = this.transferRecordById.employee_name;
          this.edittansfer.employee_id = this.transferRecordById.employee_id;
          this.edittansfer.transfer_type = this.transferRecordById.transfer_type;
          this.edittansfer.transfer_order = this.transferRecordById.transfer_order;
          this.edittansfer.transfer_order_number = this.transferRecordById.transfer_order_number;
          this.edittansfer.to_office = this.transferRecordById.to_office;
          this.edittansfer.from_office = this.transferRecordById.from_office;
          this.edittansfer.to_designation = this.transferRecordById.to_designation;
          this.edittansfer.from_designation = this.transferRecordById.from_designation;
          this.edittansfer.transfer_date = this.transferRecordById.transfer_date;
          this.edittansfer.join_date = this.transferRecordById.join_date;
          this.edittansfer.transfer_letter = this.transferRecordById.transfer_letter;
          this.edittansfer.to_department = this.transferRecordById.to_department;
          this.edittansfer.from_department = this.transferRecordById.from_department;

          this.edit = true;

        })
        .catch((e) => {
          console.log(e)
        })
    },
    deletebutton(id) {
      this.axios
        .delete(this.backend_url + 'deleteTransferRecord/' + id)
        .then((res) => {
          console.log('Delete Successfully', res);
          this.getTransferList();
          $('#datatable').DataTable().destroy();
          this.$toast.error(`Delete Successfully!!`);

        })
    },
    viewDetails(item) {

      console.log(item);
      this.tansfer.employee_name = item.employee_name;
      this.tansfer.employee_id = item.employee_id;
      this.tansfer.transfer_type = item.t_type;
      this.tansfer.transfer_order = item.transfer_order;
      this.tansfer.transfer_order_number = item.transfer_order_number;
      this.tansfer.to_office = item.to_office;
      this.tansfer.from_office = item.from_office;
      this.tansfer.to_designation = item.to_designation;
      this.tansfer.from_designation = item.from_designation;
      this.tansfer.transfer_date = item.transfer_date;
      this.tansfer.join_date = item.join_date;
      this.tansfer.transfer_letter = item.transfer_letter;
      this.tansfer.to_department = item.to_department;
      this.tansfer.from_department = item.from_department;

      this.edit = false;

    },
    clear() {


      this.$refs.form.resetForm();
    },
    getTransferList() {
      this.axios
        .get(this.backend_url + 'getTransferList?user_id=' + this.storageData.id)
        .then((res) => {
          console.log(res.data.data);
          this.transferList1 = res.data.data;
          setTimeout(function () {
            $("#datatable").DataTable({
              "processing": true,
            });
          }, 100);
        })
        .catch((e) => {
          console.log(e)
        })

    },

    getDepartmentList() {
      this.axios
        .get(this.backend_url + 'getDepartment')
        .then((res) => {
          // console.log(res.data.data);
          this.departments = res.data.data;

        })
    },

    getDesignationList() {
      this.axios
        .get(this.backend_url + 'getDesignationMgt')
        .then((res) => {
          this.designations = res.data.data;
          // console.log(this.designations);
        })
    },
    getTransfertype() {
      this.axios
        .get(this.backend_url + 'transferType')
        .then((res) => {
          this.transferType = res.data.list;
          // console.log('fddsfsdf');
          // console.log(this.transferType[0].title);
        })
    },
    getUser() {
      this.axios
        .get(this.backend_url + `users/${this.storageData.id}`)
        .then((res) => {
          this.user = res.data.userDetail.employee_id;
          // console.log(this.user);
          this.tansfer.employee_id = this.user
          // console.log(this.storageData.id);
        })
    },
    getOffice() {
      this.axios
        .get(this.backend_url + `getOfficeMgt`)
        .then((response) => {
          this.office = response.data.list;
          // console.log(this.office);
        })
    },
    saveTranfer() {
      let formData = new FormData;

      formData.append('employee_id', this.tansfer.employee_id);
      formData.append('transfer_type', this.tansfer.transfer_type);
      formData.append('transfer_order', this.tansfer.transfer_order);
      formData.append('transfer_order_number', this.tansfer.transfer_order_number);
      formData.append('to_office', this.tansfer.to_office);
      formData.append('from_office', this.tansfer.from_office);
      formData.append('to_designation', this.tansfer.to_designation);
      formData.append('from_designation', this.tansfer.from_designation);
      formData.append('transfer_date', this.tansfer.transfer_date);
      formData.append('join_date', this.tansfer.join_date);
      formData.append('transfer_letter', this.tansfer.transfer_letter);
      formData.append('to_department', this.tansfer.to_department);
      formData.append('from_department', this.tansfer.from_department);
      try {
        // this.tansfer.employee_id = this.storageData.id;
        this.axios
          .post(this.backend_url + 'addTransferRecord', formData)
          .then((res) => {
            console.log(res);
            this.getTransferList();
            $("#exampleModal").modal('hide');
            $('#datatable').DataTable().destroy();
            this.$toast.success(`Add Data Successfully!`);
            this.$refs.form.resetForm();
          })
          .catch((error) => {
            console.error("An error occurred while saving the transfer record:", error);
            this.$toast.error(`Failed to save transfer record.`);
          });
      } catch (error) {
        console.error("An error occurred:", error);
        this.$toast.error(`Failed to save transfer record.`);
      }
    },

    EditTranfer() {
      let formData = new FormData;

      formData.append('employee_id', this.edittansfer.employee_id);
      formData.append('transfer_type', this.edittansfer.transfer_type);
      formData.append('transfer_order', this.edittansfer.transfer_order);
      formData.append('transfer_order_number', this.edittansfer.transfer_order_number);
      formData.append('to_office', this.edittansfer.to_office);
      formData.append('from_office', this.edittansfer.from_office);
      formData.append('to_designation', this.edittansfer.to_designation);
      formData.append('from_designation', this.edittansfer.from_designation);
      formData.append('transfer_date', this.edittansfer.transfer_date);
      formData.append('join_date', this.edittansfer.join_date);
      formData.append('transfer_letter', this.edittansfer.transfer_letter);
      formData.append('to_department', this.edittansfer.to_department);
      formData.append('from_department', this.edittansfer.from_department);

      try {
        this.axios
          .post(this.backend_url + `updateTransferRecord/${this.edittansfer.id}`, formData)
          .then((res) => {
            console.log(res);
            this.getTransferList();
            $("#exampleModal1").modal('hide');
            $('#datatable').DataTable().destroy();
            this.$toast.success(`Update Data Successfully!`);
          })
          .catch((error) => {
            console.error("An error occurred while updating the transfer record:", error);
            this.$toast.error(`Failed to update transfer record.`);
          });
      } catch (error) {
        console.error("An error occurred:", error);
        this.$toast.error(`Failed to update transfer record.`);
      }
    }


  },

  created() {
    this.getTransferList();
    this.getDepartmentList();
    this.getDesignationList();
    this.getTransfertype();
    this.getUser();
    this.getOffice();
  },
  mounted() {


  },


  watch: {

  },

}


</script>
  
<style>
.card-title {
  /* text-align: center; */
  font-size: 20px;
  font-weight: bolder;
}

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