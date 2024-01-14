<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Acr</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>All Acr History</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
                        @click="clear()">+ Add
                        Acr</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -502px;top: 46px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add Transfer</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!-- {{ Acr }} -->
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form">
                                        <div class="row">
                                            <!-- Left Column -->
                                            <div class="col-6">
                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Search:</label>
                                                    <multiselect v-model="value" :options="employeeList"
                                                        :custom-label="nameWithLang" :close-on-select="true"
                                                        placeholder="Select one" label="name" track-by="id"
                                                        @select="change1">
                                                    </multiselect>
                                                </div>

                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Designation:</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="Acr.designation" name="designation"
                                                        :class="{ 'is-invalid': errors.designation }">

                                                        <option v-for="designation in designations" :key="designation.id"
                                                            :value="designation.id">
                                                            {{ designation.designation_name }}
                                                        </option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.designation }}</div>
                                                </div>

                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Department:</label>
                                                    <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                                        v-model="Acr.department" name="department"
                                                        :class="{ 'is-invalid': errors.department }">
                                                        <option v-for="department in departments" :key="department.id"
                                                            :value="department.id">
                                                            {{ department.dept_name }}
                                                        </option>
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.department }}</div>
                                                </div>


                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Office Name:</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="Acr.office_name" name="office_name"
                                                        :class="{ 'is-invalid': errors.office_name }">

                                                        <option v-for="office in office" :key="office.id"
                                                            :value="office.id">
                                                            {{ office.office_name }}
                                                        </option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.to_office }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Total Score:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.score" name="score"
                                                        :class="{ 'is-invalid': errors.score }" />
                                                    <div class="invalid-feedback">{{ errors.score }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Remarks:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.remarks" name="remarks"
                                                        :class="{ 'is-invalid': errors.remarks }" />
                                                    <div class="invalid-feedback">{{ errors.remarks }}</div>
                                                </div>
                                            </div>

                                            <!-- Right Column -->
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">ACR Year:</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="Acr.acr_year" name="acr_year"
                                                        :class="{ 'is-invalid': errors.acr_year }" />
                                                    <div class="invalid-feedback">{{ errors.acr_year }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Attached File:</label>
                                                    <Field type="file" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.file" name="file"
                                                        :class="{ 'is-invalid': errors.file }" />
                                                    <div class="invalid-feedback">{{ errors.file }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Rack Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.rack_number" name="rack_number"
                                                        :class="{ 'is-invalid': errors.rack_number }" />
                                                    <div class="invalid-feedback">{{ errors.rack_number }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Bin Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.bin_number" name="bin_number"
                                                        :class="{ 'is-invalid': errors.bin_number }" />
                                                    <div class="invalid-feedback">{{ errors.bin_number }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">File Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="Acr.file_number" name="file_number"
                                                        :class="{ 'is-invalid': errors.file_number }" />
                                                    <div class="invalid-feedback">{{ errors.file_number }}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                @click="resetForm()">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="saveTranfer()">Add</button>
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
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Transfer</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!-- {{ editAcr }} -->
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema" v-slot="{ errors }">
                                        <div class="row">
                                            <!-- Left Column -->
                                            <div class="col-6">
                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Search:</label>
                                                    <multiselect v-model="value" :options="employeeList"
                                                        :custom-label="nameWithLang" :close-on-select="true"
                                                        placeholder="Select one" label="name" track-by="id"
                                                        @select="change1">
                                                    </multiselect>
                                                </div>

                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Designation:</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="editAcr.designation" name="designation"
                                                        :class="{ 'is-invalid': errors.designation }">
                                                        <option v-for="designation in designations" :key="designation.id"
                                                            :value="designation.id">
                                                            {{ designation.designation_name }}
                                                        </option>
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.designation }}</div>
                                                </div>

                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Department:</label>
                                                    <Field class="form-control" as="select" id="exampleFormControlSelect1"
                                                        v-model="editAcr.department" name="department"
                                                        :class="{ 'is-invalid': errors.department }">
                                                        <option v-for="department in departments" :key="department.id"
                                                            :value="department.id">
                                                            {{ department.dept_name }}
                                                        </option>
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.department }}</div>
                                                </div>


                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1">Office Name:</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="editAcr.office_name" name="office_name"
                                                        :class="{ 'is-invalid': errors.office_name }">

                                                        <option v-for="office in office" :key="office.id"
                                                            :value="office.id">
                                                            {{ office.office_name }}
                                                        </option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.to_office }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Total Score:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.score" name="score"
                                                        :class="{ 'is-invalid': errors.score }" />
                                                    <div class="invalid-feedback">{{ errors.score }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Remarks:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.remarks" name="remarks"
                                                        :class="{ 'is-invalid': errors.remarks }" />
                                                    <div class="invalid-feedback">{{ errors.remarks }}</div>
                                                </div>
                                            </div>

                                            <!-- Right Column -->
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">ACR Year:</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="editAcr.acr_year" name="acr_year"
                                                        :class="{ 'is-invalid': errors.acr_year }" />
                                                    <div class="invalid-feedback">{{ errors.acr_year }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Attached File:</label>
                                                    <Field type="file" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.file" name="file"
                                                        :class="{ 'is-invalid': errors.file }" />
                                                    <div class="invalid-feedback">{{ errors.file }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Rack Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.rack_number" name="rack_number"
                                                        :class="{ 'is-invalid': errors.rack_number }" />
                                                    <div class="invalid-feedback">{{ errors.rack_number }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Bin Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.bin_number" name="bin_number"
                                                        :class="{ 'is-invalid': errors.bin_number }" />
                                                    <div class="invalid-feedback">{{ errors.bin_number }}</div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">File Number:</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                        v-model="editAcr.file_number" name="file_number"
                                                        :class="{ 'is-invalid': errors.file_number }" />
                                                    <div class="invalid-feedback">{{ errors.file_number }}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="EditTranfer()">Add</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Transter Details Modal -->

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
                                            Transfer Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Employee Name: {{ Acr.name }}</h1>
                                        <h5 class="card-title">Designation: {{ Acr.designation }}</h5>
                                        <h5 class="card-title">Department: {{ Acr.department }}
                                        </h5>
                                        <h5 class="card-title">Office Name: {{ Acr.office_name }}</h5>
                                        <h5 class="card-title">Rack Number: {{ Acr.rack_number }}</h5>
                                        <h5 class="card-title">Bin Number: {{ Acr.bin_number }}</h5>
                                        <h5 class="card-title">File: {{ Acr.file }}</h5>
                                        <h5 class="card-title">File Number: {{ Acr.file_number }}</h5>
                                        <h5 class="card-title">Acr Year: {{ Acr.acr_year }}</h5>
                                        <h5 class="card-title">Acr Score: {{ Acr.score }}</h5>
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
                        <div class="table-responsive">
                            <table class="table text-center" id="datatable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Employee</th>
                                        <th>Designation</th>
                                        <th>Department</th>
                                        <th>Office Name</th>
                                        <th>Rack Number</th>
                                        <th>Bin Number</th>
                                        <th>File</th>
                                        <th>File Number</th>
                                        <th>Acr Year</th>
                                        <th>Total Score</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(item, index) in AcrList" :key="index">
                                        <td>{{ item.employee_id }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.designation }}</td>
                                        <td>{{ item.department }}</td>
                                        <td>{{ item.office_name }}</td>
                                        <td>{{ item.rack_number }}</td>
                                        <td>{{ item.bin_number }}</td>
                                        <td>
                                            <a :href="'http://localhost/pds-backend/public/Acr_file/' + item.file"
                                                download="Acr.pdf" class="btn btn-success" target="blank">Download</a>
                                        </td>

                                        <!-- <td>{{ item.file }}</td> -->
                                        <td>{{ item.file_number }}</td>
                                        <td>{{ item.acr_year }}</td>
                                        <td>{{ item.score }}</td>
                                        <td>
                                            <p v-if="item.status == 1" class="text-warning font-weight-bold"> Verified</p>
                                            <p v-else class="text-success font-weight-bold">Pending</p>
                                        </td>

                                        <td style="width: 185px;">
                                            <div v-if="item.status === 0">
                                                <a @click="viewDetails(item)" class="mr-2" data-toggle="modal"
                                                    data-target="#exampleModal2">
                                                    <i class="fa fa-eye"
                                                        style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                                </a>
                                                <i class="fas fa-edit"
                                                    style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    data-toggle="modal" data-target="#exampleModal1"
                                                    @click="editbutton(item.id, item)"></i>
                                                <!-- Corrected edit icon class -->
                                                <i class="fa-solid fa-trash ml-1"
                                                    style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    @click="deletebutton(item.id)"></i>
                                            </div>

                                            <div v-else-if="item.status === 1">
                                                <a @click="viewDetails(item.id, item)" class="mr-2" data-toggle="modal"
                                                    data-target="#exampleModal2">
                                                    <i class="fa fa-eye"
                                                        style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                                </a>

                                                <i class="fas fa-edit"
                                                    style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    data-toggle="modal" data-target="#exampleModal1"
                                                    @click="editbutton(item.id, item)"></i>
                                                <!-- Corrected edit icon class -->
                                                <i class="fa-solid fa-trash ml-1"
                                                    style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    @click="deletebutton(item.id)"></i>
                                            </div>

                                            <div v-else-if="item.status === 2">
                                                <a @click="viewDetails(item.id, item)" class="mr-2" data-toggle="modal"
                                                    data-target="#exampleModal2">
                                                    <i class="fa fa-eye"
                                                        style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                                </a>

                                                <i class="fas fa-edit"
                                                    style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    data-toggle="modal" data-target="#exampleModal1"
                                                    @click="editbutton(item.id, item)"></i>
                                                <!-- Corrected edit icon class -->
                                                <i class="fa-solid fa-trash ml-1"
                                                    style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                    @click="deletebutton(item.id)"></i>
                                            </div>

                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Start -->

        <vuejs-datepicker 
        :value="defaultDate"
        :format="DatePickerFormat"
        :language="language"
        minimum-view="year"              
        name="datepicker"
        id="input-id"
        input-class="input-class"
    ></vuejs-datepicker>


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
import { ref } from 'vue';
import vuejsDatepicker from 'vuejs-datepicker';



// DataTable.use(DataTablesCore);
export default {
    components: {
        // DataTable,
        Form, Field, Multiselect,
        'vuejs-datepicker': vuejsDatepicker

    },
    setup() {
    const defaultDate = ref('2018-12-04');
    const DatePickerFormat = ref('yyyy');
    
    const language = ref({
      language: 'English', 
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 
      monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
      rtl: false, 
      ymd: false, 
      yearSuffix: ''
    });

    return {
      defaultDate,
      DatePickerFormat,
      language,
    };
  },


    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));

        const schema = Yup.object().shape({
            designation: Yup.string().required("Designation is required"),
            department: Yup.string().required("Department is required"),
            office_name: Yup.string().required("Office Name is required"),
            score: Yup.string().required("Score is required"),
            remarks: Yup.string().required("Remarks is required"),
            file: Yup.mixed().required("File is required"), // Assuming it's a file upload
            rack_number: Yup.string().required("Rack Number is required"),
            bin_number: Yup.string().required("Bin Number is required"),
            file_number: Yup.string().required("File Number is required"),
            acr_year: Yup.string().required("ACR Year is required"),
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
            value: { id: '', emp: '' },
            employeeList: [],
            transferRecordById: [],
            AcrList: [],
            Acr: {
                employee_id: "",
                emp_name: "",
                remarks: "",
                designation: "",
                department: "",
                office_name: "",
                rack_number: "",
                bin_number: "",
                file: "",
                file_number: "",
                acr_year: "",
                score: "",
            },
            editAcr: {
                employee_id: "",
                emp_name: "",
                remarks: "",
                designation: "",
                department: "",
                office_name: "",
                rack_number: "",
                bin_number: "",
                file: "",
                file_number: "",
                acr_year: "",
                score: "",
            }

        };
    },

    computed: {},

    methods: {
        clear() {
            console.log("hi");
            this.$refs.form.resetForm();

        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            this.Acr.transfer_letter = selectedFile;
        },
        edithandleFileChange(event) {
            const selectedFile = event.target.files[0];
            this.editAcr.transfer_letter = selectedFile;
        },

        editbutton(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificAcrInfo/' + id)
                .then((response) => {
                    this.value.id = response.data.data.employee_id;
                    this.value.emp = response.data.data.name;
                    this.editAcr.id = response.data.data.id;

                    this.editAcr.employee_id = response.data.data.employee_id,
                        this.editAcr.emp_name = response.data.data.emp_name,
                        this.editAcr.remarks = response.data.data.remarks,
                        this.editAcr.designation = response.data.data.designation,
                        this.editAcr.department = response.data.data.department,
                        this.editAcr.office_name = response.data.data.office_name,
                        this.editAcr.rack_number = response.data.data.rack_number,
                        this.editAcr.bin_number = response.data.data.bin_number,
                        this.editAcr.file = response.data.data.file,
                        this.editAcr.file_number = response.data.data.file_number,
                        this.editAcr.acr_year = response.data.data.acr_year,
                        this.editAcr.score = response.data.data.score

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deleteAcrInfo/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getAcrList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },
        viewDetails(item) {

            console.log(item);
            this.Acr.name = item.name,
                this.Acr.remarks = item.remarks,
                this.Acr.designation = item.designation,
                this.Acr.department = item.department,
                this.Acr.office_name = item.office_name,
                this.Acr.rack_number = item.rack_number,
                this.Acr.bin_number = item.bin_number,
                this.Acr.file = item.file,
                this.Acr.file_number = item.file_number,
                this.Acr.acr_year = item.acr_year,
                this.Acr.score = item.score
            console.log(this.Acr);
        },
        getAcrList() {
            this.axios
                .get(this.backend_url + 'getAcr')
                .then((res) => {
                    console.log(res.data.list);
                    this.AcrList = res.data.list;
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
                    this.Acr.employee_id = this.user
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



            formData.append('employee_id', this.value.id);
            formData.append('remarks', this.Acr.remarks);
            formData.append('designation', this.Acr.designation);
            formData.append('department', this.Acr.department);
            formData.append('office_name', this.Acr.office_name);
            formData.append('rack_number', this.Acr.rack_number);
            formData.append('bin_number', this.Acr.bin_number);
            formData.append('file', this.Acr.file);
            formData.append('file_number', this.Acr.file_number);
            formData.append('acr_year', this.Acr.acr_year);
            formData.append('score', this.Acr.score);
            try {
                // this.Acr.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addacr', formData)
                    .then((res) => {
                        console.log(res);
                        this.getAcrList();
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

            formData.append('employee_id', this.editAcr.employee_id);
            formData.append('remarks', this.editAcr.remarks);
            formData.append('designation', this.editAcr.designation);
            formData.append('department', this.editAcr.department);
            formData.append('office_name', this.editAcr.office_name);
            formData.append('rack_number', this.editAcr.rack_number);
            formData.append('bin_number', this.editAcr.bin_number);
            formData.append('file', this.editAcr.file);
            formData.append('file_number', this.editAcr.file_number);
            formData.append('acr_year', this.editAcr.acr_year);
            formData.append('score', this.editAcr.score);


            try {
                this.axios
                    .post(this.backend_url + `updateAcrMgt/${this.editAcr.id}`, formData)
                    .then((res) => {
                        console.log(res);
                        this.getAcrList();
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

    },

    created() {
        this.getAcrList();
        this.getDepartmentList();
        this.getDesignationList();
        this.getTransfertype();
        this.getUser();
        this.getOffice();
        this.getEmployeeList();
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