<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Promtotion</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>My Promtotion History</h3>
                    <a href="/" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#exampleModal" @click="clear()"
                       >+ Add
                        Promtotion</a>

                    <!-- hidden model  -->
                    <!-- Add and Edit Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="width: 82vw;left: -457px;top: 164px;">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Promotion</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="savePromotion" :validation-schema="schema"
                                    v-slot="{ errors, resetForm }" ref="form">
                                        <!-- {{ promotion }} -->
                                        <div class="row">
                                            <input type="text" v-model="promotion.employee_id" style="display: none;">
                                            <div class="col-6">
                                                


                                                <div class="form-group mr-2">
                                                    <label for="exampleFormControlSelect1"> Designation</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="promotion.promoted_designation"
                                                        :class="{ 'is-invalid': errors.promoted_designation }"
                                                        name="promoted_designation">

                                                        <option v-for="designation in designations" :key="designation.id"
                                                            v-bind:value="designation.id">
                                                            {{ designation.designation_name }}</option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.promoted_designation }}</div>

                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Promotion Reference Number</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Reference number here"
                                                        v-model="promotion.promotion_ref_number"
                                                        :class="{ 'is-invalid': errors.promotion_ref_number }"
                                                        name="promotion_ref_number" />
                                                    <div class="invalid-feedback">{{ errors.promotion_ref_number }}</div>


                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Promotion Date</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="promotion.promotion_date" name="promotion_date"
                                                        :class="{ 'is-invalid': errors.promotion_date }" />
                                                    <div class="invalid-feedback">{{ errors.promotion_date }}</div>

                                                </div>

                                            </div>

                                           



                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Description</label>
                                                    <Field as="textarea" class="form-control"
                                                        id="exampleFormControlTextarea1" rows="5"
                                                        placeholder="Write your comment here"
                                                        v-model="promotion.description" name="description"
                                                        :class="{ 'is-invalid': errors.description }"></Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal" @click="resetForm()">Cancel</button>
                                            <button type="submit" class="btn btn-primary" @click="savePromotion()">Add</button>
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
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Promotion</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Form @submit.prevent="EditTranfer" :validation-schema="schema"
                                        v-slot="{ errors }">
                                        <!-- {{ promotion }} -->
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Employee ID</label>
                                                    <Field type="number" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter Employee ID"
                                                        v-model="editpromotion.employee_id" name="employee_id"
                                                        :class="{ 'is-invalid': errors.employee_id }" readonly />

                                                    <div class="invalid-feedback">{{ errors.employee_id }}</div>

                                                </div>


                                                <div class="form-group mr-2 w-50">
                                                    <label for="exampleFormControlSelect1"> Designation</label>
                                                    <Field as="select" class="form-control" id="exampleFormControlSelect1"
                                                        v-model="editpromotion.promoted_designation"
                                                        :class="{ 'is-invalid': errors.promoted_designation }"
                                                        name="promoted_designation">

                                                        <option v-for="designation in designations" :key="designation.id"
                                                            v-bind:value="designation.id">
                                                            {{ designation.designation_name }}</option>

                                                    </Field>
                                                    <div class="invalid-feedback">{{ errors.promoted_designation }}</div>

                                                </div>

                                            </div>

                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Promotion Reference Number</label>
                                                    <Field type="text" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Reference number here"
                                                        v-model="editpromotion.promotion_ref_number"
                                                        :class="{ 'is-invalid': errors.promotion_ref_number }"
                                                        name="promotion_ref_number" />
                                                    <div class="invalid-feedback">{{ errors.promotion_ref_number }}</div>


                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Promotion Date</label>
                                                    <Field type="date" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Enter email"
                                                        v-model="editpromotion.promotion_date" name="promotion_date"
                                                        :class="{ 'is-invalid': errors.promotion_date }" />
                                                    <div class="invalid-feedback">{{ errors.promotion_date }}</div>

                                                </div>
                                            </div>



                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Description</label>
                                                    <Field as="textarea" class="form-control"
                                                        id="exampleFormControlTextarea1" rows="5"
                                                        placeholder="Write your comment here"
                                                        v-model="editpromotion.description" name="description"
                                                        :class="{ 'is-invalid': errors.description }"></Field>
                                                    <div class="invalid-feedback">{{ errors.description }}</div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary" @click="EditPromotion()">Edit</button>
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
                                    <!-- "employee_id": 1,
      "employee_name": "Shakiur",
      "id": 8,
      "name": "",
      "promotion_ref_number": "1111",
      "promoted_designation": 1,
      "promotion_date": "2023-10-30",
      "description": "sdffsdfsfsdf",
      "status": 0,
      "created_at": "2023-10-30T09:18:26.000000Z",
      "updated_at": "2023-10-30T09:36:41.000000Z",
      "designation_name": "engineer" -->
                                    <div class="card-body d-flex flex-column">
                                        <h5 class="modal-title text-center" id="exampleModalLabel" style="font-size: 25px;">
                                            Promtotion Details
                                        </h5>
                                        <hr>
                                        <h1 class="card-title ">Name: {{ promotion.employee_name }} </h1>
                                        <h1 class="card-title ">Promotion Ref Number: {{ promotion.promotion_ref_number }}
                                        </h1>
                                        <h5 class="card-title">Promoted Designation: {{ promotion.promoted_designation }}
                                        </h5>
                                        <h5 class="card-title">Promotion Date: {{ promotion.promotion_date }}</h5>
                                        <h5 class="card-title">Description: {{ promotion.description }}</h5>
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
                                    <th>Promotion Ref Number</th>
                                    <th>Promoted Designation</th>
                                    <th>Promotion Date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- "employee_id": 1,
      "employee_name": "Shakiur",
      "id": 3,
      "name": "",
      "promotion_ref_number": "sdf",
      "promoted_designation": 22,
      "promotion_date": "2023-03-28",
      "description": "sfd",
      "status": 1,
      "created_at": "2023-10-30T08:19:36.000000Z",
      "updated_at": "2023-10-30T08:23:44.000000Z" -->
                                <tr v-for="(item, index) in promotionList1" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.employee_name }}</td>
                                    <td>{{ item.promotion_ref_number }}</td>
                                    <td>{{ item.designation_name }}</td>
                                    <td>{{ item.promotion_date }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        <p v-if="item.status == 1" class="text-warning font-weight-bold"> Verified</p>
                                        <p v-else class="text-success font-weight-bold">Pending</p>
                                    </td>
                                    <td style="width: 185px;">
                                        <button v-if="item.status === 1" @click="viewDetails(item.id,item)"
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

        //  promotion: {
        //         employee_id: "",
        //         promotion_ref_number: "",
        //         promoted_designation: "",
        //         promotion_date: "",
        //         description: ""
        //     }
        const schema = Yup.object().shape({
            employee_id: Yup.string().required("Employee ID is required"),
            promotion_ref_number: Yup.string().required("Promotion Reference Number is required"),
            promoted_designation: Yup.string().required("Promoted Designation is required"),
            promotion_date: Yup.date()
                .required("Promotion Date is required")
                .typeError("Invalid date format"),
            description: Yup.string().required("Description is required"),
        });


        return {
            schema,
            backend_url: process.env.VUE_APP_API_URL,
            storageData,
            user: "",
            departments: "",
            designations: "",
            // PromtotionType: "",
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
            promotionRecordById: [],
            promotionList1: [],
            promotion: {
                employee_id: "",
                promotion_ref_number: "",
                promoted_designation: "",
                promotion_date: "",
                description: ""
            },
            editpromotion: {
                employee_id: "",
                promotion_ref_number: "",
                promoted_designation: "",
                promotion_date: "",
                description: ""
            }

        };
    },

    computed: {},

    methods: {
        clear(){
            this.$refs.form.resetForm();

        },
        editbutton(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserPromotion/' + id)
                .then((response) => {
                    //                 "id": 8,
                    // "employee_id": 1,
                    // "name": "",
                    // "promotion_ref_number": "123",
                    // "promoted_designation": 1,
                    // "promotion_date": "2023-10-30",
                    // "description": "sdffsdfsfsdf",
                    // "status": 0,
                    // "created_at": "2023-10-30T09:18:26.000000Z",
                    // "updated_at": "2023-10-30T09:18:26.000000Z"

                    this.promotionRecordById = response.data.data;
                    console.log(this.promotionRecordById);
                    this.editpromotion.id = id;
                    this.editpromotion.employee_id = this.promotionRecordById.employee_id;
                    this.editpromotion.promotion_ref_number = this.promotionRecordById.promotion_ref_number;
                    this.editpromotion.promoted_designation = this.promotionRecordById.promoted_designation;
                    this.editpromotion.promotion_date = this.promotionRecordById.promotion_date;
                    this.editpromotion.description = this.promotionRecordById.description;

                })
                .catch((e) => {
                    console.log(e)
                })
        },
        deletebutton(id) {
            this.axios
                .delete(this.backend_url + 'deletePromotion/' + id)
                .then((res) => {
                    console.log('Delete Successfully', res);
                    this.getPromotionList();
                    $('#datatable').DataTable().destroy();
                    this.$toast.error(`Delete Successfully!!`);

                })
        },
        viewDetails(id,item) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserPromotion/' + id)
                .then((response) => {
                    console.log(response);
                    this.promotionRecordById = response.data.data;
                    console.log(this.promotionRecordById);

                    // console.log(response.data.data.designation_name);

                    this.promotionRecordById.designation_name = response.data.data.designation_name;
                    this.promotion.id = id;
                    this.promotion.employee_name = item.employee_name;
                    this.promotion.employee_id = this.promotionRecordById.employee_id;
                    this.promotion.promotion_ref_number = this.promotionRecordById.promotion_ref_number;
                    this.promotion.promoted_designation = this.promotionRecordById.designation_name;
                    this.promotion.promotion_date = this.promotionRecordById.promotion_date;
                    this.promotion.description = this.promotionRecordById.description;


                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getPromotionList() {
            this.axios
                .get(this.backend_url + 'getPromotion?user_id=' + this.storageData.id)
                .then((res) => {
                    console.log(res.data.list);
                    this.promotionList1 = res.data.list;
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
        // getPromtotiontype() {
        //     this.axios
        //         .get(this.backend_url + 'PromtotionType')
        //         .then((res) => {
        //             this.PromtotionType = res.data.list;
        //             // console.log('fddsfsdf');
        //             // console.log(this.PromtotionType[0].title);
        //         })
        // },
        getUser() {
            this.axios
                .get(this.backend_url + `users/${this.storageData.id}`)
                .then((res) => {
                    this.user = res.data.userDetail.employee_id;
                    // console.log(this.user);
                    this.promotion.employee_id = this.user
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
        savePromotion() {
            try {
                // this.promotion.employee_id = this.storageData.id;
                this.axios
                    .post(this.backend_url + 'addPromotion', this.promotion)
                    .then((res) => {
                        console.log(res);
                        this.getPromotionList();
                        $("#exampleModal").modal('hide');
                        $('#datatable').DataTable().destroy();
                        this.$toast.success(`Add Data Successfully!`);
                        this.$refs.form.resetForm();

                    })
                    .catch((error) => {
                        console.error("An error occurred while saving the Promtotion record:", error);
                        this.$toast.error(`Failed to save Promtotion record.`);
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                this.$toast.error(`Failed to save Promtotion record.`);
            }
        },

        EditPromotion() {
            try {
                this.axios
                    .post(this.backend_url + `updatePromotion/${this.editpromotion.id}`, this.editpromotion)
                    .then((res) => {
                        console.log(res);
                        this.getPromotionList();
                        $("#exampleModal1").modal('hide');
                        $('#datatable').DataTable().destroy();
                        this.$toast.success(`Update Data Successfully!`);
                    })
                    .catch((error) => {
                        console.error("An error occurred while updating the Promtotion record:", error);
                        this.$toast.error(`Failed to update Promtotion record.`);
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                this.$toast.error(`Failed to update Promtotion record.`);
            }
        }


    },

    created() {
        this.getPromotionList();
        this.getDepartmentList();
        this.getDesignationList();
        // this.getPromtotiontype();
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
