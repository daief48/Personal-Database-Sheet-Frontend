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
                <form action="" @submit.prevent="SendSMS" method="POST">
                    <div class="row" >
                        <div class="col-4">
                            <div class="mb-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="9"
                                    placeholder="Write your message here." v-model="sendSMS.message"></textarea>
                            </div>

                        </div>
                        <div class="col-5">
                            <!-- {{ sendSMS }} -->
                            <h1 data-v-aa50ac88="" style="  font-size: 13px;color: #938f8f;">SMS
                                TO-----------------------------------------------------------------------------------------------------------------------------
                            </h1>
                            <div class="row mb-3 align-items-center">
                                <div class="w-25">
                                    <label for="exampleFormControlInput1" class="form-label">Subject:</label>

                                </div>
                                <div class="w-75">
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        placeholder="Subject for Message" v-model="sendSMS.subject">
                                </div>

                            </div>

                            <div class="row mb-3 align-items-center">
                                <div class="w-25">
                                    <label for="exampleFormControlInput1" class="form-label">Employee Phone Number:</label>

                                </div>
                                <div class="w-75">
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        placeholder="Employee Phone Number" v-model="sendSMS.phone">
                                </div>

                            </div>

                            <div class="row mb-3 align-items-center">
                                <div class="w-25">
                                    <label for="exampleFormControlInput1" class="form-label">Designation:</label>

                                </div>
                                <div class="w-75">
                                    <div class="form-group mr-2">
                                        <select class="form-control" id="exampleFormControlSelect1"
                                            v-model="sendSMS.designation" name="to_designation">
                                            <option value="" disabled selected>Select Designation</option>

                                            <option v-for="designation in designations" :key="designation.id"
                                                v-bind:value="designation.designation_name">
                                                {{ designation.designation_name }}
                                            </option>

                                        </select>
                                    </div>


                                </div>

                            </div>

                            <div class="row mb-3 align-items-center">
                                <div class="w-25">
                                    <label for="exampleFormControlSelect1">Office</label>
                                </div>
                                <div class="w-75">
                                    <div class="form-group mr-2">
                                        <select class="form-control" id="exampleFormControlSelect1" name="from_office"
                                            v-model="sendSMS.office">
                                            <option value="" disabled selected>Select an office</option>

                                            <option v-bind:value="office.office_name" v-for="office in office"
                                                :key="office.id">
                                                {{ office.office_name }}
                                            </option>

                                        </select>
                                    </div>


                                </div>

                            </div>

                            <div class="row mb-3 align-items-center">
                                <div class="w-25">
                                    <label for="exampleFormControlInput1" class="form-label">From:</label>

                                </div>
                                <div class="w-75">
                                    <input type="date" class="form-control" id="exampleFormControlInput1"
                                        placeholder="Office" v-model="sendSMS.from">
                                </div>

                            </div>
                            <div class="d-flex justify-content-end w-100">
                                <button class="btn btn-success mr-2" type="submit">Send</button>
                                <button class="btn btn-secondary" @click="clear()">Cancel</button>
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
// import Multiselect from 'vue-multiselect';

// DataTable.use(DataTablesCore);
export default {
    components: {
        // DataTable
        // Form, Field, Multiselect
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
            value: { id: '', emp: '' },
            // subject
            // phone
            // designation
            // office
            // from
            // message
            office: [],
            sendSMS: {
                subject: "",
                phone: "",
                designation: "",
                office: "",
                from: "",
                message: "",

            }

        }
    },


    methods: {
        clear(){
            // sendSMS: {
            //     subject: "",
            //     phone: "",
            //     designation: "",
            //     office: "",
            //     from: "",
            //     message: "",

            // }
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
        getOffice() {
            this.axios
                .get(this.backend_url + `getOfficeMgt`)
                .then((response) => {
                    this.office = response.data.list;
                    // console.log(this.office);
                })
        },
        SendSMS()
        {
            console.log("hi");
            this.axios
                .post(this.backend_url + 'sendMessage',this.sendSMS)
                .then((res) => {
                    console.log(res);
                    this.$toast.success(`Send SMS Successfully!!`);
                    this.clear();
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    },

    created() {
        this.getDesignationList();
        this.getOffice();

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
