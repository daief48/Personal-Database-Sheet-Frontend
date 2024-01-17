<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Leave</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Leave History</h3>
                    <div>
                        <a href="/" class="btn btn-primary mb-2 mr-2" data-toggle="modal" data-target="#exampleModal11"
                            @click="viewLeaveStatus(user)">View Leave Status</a>
                        <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal">+
                            Add
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
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form"> <!-- <p></p> -->
                                        <!-- {{ leave }} -->
                                        <!-- {{ storageData }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">

                                                    <input type="text" v-model="leave.employee_id" style="display:none;">
                                                    <label for="exampleFormControlSelect1"> Leave Type <span style="color:red">*</span> </label>

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
                                                    <label for="exampleInputEmail1">To Date <span style="color:red">*</span> </label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="leave.to_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.to_date }" name="to_date" />
                                                    <div class="invalid-feedback">{{ errors.to_date }}</div>

                                                </div>
                                            </div>

                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">From Date <span style="color:red">*</span> </label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="leave.from_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.from_date }" name="from_date" />
                                                    <div class="invalid-feedback">{{ errors.from_date }}</div>

                                                </div>



                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Total Leave Days <span style="color:red">*</span> </label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" v-model="leave.day"
                                                        :class="{ 'is-invalid': errors.day }" name="day" readonly />
                                                    <div class="invalid-feedback">{{ errors.day }}</div>

                                                </div>
                                            </div>



                                            <div class="col-4">

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Description <span style="color:red">*</span> </label>
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
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Leave</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="EditTranfer" :validation-schema="schema" v-slot="{ errors }">
                                        <!-- <p></p> -->
                                        <!-- {{ leave }} -->
                                        <!-- {{ storageData }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">

                                                    <input type="text" v-model="editleave.employee_id"
                                                        style="display:none;">
                                                    <label for="exampleFormControlSelect1"> Leave Type <span style="color:red">*</span> </label>

                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="editleave.leave_type" name="leave_type"
                                                        :class="{ 'is-invalid': errors.leave_type }">

                                                        <option v-for="leave in LeaveType" :key="leave.id"
                                                            v-bind:value="leave.id">
                                                            {{ leave.leave_type }}</option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.leave_type }}</div>

                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">To Date <span style="color:red">*</span> </label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="editleave.to_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.to_date }" name="to_date" />
                                                    <div class="invalid-feedback">{{ errors.to_date }}</div>

                                                </div>
                                            </div>

                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">From Date <span style="color:red">*</span> </label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="editleave.from_date" @change="getDays"
                                                        :class="{ 'is-invalid': errors.from_date }" name="from_date" />
                                                    <div class="invalid-feedback">{{ errors.from_date }}</div>

                                                </div>



                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Total Leave Days <span style="color:red">*</span> </label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" v-model="editleave.day"
                                                        :class="{ 'is-invalid': errors.day }" name="day" readonly />
                                                    <div class="invalid-feedback">{{ errors.day }}</div>

                                                </div>
                                            </div>



                                            <div class="col-4">

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Description <span style="color:red">*</span> </label>
                                                    <Field as="textarea" class="form-control "
                                                        id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                                                        v-model="editleave.description"
                                                        :class="{ 'is-invalid': errors.description }" name="description">
                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>

                                                </div>

                                            </div>
                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="EditTranfer()">Edit</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal11" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 47vw;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add Leave</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div data-v-5505d3bf="" class="col-5" style=" border-right: solid 0.5px #c5c4c4;">
                                            <img class="bg-light mb-4" width="300" :src="imgDataUrl" alt="" />
                                            <p><b>Name</b> : {{ userDetail.name }}</p>
                                            <p><b>Mobile</b> : {{ userDetail.mobile_number }}</p>
                                            <p> <b>Email</b> : {{ userDetail.email }}</p>
                                            <p><b>Desigantaion</b> : {{ userDetail.designation }}</p>

                                        </div>
                                        <div class="col-7">
                                            <div class="table-responsive">
                                                <table class="table text-center table-borderless">


                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Leave Type</th>
                                                            <th scope="col">Total Leave</th>
                                                            <th scope="col">Used Leave</th>
                                                            <th scope="col">Available Leave</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, key) in leavestatus" :key="key">
                                                            <td>{{ key }}</td>
                                                            <td>{{ item.total_days }}</td>
                                                            <td>{{ item.used }}</td>
                                                            <td>{{ item.available }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <th>{{ totalLeave.total }}</th>
                                                            <th>{{ totalLeave.used }}</th>
                                                            <th>{{ totalLeave.available }}</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>


                                        </div>
                                    </div>
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
                                        <h1 class="card-title ">Name: {{ leave.employee_name }}</h1>
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

                <hr>

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
                                <tr v-for="(item, index) in LeaveList1.data" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.employee_name }}</td>
                                    <td>{{ item.leave_type }}</td>
                                    <td>{{ item.from_date }}</td>
                                    <td>{{ item.to_date }}</td>
                                    <td>{{ item.day }}</td>
                                    <td>{{ item.description }}</td>

                                    <td>
                                        <p v-if="item.status == 1" class="text-warning font-weight-bold"> Verified</p>
                                        <p v-else class="text-success font-weight-bold">Pending</p>
                                    </td>
                                    <td style="width: 185px;">
                                        <button v-if="item.status === 1" @click="viewDetails(item.id, item)"
                                            class="btn btn-outline-primary mr-2"
                                            style="border: 3px solid;font-weight: bolder; width: 124px;" data-toggle="modal"
                                            data-target="#exampleModal2">
                                            View Details
                                        </button>
                                        <div v-else>
                                            <button @click="editbutton(item.id)" class="btn btn-primary mr-2"
                                                data-toggle="modal" data-target="#exampleModal1">
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

        // leave: {
        //         employee_id: "",
        //         leave_type: "",
        //         from_date: "",
        //         to_date: "",
        //         day: "",
        //         description: "",
        //     }
        const schema = Yup.object().shape({
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
            userDetail: "",
            departments: "",
            designations: "",
            LeaveType: "",
            totalLeave: { total: 0, used: 0, available: 0 },
            office: "",
            imgDataUrl: "",
            url: this.backendUrl + "/api/users",
            leavestatus: [],
            basicInfo: {
                name: '',
                mobileNumber: '',
                email: '',
                designation: '',
                designation_id: '',
                image: '',
            },
            LeaveRecordById: [],
            LeaveList1: [],


            leave: {
                employee_id: "",
                leave_type: "",
                from_date: "",
                to_date: "",
                day: "",
                description: "",
            },

            editleave: {
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
        }
        ,
        getProfileImage() {
            this.axios
                .get(this.backend_url + 'user/getprofile/' + this.storageData.id)
                .then((res) => {
                    var profileData = res.data.data;
                    // console.log(profileData);


                    this.imgDataUrl = this.base_url_for_resource + 'images/' + profileData.image;
                    console.log(this.imgDataUrl);
                    this.userDetail = profileData;
                    console.log(this.userDetail);
                })
        },

        editbutton(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserLeave/' + id)
                .then((response) => {

                    this.LeaveRecordById = response.data.data;
                    console.log(this.LeaveRecordById);
                    this.editleave.id = id;
                    this.editleave.employee_name = this.LeaveRecordById.employee_name;
                    this.editleave.employee_id = this.LeaveRecordById.employee_id;
                    this.editleave.leave_type = this.LeaveRecordById.leave_type;
                    this.editleave.from_date = this.LeaveRecordById.from_date;
                    this.editleave.to_date = this.LeaveRecordById.to_date;
                    this.editleave.day = this.LeaveRecordById.day;
                    this.editleave.status = this.LeaveRecordById.status;
                    this.editleave.description = this.LeaveRecordById.description;


                })
                .catch((e) => {
                    console.log(e)
                })
        },
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deleteLeaveMgt/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getLeaveList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },
        viewDetails(id, item) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserLeave/' + id)
                .then((response) => {
                    console.log(response);
                    this.LeaveRecordById = response.data.data;
                    console.log(this.LeaveRecordById.Leave_type);
                    this.leave.id = id;
                    this.leave.employee_name = item.employee_name;
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
        viewLeaveStatus(id) {
            console.log(id);
            this.axios
                .get(`${this.backend_url}getLeaveByEmployeeId/${id}`)
                .then((response) => {
                    console.log(response.data.list);

                    this.leavestatus = response.data.list;
                    for (let key in this.leavestatus) {
                        console.log(this.leavestatus[key].total_days);

                        this.totalLeave.total += this.leavestatus[key].total_days;
                        this.totalLeave.used += this.leavestatus[key].used;
                        this.totalLeave.available += this.leavestatus[key].available;

                    }
                    console.log(this.totalLeave)
                    console.log(this.leavestatus);

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getLeaveList() {
            this.axios
                .get(this.backend_url + `users/${this.storageData.id}`)
                .then((res) => {
                    this.user = res.data.userDetail.employee_id;
                    console.log(this.user);
                    this.leave.employee_id = this.user
                    console.log(this.storageData.id);

                    this.axios
                        .get(this.backend_url + 'specificUserLeaveRecordByEmployeeId/' + this.user)
                        .then((response) => {
                            this.LeaveList1 = response.data;
                            // Initialize DataTable here
                            setTimeout(function () {
                                $("#datatable").DataTable({
                                    "processing": true,
                                });
                            }, 100);
                        })
                        .catch((e) => {
                            console.log(e);
                        });

                })

        },
        getLeavetype() {
            this.axios
                .get(this.backend_url + 'getLeaveType')
                .then((res) => {
                    this.LeaveType = res.data.list;
                    console.log(this.LeaveType);
                })
        },
        getUser() {
            this.axios
                .get(this.backend_url + `users/${this.storageData.id}`)
                .then((res) => {
                    this.user = res.data.userDetail.employee_id;
                    console.log(this.user);
                    this.leave.employee_id = this.user
                    // console.log(this.storageData.id);
                })
        },
        saveTranfer() {
            try {
                // this.leave.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addLeaveMgt', this.leave)
                    .then((res) => {
                        console.log(res);
                        this.getLeaveList();
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

        EditTranfer() {
            try {
                this.axios
                    .post(this.backend_url + `updateLeaveMgt/${this.editleave.id}`, this.editleave)
                    .then((res) => {
                        console.log(res);
                        this.getLeaveList();
                        $("#exampleModal1").modal('hide');
                        $('#datatable').DataTable().destroy();
                        this.$toast.success(`Update Data Successfully!`);
                    })
                    .catch((error) => {
                        console.error("An error occurred while updating the Leave record:", error);
                        this.$toast.error(`Failed to update Leave record.`);
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                this.$toast.error(`Failed to update Leave record.`);
            }
        }


    },

    created() {
        this.getLeaveList();
        this.getLeavetype();
        this.getUser();
        this.getProfileImage();
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