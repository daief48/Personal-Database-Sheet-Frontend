<template>
  <div>
    <h3 class=""><strong> Profile</strong></h3>
    <div class="card card-default">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="pills-basic-info" data-toggle="pill" href="#basic-info" role="tab"
                  aria-controls="pills-basic-info" aria-selected="true">Basic Info</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-address-deatils" data-toggle="pill" href="#address-details" role="tab"
                  aria-controls="pills-address-details" aria-selected="false">Address Details</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-jobs" data-toggle="pill" href="#jobs" role="tab" aria-controls="pills-jobs"
                  aria-selected="false">Jobs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-education-history" data-toggle="pill" href="#education-history" role="tab"
                  aria-controls="pills-education-history" aria-selected="false">Education History</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-fimilly-info" data-toggle="pill" href="#familly-info" role="tab"
                  aria-controls="pills-familly-info" aria-selected="false">Familly Info</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-emergency-contact" data-toggle="pill" href="#emergency-contact" role="tab"
                  aria-controls="pills-emergency-contact" aria-selected="false">Emergrncy Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-freedom-fighter" data-toggle="pill" href="#freedom-fighter" role="tab"
                  aria-controls="pills-freedom-fighter" aria-selected="false">Freedom Fighter</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-documents" data-toggle="pill" href="#documents" role="tab"
                  aria-controls="pills-documents" aria-selected="false">Add Documents</a>
              </li>

            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active p-2" id="basic-info" role="tabpanel"
                aria-labelledby="pills-basic-info">
                <div class="d-flex p-2">
                  <img class="bg-light p-2" width="300" :src="imgDataUrl" alt="" />
                  <div class="ml-3">
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{{ basicInfo.name }}</td>
                        </tr>
                        <tr>
                          <td><strong>Designation:</strong></td>
                          <td>{{ basicInfo.designation }}</td>
                        </tr>
                        <tr>
                          <td><strong>Department:</strong></td>
                          <td>{{ basicInfo.department }}</td>
                        </tr>
                        <tr>
                          <td><strong>Gender:</strong></td>
                          <td>{{ basicInfo.gender }}</td>
                        </tr>
                        <tr>
                          <td><strong>Date of Birth:</strong></td>
                          <td>{{ basicInfo.date_of_birth }}</td>
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
                          <td><strong>Blood Group:</strong></td>
                          <td>{{ basicInfo.blood_group }}</td>
                        </tr>
                        <tr>
                          <td><strong>NID Number:</strong></td>
                          <td>{{ basicInfo.nid_number }}</td>
                        </tr>
                        <tr>
                          <td><strong>Passport Number:</strong></td>
                          <td>{{ basicInfo.passport_number }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#basicInfoModal">Edit Info</button>
              </div>

              <div class="tab-pane fade show p-2" id="address-details" role="tabpanel"
                aria-labelledby="pills-address-details">
                <h5>Present Address</h5>
                <hr>
                <div class="row">
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

                <h5 class="mt-4">Parmanent Address</h5>
                <hr>
                <div class="row">
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
                <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#addressModal">Edit Info</button>
              </div>

              <div class="tab-pane fade show p-2" id="jobs" role="tabpanel" aria-labelledby="pills-jobs">
                <div class="row">
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Office Name:</strong></td>
                          <td>{{ jobs.office_name }}</td>
                        </tr>

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
                          <td><strong>Grade:</strong></td>
                          <td>{{ jobs.job_grade_name }}</td>
                        </tr>
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
                <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#jobsModal">Edit Info</button>
              </div>

              <div class="tab-pane fade show p-2" id="education-history" role="tabpanel"
                aria-labelledby="pills-education-history">
                <button type="button" class="btn btn-outline-primary float-right mt-2 mb-2"
                  @click="addNewEducationHistory">Add Education</button>
                <div class=""
                  style="max-height: 700px; overflow-y: auto; overflow-x: hidden; max-width: 100%; clear:both">
                  <draggable class="dragArea list-group w-full" :list="educationArr" @change="onDrag">
                    <div class="bg-light mb-3 border-left-cz" v-for="(education, index) in educationArr" :key="index">
                      <div class="input-group m-0 p-3" style="width:calc( 100% - 30px )">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="">Exam Name</span>
                        </div>
                        <input type="text" v-model="education.exam_name" class="form-control" autocomplete="off" />
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <table class="table table-borderless d-flex">
                            <tbody>
                              <tr>
                                <td><strong>Institute Name</strong></td>
                                <td><input type="text" v-model="education.institute_name" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                              <tr>
                                <td><strong>Board:</strong></td>
                                <td><input type="text" v-model="education.board" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                              <tr>
                                <td><strong>Subject</strong></td>
                                <td><input type="text" v-model="education.subject" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col-md-6">
                          <table class="table table-borderless d-flex">
                            <tbody>
                              <tr>
                                <td><strong>Group</strong></td>
                                <td><input type="text" v-model="education.group" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                              <tr>
                                <td><strong>Passing Year:</strong></td>
                                <td><input type="date" v-model="education.passing_year" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                              <tr>
                                <td><strong>Grade</strong></td>
                                <td><input type="text" v-model="education.grade" class="form-control"
                                    autocomplete="off" /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <button class="btn btn-sm btn-danger float-right ml-1"
                        style="width:30px; line-height: 28px; position:absolute; top:16px; right:10px;"
                        @click="removeEducationHistory(index)">X</button>
                    </div>
                  </draggable>
                </div>
                <button type="button" class="btn btn-outline-success float-right mt-2 mr-2"
                  @click="saveProfile('education_history')">Save</button>

              </div>

              <div class="tab-pane fade show p-2" id="familly-info" role="tabpanel" aria-labelledby="pills-familly-info">
                <div class="row">
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Father Name : </strong></td>
                          <td>{{ familly_info.father_name }}</td>
                        </tr>
                        <tr>
                          <td><strong>Spouse Name:</strong></td>
                          <td>{{ familly_info.spouse_name }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Mother Name : </strong></td>
                          <td>{{ familly_info.mother_name }}</td>
                        </tr>
                        <tr>
                          <td><strong>Number Of Child:</strong></td>
                          <td>{{ familly_info.number_of_child }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#famillyInfoModal">Edit Info</button>
              </div>

              <div class="tab-pane fade show" id="emergency-contact" role="tabpanel"
                aria-labelledby="pills-emergency-contact">
                <div class="row">
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Name : </strong></td>
                          <td>{{ emergency_contact.emergency_name }}</td>
                        </tr>
                        <tr>
                          <td><strong>Mobile No:</strong></td>
                          <td>{{ emergency_contact.emergency_phn_number }}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{{ emergency_contact.emergency_addr }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Relation : </strong></td>
                          <td>{{ emergency_contact.emergency_relation }}</td>
                        </tr>
                        <tr>
                          <td><strong>Email Address:</strong></td>
                          <td>{{ emergency_contact.emergency_email }}</td>
                        </tr>
                        <tr>
                          <td><strong>District:</strong></td>
                          <td>{{ emergency_contact.emergency_district }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#emergencyContactModal">Edit Info</button>
              </div>

              <div class="tab-pane fade show" id="freedom-fighter" role="tabpanel"
                aria-labelledby="pills-freedom-fighter">
                <div class="row" v-if="freedomFighter.freedom_fighter_num">
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <!-- freedomFighter: {
                      freedom_fighter_num: "",
                      fighting_divi: "",
                      Sector: ""
                      }, -->
                      <tbody>
                        <tr>
                          <td><strong>Freedom Fighter Number:</strong></td>
                          <td>{{ freedomFighter.freedom_fighter_num }}</td>
                        </tr>
                        <tr>
                          <td><strong>Freedom Fighter Division:</strong></td>
                          <td>{{ freedomFighter.fighting_divi }}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <table class="table table-borderless d-flex">
                      <tbody>
                        <tr>
                          <td><strong>Freedom Fighter Sector:</strong></td>
                          <td>{{ freedomFighter.Sector }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>

                </div>
                <!-- <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal"
                  data-target="#freedomFighterContactModal">Edit Info</button> -->
              </div>

              <div class="tab-pane fade show" id="documents" role="tabpanel" aria-labelledby="pills-documents">
                <div class="row">
                  <div class="col-12 mt-3 d-flex justify-content-end">
                    <button class="btn btn-primary" @click="addField">
                      Add Documents
                    </button>
                  </div>
                  <div class="container m-0 mb-2 ">
                    <!-- {{ document }} -->
                    <div v-for="(document, index) in document" :key="index">
                      <!-- {{index}} -->
                      <div class="d-flex flex-row p-3 card">
                        <div class="w-50">
                          <div class="mt-3 p-3 border">
                            <input class="form-control" v-model="document.document_name" placeholder="Document Name">
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="mt-3 p-3 border d-flex flex-column align-items-center row">
                            <!-- Show document_file only if it exists -->
                            <span v-if="document.document_file" class="badge badge-secondary">{{ document.document_file
                            }}</span>

                            <!-- Input for file selection with Bootstrap styles -->
                            <div class="custom-file mt-2">
                              <input type="file" class="custom-file-input" id="fileInput"
                                @change="handleFileChange($event, index)">
                              <label class="custom-file-label" for="fileInput">Choose file</label>
                            </div>
                          </div>
                        </div>






                        <div class="w-25 d-flex justify-content-center align-items-center">
                          <button class="btn btn-danger mt-2" @click="deleteField(index)">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-primary float-right" @click="saveProfile()">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <!-- Modal Start -->
    <div class="modal" id="basicInfoModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Basic Info</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex p-2">
              <div class="bg-light p-2 ">
                <img :src="imgDataUrl" class="d-block" width="300">
                <a class="btn d-block btn-info text-white mt-1" @click="toggleShow">Profile Image</a>
              </div>
              <div class="ml-3">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td><input type="text" class="form-control" v-model="basicInfo.name"></td>
                    </tr>
                    <tr>
                      <td><strong>Designation:</strong></td>
                      <td>
                        <select v-model="basicInfo.designation_id" class="form-control">
                          <option :value="designation.id" v-for="designation in designations" :key="designation.id">{{
                            designation.designation_name }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Department Name:</strong></td>
                      <td>
                        <select v-model="basicInfo.department_id" class="form-control">
                          <option :value="department.id" v-for="department in departments" :key="department.id">{{
                            department.dept_name }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Gender:</strong></td>
                      <td>
                        <select v-model="basicInfo.gender" class="form-control">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Date of Birth:</strong></td>
                      <td>
                        <input type="date" class="form-control" v-model="basicInfo.date_of_birth">
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Mobile Number:</strong></td>
                      <td><input type="text" class="form-control" v-model="basicInfo.mobileNumber"></td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td><input type="text" class="form-control" v-model="basicInfo.email"></td>
                    </tr>
                    <tr>
                      <td><strong>Blood Group:</strong></td>
                      <td>
                        <select v-model="basicInfo.blood_group" class="form-control">
                          <option value="" disabled>Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Nid Number:</strong></td>
                      <td>
                        <input type="text" class="form-control" v-model="basicInfo.nid_number">
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Passport Number:</strong></td>
                      <td>
                        <input type="text" class="form-control" v-model="basicInfo.passport_number">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveProfile('basicInfo')">Save Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



    <div class="modal" id="addressModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Address Details</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <h6>Present Address</h6>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>House No:</strong></td>
                      <td><input type="text" v-model="addressDetails.present_addr_houseno" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Area/Word:</strong></td>
                      <td><input type="text" v-model="addressDetails.present_addr_area" class="form-control"></td>
                    </tr>
                    <tr>
                      <!-- {{  present_district}} -->
                      <td><strong>District</strong></td>
                      <td>
                        <multiselect v-model="present_district" :options="district"
                          :custom-label="nameWithPresentDistrict" class="form-control p-0" :close-on-select="true"
                          placeholder="Select one" label="name" track-by="id">
                        </multiselect>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Road No:</strong></td>
                      <td><input type="text" v-model="addressDetails.present_addr_roadno" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Upozila:</strong></td>
                      <td>
                        <multiselect v-model="present_addr_upazila" :options="upozila"
                          :custom-label="nameWithPresentUpazila" class="form-control p-0" :close-on-select="true"
                          placeholder="Select one" label="name" track-by="id">
                        </multiselect>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Post Code</strong></td>
                      <td><input type="text" v-model="addressDetails.present_addr_postcode" class="form-control"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h6 class="mt-4">Parmanent Address</h6>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>House No:</strong></td>
                      <td><input type="text" v-model="addressDetails.permanent_addr_houseno" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Area/Word:</strong></td>
                      <td><input type="text" v-model="addressDetails.permanent_addr_area" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>District</strong></td>
                      <td>
                        <multiselect v-model="permanent_addr_district" :options="district"
                          :custom-label="nameWithPresentDistrict" class="form-control p-0" :close-on-select="true"
                          placeholder="Select one" label="name" track-by="id">
                        </multiselect>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Road No:</strong></td>
                      <td><input type="text" v-model="addressDetails.permanent_addr_roadno" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Upozila:</strong></td>
                      <td>
                        <multiselect v-model="permanent_addr_upazila" :options="upozila"
                          :custom-label="nameWithPresentUpazila" class="form-control p-0" :close-on-select="true"
                          placeholder="Select one" label="name" track-by="id">
                        </multiselect>

                      </td>
                    </tr>
                    <tr>
                      <td><strong>Post Code</strong></td>
                      <td><input type="text" v-model="addressDetails.permanent_addr_postcode" class="form-control"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveProfile('addressDetail')">Save
              Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->

    <div class="modal" id="jobsModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Jobs</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Office Name:</strong></td>
                      <td>
                        <select v-model="jobs.office" class="form-control">
                          <option :value="office.id" v-for="office in office" :key="office.id">{{
                            office.office_name }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Department Name:</strong></td>
                      <td>
                        <select v-model="basicInfo.department_id" class="form-control">
                          <option :value="department.id" v-for="department in departments" :key="department.id">{{
                            department.dept_name }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Designation:</strong></td>
                      <td>
                        <select v-model="basicInfo.designation_id" class="form-control">
                          <option :value="designation.id" v-for="designation in designations" :key="designation.id">{{
                            designation.designation_name }}</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>

                      <td><strong>Grade:</strong></td>
                      <td>
                        <select v-model="jobs.job_grade" class="form-control">
                          <option :value="grade.id" v-for="grade in job_grade" :key="grade.id">{{
                            grade.job_grade }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Joining Date:</strong></td>
                      <td><input type="date" v-model="jobs.joining_date" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Job Location:</strong></td>
                      <td><input type="text" v-model="jobs.job_location" class="form-control"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveProfile('jobs')">Save Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal" id="famillyInfoModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Jobs</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Father Name:</strong></td>
                      <td>
                        <input type="text" v-model="familly_info.father_name" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Spouse Name:</strong></td>
                      <td>
                        <input type="text" v-model="familly_info.spouse_name" class="form-control">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Mother Name</strong></td>
                      <td><input type="text" v-model="familly_info.mother_name" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>Number Of Child:</strong></td>
                      <td><input type="text" v-model="familly_info.number_of_child" class="form-control"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveProfile('familly_info')">Save
              Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="emergencyContactModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Emergrncy Contact</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td>
                        <input type="text" v-model="emergency_contact.emergency_name" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Mobile No:</strong></td>
                      <td>
                        <input type="text" v-model="emergency_contact.emergency_phn_number" class="form-control">
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>
                        <input type="text" v-model="emergency_contact.emergency_addr" class="form-control">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <table class="table table-borderless d-flex">
                  <tbody>
                    <tr>
                      <td><strong>Relation :</strong></td>
                      <td>
                        <select v-model="emergency_contact.emergency_relation" class="form-control"
                          name="emergency_relation">
                          <option value="" disabled>Select Relationship</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Wife">Wife</option>
                          <option value="Other">Other</option>
                        </select>

                      </td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td><input type="text" v-model="emergency_contact.emergency_email" class="form-control"></td>
                    </tr>
                    <tr>
                      <td><strong>District :</strong></td>
                      <td><input type="text" v-model="emergency_contact.emergency_district" class="form-control"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveProfile('emergency_contact')">Save
              Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="freedomFighterContactModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h4 class="modal-title">Freedom Fighter</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <form class="form w-100" action="#">

                <div v-show="check" class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="freedomFighterNum" class="form-label">Freedom Fighter Number:</label>
                      <input type="number" v-model="freedomFighter.freedom_fighter_num" class="form-control"
                        id="freedomFighterNum" name="freedom_fighter_num" />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="freedomFighterSector" class="form-label">Freedom Fighter Sector:</label>
                      <input type="number" v-model="freedomFighter.Sector" class="form-control" id="freedomFighterSector"
                        name="Sector" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="fightingDivi" class="form-label">Freedom Fighter Division:</label>
                      <input type="text" v-model="freedomFighter.fighting_divi" class="form-control" id="fighting_divi"
                        name="fighting_divi" />
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="saveFreedom()">Save
              Profile</button>
            <button type="button" class="btn btn-outline-danger ml-2 closeModal" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>





    <!-- Modal End -->



    <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="200" :noCircle=true :params="params"
      :headers="headers" :langExt="langExt" langType="en" img-format="png">
    </my-upload>


  </div>
</template>

<script>

import myUpload from 'vue-image-crop-upload';
import $ from 'jquery';
import { VueDraggableNext } from 'vue-draggable-next';
const address = require('@bangladeshi/bangladesh-address');
import Multiselect from 'vue-multiselect';

export default {
  components: {
    myUpload,
    draggable: VueDraggableNext, Multiselect
  },

  data() {
    const storageData = JSON.parse(localStorage.getItem('user'));
    return {
      backend_url: process.env.VUE_APP_API_URL,
      storageData,
      url: this.backendUrl + "/api/users",
      users: {},
      testUrl: 'http://localhost/pds-backend/api/users/search?search=&page=1',
      divisions: [], district: [], upozila: [],
      show: false,
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


      basicInfo: {
        name: '',
        mobileNumber: '',
        gender: '',
        department: '',
        date_of_birth: '',
        email: '',
        designation: '',
        designation_id: '',
        department_id: '',
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
        office: "",
        job_grade: "",
        job_grade_name: ""
      },

      educationArr: [],
      emp_id:"",
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
      present_district: { district: '' },
      present_addr_upazila: { upozila: '' },
      permanent_addr_district: { district: '' },
      permanent_addr_upazila: { upozila: '' },
      office: "",
      job_grade: "",
      freedomFighter: {
        id: '',
        freedom_fighter_num: "",
        fighting_divi: "",
        Sector: "",
        employee_id: ""
      },
      document:
        [{
          document_name: "",
          document_file: ""

        }]
      ,
    };
  },

  computed: {},

  methods: {
    deleteField(index) {
      this.document.splice(index, 1);
    },
    handleFileChange(event, index) {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Extract and update the document_name property with only the file name
        const fileName = selectedFile.name;
        this.document[index].document_file = fileName;
      }
    },

    addField() {
      this.document.push({ document_name: "", document_file: "" });
    },
    saveFreedom() {
      console.log(this.freedomFighter.id);

      // Send a PUT request to update freedom fighter
      this.axios
        .put(this.backend_url + "updateFreedomFighter/" + this.freedomFighter.id, this.freedomFighter)
        .then((res) => {
          console.log(res.data);
          this.$toast.success("Freedom Fighter updated successfully.", {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Failed to update Freedom Fighter.", {
            position: "top-right",
          });
        });
    },

    nameWithPresentDistrict({ district }) {
      return `${district}`
    },
    nameWithPresentUpazila({ upozila }) {
      return `${upozila}`
    },
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

    getDepartmentList() {
      this.axios
        .get(this.backend_url + 'getDepartment')
        .then((res) => {
          this.departments = res.data.data;
          console.log(this.departments);
        })
    },
    getDesignationList() {
      this.axios
        .get(this.backend_url + 'getDesignationMgt')
        .then((res) => {
          this.designations = res.data.data;
          console.log(this.designations);
        })
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
          console.log(profileData.document);

          this.emp_id = profileData.id
          this.basicInfo.name = profileData.name;
          this.document = profileData.document === null ? [] : JSON.parse(profileData.document);
          this.basicInfo.mobileNumber = profileData.mobile_number;
          this.basicInfo.email = profileData.email;
          this.basicInfo.designation = profileData.designation;
          this.basicInfo.department = profileData.department;
          this.basicInfo.department_id = profileData.department_id;
          this.basicInfo.gender = profileData.gender;
          this.basicInfo.date_of_birth = profileData.date_of_birth;
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
          this.present_district.district = profileData.present_addr_district;
          this.present_addr_upazila.upozila = profileData.present_addr_upazila;
          this.permanent_addr_district.district = profileData.permanent_addr_district;
          this.permanent_addr_upazila.upozila = profileData.permanent_addr_upazila;
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
          this.jobs.office = profileData.office;
          this.jobs.office_name = profileData.office_name;
          this.jobs.job_grade_name = profileData.job_grade_name;
          this.jobs.job_grade = profileData.job_grade;

          this.educationArr = profileData.education_history ? JSON.parse(profileData.education_history) : [];

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

    getFreedomFighterInfo() {
      this.axios
        .get(this.backend_url + 'user/getprofile/' + this.storageData.id)
        .then((res) => {
          this.axios
            .get(this.backend_url + 'getFreedomFighterByEmpId/' + res.data.data.id)
            .then((res) => {
              console.log("hi", res.data.data);
              this.freedomFighter.id = res.data.data.id;
              this.freedomFighter.freedom_fighter_num = res.data.data.freedom_fighter_num;
              this.freedomFighter.fighting_divi = res.data.data.fighting_divi;
              this.freedomFighter.Sector = res.data.data.Sector;
              this.freedomFighter.employee_id = res.data.data.employee_id;
            })
        })
    },
    saveProfile() {
      let formData = new FormData;
      console.log(this.storageData)
      formData.append('user_id', this.storageData.id);
      formData.append('employee_id', this.emp_id);

      // if (type == 'basicInfo') {
      formData.append('name', this.basicInfo.name);
      formData.append('mobile_number', this.basicInfo.mobileNumber);
      formData.append('email', this.basicInfo.email);
      formData.append('designation', this.basicInfo.designation_id);
      formData.append('department', this.basicInfo.department_id);
      formData.append('gender', this.basicInfo.gender);
      formData.append('date_of_birth', this.basicInfo.date_of_birth);
      formData.append('blood_group', this.basicInfo.blood_group);
      formData.append('nid_number', this.basicInfo.nid_number);
      formData.append('passport_number', this.basicInfo.passport_number);
      formData.append('image', this.basicInfo.image);
      // }
      // if (type == 'addressDetail') {
      formData.append('present_addr_houseno', this.addressDetails.present_addr_houseno);
      formData.append('present_addr_roadno', this.addressDetails.present_addr_roadno);
      formData.append('present_addr_area', this.addressDetails.present_addr_area);
      formData.append('present_addr_upazila', this.present_addr_upazila.upozila);
      formData.append('present_addr_district', this.present_district.district);
      formData.append('present_addr_postcode', this.addressDetails.present_addr_postcode);

      formData.append('permanent_addr_houseno', this.addressDetails.permanent_addr_houseno);
      formData.append('permanent_addr_roadno', this.addressDetails.permanent_addr_roadno);
      formData.append('permanent_addr_area', this.addressDetails.permanent_addr_area);
      formData.append('permanent_addr_upazila', this.permanent_addr_upazila.upozila);
      formData.append('permanent_addr_district', this.permanent_addr_district.district);
      formData.append('permanent_addr_postcode', this.addressDetails.permanent_addr_postcode);
      // }

      // if (type == 'jobs') {
      if (this.jobs.department == null) {
        formData.append('department', this.basicInfo.department_id);
      } else {
        formData.append('department', this.basicInfo.department_id);

      }
      if (this.jobs.designation == null) {
        formData.append('designation', this.basicInfo.designation_id);
        // delete this.jobs.designation;
      } else {
        formData.append('designation', this.basicInfo.designation_id);

      }
      formData.append('joining_date', this.jobs.joining_date);
      formData.append('job_location', this.jobs.job_location);
      formData.append('office', this.jobs.office);
      formData.append('job_grade', this.jobs.job_grade);
      // }

      // if (type == 'education_history') {
      formData.append('education_history', JSON.stringify(this.educationArr));
      // }/

      // if (type == 'familly_info') {
      formData.append('father_name', this.familly_info.father_name);
      formData.append('mother_name', this.familly_info.mother_name);
      formData.append('spouse_name', this.familly_info.spouse_name);
      formData.append('number_of_child', this.familly_info.number_of_child);
      // }

      // if (type == 'emergency_contact') {
      formData.append('emergency_name', this.emergency_contact.emergency_name);
      formData.append('emergency_relation', this.emergency_contact.emergency_relation);
      formData.append('emergency_phn_number', this.emergency_contact.emergency_phn_number);
      formData.append('emergency_email', this.emergency_contact.emergency_email);
      formData.append('emergency_addr', this.emergency_contact.emergency_addr);
      formData.append('emergency_district', this.emergency_contact.emergency_district);
      // }
      formData.append(
        "document",
        JSON.stringify(this.document)
      );

      // this.$toast.success("Employee Updated successfully.", {
      //   position: "top-right",
      // });

      this.axios
        .post(this.backend_url + 'user/updateProfile', formData)
        .then((res) => {
          console.log(res.data);
          this.getProfileInfo();
          $(".closeModal").trigger("click");
          this.$toast.success("Employee Updated successfully.", {
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
    getOffice() {
      this.axios
        .get(this.backend_url + `getOfficeMgt`)
        .then((response) => {
          this.office = response.data.list;
          // console.log(this.office);
        })
    },
    getGrade() {
      this.axios
        .get(this.backend_url + `getGradeMgt`)
        .then((response) => {
          this.job_grade = response.data.list;
          console.log(this.job_grade);
        })
    },
  },

  created() {
    this.getProfileInfo();
    this.getDepartmentList();
    this.getDesignationList();
    this.getOffice();
    this.getGrade();
    this.getFreedomFighterInfo();
  },

  watch: {

  },
  mounted() {
    // Use the package methods
    this.divisions = address.allDivision();
    this.district = address.allDistict();
    this.upozila = address.allUpazila();
    console.log("Hi");
    console.log(this.divisions);
    this.district = this.district.map(item => {
      return {
        district: item
      };
    });

    this.upozila = this.upozila.map(item => {
      return {
        upozila: item
      }
    })
    console.log(this.district);

    console.log(this.upozila);

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