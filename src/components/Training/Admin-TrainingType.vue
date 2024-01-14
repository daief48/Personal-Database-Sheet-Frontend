<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> trainingType</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Training Type List</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal"
                        >+ Add
                        Training Name</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Add
                                        trainingType</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="savetrainingType" :validation-schema="schema"
                                    v-slot="{ errors, resetForm }" ref="form" >
                                        <div>
                                            <div class="row">
                                                <!-- {{ trainingType }} -->
                                                <div class="col-4 w-100">

                                                    <div data-v-b1d61d26="" class="d-flex"
                                                        style="justify-content: space-around;">
                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1"> trainingType Name</label>
                                                            <Field type="text" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" placeholder="trainingType Name"
                                                                v-model="trainingType.training_name" name="training_name"
                                                                :class="{ 'is-invalid': errors.training_name }"/>

                                                                <div class="invalid-feedback">{{ errors.training_name }}</div>

                                                        </div>



                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1" v-model="trainingType.status"
                                                                name="status" :class="{ 'is-invalid': errors.status }">
                                                                <option value="1">Approved</option>
                                                                <option value="2">Cancel</option>

                                                            </Field>
                                                            <div class="invalid-feedback">{{ errors.training_name }}</div>
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal" @click="resetForm">Cancel</button>
                                            <button type="submit" class="btn btn-primary" @click="savetrainingType()"
                                              >Add</button>
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
                                    <h5 class="modal-title text-center" id="exampleModalLabel">Edit Training Name</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="EdittrainingType" :validation-schema="editschema"
                                        v-slot="{ errors }">
                                        <div>
                                            <div class="row">
                                                <div class="col-4 w-100">

                                                    <div data-v-b1d61d26="" class="d-flex"
                                                        style="justify-content: space-around;">
                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1"> trainingType Name</label>
                                                            <Field type="text" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" placeholder="trainingType Name"
                                                                v-model="edittrainingType.training_name" name="edittraining_name"
                                                                :class="{ 'is-invalid': errors.edittraining_name }" />

                                                            <div class="invalid-feedback">{{ errors.edittraining_name }}</div>

                                                        </div>



                                                        <div class="form-group mr-2 w-50">
                                                            <label for="exampleFormControlSelect1">Status</label>
                                                            <Field class="form-control" as="select"
                                                                id="exampleFormControlSelect1"
                                                                v-model="edittrainingType.status" name="editstatus"
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
                                                @click="EdittrainingType()">Edit</button>
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
                                            trainingType Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Transfer Type: {{ trainingType.transfer_type }}</h1>
                                        <h5 class="card-title">Transfer Order: {{ trainingType.transfer_order }}</h5>
                                        <h5 class="card-title">Transfer Order Number: {{ trainingType.transfer_order_number }}
                                        </h5>
                                        <h5 class="card-title">To Office: {{ trainingType.to_office }}</h5>
                                        <h5 class="card-title">From Office: {{ trainingType.from_office }}</h5>
                                        <h5 class="card-title">To Designation: {{ trainingType.to_designation }}</h5>
                                        <h5 class="card-title">From Designation: {{ trainingType.from_designation }}</h5>
                                        <h5 class="card-title">Transfer Date: {{ trainingType.transfer_date }}</h5>
                                        <h5 class="card-title">Join Date: {{ trainingType.join_date }}</h5>
                                        <h5 class="card-title">Transfer Letter: {{ trainingType.transfer_letter }}</h5>
                                        <h5 class="card-title">To trainingType: {{ trainingType.to_trainingType }}</h5>
                                        <h5 class="card-title">From trainingType: {{ trainingType.from_trainingType }}</h5>
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
                                <tr v-for="(item, index) in trainingTypeList" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.training_name }}</td>
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
                                                @click="editbutton(item.id)"></i> <!-- Corrected edit icon class -->
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
                                                @click="editbutton(item.id)"></i> <!-- Corrected edit icon class -->
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
                                                @click="editbutton(item.id)"></i> <!-- Corrected edit icon class -->
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
import { Form, Field  } from 'vee-validate';
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
            training_name: Yup.string().required("trainingType Name is required"),
            status: Yup.string().required("Status is required"),
        });

        const editschema = Yup.object().shape({
            edittraining_name: Yup.string().required("trainingType Name is required"),
            editstatus: Yup.string().required("Status is required"),
        });
        let validationSchema = ref(schema);

        // Function to reset the validation schema
        const resetValidationSchema = () => {
            validationSchema.value = null; // or validationSchema.value = Yup.object().shape({});
        };

        return {
            schema,
            validationSchema,resetValidationSchema,
            editschema,
            backend_url: process.env.VUE_APP_API_URL,
            storageData,
            user: "",
            trainingTypes: "",
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
            trainingTypeList: [],
            trainingType: {
                training_name: "",
                status: ""
            },
            edittrainingType: {
                training_name: "",
                status: ""
            }

        };
    },

    computed: {},

    methods: {
        deleterecord(id) {
            this.axios
                .delete(this.backend_url + 'deleteTrainingMgt/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res.message);

                    this.getTrainingTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error("Delete Successfully");

                }).catch((error) => {
                    console.error("An error occurred while updating the transfer record:", error);
                    this.$toast.error("Record cannot be deleted. Associated data exists.");
                });
        },
        EdittrainingType() {
            try {
                this.axios
                    .put(this.backend_url + `updateTrainingMgt/${this.edittrainingType.id}`, this.edittrainingType)
                    .then((res) => {
                        console.log(res);
                        this.getTrainingTypeList();
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
      
        getTrainingTypeList() {
            this.axios
                .get(this.backend_url + 'getTrainingMgt')
                .then((res) => {
                    console.log(res.data.list);
                    this.trainingTypeList = res.data.list;
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

        editbutton(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificTrainingSetup/' + id)
                .then((response) => {
                    this.transferRecordById = response.data.data;
                    //   trainingType: {
                    //         training_name: "",
                    //         status: ""
                    //     }
                    this.edittrainingType.id = id;
                    this.edittrainingType.training_name = this.transferRecordById.training_name;
                    this.edittrainingType.status = this.transferRecordById.status;

                    console.log('edit ', this.edittrainingType)

                })
                .catch((e) => {
                    console.log(e)
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
                .patch(this.backend_url + `activeTrainingMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTrainingTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.success(`Active status Successfully!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        inactivestatus(id) {
            this.axios
                .patch(this.backend_url + `inactiveTrainingMgtRecord/${id}`)
                .then((response) => {
                    console.log(response);
                    this.getTrainingTypeList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Status Cancel!!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        savetrainingType() {
            try {
                // this.trainingType.employee_id = this.storageData.id;
                this.edit = false;
                this.axios
                    .post(this.backend_url + 'addTrainingMgt', this.trainingType)
                    .then((res) => {
                        console.log(res);
                        this.getTrainingTypeList();
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
        this.getTrainingTypeList();
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
