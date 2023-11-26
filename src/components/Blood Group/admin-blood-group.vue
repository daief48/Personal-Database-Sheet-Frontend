<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Transfer</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Blood Group History</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
                        @click="clear()">+ Add
                        Blood Group</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 34vw;top: 46px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add Blood Group</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form">
                                        <div>
                                            <div class="row">

                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label class="typo__label">Select with search</label>
                                                        <multiselect v-model="value" :options="employeeList"
                                                            :custom-label="nameWithLang" :close-on-select="true"
                                                            placeholder="Select one" label="name" track-by="id">
                                                        </multiselect>

                                                    </div>




                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Blood Group:</label>
                                                        <Field type="text" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="bloodgroupList.blood_group" name="blood_group"
                                                            :class="{ 'is-invalid': errors.blood_group }" />
                                                        <div class="invalid-feedback">{{ errors.blood_group }}
                                                        </div>

                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Last Donate:</label>
                                                        <Field type="text" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="bloodgroupList.last_donate" name="last_donate"
                                                            :class="{ 'is-invalid': errors.last_donate }" />
                                                        <div class="invalid-feedback">{{ errors.last_donate }}
                                                        </div>

                                                    </div>
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
                            <div class="modal-content" style="width: 34vw;top: 46px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Blood Group</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors }" >
                                        <div>
                                            <div class="row">

                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label class="typo__label">Select with search</label>
                                                        <multiselect v-model="value" :options="employeeList"
                                                            :custom-label="nameWithLang" :close-on-select="true"
                                                            placeholder="Select one" label="name" track-by="id">
                                                        </multiselect>

                                                    </div>




                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Blood Group:</label>
                                                        <Field type="text" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="editbloodgroupList.blood_group" name="blood_group"
                                                            :class="{ 'is-invalid': errors.blood_group }" />
                                                        <div class="invalid-feedback">{{ errors.blood_group }}
                                                        </div>

                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Last Donate:</label>
                                                        <Field type="text" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="editbloodgroupList.last_donate"
                                                            name="last_donate"
                                                            :class="{ 'is-invalid': errors.last_donate }" />
                                                        <div class="invalid-feedback">{{ errors.last_donate }}
                                                        </div>

                                                    </div>
                                                </div>





                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                              >Cancel</button>
                                            <button type="submit" class="btn btn-primary" @click="EditBlood()">Edit</button>
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
                                            Blood Group Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Employee Name: {{ bloodgroupList.name }}</h1>
                                        <h1 class="card-title ">Blood Group: {{ bloodgroupList.blood_group }}
                                        </h1>
                                        <h5 class="card-title">Last Donate: {{ bloodgroupList.last_donate }}
                                        </h5>


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
                                    <th>Blood Group</th>
                                    <th>Last Donate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- "id": 2,
                                "employee_id": 1,
                                "blood_group": "o+",
                                "last_donate": 24,
                                "status": 0,
                                "created_at": "2023-11-02T09:36:06.000000Z",
                                "updated_at": "2023-11-02T10:13:42.000000Z",
                                "emp_id": null,
                                "name": null,
                                "mobile_number": null -->

                                <tr v-for="(item, index) in AcrList" :key="index">
                                    <td>{{ item.employee_id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.blood_group }}</td>
                                    <td>{{ item.last_donate }}</td>

                                    <td style="width: 185px;">


                                        <a @click="viewDetails(item)" class="mr-2" data-toggle="modal"
                                            data-target="#exampleModal2">
                                            <i class="fa fa-eye"
                                                style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                        </a>
                                        <i class="fas fa-edit"
                                            style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                            data-toggle="modal" data-target="#exampleModal1" @click="editbutton(item)"></i>
                                        <!-- Corrected edit icon class -->
                                        <i class="fa-solid fa-trash ml-1"
                                            style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                            @click="deletebutton(item.id)"></i>






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
import Multiselect from 'vue-multiselect';



// DataTable.use(DataTablesCore);
export default {
    components: {
        // DataTable,
        Form, Field, Multiselect

    },


    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));

        const schema = Yup.object().shape({
            blood_group: Yup.string().required("Blood Group is required"),
            last_donate: Yup.date().required("Last Donation Date is required").typeError("Invalid date format"),
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
            AcrList: [],
            value: { id: '', emp: '' },
            employeeList: [],
            //             employee_id
            //             blood_group
            // last_donate
            bloodgroupList: {
                employee_id: "",
                blood_group: "",
                last_donate: ""

            },
            editbloodgroupList: {
                employee_id: "",
                blood_group: "",
                last_donate: ""
            }

        };
    },

    computed: {},

    methods: {
        clear() {
            console.log("hi");
            this.bloodgroupList.employee_id = "";
            this.bloodgroupList.blood_group = "";
            this.bloodgroupList.last_donate = "";

            this.$refs.form.resetForm();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            this.bloodgroupList.transfer_letter = selectedFile;
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
        edithandleFileChange(event) {
            const selectedFile = event.target.files[0];
            this.editbloodgroupList.transfer_letter = selectedFile;
        },

        editbutton(item) {
            this.editbloodgroupList.id = item.id;
            this.editbloodgroupList.employee_id = item.employee_id;
            this.editbloodgroupList.blood_group = item.blood_group;
            this.editbloodgroupList.last_donate = item.last_donate;

            this.value.id = item.id;
            this.value.emp = item.name;

        },
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deleteBloodGroup/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getBloodGroupList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },
        viewDetails(item) {
            this.bloodgroupList.name = item.name;
            this.bloodgroupList.blood_group = item.blood_group;
            this.bloodgroupList.last_donate = item.last_donate;
        },
        getBloodGroupList() {
            this.axios
                .get(this.backend_url + 'getBloodGroup')
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
                    this.bloodgroupList.employee_id = this.user
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
            this.bloodgroupList.employee_id = this.value.id;


            try {
                // this.bloodgroupList.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addBloodGroup', this.bloodgroupList)
                    .then((res) => {
                        console.log(res);
                        this.getBloodGroupList();
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

        EditBlood() {
            // this.editbloodgroupList.employee_id = this.value.id;


            try {
                this.axios
                    .put(this.backend_url + `updateBloodGroup/${this.editbloodgroupList.id}`, this.editbloodgroupList)
                    .then((res) => {
                        console.log(res);
                        this.getBloodGroupList();
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
        this.getEmployeeList();
        this.getBloodGroupList();
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