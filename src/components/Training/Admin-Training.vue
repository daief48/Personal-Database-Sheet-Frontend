<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Transfer</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Training History</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
                        @click="clear()">+ Add
                        Training</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Adding Training</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">


                                    <Form @submit.prevent="saveTraining" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form">
                                        <!-- {{ training }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label class="typo__label">Select with search</label>
                                                    <multiselect v-model="value" :options="employeeList"
                                                        :custom-label="nameWithLang" :close-on-select="true"
                                                        placeholder="Select one" label="name" track-by="id"></multiselect>

                                                </div>
                                                <!-- <div class="form-group">
                                                    <label for="exampleInputEmail1">Employee ID</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter Employee ID"
                                                        v-model="training.employee_id" name="employee_id"
                                                        :class="{ 'is-invalid': errors.employee_id }" />

                                                    <div class="invalid-feedback">{{ errors.employee_id }}</div>

                                                </div> -->
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Center Name</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Center Name"
                                                        v-model="training.training_center_name"
                                                        :class="{ 'is-invalid': errors.training_center_name }"
                                                        name="training_center_name" />
                                                    <div class="invalid-feedback">{{ errors.training_center_name }}</div>

                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Train Name</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Train Name"
                                                        v-model="training.training_name"
                                                        :class="{ 'is-invalid': errors.training_name }"
                                                        name="training_name" />
                                                    <div class="invalid-feedback">{{ errors.training_name }}</div>


                                                </div>





                                            </div>

                                            <div class="col-4">

                                                <div class="d-flex">
                                                    <div class="form-group w-50 mr-2">
                                                        <label for="exampleInputEmail1">Training Start Date</label>
                                                        <Field type="date" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Training Start Date"
                                                            v-model="training.training_strt_date"
                                                            :class="{ 'is-invalid': errors.training_strt_date }"
                                                            name="training_strt_date" />
                                                        <div class="invalid-feedback">{{ errors.training_strt_date }}</div>


                                                    </div>

                                                    <div class="form-group w-50">
                                                        <label for="exampleInputEmail1">Training Eng Date</label>
                                                        <Field type="date" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Training Eng Date"
                                                            v-model="training.training_end_date"
                                                            :class="{ 'is-invalid': errors.training_end_date }"
                                                            name="training_end_date" />
                                                        <div class="invalid-feedback">{{ errors.training_end_date }}</div>


                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Score</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Score"
                                                        v-model="training.training_score"
                                                        :class="{ 'is-invalid': errors.training_score }"
                                                        name="training_score" />
                                                    <div class="invalid-feedback">{{ errors.training_score }}</div>


                                                </div>



                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Feedback</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Feedback"
                                                        v-model="training.training_feedback"
                                                        :class="{ 'is-invalid': errors.training_feedback }"
                                                        name="training_feedback" />
                                                    <div class="invalid-feedback">{{ errors.training_feedback }}</div>


                                                </div>

                                            </div>



                                            <div class="col-4">


                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Description</label>
                                                    <Field as="textarea" class="form-control"
                                                        id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                                                        v-model="training.description"
                                                        :class="{ 'is-invalid': errors.description }" name="description">
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>
                                                </div>

                                            </div>
                                        </div>


                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                @click="resetForm()">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="saveTraining()">Add</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--End Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Training</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">


                                    <Form @submit.prevent="EditTraining" :validation-schema="schema"
                                        v-slot="{ errors }" >
                                        <!-- {{ training }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label class="typo__label">Select with search</label>
                                                    <multiselect v-model="value" :options="employeeList"
                                                        :custom-label="nameWithLang" :close-on-select="true"
                                                        placeholder="Select one" label="name" track-by="id"></multiselect>

                                                </div>
                                                <!-- <div class="form-group">
                                                    <label for="exampleInputEmail1">Employee ID</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter Employee ID"
                                                        v-model="training.employee_id" name="employee_id"
                                                        :class="{ 'is-invalid': errors.employee_id }" />

                                                    <div class="invalid-feedback">{{ errors.employee_id }}</div>

                                                </div> -->
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Center Name</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Center Name"
                                                        v-model="edittraining.training_center_name"
                                                        :class="{ 'is-invalid': errors.training_center_name }"
                                                        name="training_center_name" />
                                                    <div class="invalid-feedback">{{ errors.training_center_name }}</div>

                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Train Name</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Train Name"
                                                        v-model="edittraining.training_name"
                                                        :class="{ 'is-invalid': errors.training_name }"
                                                        name="training_name" />
                                                    <div class="invalid-feedback">{{ errors.training_name }}</div>


                                                </div>





                                            </div>

                                            <div class="col-4">

                                                <div class="d-flex">
                                                    <div class="form-group w-50 mr-2">
                                                        <label for="exampleInputEmail1">Training Start Date</label>
                                                        <Field type="date" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Training Start Date"
                                                            v-model="edittraining.training_strt_date"
                                                            :class="{ 'is-invalid': errors.training_strt_date }"
                                                            name="training_strt_date" />
                                                        <div class="invalid-feedback">{{ errors.training_strt_date }}</div>


                                                    </div>

                                                    <div class="form-group w-50">
                                                        <label for="exampleInputEmail1">Training Eng Date</label>
                                                        <Field type="date" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Training Eng Date"
                                                            v-model="edittraining.training_end_date"
                                                            :class="{ 'is-invalid': errors.training_end_date }"
                                                            name="training_end_date" />
                                                        <div class="invalid-feedback">{{ errors.training_end_date }}</div>


                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Score</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Score"
                                                        v-model="edittraining.training_score"
                                                        :class="{ 'is-invalid': errors.training_score }"
                                                        name="training_score" />
                                                    <div class="invalid-feedback">{{ errors.training_score }}</div>


                                                </div>



                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Training Feedback</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Training Feedback"
                                                        v-model="edittraining.training_feedback"
                                                        :class="{ 'is-invalid': errors.training_feedback }"
                                                        name="training_feedback" />
                                                    <div class="invalid-feedback">{{ errors.training_feedback }}</div>


                                                </div>

                                            </div>



                                            <div class="col-4">


                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Description</label>
                                                    <Field as="textarea" class="form-control"
                                                        id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                                                        v-model="edittraining.description"
                                                        :class="{ 'is-invalid': errors.description }" name="description">
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>
                                                </div>

                                            </div>
                                        </div>


                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                              >Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="EditTraining()">Edit</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Training Details Modal -->

                    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 121%; top: 164px;">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body card">
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="modal-title text-center" id="exampleModalLabel" style="font-size: 25px;">
                                            Training Details
                                        </h5>
                                        <!-- // training_center_name
                    // training_end_date
                    // training_feedback
                    // training_name
                    // training_score
                    // training_strt_date -->
                                        <!-- {{  training }} -->
                                        <hr>
                                        <h1 class="card-title "> Name: {{ training.employee_name }} </h1>

                                        <h1 class="card-title ">Training Center Name: {{ training.training_center_name }}
                                        </h1>
                                        <h5 class="card-title">Training Name: {{ training.training_name }}</h5>
                                        <h5 class="card-title">Training score: {{ training.training_score }}
                                        </h5>
                                        <h5 class="card-title">Training feedback: {{ training.training_feedback }}</h5>
                                        <h5 class="card-title">Training Start Date: {{ training.training_strt_date }}</h5>
                                        <h5 class="card-title">Training End Date: {{ training.training_end_date }}</h5>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <!-- End Transter Details Modal -->


                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table text-center" id="datatable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Training Center Name</th>
                                    <th>Training Name</th>
                                    <th>Training Score</th>
                                    <th>Training Feedback</th>
                                    <th>Training Start Date</th>
                                    <th>Training End Date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item, index) in promotionList" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.employee_name }}</td>
                                    <td>{{ item.training_center_name }}</td>
                                    <td>{{ item.training_name }}</td>
                                    <td>{{ item.training_score }}</td>
                                    <td>{{ item.training_feedback }}</td>
                                    <td>{{ item.training_strt_date }}</td>
                                    <td>{{ item.training_end_date }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        <p v-if="item.status == 1" class="text-success font-weight-bold"> Verified</p>
                                        <p v-else-if="item.status == 2" class="text-danger font-weight-bold"> Cancel</p>
                                        <p v-else class="text-warning font-weight-bold">Pending</p>
                                    </td>
                                    <td style="width: 185px;">
                                        <div v-if="item.status === 0">
                                            <a @click="viewDetails(item.id,item)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="inactivestatus(item.id)" class="mr-2">
                                                <i class="fa fa-times"
                                                    style="color:#ff0a0a;border: 2px solid #ff0a0a;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="activestatus(item.id)" class="mr-2">
                                                <i class="fa fa-check"
                                                    style="color: #57b75e;border: 2px solid #57b75e;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
                                            <i class="fas fa-edit"
                                                style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                data-toggle="modal" data-target="#exampleModal1"
                                                @click="editbutton(item.id,item)"></i> <!-- Corrected edit icon class -->
                                            <i class="fa-solid fa-trash ml-1"
                                                style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                @click="deleterecord(item.id)"></i>

                                        </div>

                                        <div v-else-if="item.status === 1">
                                            <a @click="viewDetails(item.id,item)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="inactivestatus(item.id)" class="mr-2">
                                                <i class="fa fa-times"
                                                    style="color:#ff0a0a;border: 2px solid #ff0a0a;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
                                            <i class="fas fa-edit"
                                                style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                data-toggle="modal" data-target="#exampleModal1"
                                                @click="editbutton(item.id,item)"></i> <!-- Corrected edit icon class -->
                                            <i class="fa-solid fa-trash ml-1"
                                                style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                @click="deleterecord(item.id)"></i>

                                        </div>

                                        <div v-else-if="item.status === 2">
                                            <a @click="viewDetails(item.id,item)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="activestatus(item.id)" class="mr-2">
                                                <i class="fa fa-check"
                                                    style="color: #57b75e;border: 2px solid #57b75e;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
                                            <i class="fas fa-edit"
                                                style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                data-toggle="modal" data-target="#exampleModal1"
                                                @click="editbutton(item.id,item)"></i> <!-- Corrected edit icon class -->
                                            <i class="fa-solid fa-trash ml-1"
                                                style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                @click="deleterecord(item.id)"></i>

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

        <!-- Modal End -->




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
import Multiselect from 'vue-multiselect';

// DataTable.use(DataTablesCore);
export default {
    components: {
        // DataTable
        Form, Field, Multiselect
    },

    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));

        const schema = Yup.object().shape({
            // employee_id: Yup.string().required("Employee ID is required"),
            training_center_name: Yup.string().required("Training Center Name is required"),
            training_name: Yup.string().required("Training Name is required"),
            // description: Yup.string().required("Description is required"), // Corrected error message
            // training_score: Yup.string().required("Training Score is required"),
            // training_feedback: Yup.string().required("Training Feedback is required"),
            // training_start_date: Yup.date()
            //     .required("Training Start Date is required")
            //     .typeError("Invalid date format"),
            // training_strt_date: Yup.date()
            //     .required("Training End Date is required")
            //     .typeError("Invalid date format"),
            // training_end_date: Yup.date()
            //     .required("Training End Date is required")
            //     .typeError("Invalid date format"),
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
            promotionList: [],
            value: { id: '', emp: '' },
            employeeList: [],
            training: {
                employee_id: '',
                training_center_name: "",
                training_name: "",
                description: "",
                training_score: "",
                training_feedback: "",
                training_strt_date: "",
                training_end_date: "",

            },

            edittraining: {
                employee_id: "",
                training_center_name: "",
                training_name: "",
                description: "",
                training_score: "",
                training_feedback: "",
                training_strt_date: "",
                training_end_date: "",
            }

        }
    },


    methods: {
        EditTraining() {
            try {
                this.axios
                    .post(this.backend_url + `updateTrainingRecord/${this.edittraining.id}`, this.edittraining)
                    .then((res) => {
                        console.log(res);
                        $("#exampleModal1").modal('hide');
                        this.getTrainingList();
                        $('#datatable').DataTable().destroy();
                        this.$toast.success(`Update Successfully!`);
                    })
                    .catch((error) => {
                        console.error("An error occurred while updating the training record:", error);
                        this.$toast.error(`Failed to update training record.`);
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                this.$toast.error(`Failed to update training record.`);
            }
        },
        editbutton(id,item) {
            console.log(id);
            this.value.id = item.id;
            this.value.emp = item.employee_name;


            this.axios
                .get(this.backend_url + 'specificUserTraining/' + id)
                .then((response) => {
                    this.trainingRecordById = response.data.data;
                    console.log(this.trainingRecordById);
                    this.edittraining.id = id;
                    this.edittraining.employee_id = this.trainingRecordById.employee_id;
                    this.edittraining.training_center_name = this.trainingRecordById.training_center_name;
                    this.edittraining.training_name = this.trainingRecordById.training_name;
                    this.edittraining.training_score = this.trainingRecordById.training_score;
                    this.edittraining.training_feedback = this.trainingRecordById.training_feedback;
                    this.edittraining.training_strt_date = this.trainingRecordById.training_strt_date;
                    this.edittraining.training_end_date = this.trainingRecordById.training_end_date;
                    this.edittraining.description = this.trainingRecordById.description;
                    this.edittraining.status = this.trainingRecordById.status;

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        deleterecord(id) {
            this.axios
                .delete(this.backend_url + 'deleteTrainingRecord/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getTrainingList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error('Delete Successfully');

                })
        },
        clear() {
            console.log("hi");
            this.$refs.form.resetForm();

        },
        nameWithLang({ emp }) {
            return `${emp}`
        },

        getEmployeeList() {
            this.axios
                .get(this.backend_url + 'employeeList')
                .then((res) => {
                    console.log(res.data.employeeList);
                    this.employeeList = res.data.employeeList;
                    //   this.options =  res.data.employeeList;

                })

                .catch((e) => {
                    console.log(e)
                })
        },

        getTrainingList() {
            this.axios
                .get(this.backend_url + 'getTrainingList?user_id=' + this.storageData.id)
                .then((res) => {
                    console.log(res.data.list);
                    this.promotionList = res.data.list;
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
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deleteTransferRecord/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getTrainingList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },

        viewDetails(id,item) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserTraining/' + id)
                .then((response) => {
                    console.log(response.data.data);
                    this.transferRecordById = response.data.data;
                    console.log("transformer" + this.transferRecordById);
                    id



                    this.training.id = id;
                    this.training.employee_name = item.employee_name;
                    this.training.training_center_name = this.transferRecordById.training_center_name;
                    this.training.training_end_date = this.transferRecordById.training_end_date;
                    this.training.training_feedback = this.transferRecordById.training_feedback;
                    this.training.training_name = this.transferRecordById.training_name;
                    this.training.training_score = this.transferRecordById.training_score;
                    this.training.training_strt_date = this.transferRecordById.training_strt_date;
                    this.training.status = this.transferRecordById.status;

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
                    // this.tansfer.employee_id = this.user
                    // console.log(this.storageData.id);
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
        getOffice() {
            this.axios
                .get(this.backend_url + `getOfficeMgt`)
                .then((response) => {
                    this.office = response.data.list;
                    // console.log(this.office);
                })
        },
        activestatus(id) {
            this.axios
                .patch(this.backend_url + `activeTrainingRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTrainingList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.success(`Active status Successfully!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        inactivestatus(id) {
            this.axios
                .patch(this.backend_url + `inactiveTrainingRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTrainingList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Status Cancel!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        saveTraining() {
            // alert(this.value.id)/
            this.training.employee_id = this.value.id;
            this.axios
                .post(this.backend_url + 'addTrainingRecord', this.training)
                .then((res) => {
                    console.log(res);

                    $("#exampleModal").modal('hide');
                    this.getTrainingList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.success(`Data Added Successfully!!`);
                    this.$refs.form.resetForm();

                }).catch((error) => {
                    console.error("An error occurred while updating the training record:", error);
                    this.$toast.error(error);
                });


        },
    },

    created() {
        this.getEmployeeList();
        this.getTrainingList();
        this.getDepartmentList();
        this.getDesignationList();
        this.getTransfertype();
        this.getUser();
        this.getOffice();
    },

    watch: {

    },

}


</script>
  
<style>
@import 'datatables.net-dt';

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
