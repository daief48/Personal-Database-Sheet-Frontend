<template>
    <div>
        <h5><i class="fa fa-thin fa-arrow-left"></i> Transfer</h5>
        <div class="card card-default">
            <div class="card-body">
                <div style="display: flex;justify-content: space-between;">
                    <h3>Senior Employee List</h3>

                </div>

                <hr>

                <div class="row">
                    <div class="col-md-12">

                        <table class="table text-center" id="datatable">
                            <thead>
                                <!-- age
                                date_of_birth
                                department
                                designations
                                employee_name -->

                                <tr>
                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Age</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Date of Birth</th>   
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in AcrList" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.employee_name }}</td>
                                    <td>{{ item.age }}</td>
                                    <td>{{ item.department }}</td>
                                    <td>{{ item.designations }}</td>
                                    <td>{{ item.date_of_birth }}</td>
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



// DataTable.use(DataTablesCore);
export default {
    components: {
        // DataTable,

    },


    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));
        return {
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
       


        viewDetails(id) {
            console.log(id);
            this.axios
                .get(this.backend_url + 'specificUserTransferRecord/' + id)
                .then((response) => {
                    console.log(response);
                    this.transferRecordById = response.data.data;
                    console.log(this.transferRecordById.transfer_type);
                    this.tansfer.id = id;
                    this.tansfer.employee_name = this.transferRecordById.employee_name;
                    this.tansfer.employee_id = this.transferRecordById.employee_id;
                    this.tansfer.transfer_type = this.transferRecordById.transfer_type;
                    this.tansfer.transfer_order = this.transferRecordById.transfer_order;
                    this.tansfer.transfer_order_number = this.transferRecordById.transfer_order_number;
                    this.tansfer.to_office = this.transferRecordById.to_office;
                    this.tansfer.from_office = this.transferRecordById.from_office;
                    this.tansfer.to_designation = this.transferRecordById.to_designation;
                    this.tansfer.from_designation = this.transferRecordById.from_designation;
                    this.tansfer.transfer_date = this.transferRecordById.transfer_date;
                    this.tansfer.join_date = this.transferRecordById.join_date;
                    this.tansfer.transfer_letter = this.transferRecordById.transfer_letter;
                    this.tansfer.to_department = this.transferRecordById.to_department;
                    this.tansfer.from_department = this.transferRecordById.from_department;

                    this.edit = false;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getSeniorEmployee() {
            this.axios
                .get(this.backend_url + 'getSeniorEmployee')
                .then((res) => {
                    console.log(res.data.data);
                    this.AcrList = res.data.data;
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


    },

    created() {
        this.getSeniorEmployee();
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