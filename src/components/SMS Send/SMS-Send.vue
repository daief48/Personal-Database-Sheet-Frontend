<template>
    <div>
        <h5><i class="fas fa-arrow-left"></i>SMS Send</h5>

        <div class="card mb-0">
            <div class="card-body">
                <h5 style="font-size:25px">Send SMS</h5>

            </div>

        </div>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="SendSMS" method="POST">
    <div class="row">
        <div class="col-6">
            <div class="mb-3">
                <label for="designation" class="form-label">Designation:</label>
                <select class="form-control" id="designation" v-model="sendSMS.designations" name="to_designation"
                    @change="changeHH">
                    <option value="">Select Designation</option>
                    <option v-for="designation in designations" :key="designation.id" :value="designation.id">
                        {{ designation.designation_name }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="department" class="form-label">Department:</label>
                <select class="form-control" id="department" v-model="sendSMS.department" name="department"
                    @change="changeHH">
                    <option value="">Select Department</option>
                    <option v-for="department in departments" :key="department.id" :value="department.id">
                        {{ department.dept_name }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="fromOffice" class="form-label">Office:</label>
                <select class="form-control" id="fromOffice" name="from_office" v-model="sendSMS.offices"
                    @change="changeHH">
                    <option value="" selected>Select an office</option>
                    <option v-for="office in office" :key="office.id" :value="office.id">
                        {{ office.office_name }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="employee" class="form-label">Employee:</label>
                <multiselect v-model="value" :options="employeeList" :custom-label="nameWithLang"
                    :close-on-select="true" placeholder="Select one" label="name" track-by="id" @select="changeHH">
                </multiselect>
            </div>
        </div>

        <div class="col-6">
            <div class="card h-100" style="overflow-y: scroll; height: 267px;">
                <div class="card-body">
                    <div v-for="phone in phone" :key="phone.id"
                        class="card-body m-0 p-0 d-flex justify-content-center align-items-center">
                        <span class="badge text-bg-info"
                            style="height: 30px; width: 308px; display: flex; justify-content: center; font-size: 17px; margin-bottom: 6px;">
                            {{ phone }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-3">
            <div class="d-flex align-items-end">
                <textarea class="form-control w-50" id="exampleFormControlTextarea1" rows="9"
                    placeholder="Write your message here." v-model="sendSMS.employee"></textarea>
                <button class="btn btn-success ms-3" type="submit" style="height: 42px; width: 100px;">Send</button>
            </div>
        </div>
    </div>
</form>

            </div>
        </div>
    </div>
</template>

  
<script>

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import { Form, Field } from 'vee-validate';
import * as Yup from "yup";
import Multiselect from 'vue-multiselect';

// import Multiselect from 'vue-multiselect';

// DataTable.use(DataTablesCore);
export default {
    components: {
        Multiselect
    },

    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));

        const schema = Yup.object().shape({

        });


        return {
            schema,
            backend_url: process.env.VUE_APP_API_URL,
            storageData,
            user: "",
            url: this.backendUrl + "/api/users",
            designations: [],
            departments: "",
            // subject
            // phone
            // designation
            // office
            // from
            // message
            office: [],
            value: { id: '', emp: '' },
            employeeList: [],
            sendSMS: {
                department: "",
                designations: "",
                offices: "",
                employee_id: ""

            }
            ,
            phone: []

        }
    },


    methods: {
        changeHH() {
            this.sendSMS.employee_id = this.value.id;
            console.log(this.value.id);
            this.axios
                .get(this.backend_url + 'getMessageInfo?department=' + this.sendSMS.department + '&designations=' + this.sendSMS.designations + '&offices=' + this.sendSMS.offices + '&employee_id=' + this.sendSMS.employee_id)
                .then((res) => {
                    console.log(this.sendSMS.department);
                    console.log(res.data.phoneList);
                    this.phone = res.data.phoneList;
                })
                .catch((error) => {
                    console.error("An error occurred while saving the transfer record:", error);
                    this.$toast.error(`Failed to save the transfer record.`);
                });

        },
        clear() {

            this.sendSMS.subject = "";
            this.sendSMS.phone = "";
            this.sendSMS.designation = "";
            this.sendSMS.office = "";
            this.sendSMS.from = "";
            this.sendSMS.message = "";

        },
        getDesignationList() {
            this.axios
                .get(this.backend_url + 'getDesignationMgt')
                .then((res) => {
                    this.designations = res.data.data;
                    // console.log(this.designations);
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

        getOffice() {
            this.axios
                .get(this.backend_url + `getOfficeMgt`)
                .then((response) => {
                    this.office = response.data.list;
                    // console.log(this.office);
                })
        },
        SendSMS() {
            this.axios
                .post(this.backend_url + 'sendMessage', this.phone)
                .then((res) => {
                    console.log(res);
                    this.$toast.success(`Send SMS Successfully!!`);
                    this.clear();
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
    },

    created() {
        this.getDesignationList();
        this.getOffice();
        this.getDepartmentList();
        this.getEmployeeList();

    },

    watch: {

    },

}


</script>
  
<style>
@import 'datatables.net-dt';

/* .g-4, .gx-4 {
    --bs-gutter-x: 4.5rem;
} */
#exampleFormControlTextarea1::placeholder {
        color: rgb(128, 119, 119); /* Change this to the desired color */
    }
textarea.form-control {
    min-height: calc(17.5em + .75rem + calc(var(--bs-border-width) * 2));
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
