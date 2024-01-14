<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> gradeType</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Grade Type List</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal">+ Add
                        Transfer Type</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add
                                        Grade Type</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="savegradeType" :validation-schema="schema"
                                        v-slot="{ errors, resetForm }" ref="form">
                                        <div>
                                            <div class="row">
                                                <!-- {{ gradeType }} -->
                                                <div class="col-4 w-100">

                                                    <div data-v-b1d61d26="" class="d-flex"
                                                        style="justify-content: space-around;">
                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1"> Grade Name</label>
                                                            <Field type="text" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" placeholder="gradeType Name"
                                                                v-model="gradeType.job_grade" name="title"
                                                                :class="{ 'is-invalid': errors.title }" />

                                                            <div class="invalid-feedback">{{ errors.title }}</div>

                                                        </div>



                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1" v-model="gradeType.status"
                                                                name="status" :class="{ 'is-invalid': errors.status }">
                                                                <option value="1">Approved</option>
                                                                <option value="2">Cancel</option>

                                                            </Field>
                                                            <div class="invalid-feedback">{{ errors.title }}</div>
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                @click="resetForm">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="savegradeType()">Add</button>
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
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Transfer Type</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="EditgradeType" :validation-schema="editschema"
                                        v-slot="{ errors }">
                                        <div>
                                            <div class="row">
                                                <div class="col-4 w-100">

                                                    <div data-v-b1d61d26="" class="d-flex"
                                                        style="justify-content: space-around;">
                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1"> gradeType Name</label>
                                                            <Field type="text" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" placeholder="gradeType Name"
                                                                v-model="editgradeType.job_grade" name="edittitle"
                                                                :class="{ 'is-invalid': errors.edittitle }" />

                                                            <div class="invalid-feedback">{{ errors.edittitle }}</div>

                                                        </div>



                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1"
                                                                v-model="editgradeType.status" name="editstatus"
                                                                :class="{ 'is-invalid': errors.editstatus }">
                                                                <option value="1">Approved</option>
                                                                <option value="2">Cancel</option>

                                                            </Field>
                                                            <div class="invalid-feedback">{{ errors.editstatus }}</div>
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary"
                                                @click="EditgradeType()">Edit</button>
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
                                            gradeType Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Transfer Type: {{ gradeType.transfer_type }}</h1>
                                        <h5 class="card-title">Transfer Order: {{ gradeType.transfer_order }}</h5>
                                        <h5 class="card-title">Transfer Order Number: {{ gradeType.transfer_order_number }}
                                        </h5>
                                        <h5 class="card-title">To Office: {{ gradeType.to_office }}</h5>
                                        <h5 class="card-title">From Office: {{ gradeType.from_office }}</h5>
                                        <h5 class="card-title">To Designation: {{ gradeType.to_designation }}</h5>
                                        <h5 class="card-title">From Designation: {{ gradeType.from_designation }}</h5>
                                        <h5 class="card-title">Transfer Date: {{ gradeType.transfer_date }}</h5>
                                        <h5 class="card-title">Join Date: {{ gradeType.join_date }}</h5>
                                        <h5 class="card-title">Transfer Letter: {{ gradeType.transfer_letter }}</h5>
                                        <h5 class="card-title">To gradeType: {{ gradeType.to_gradeType }}</h5>
                                        <h5 class="card-title">From gradeType: {{ gradeType.from_gradeType }}</h5>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <!-- End Transter Details Modal -->


                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table text-center" id="datatable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Training Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in gradeTypeList" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.job_grade }}</td>
                                    <td>
                                        <p v-if="item.status == 1" class="text-success font-weight-bold"> Verified</p>
                                        <p v-else-if="item.status == 2" class="text-danger font-weight-bold"> Cancel</p>
                                        <p v-else class="text-warning font-weight-bold">Pending</p>
                                    </td>
                                    <td style="width: 185px;">
                                        <div v-if="item.status === 0">
                                            <!-- <a @click="viewDetails(item.id)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a> -->

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
                                                @click="editbutton(item)"></i> <!-- Corrected edit icon class -->
                                            <i class="fa-solid fa-trash ml-1"
                                                style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                @click="deleterecord(item.id)"></i>


                                        </div>

                                        <div v-else-if="item.status === 1">
                                            <!-- <a @click="viewDetails(item.id)" class="mr-2" data-toggle="modal"
                                                data-target="#exampleModal2">
                                                <i class="fa fa-eye"
                                                    style="color: rgb(244, 221, 18);border: 2px solid rgb(244, 221, 18);padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a> -->

                                            <a @click="inactivestatus(item.id)" class="mr-2">
                                                <i class="fa fa-times"
                                                    style="color:#ff0a0a;border: 2px solid #ff0a0a;padding: 3px;font-size: 16px;cursor: pointer;"></i>
                                            </a>
                                            <i class="fas fa-edit"
                                                style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                data-toggle="modal" data-target="#exampleModal1"
                                                @click="editbutton(item)"></i> <!-- Corrected edit icon class -->
                                            <i class="fa-solid fa-trash ml-1"
                                                style="color: red; border: 2px solid red; padding: 3px; font-size: 16px; cursor: pointer;"
                                                @click="deleterecord(item.id)"></i>


                                        </div>

                                        <div v-else-if="item.status === 2">
                                            <!-- ... Other code ... -->

                                            <a @click="activestatus(item.id)" class="mr-2">
                                                <i class="fa fa-check"
                                                    style="color: #57b75e; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"></i>
                                            </a>

                                            <i class="fas fa-edit"
                                                style="color: darkgreen; border: 2px solid #57b75e; padding: 3px; font-size: 16px; cursor: pointer;"
                                                data-toggle="modal" data-target="#exampleModal1"
                                                @click="editbutton(item)"></i> <!-- Corrected edit icon class -->
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
        </div>

        <!-- Modal Start -->

        <!-- Modal End -->




    </div>
