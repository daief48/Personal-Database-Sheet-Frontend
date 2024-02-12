<template>
    <div>
        <h3 class="hide"><strong> Profile</strong></h3>
        <div class="card mb-3 ">
            <div class=" mb-3-body p-0">
                <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex p-2 justify-content-between align-items-end hide">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item hide">
                                    <a class="nav-link active" id="pills-basic-info" data-toggle="pill" href="#basic-info"
                                        role="tab" aria-controls="pills-basic-info" aria-selected="true"
                                        @click="button2 = false;">Short Report</a>
                                </li>
                                <li class="nav-item hide">
                                    <a class="nav-link" id="pills-basic-info-long" data-toggle="pill"
                                        href="#basic-info-long" role="tab" aria-controls="pills-basic-info-long"
                                        aria-selected="false" @click="button2 = true;">Long Report</a>
                                </li>
                            </ul>
                            <div class="d-flex ">
                                <button id="printButton" @click="printPage('basic_info')"
                                    class="btn btn-primary my-4 mx-2 hide">
                                    Print Page
                                </button>

                                <button id="btn-one" class="btn btn-secondary my-4 hide"
                                    @click="button2 ? captureAndExportToPDF() : captureAndExportToPDF1()">Generate
                                    PDF</button>
                            </div>
                        </div>
                        <hr class="hide">


                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active p-2" id="basic-info" role="tabpanel"
                                aria-labelledby="pills-basic-info"
                                style="margin: 0; padding: 0; max-width: 100%; height: auto;">
                                <div class="d-flex p-2 page-break " id="basic_info">
                                    <img class="bg-light p-2" width="300" :src="imgDataUrl !== 'http://localhost/pds-backend/public/images/' ? imgDataUrl : 'data:image/png;base64,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' " alt="" />
                                    <div class="ml-3">
                                        <table class="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <!-- {{ employee_id }} -->
                                                    <td><strong>Name:</strong></td>
                                                    <td>{{ basicInfo.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Mobile Number:</strong></td>
                                                    <td>{{ basicInfo.mobileNumber }}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Email:</strong></td>
                                                    <td>{{ basicInfo.email }}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Designation:</strong></td>
                                                    <td>{{ basicInfo.designation }}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Blood Group:</strong></td>
                                                    <td>({{ basicInfo.blood_group }})</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>

                            <div class="tab-pane fade show p-2" id="basic-info-long" role="tabpanel"
                                aria-labelledby="pills-basic-info-long">
                                <div id="basic_info" class="basic_info">
                                    <div class="d-flex p-2 page-break ">
                                        <img class="bg-light p-2" width="300" :src="imgDataUrl !== 'http://localhost/pds-backend/public/images/' ? imgDataUrl : 'data:image/png;base64,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' " alt="" />
                                        <div class="ml-3">
                                            <table class="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <!-- {{ employee_id }} -->
                                                        <td><strong>Name:</strong></td>
                                                        <td>{{ basicInfo.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Mobile Number:</strong></td>
                                                        <td>{{ basicInfo.mobileNumber }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Email:</strong></td>
                                                        <td>{{ basicInfo.email }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Designation:</strong></td>
                                                        <td>{{ basicInfo.designation }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Blood Group:</strong></td>
                                                        <td>({{ basicInfo.blood_group }})</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <br>

                                    <div class="row m-0  card mb-3">
                                        <h5 style="background: #cfc9c9;padding: 11px;">Present Address</h5>

                                        <div class="col-md-6">
                                            <table class="table table-borderless d-flex">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>House No:</strong></td>
                                                        <td>{{ addressDetails.present_addr_houseno }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Area/Word:</strong></td>
                                                        <td>{{ addressDetails.present_addr_area }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>District</strong></td>
                                                        <td>{{ addressDetails.present_addr_district }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-6">
                                            <table class="table table-borderless d-flex">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Road No:</strong></td>
                                                        <td>{{ addressDetails.present_addr_roadno }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Upozila:</strong></td>
                                                        <td>{{ addressDetails.present_addr_upazila }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Post Code</strong></td>
                                                        <td>{{ addressDetails.present_addr_postcode }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="row m-0 card mb-3">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Parmanent Address</h5>

                                        <div class="col-md-6">
                                            <table class="table table-borderless d-flex">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>House No:</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_houseno }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Area/Word:</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_area }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>District</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_district }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-6">

                                            <table class="table table-borderless d-flex">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Road No:</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_roadno }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Upozila:</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_upazila }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Post Code</strong></td>
                                                        <td>{{ addressDetails.permanent_addr_postcode }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row m-0 card mb-3">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Jobs</h5>

                                        <div class="col-md-6">
                                            <table class="table table-borderless d-flex">

                                                <tbody>
                                                    <tr>
                                                        <td><strong>Department Name:</strong></td>
                                                        <td>{{ jobs.department }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Designation:</strong></td>
                                                        <td>{{ jobs.designation }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-6">
                                            <table class="table table-borderless d-flex">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Joining Date:</strong></td>
                                                        <td>{{ jobs.joining_date }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Job Location:</strong></td>
                                                        <td>{{ jobs.job_location }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <draggable class="dragArea list-group w-full card mb-3" :list="educationArr"
                                        @change="onDrag">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Education</h5>
                                        <div class=" mb-3 border-left-cz" v-for="(education, index) in educationArr"
                                            :key="index">
                                            <div class="row ">
                                                <div class="col-md-6">
                                                    <table class="table table-borderless d-flex">
                                                        <tbody>
                                                            <tr>
                                                                <td><strong>Exam Name: <br /></strong></td>
                                                                <td>{{ education.exam_name }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Institute Name:</strong></td>
                                                                <td>{{ education.institute_name }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>District:</strong></td>
                                                                <td>{{ education.district }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Subject:</strong></td>
                                                                <td>{{ education.subject }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="col-md-6">
                                                    <table class="table table-borderless d-flex">
                                                        <tbody>
                                                            <tr>
                                                                <td><strong>Upazila:</strong></td>
                                                                <td>{{ education.upazila }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Passing Year:</strong></td>
                                                                <td>{{ education.passing_year }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Grad:</strong></td>
                                                                <td>{{ education.grade }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </draggable>

                                    <div class="row  m-0 card mb-3">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Transfer History</h5>

                                        <table class="table  ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Transfer Type</th>
                                                    <th scope="col">From Office</th>
                                                    <th scope="col">To Office</th>
                                                    <th scope="col">From Department</th>
                                                    <th scope="col">To Department</th>
                                                    <th scope="col">From Designation</th>
                                                    <th scope="col">To Designation</th>
                                                    <th scope="col">Transfer Date</th>
                                                    <th scope="col">Joining Date</th>
                                                    <th scope="col">Transfer Letter</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in transferList" :key="item.id">
                                                    <td>{{ item.t_type }}</td>
                                                    <td>{{ item.from_office }}</td>
                                                    <td>{{ item.to_office }}</td>
                                                    <td>{{ item.from_department }}</td>
                                                    <td>{{ item.to_department }}</td>
                                                    <td>{{ item.from_designation }}</td>
                                                    <td>{{ item.to_designation }}</td>
                                                    <td>{{ item.transfer_date }}</td>
                                                    <td>{{ item.join_date }}</td>
                                                    <td>{{ item.transfer_letter }}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                    <div class="row  m-0 card mb-3">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Promotion History</h5>

                                        <table class="table  ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Designation Name</th>
                                                    <th scope="col">Promotion Ref Number</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Promotion Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in promotionList" :key="item.id">
                                                    <td>{{ item.designation_name }}</td>
                                                    <td>{{ item.promotion_ref_number }}</td>
                                                    <td>{{ item.description }}</td>
                                                    <td>{{ item.promotion_date }}</td>


                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="row  m-0 card mb-3">
                                        <h5 class="mt-4" style="background: #cfc9c9;padding: 11px;">Training History</h5>

                                        <table class="table  ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Training Name</th>
                                                    <th scope="col">Training Center Name</th>
                                                    <th scope="col">Training Score</th>
                                                    <th scope="col">Training Feedback</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Training Start</th>
                                                    <th scope="col">Training End</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in trainingList" :key="item.id">
                                                    <td>{{ item.training_name }}</td>
                                                    <td>{{ item.training_center_name }}</td>
                                                    <td>{{ item.training_score }}</td>
                                                    <td>{{ item.training_feedback }}</td>
                                                    <td>{{ item.description }}</td>
                                                    <td>{{ item.training_strt_date }}</td>
                                                    <td>{{ item.training_end_date }}</td>


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

        </div>




        <!-- Modal End -->



        <!-- Modal End -->




    </div>
</template>
  
<script>

import $ from 'jquery';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { VueDraggableNext } from 'vue-draggable-next';
import html2pdf from 'html2pdf.js';

export default {
    components: {
        draggable: VueDraggableNext,

    },

    data() {
        const storageData = JSON.parse(localStorage.getItem('user'));
        return {
            backend_url: process.env.VUE_APP_API_URL,
            storageData,
            url: this.backendUrl + "/api/users",
            users: {},
            testUrl: 'http://localhost/pds-backend/api/users/search?search=&page=1',

            //image cropper
            show: false,
            employee_id: null,
            params: {
                token: '123456798',
                name: 'avatar'
            },
            headers: {
                smail: '*_~'
            },
            imgDataUrl: '',

            langExt: {
                hint: 'Click or drag the file here to upload',
                loading: 'Uploading…',
                noSupported: 'Browser is not supported, please use IE10+ or other browsers',
                success: 'Upload success',
                fail: 'Upload failed',
                preview: 'Preview',
                btn: {
                    off: 'Cancel',
                    close: 'Close',
                    back: 'Back',
                    save: 'Crop'
                },
                error: {
                    onlyImg: 'Image only',
                    outOfSize: 'Image exceeds size limit: ',
                    lowestPx: 'Image\'s size is too low. Expected at least: '
                }
            },

            departments: [],
            designations: [],
            transferList: [],
            promotionList: [],
            trainingList: [],
            basicInfo: {
                name: '',
                mobileNumber: '',
                email: '',
                designation: '',
                designation_id: '',
                image: '',
                blood_group: "",
                nid_number: "",
                passport_number: ""
            },

            addressDetails: {
                present_addr_houseno: '',
                present_addr_roadno: '',
                present_addr_area: '',
                present_addr_upazila: '',
                present_addr_district: '',
                present_addr_postcode: '',

                permanent_addr_houseno: '',
                permanent_addr_roadno: '',
                permanent_addr_area: '',
                permanent_addr_upazila: '',
                permanent_addr_district: '',
                permanent_addr_postcode: '',

            },
            jobs: {
                department: '',
                department_id: '',
                designation: '',
                designation_id: '',
                joining_date: '',
                job_location: '',
            },

            educationArr: [],

            familly_info: {
                father_name: '',
                mother_name: '',
                spouse_name: '',
                number_of_child: '',
            },
            emergency_contact: {
                emergency_name: '',
                emergency_relation: '',
                emergency_phn_number: '',
                emergency_email: '',
                emergency_addr: '',
                emergency_district: '',
            },
            button2: false,
        };
    },

    computed: {},

    methods: {
        async captureAndExportToPDF1() {
            // Find the element to capture by its ID
            const elementToCapture = document.getElementById("basic_info");

            if (!elementToCapture) {
                alert("Element not found.");
                return;
            }

            try {
                // Create a new PDF document using html2pdf
                const pdf = new html2pdf(elementToCapture, {
                    margin: 10,
                    filename: 'screenshot.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                });

                // Save the PDF or open it in a new tab
                pdf.save();
            } catch (error) {
                console.error("Error exporting to PDF:", error);
            }
        },

        async captureAndExportToPDF() {
    const elementToCapture = document.querySelector(".basic_info");

    try {
        const canvas = await html2canvas(elementToCapture, {
            scale: 2, // Adjust the scale for higher resolution (e.g., 2 for 2x resolution)
        });

        // Set the PDF page size to A4 dimensions (210mm x 297mm)
        let pageWidth = 210;
        let pageHeight = 297;

        // Calculate the scaling factor to fit the content within the page dimensions
        let scaleFactor = Math.min(
            pageWidth / canvas.width,
            pageHeight / canvas.height
        );

        // Calculate the width and height for the image on the PDF page
        let imageWidth = canvas.width * scaleFactor;
        let imageHeight = canvas.height * scaleFactor;

        // Create a new jsPDF instance with the following settings:
        // - "p" specifies the page orientation as portrait.
        // - "mm" specifies the units of measurement as millimeters.
        // - [pageWidth, pageHeight] specifies the page size.
        let pdf = new jsPDF("p", "mm", [pageWidth, pageHeight]);

        // Add the captured image to the PDF document, centering it on the page.
        let xPosition = (pageWidth - imageWidth) / 2;
        let yPosition = (pageHeight - imageHeight) / 2;

        // Specify the image quality (e.g., 0.9 for 90% quality)
        let imageQuality = 0.9;

        pdf.addImage(
            canvas.toDataURL("image/jpeg", imageQuality),
            "JPEG",
            xPosition,
            yPosition,
            imageWidth,
            imageHeight
        );

        // Save the PDF document with a specific filename.
        pdf.save("document.pdf");
    } catch (error) {
        console.error("Error capturing or exporting to PDF:", error);
    }
}



        ,
        printPage() {

            var elementsToHide = document.getElementsByClassName('hide');
            var footer = document.querySelector('footer'); // Select the footer element

            if (footer) {
                footer.style.display = 'none'; // Hide the footer
            }

            for (var i = 0; i < elementsToHide.length; i++) {
                elementsToHide[i].style.display = 'none';
            }

            window.print();
            if (footer) {
                footer.style.display = 'block'; // Hide the footer
            }

            for (var j = 0; j < elementsToHide.length; j++) {
                elementsToHide[j].style.display = 'block';
            }
        }
        ,

        check() {
            this.axios
                .get(this.testUrl)
                .then((res) => {
                    console.log(res);
                })
        },
        onDrag() {
            console.log(this.educationArr);
        },

        addNewEducationHistory: function () {
            this.educationArr.push({ exam_name: '', institute_name: '', district: '', upazila: '', subject: '', passing_year: '', grade: '' });
        },

        removeEducationHistory: function (index) {
            this.educationArr.splice(index, 1);
        },

        getProfileInfo() {
            this.axios
                .get(this.backend_url + 'user/getprofile/' + this.storageData.id)
                .then((res) => {
                    var profileData = res.data.data;
                    this.employee_id = res.data.data.id;

                    // console.log(this.employee_id);

                    this.basicInfo.name = profileData.name;
                    this.basicInfo.mobileNumber = profileData.mobile_number;
                    this.basicInfo.email = profileData.email;
                    this.basicInfo.designation = profileData.designation;
                    this.basicInfo.blood_group = profileData.blood_group;
                    this.basicInfo.nid_number = profileData.nid_number;
                    this.basicInfo.passport_number = profileData.passport_number;
                    this.basicInfo.designation_id = profileData.designation_id;
                    this.imgDataUrl = this.base_url_for_resource + 'images/' + profileData.image;

                    this.addressDetails.present_addr_houseno = profileData.present_addr_houseno;
                    this.addressDetails.present_addr_roadno = profileData.present_addr_roadno;
                    this.addressDetails.present_addr_area = profileData.present_addr_area;
                    this.addressDetails.present_addr_upazila = profileData.present_addr_upazila;
                    this.addressDetails.present_addr_district = profileData.present_addr_district;
                    this.addressDetails.present_addr_postcode = profileData.present_addr_postcode;
                    this.addressDetails.permanent_addr_houseno = profileData.permanent_addr_houseno;
                    this.addressDetails.permanent_addr_roadno = profileData.permanent_addr_roadno;
                    this.addressDetails.permanent_addr_area = profileData.permanent_addr_area;
                    this.addressDetails.permanent_addr_upazila = profileData.permanent_addr_upazila;
                    this.addressDetails.permanent_addr_district = profileData.permanent_addr_district;
                    this.addressDetails.permanent_addr_postcode = profileData.permanent_addr_postcode;

                    this.jobs.department_id = profileData.department_id;
                    this.jobs.department = profileData.department;
                    this.jobs.designation_id = profileData.designation_id;
                    this.jobs.designation = profileData.designation;
                    this.jobs.job_location = profileData.job_location;
                    this.jobs.joining_date = profileData.joining_date;

                    this.educationArr = JSON.parse(profileData.education_history);

                    this.familly_info.father_name = profileData.father_name;
                    this.familly_info.mother_name = profileData.mother_name;
                    this.familly_info.spouse_name = profileData.spouse_name;
                    this.familly_info.number_of_child = profileData.number_of_child;

                    this.emergency_contact.emergency_name = profileData.emergency_name;
                    this.emergency_contact.emergency_relation = profileData.emergency_relation;
                    this.emergency_contact.emergency_phn_number = profileData.emergency_phn_number;
                    this.emergency_contact.emergency_email = profileData.emergency_email;
                    this.emergency_contact.emergency_addr = profileData.emergency_addr;
                    this.emergency_contact.emergency_district = profileData.emergency_district;
                })
        },

        saveProfile(type) {
            let formData = new FormData;
            formData.append('user_id', this.storageData.id);
            if (type == 'basicInfo') {
                formData.append('name', this.basicInfo.name);
                formData.append('mobile_number', this.basicInfo.mobileNumber);
                formData.append('email', this.basicInfo.email);
                formData.append('designation', this.basicInfo.designation_id);
                formData.append('blood_group', this.basicInfo.blood_group);
                formData.append('nid_number', this.basicInfo.nid_number);
                formData.append('passport_number', this.basicInfo.passport_number);
                formData.append('image', this.basicInfo.image);
            }
            if (type == 'addressDetail') {
                formData.append('present_addr_houseno', this.addressDetails.present_addr_houseno);
                formData.append('present_addr_roadno', this.addressDetails.present_addr_roadno);
                formData.append('present_addr_area', this.addressDetails.present_addr_area);
                formData.append('present_addr_upazila', this.addressDetails.present_addr_upazila);
                formData.append('present_addr_district', this.addressDetails.present_addr_district);
                formData.append('present_addr_postcode', this.addressDetails.present_addr_postcode);

                formData.append('permanent_addr_houseno', this.addressDetails.permanent_addr_houseno);
                formData.append('permanent_addr_roadno', this.addressDetails.permanent_addr_roadno);
                formData.append('permanent_addr_area', this.addressDetails.permanent_addr_area);
                formData.append('permanent_addr_upazila', this.addressDetails.permanent_addr_upazila);
                formData.append('permanent_addr_district', this.addressDetails.permanent_addr_district);
                formData.append('permanent_addr_postcode', this.addressDetails.permanent_addr_postcode);
            }

            if (type == 'jobs') {
                formData.append('department', this.jobs.department_id);
                formData.append('designation', this.jobs.designation_id);
                formData.append('joining_date', this.jobs.joining_date);
                formData.append('job_location', this.jobs.job_location);
            }

            if (type == 'education_history') {
                formData.append('education_history', JSON.stringify(this.educationArr));
            }

            if (type == 'familly_info') {
                formData.append('father_name', this.familly_info.father_name);
                formData.append('mother_name', this.familly_info.mother_name);
                formData.append('spouse_name', this.familly_info.spouse_name);
                formData.append('number_of_child', this.familly_info.number_of_child);
            }

            if (type == 'emergency_contact') {
                formData.append('emergency_name', this.emergency_contact.emergency_name);
                formData.append('emergency_relation', this.emergency_contact.emergency_relation);
                formData.append('emergency_phn_number', this.emergency_contact.emergency_phn_number);
                formData.append('emergency_email', this.emergency_contact.emergency_email);
                formData.append('emergency_addr', this.emergency_contact.emergency_addr);
                formData.append('emergency_district', this.emergency_contact.emergency_district);
            }


            this.axios
                .post(this.backend_url + 'user/updateProfile', formData)
                .then((res) => {
                    console.log(res.data);
                    this.getProfileInfo();
                    $(".closeModal").trigger("click");
                    this.$toast.success("Profile saved successfully.", {
                        position: "top-right",
                    });

                })
        },


        toggleShow() {
            this.show = !this.show;
        },
        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl, field) {
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
            this.basicInfo.image = imgDataUrl;
            console.log('field: ' + field);
            console.log('dataUrl: ' + imgDataUrl);
            this.show = !this.show;
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        cropUploadSuccess(jsonData, field) {
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);

        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field) {
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        },
        getTransferList() {
            setTimeout(() => {
                this.axios
                    .get(this.backend_url + 'specificUserTransferRecordByEmployeeId/' + this.employee_id)
                    .then((res) => {
                        this.transferList = res.data.data;
                        console.log(this.transferList);
                    })
            }, 3000);
        },
        getPromotionList() {
            setTimeout(() => {
                this.axios
                    .get(this.backend_url + 'specificUserPromotionRecordByEmployeeId/' + this.employee_id)
                    .then((res) => {
                        this.promotionList = res.data.data;
                        console.log(this.promotionList);
                    })
            }, 3000);
        },
        getTrainingList() {
            setTimeout(() => {
                this.axios
                    .get(this.backend_url + 'specificUserTrainingRecordByEmployeeId/' + this.employee_id)
                    .then((res) => {
                        this.trainingList = res.data.data;
                        console.log(this.trainingList);
                    })
            }, 3000);
        }

    },

    created() {
        this.getProfileInfo();
        this.getTransferList();
        this.getPromotionList();
        this.getTrainingList();
    },



}


</script>
  
<style>
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

.table-borderless>tbody>tr>td,
.table-borderless>tbody>tr>th,
.table-borderless>tfoot>tr>td,
.table-borderless>tfoot>tr>th,
.table-borderless>thead>tr>td,
.table-borderless>thead>tr>th {
    border: none;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: #333333;
    background: none !important;
    font-weight: bold;
}

.nav-pills .nav-link {
    font-size: 20px !important;
}

.border-left-cz {
    border-left: 5px solid #7dacdb;
    cursor: grab;
    cursor: move;
    position: relative;
}
</style>