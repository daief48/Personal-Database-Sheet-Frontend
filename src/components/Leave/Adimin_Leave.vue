<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Transfer</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Leave History</h3>
                    <div>

                        <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
                            >+ Add
                            Leave</a>
                    </div>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add Leave</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="saveLeave" :validation-schema="schema"
                                    v-slot="{ errors, resetForm }" ref="form"> <!-- <p></p> -->
                                        <!-- {{ leave }} -->
                                        <!-- {{ storageData }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label class="typo__label">Select with search</label>
                                                    <multiselect v-model="value" :options="employeeList"
                                                        :custom-label="nameWithLang" :close-on-select="true"
                                                        placeholder="Select one" label="name" track-by="id"></multiselect>

                                                </div>
                                                <div class="form-group">

                                                    <input type="text" v-model="leave.employee_id" style="display:none;">
                                                    <label for="exampleFormControlSelect1">Leave Type </label>

                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="leave.leave_type" name="leave_type"
                                                        :class="{ 'is-invalid': errors.leave_type }">

                                                        <option v-for="leave in LeaveType" :key="leave.id"
                                                            v-bind:value="leave.id">
                                                            {{ leave.leave_type }}</option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.leave_type }}</div>

                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">To Date</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="leave.to_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.to_date }" name="to_date" />
                                                    <div class="invalid-feedback">{{ errors.to_date }}</div>

                                                </div>
                                            </div>

                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">From Date</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="leave.from_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.from_date }" name="from_date" />
                                                    <div class="invalid-feedback">{{ errors.from_date }}</div>

                                                </div>



                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Total Leave Days</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" v-model="leave.day"
                                                        :class="{ 'is-invalid': errors.day }" name="day" readonly />
                                                    <div class="invalid-feedback">{{ errors.day }}</div>

                                                </div>
                                            </div>



                                            <div class="col-4">

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Description</label>
                                                    <Field as="textarea" class="form-control "
                                                        id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                                                        v-model="leave.description"
                                                        :class="{ 'is-invalid': errors.description }" name="description">
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>

                                                </div>

                                            </div>
                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal" @click="resetForm()">Cancel</button>
                                            <button type="submit" class="btn btn-primary" @click="saveLeave()"
                                               >Add</button>

                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--End Add and Edit Modal -->


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
                                        <!-- this.leave.leave_type = "";
            this.leave.from_date = "";
            this.leave.to_date = "";
            this.leave.day = "";
            this.leave.description = ""; -->
                                        <h5 class="modal-title text-center" id="exampleModalLabel" style="font-size: 25px;">
                                            Leave Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Leave Type: {{ leave.leave_type }}</h1>
                                        <h5 class="card-title">From Date: {{ leave.from_date }}</h5>
                                        <h5 class="card-title">To Date: {{ leave.to_date }}</h5>
                                        <h5 class="card-title">Total Days: {{ leave.day }}</h5>
                                        <h5 class="card-title">Description: {{ leave.description }}</h5>
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
                                <!-- "employee_id": 1,
      "employee_name": "Shakiur",
      "id": 2,
      "leave_type": 11,
      "from_date": "2023-04-29",
      "to_date": "2023-04-29",
      "day": "2",
      "description": "good",
      "status": 1,
      "created_at": "2023-10-21T09:15:01.000000Z",
      "updated_at": "2023-10-21T09:15:01.000000Z" -->
                                <tr>
                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>day</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in transferList.list" :key="index">
                                    <td>{{ item.employee_id }}</td>
                                    <td>{{ item.employee_name }}</td>
                                    <td>{{ item.leave_type }}</td>
                                    <td>{{ item.from_date }}</td>
                                    <td>{{ item.to_date }}</td>
                                    <td>{{ item.day }}</td>
                                    <td>{{ item.description }}</td>

                                    <td>
                                        <p v-if="item.status == 1" class="text-success font-weight-bold"> Verified</p>
                                        <p v-else-if="item.status == 2" class="text-danger font-weight-bold"> Cancel</p>
                                        <p v-else class="text-warning font-weight-bold">Pending</p>
                                    </td>
                                    <td style="width: 185px;">
                                        <div v-if="item.status === 0">
                                            <a @click="viewDetails(item.id)" class="mr-2" data-toggle="modal"
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
                                        </div>

                                        <div v-else-if="item.status === 1">
                                            <a @click="viewDetails(item.id)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="inactivestatus(item.id)" class="mr-2">
                                                <i class="fa fa-times"
                                                    style="color:#ff0a0a;border: 2px solid #ff0a0a;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
                                        </div>

                                        <div v-else-if="item.status === 2">
                                            <a @click="viewDetails(item.id)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>

                                            <a @click="activestatus(item.id)" class="mr-2">
                                                <i class="fa fa-check"
                                                    style="color: #57b75e;border: 2px solid #57b75e;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
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
            employee_id: Yup.string().required("Employee ID is required"),
            leave_type: Yup.string().required("Leave Type is required"),
            from_date: Yup.date().required("From Date is required").typeError("Invalid date format"),
            to_date: Yup.date().required("To Date is required").typeError("Invalid date format"),
            day: Yup.number().required("Number of Days is required").typeError("Invalid number format"),
            description: Yup.string().required("Description is required"),
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
            transferList: [],
            LeaveRecordById: [],
            value: { id: '', emp: '' },
            employeeList: [],
            leave: {
                employee_id: "",
                leave_type: "",
                from_date: "",
                to_date: "",
                day: "",
                description: "",
            }

        };
    },

    computed: {},

    methods: {
   
        getTransferList() {
            this.axios
                .get(this.backend_url + 'getLeaveMgt?user_id=' + this.storageData.id)
                .then((res) => {
                    console.log(res.data.list);
                    this.transferList = res.data;
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
        getDays() {
            const fromDate = new Date(this.leave.from_date);
            const toDate = new Date(this.leave.to_date);

            console.log(fromDate, toDate);
            // Check if either of the dates is invalid
            if (this.leave.from_date === "" || this.leave.to_date === "") {
                this.leave.day = 0;
            } else {
                const timeDifference = toDate - fromDate;
                const daysDifference = timeDifference / (1000 * 3600 * 24);

                // Ensure the result is a positive whole number
                this.leave.day = Math.abs(Math.round(daysDifference));
            }
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
        viewDetails(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserLeave/' + id)
                .then((response) => {
                    console.log(response);
                    this.LeaveRecordById = response.data.data;
                    console.log(this.LeaveRecordById.Leave_type);
                    this.leave.id = id;
                    this.leave.employee_name = this.LeaveRecordById.employee_name;
                    this.leave.employee_id = this.LeaveRecordById.employee_id;
                    this.leave.leave_type = this.LeaveRecordById.leave_type;
                    this.leave.from_date = this.LeaveRecordById.from_date;
                    this.leave.to_date = this.LeaveRecordById.to_date;
                    this.leave.day = this.LeaveRecordById.day;
                    this.leave.description = this.LeaveRecordById.description;

                })
                .catch((e) => {
                    console.log(e)
                })
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
                .patch(this.backend_url + `activeLeaveMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTransferList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.success(`Active status Successfully!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        inactivestatus(id) {
            this.axios
                .patch(this.backend_url + `inactiveLeaveMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTransferList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Status Cancel!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getLeavetype() {
            this.axios
                .get(this.backend_url + 'getLeaveType')
                .then((res) => {
                    this.LeaveType = res.data.list;
                    console.log(this.LeaveType);
                })
        },
        saveLeave() {
            this.leave.employee_id = this.value.id;

            try {
                // this.leave.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addLeaveMgt', this.leave)
                    .then((res) => {
                        console.log(res);
                        this.getTransferList();
                        $("#exampleModal").modal('hide');
                        $('#datatable').DataTable().destroy();
                        this.$toast.success(`Add Data Successfully!`);
                        this.$refs.form.resetForm();

                    })
                    .catch((error) => {
                        console.error("An error occurred while saving the Leave record:", error);
                        this.$toast.error(`Failed to save Leave record.`);
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                this.$toast.error(`Failed to save Leave record.`);
            }
        },
    },

    created() {
        this.getTransferList();
        this.getLeavetype();
        this.getUser();
        this.getEmployeeList();

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