</template>
  
<script>
import { ref } from 'vue';
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
        // DataTable
        Form, Field
    },

    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));

        const schema = Yup.object().shape({
            title: Yup.string().required("gradeType Name is required"),
            status: Yup.string().required("Status is required"),
        });

        const editschema = Yup.object().shape({
            edittitle: Yup.string().required("gradeType Name is required"),
            editstatus: Yup.string().required("Status is required"),
        });
        let validationSchema = ref(schema);

        // Function to reset the validation schema
        const resetValidationSchema = () => {
            validationSchema.value = null; // or validationSchema.value = Yup.object().shape({});
        };

        return {
            schema,
            validationSchema, resetValidationSchema,
            editschema,
            backend_url: process.env.VUE_APP_API_URL,
            storageData,
            user: "",
            gradeTypes: "",
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
            gradeTypeList: [],
            gradeType: {
                job_grade: "",
                status: ""
            },
            editgradeType: {
                job_grade: "",
                status: ""
            }

        };
    },

    computed: {},

    methods: {
        deleterecord(id) {
            this.axios
                .delete(this.backend_url + 'deleteGradeMgt/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res.message);

                    this.getgradeTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error("Delete Successfully");

                }).catch((error) => {
                    console.error("An error occurred while updating the transfer record:", error);
                    this.$toast.error("Record cannot be deleted. Associated data exists.");
                });
        },
        EditgradeType() {
            try {
                this.axios
                    .put(this.backend_url + `updateGradeMgt/${this.editgradeType.id}`, this.editgradeType)
                    .then((res) => {
                        console.log(res);
                        this.getgradeTypeList();
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

        getgradeTypeList() {
            this.axios
                .get(this.backend_url + 'getGradeMgt')
                .then((res) => {
                    console.log(res.data.list);
                    this.gradeTypeList = res.data.list;
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

        editbutton(item) {

            this.editgradeType.id = item.id;
            this.editgradeType.job_grade = item.job_grade;
            this.editgradeType.status = item.status;

            console.log('edit ', this.editgradeType)

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
                .patch(this.backend_url + `activeGradeMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getgradeTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.success(`Active status Successfully!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        inactivestatus(id) {
            this.axios
                .patch(this.backend_url + `inactiveGradeMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getgradeTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Status Cancel!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        savegradeType() {
            try {
                // this.gradeType.employee_id = this.storageData.id;
                this.edit = false;
                this.axios
                    .post(this.backend_url + 'addGradeMgt', this.gradeType)
                    .then((res) => {
                        console.log(res);
                        this.getgradeTypeList();
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
    },

    created() {
        this.getgradeTypeList();
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
