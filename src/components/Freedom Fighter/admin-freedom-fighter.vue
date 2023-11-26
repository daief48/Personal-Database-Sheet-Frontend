<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Freedom Fighter</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Freedom Fighter History</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal" @click="clear()">+ Add
                        Freedom Fighter</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -502px;top: 46px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add Freedom Fig</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form">
                                        <div>
                                            <div class="row">
                                                <!-- {{ freedomList }} -->
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label class="typo__label">Select with search</label>
                                                        <multiselect v-model="value" :options="employeeList"
                                                            :custom-label="nameWithLang" :close-on-select="true"
                                                            placeholder="Select one" label="name" track-by="id">
                                                        </multiselect>

                                                    </div>

                                                   
                                                

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Fighting Division:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="freedomList.fighting_divi"
                                                            name="fighting_divi"
                                                            :class="{ 'is-invalid': errors.fighting_divi }" />
                                                        <div class="invalid-feedback">{{ errors.fighting_divi }}
                                                        </div>

                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Freedom Fighter Number:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="freedomList.freedom_fighter_num"
                                                            name="freedom_fighter_num"
                                                            :class="{ 'is-invalid': errors.freedom_fighter_num }" />
                                                        <div class="invalid-feedback">{{ errors.freedom_fighter_num }}
                                                        </div>

                                                    </div>
                                                </div>




                                                <div class="col-6">
                                                    

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Sector:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="freedomList.Sector"
                                                            name="Sector"
                                                            :class="{ 'is-invalid': errors.Sector }" />
                                                        <div class="invalid-feedback">{{ errors.Sector }}
                                                        </div>

                                                    </div>
                                                    <div class="form-group mr-2">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1" v-model="freedomList.status"
                                                                name="status" :class="{ 'is-invalid': errors.status }">
                                                                <option value="1">Approved</option>
                                                                <option value="2">Cancel</option>

                                                            </Field>
                                                            <div class="invalid-feedback">{{ errors.dept_name }}</div>
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
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Freedom Fighter</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="saveTranfer" :validation-schema="schema"
                                        v-slot="{ errors }" >
                                        <div>
                                            <div class="row">
                                                <!-- {{ freedomList }} -->
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label class="typo__label">Select with search</label>
                                                        <multiselect v-model="value" :options="employeeList"
                                                            :custom-label="nameWithLang" :close-on-select="true"
                                                            placeholder="Select one" label="name" track-by="id">
                                                        </multiselect>

                                                    </div>

                                                   
                                                

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Fighting Division:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="editfreedomList.fighting_divi"
                                                            name="fighting_divi"
                                                            :class="{ 'is-invalid': errors.fighting_divi }" />
                                                        <div class="invalid-feedback">{{ errors.fighting_divi }}
                                                        </div>

                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Freedom Fighter Number:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="editfreedomList.freedom_fighter_num"
                                                            name="freedom_fighter_num"
                                                            :class="{ 'is-invalid': errors.freedom_fighter_num }" />
                                                        <div class="invalid-feedback">{{ errors.freedom_fighter_num }}
                                                        </div>

                                                    </div>
                                                </div>




                                                <div class="col-6">
                                                    

                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Sector:</label>
                                                        <Field type="number" class="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp" placeholder="Transfer Order Number"
                                                            v-model="editfreedomList.Sector"
                                                            name="Sector"
                                                            :class="{ 'is-invalid': errors.Sector }" />
                                                        <div class="invalid-feedback">{{ errors.Sector }}
                                                        </div>

                                                    </div>
                                                    <div class="form-group mr-2">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1" v-model="editfreedomList.status"
                                                                name="status" :class="{ 'is-invalid': errors.status }">
                                                                <option value="1">Approved</option>
                                                                <option value="2">Cancel</option>

                                                            </Field>
                                                            <div class="invalid-feedback">{{ errors.dept_name }}</div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                              >Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="EditFreedom()">Edit</button>
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
                                <!-- this.freedomList.id = item.id;
            this.freedomList.employee_id = item.employee_id;
            this.freedomList.freedom_fighter_num = item.freedom_fighter_num;
            this.freedomList.fighting_divi = item.fighting_divi;
            this.freedomList.Sector = item.Sector;
            this.freedomList.status = item.status; -->
                                <div class="modal-body card">
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="modal-title text-center" id="exampleModalLabel" style="font-size: 25px;">
                                            Transfer Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Employee Name: {{ freedomList.name }}</h1>
                                        <h1 class="card-title ">Freedom Fighter Division: {{ freedomList.fighting_divi }}</h1>
                                        <h5 class="card-title">Freedom Fighter Number: {{ freedomList.freedom_fighter_num }}</h5>
                                      
                                        <h5 class="card-title">Sector: {{ freedomList.Sector }}</h5>
                                       
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
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Fighting Division</th>
                                    <th>Freedom Fighter Number</th>
                                    <th>Sector</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Sector
                                created_at
                                dept_name
                                designation_name
                                employee_id
                                fighting_divi
                                freedom_fighter_num
                                id
                                name -->

                                <tr v-for="(item, index) in AcrList" :key="index">
                                    <td>{{ item.employee_id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.dept_name }}</td>
                                    <td>{{ item.designation_name }}</td>
                                    <td>{{ item.fighting_divi }}</td>
                                    <td>{{ item.freedom_fighter_num }}</td>

                                    <td>{{ item.Sector }}</td>

                                    <td style="width: 185px;">


                                        <a @click="viewDetails(item)" class="mr-2" data-toggle="modal"
                                            data-target="#exampleModal2">
                                            <i class="fa fa-eye"
                                                style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                        </a>
                                        <i class="fas fa-edit"
                                            style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                            data-toggle="modal" data-target="#exampleModal1"
                                            @click="editbutton(item)"></i> <!-- Corrected edit icon class -->
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
    freedom_fighter_num: Yup.string().required("Transfer Type is required"),
    fighting_divi: Yup.string().required("To Department is required"),
    Sector: Yup.string().required("From Department is required"),
    status: Yup.date().required("Transfer Date is required").typeError("Invalid date format"),
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
            freedomList: {
                employee_id: "",
                freedom_fighter_num: "",
                fighting_divi: "",
                Sector: "",
                status: ""

            },
            editfreedomList: {
                id:"",
                employee_id: "",
                freedom_fighter_num: "",
                fighting_divi: "",
                Sector: "",
                status: ""
            }

        };
    },

    computed: {},

    methods: {
        clear(){
            console.log("hi");
             this.freedomList.employee_id = "";
             this.freedomList.freedom_fighter_num = "";
             this.freedomList.fighting_divi = "";
             this.freedomList.Sector = "";
             this.freedomList.status = "";

            this.$refs.form.resetForm();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            this.freedomList.transfer_letter = selectedFile;
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
            this.editfreedomList.transfer_letter = selectedFile;
        },

        editbutton(item) {
            this.editfreedomList.id = item.id;
            this.editfreedomList.employee_id = item.employee_id;
            this.editfreedomList.freedom_fighter_num = item.freedom_fighter_num;
            this.editfreedomList.fighting_divi = item.fighting_divi;
            this.editfreedomList.Sector = item.Sector;
            this.editfreedomList.status = item.status;
            this.value.id = item.id;
            this.value.emp = item.name;

        },
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deleteFreedomFighter/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getAcrList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },
        viewDetails(item) {
            this.freedomList.name = item.name;
            this.freedomList.employee_id = item.employee_id;
            this.freedomList.freedom_fighter_num = item.freedom_fighter_num;
            this.freedomList.fighting_divi = item.fighting_divi;
            this.freedomList.Sector = item.Sector;
            this.freedomList.status = item.status;
            
        },
        getAcrList() {
            this.axios
                .get(this.backend_url + 'getFreedomFighter')
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
                    this.freedomList.employee_id = this.user
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
            this.freedomList.employee_id = this.value.id;

           
            try {
                // this.freedomList.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addFreedomFighter', this.freedomList)
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

        EditFreedom() {
            // this.editfreedomList.employee_id = this.value.id;


            try {
                this.axios
                    .put(this.backend_url + `updateFreedomFighter/${this.editfreedomList.id}`, this.editfreedomList)
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
        }


    },

    created() {
        this.getEmployeeList();
        this.getAcrList();
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