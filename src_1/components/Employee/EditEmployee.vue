<template>
  <div>
    <div class="card card-default">
      <div class="card-header">
        <strong> Edit </strong>
        <button class="btn btn-sm btn-secondary float-right" @click="cancelEdit">
          Cancel
        </button>
      </div>
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
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active p-2" id="basic-info" role="tabpanel"
                aria-labelledby="pills-basic-info">
                <Form class="form" method="post" action="#" @submit="saveProfile('basicInfo')"
                  :validation-schema="schema_basicInfo" v-slot="{ errors }">

                  <div class="d-flex p-2">
                    <div class="d-flex p-2">
                      <div class="bg-light p-2">
                        <img :src="imgDataUrl" class="d-block" width="300" />
                        <a class="btn d-block btn-info text-white mt-1" @click="toggleShow">Profile Image</a>
                      </div>
                      <div class="ml-3">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td><strong>Name:</strong></td>
                              <td>
                                <Field type="text" class="form-control" v-model="basicInfo.name"
                                  :class="{ 'is-invalid': errors.name }" name="name" />
                                <div class="invalid-feedback">{{ errors.name }}</div>

                              </td>
                            </tr>
                            <tr>
                              <td><strong>Mobile Number:</strong></td>
                              <td>
                                <Field type="text" class="form-control" v-model="basicInfo.mobileNumber"
                                  :class="{ 'is-invalid': errors.mobileNumber }" name="mobileNumber" />
                                <div class="invalid-feedback">{{ errors.mobileNumber }}</div>

                              </td>
                            </tr>
                            <tr>
                              <td><strong>Email:</strong></td>
                              <td>
                                <Field type="text" class="form-control" v-model="basicInfo.email" name="email"
                                  :class="{ 'is-invalid': errors.email }" />
                                <div class="invalid-feedback">{{ errors.mobileNumber }}</div>

                              </td>
                            </tr>
                            <tr>
                            <td><strong>Designation:</strong></td>
                            <td>
                              <select v-model="basicInfo.designation" class="form-control">
                                <option :value="designation.id" v-for="designation in designations" :key="designation.id">
                                  {{ designation.designation_name }}
                                </option>
                              </select>
                            </td>
                          </tr>
                            <tr>
                              <td><strong>Gender:</strong></td>
                              <td>
                                <Field name="gender" as="select" v-model="basicInfo.gender" class="form-control"
                                  :class="{ 'is-invalid': errors.gender }">
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.gender }}</div>

                              </td>
                            </tr>
                            <tr>
                              <td><strong>Date of Birth:</strong></td>
                              <td>
                                <Field type="date" v-model="basicInfo.date_of_birth" class="form-control"
                                  autocomplete="off" name="date_of_birth"
                                  :class="{ 'is-invalid': errors.date_of_birth }" />
                                <div class="invalid-feedback">{{ errors.date_of_birth }}</div>
                              </td>
                            </tr>
                            <tr>
                              <td><strong>Blood Group:</strong></td>
                              <td>
                                <Field name="blood_group" type="text" v-model="basicInfo.blood_group" class="form-control"
                                  :class="{ 'is-invalid': errors.blood_group }">
                                </Field>
                              </td>
                            </tr>

                            <tr>
                              <td><strong>NID Number:</strong></td>
                              <td>
                                <Field name="nid_number" type="number" v-model="basicInfo.nid_number" class="form-control"
                                  :class="{ 'is-invalid': errors.nid_number }">
                                </Field>
                              </td>
                            </tr>

                            <tr>
                              <td><strong>Passport Number:</strong></td>
                              <td>
                                <Field name="passport_number" type="number" v-model="basicInfo.passport_number"
                                  class="form-control" :class="{ 'is-invalid': errors.passport_number }">
                                </Field>
                              </td>
                            </tr>

                            <tr>
                              <td><strong>User Role*:</strong></td>
                              <td>
                                <select v-model="basicInfo.status" class="form-control">
                                  <option value="1" class="bg-success">Active</option>
                                  <option value="0" class="bg-danger">Inactive</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Save
                  </button>



                </Form>
              </div>
              <div class="tab-pane fade show p-2" id="address-details" role="tabpanel"
                aria-labelledby="pills-address-details">
                <Form class="form" method="post" action="#" @submit="saveProfile('addressDetail')"
                  :validation-schema="schema_addr" v-slot="{ errors }">
                  <h6>Present Address</h6>
                  <hr />
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-borderless d-flex">
                        <tbody>
                          <tr>
                            <td><strong>House No:</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.present_addr_houseno" class="form-control"
                                name="present_addr_houseno" :class="{ 'is-invalid': errors.present_addr_houseno }" />
                              <div class="invalid-feedback">{{ errors.present_addr_houseno }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Area/Word:</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.present_addr_area" class="form-control"
                                name="present_addr_area" :class="{ 'is-invalid': errors.present_addr_area }" />
                              <div class="invalid-feedback">{{ errors.present_addr_area }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>District</strong></td>
                            <td>
                              <Field type="text" v-model="addressDetails.present_addr_district" class="form-control"
                                name="present_addr_district" :class="{ 'is-invalid': errors.present_addr_district }" />
                              <div class="invalid-feedback">{{ errors.present_addr_district }}</div>

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
                            <td>
                              <Field type="number" v-model="addressDetails.present_addr_roadno" class="form-control"
                                name="present_addr_roadno" :class="{ 'is-invalid': errors.present_addr_roadno }" />
                              <div class="invalid-feedback">{{ errors.present_addr_roadno }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Upozila:</strong></td>
                            <td>
                              <Field type="text" v-model="addressDetails.present_addr_upazila" class="form-control"
                                name="present_addr_upazila" :class="{ 'is-invalid': errors.present_addr_upazila }" />
                              <div class="invalid-feedback">{{ errors.present_addr_upazila }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Post Code</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.present_addr_postcode" class="form-control"
                                name="present_addr_postcode" :class="{ 'is-invalid': errors.present_addr_postcode }" />
                              <div class="invalid-feedback">{{ errors.present_addr_postcode }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h6 class="mt-4">Parmanent Address</h6>
                  <hr />
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-borderless d-flex">
                        <tbody>
                          <tr>
                            <td><strong>House No:</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.permanent_addr_houseno" class="form-control"
                                name="permanent_addr_houseno" :class="{ 'is-invalid': errors.permanent_addr_houseno }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_houseno }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Area/Word:</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.permanent_addr_area" class="form-control"
                                name="permanent_addr_area" :class="{ 'is-invalid': errors.permanent_addr_area }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_area }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>District</strong></td>
                            <td>
                              <Field type="text" v-model="addressDetails.permanent_addr_district" class="form-control"
                                name="permanent_addr_district"
                                :class="{ 'is-invalid': errors.permanent_addr_district }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_district }}</div>
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
                            <td>
                              <Field type="number" v-model="addressDetails.permanent_addr_roadno" class="form-control"
                                name="permanent_addr_roadno" :class="{ 'is-invalid': errors.permanent_addr_roadno }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_roadno }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Upozila:</strong></td>
                            <td>
                              <Field type="text" v-model="addressDetails.permanent_addr_upazila" class="form-control"
                                name="permanent_addr_upazila" :class="{ 'is-invalid': errors.permanent_addr_upazila }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_upazila }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Post Code</strong></td>
                            <td>
                              <Field type="number" v-model="addressDetails.permanent_addr_postcode" class="form-control"
                                name="permanent_addr_postcode"
                                :class="{ 'is-invalid': errors.permanent_addr_postcode }" />
                              <div class="invalid-feedback">{{ errors.permanent_addr_postcode }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Save
                  </button>
                </Form>
              </div>

              <div class="tab-pane fade show p-2" id="jobs" role="tabpanel" aria-labelledby="pills-jobs">
                <Form class="form" action="#" @submit="saveProfile('jobs')" :validation-schema="schema_department"
                  v-slot="{ errors }">
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-borderless d-flex">
                        <tbody>
                          <tr>
                            <td><strong>Department Name:</strong></td>
                            <td>
                              <select v-model="jobs.department" class="form-control">
                                <option :value="department.id" v-for="department in departments" :key="department.id">
                                  {{ department.dept_name }}
                                </option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Designation:</strong></td>
                            <td>
                              <select v-model="jobs.designation" class="form-control">
                                <option :value="designation.id" v-for="designation in designations" :key="designation.id">
                                  {{ designation.designation_name }}
                                </option>
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
                            <td><strong>Joining Date:</strong></td>
                            <td>
                              <Field type="date" v-model="jobs.joining_date" class="form-control" name="joining_date"
                                :class="{ 'is-invalid': errors.joining_date }" />
                              <div class="invalid-feedback">{{ errors.joining_date }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Job Location:</strong></td>
                            <td>
                              <Field type="text" v-model="jobs.job_location" class="form-control" name="job_location"
                                :class="{ 'is-invalid': errors.job_location }" />
                              <div class="invalid-feedback">{{ errors.job_location }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Save
                  </button>
                </Form>
              </div>

              <div class="tab-pane fade show p-2" id="education-history" role="tabpanel"
                aria-labelledby="pills-education-history">
                <Form class="form" action="#" @submit="saveProfile('education_history')"
                  :validation-schema="schema_education" v-slot="{ errors }">
                  <button type="button" class="btn btn-outline-primary float-right mt-2 mb-2"
                    @click="addNewEducationHistory">
                    Add Education
                  </button>
                  <div class="" style="
                    max-height: 700px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    max-width: 100%;
                    clear: both;
                  ">
                    <draggable class="dragArea list-group w-full" :list="educationArr" @change="onDrag">
                      <div class="bg-light mb-3 border-left-cz" v-for="(education, index) in educationArr" :key="index">
                        <div class="input-group m-0 p-3" style="width: calc(100% - 30px)">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="">Exam Name</span>
                          </div>
                          <Field type="text" v-model="education.exam_name" class="form-control" autocomplete="off"
                            name="exam_name" :class="{ 'is-invalid': errors.exam_name }" />
                          <div class="invalid-feedback">{{ errors.exam_name }}</div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <table class="table table-borderless d-flex">
                              <tbody>
                                <tr>
                                  <td><strong>Institute Name</strong></td>
                                  <td>
                                    <Field type="text" v-model="education.institute_name" class="form-control"
                                      autocomplete="off" name="institute_name"
                                      :class="{ 'is-invalid': errors.institute_name }" />
                                    <div class="invalid-feedback">{{ errors.institute_name }}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>District:</strong></td>
                                  <td>
                                    <Field type="text" v-model="education.district" class="form-control"
                                      autocomplete="off" name="district" :class="{ 'is-invalid': errors.district }" />
                                    <div class="invalid-feedback">{{ errors.district }}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Subject</strong></td>
                                  <td>
                                    <Field type="text" v-model="education.subject" class="form-control" autocomplete="off"
                                      name="subject" :class="{ 'is-invalid': errors.subject }" />
                                    <div class="invalid-feedback">{{ errors.subject }}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="col-md-6">
                            <table class="table table-borderless d-flex">
                              <tbody>
                                <tr>
                                  <td><strong>Upazila</strong></td>
                                  <td>
                                    <Field type="text" v-model="education.upazila" class="form-control" autocomplete="off"
                                      name="upazila" :class="{ 'is-invalid': errors.upazila }" />
                                    <div class="invalid-feedback">{{ errors.upazila }}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Passing Year:</strong></td>
                                  <td>
                                    <Field type="date" v-model="education.passing_year" class="form-control"
                                      autocomplete="off" name="passing_year"
                                      :class="{ 'is-invalid': errors.passing_year }" />
                                    <div class="invalid-feedback">{{ errors.passing_year }}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Grade</strong></td>
                                  <td>
                                    <Field type="text" v-model="education.grade" name="grade" class="form-control"
                                      autocomplete="off" :class="{ 'is-invalid': errors.grade }" />
                                    <div class="invalid-feedback">{{ errors.grade }}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <button class="btn btn-sm btn-danger float-right ml-1" style="
                          width: 30px;
                          line-height: 28px;
                          position: absolute;
                          top: 16px;
                          right: 10px;
                        " @click="removeEducationHistory(index)">
                          X
                        </button>
                      </div>
                    </draggable>
                  </div>
                  <button type="submit" class="btn btn-outline-success float-right mt-2 mr-2">
                    Save
                  </button>
                </Form>
              </div>

              <div class="tab-pane fade show p-2" id="familly-info" role="tabpanel" aria-labelledby="pills-familly-info">
                <Form class="form" action="#" @submit="saveProfile('familly_info')" :validation-schema="schema_family"
                  v-slot="{ errors }">
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-borderless d-flex">
                        <tbody>
                          <tr>
                            <td><strong>Father Name:</strong></td>
                            <td>
                              <Field type="text" v-model="familly_info.father_name" class="form-control"
                                autocomplete="off" name="father_name" :class="{ 'is-invalid': errors.father_name }" />
                              <div class="invalid-feedback">{{ errors.father_name }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Spouse Name:</strong></td>
                            <td>
                              <Field type="text" v-model="familly_info.spouse_name" class="form-control"
                                autocomplete="off" name="spouse_name" :class="{ 'is-invalid': errors.spouse_name }" />
                              <div class="invalid-feedback">{{ errors.spouse_name }}</div>
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
                            <td>
                              <Field type="text" v-model="familly_info.mother_name" class="form-control"
                                name="mother_name" :class="{ 'is-invalid': errors.mother_name }" />
                              <div class="invalid-feedback">{{ errors.mother_name }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Number Of Child:</strong></td>
                            <td>
                              <Field type="text" v-model="familly_info.number_of_child" name="number_of_child"
                                class="form-control" :class="{ 'is-invalid': errors.number_of_child }" />
                              <div class="invalid-feedback">{{ errors.number_of_child }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Save
                  </button>
                </Form>
              </div>
              <div class="tab-pane fade show" id="emergency-contact" role="tabpanel"
                aria-labelledby="pills-emergency-contact">
                <Form class="form" action="#" @submit="saveProfile('emergency_contact')"
                  :validation-schema="schema_emergency_contact" v-slot="{ errors }">
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-borderless d-flex">
                        <tbody>
                          <tr>
                            <td><strong>Name:</strong></td>
                            <td>
                              <Field type="text" v-model="emergency_contact.emergency_name" class="form-control"
                                name="emergency_name" :class="{ 'is-invalid': errors.emergency_name }" />
                              <div class="invalid-feedback">{{ errors.emergency_name }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Mobile No:</strong></td>
                            <td>
                              <Field type="text" v-model="emergency_contact.emergency_phn_number" class="form-control"
                                name="emergency_phn_number" :class="{ 'is-invalid': errors.emergency_phn_number }" />
                              <div class="invalid-feedback">{{ errors.emergency_phn_number }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Address:</strong></td>
                            <td>
                              <Field type="text" v-model="emergency_contact.emergency_addr" class="form-control"
                                name="emergency_addr" :class="{ 'is-invalid': errors.emergency_addr }" />
                              <div class="invalid-feedback">{{ errors.emergency_addr }}</div>
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
                              <Field type="text" v-model="emergency_contact.emergency_relation" class="form-control"
                                name="emergency_relation" :class="{ 'is-invalid': errors.emergency_relation }" />
                              <div class="invalid-feedback">{{ errors.emergency_relation }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Email:</strong></td>
                            <td>
                              <Field type="text" v-model="emergency_contact.emergency_email" class="form-control"
                                name="emergency_email" :class="{ 'is-invalid': errors.emergency_email }" />
                              <div class="invalid-feedback">{{ errors.emergency_email }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>District :</strong></td>
                            <td>
                              <Field type="text" v-model="emergency_contact.emergency_district" class="form-control"
                                name="emergency_district" :class="{ 'is-invalid': errors.emergency_district }" />
                              <div class="invalid-feedback">{{ errors.emergency_district }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Save
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal End -->

    <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="200" :noCircle="true" :params="params"
      :headers="headers" :langExt="langExt" langType="en" img-format="png">
    </my-upload>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { VueDraggableNext } from "vue-draggable-next";
import { Form, Field } from 'vee-validate';
import * as Yup from "yup";

export default {
  components: {
    Form, Field,
    myUpload,
    draggable: VueDraggableNext,
  },
  props: ["data"],
  data() {
    const schema_basicInfo = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.date()
        .required("Date of Birth date is required")
        .typeError("Invalid date format"), // Custom error message for date format
      blood_group: Yup.string().required("Blood Group is required"),
      nid_number: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("NID Number is required"),
      passport_number: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Passport Number is required"),
      mobileNumber: Yup.string()
        .matches(/^\d+$/, "Phone should only contain numbers")
        .required("Phone is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      // password: Yup.string().required("Password is required"),
      // designation: Yup.string().required('Designation is required'),
    });

    const schema_addr = Yup.object().shape({
      present_addr_houseno: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Present Address House Number is required"),
      present_addr_area: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Present Address Area is required"),
      present_addr_district: Yup.string()
        .required("Present Address District is required"),
      present_addr_roadno: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Present Address Road Number is required"),
      present_addr_upazila: Yup.string()
        .required("Present Address Upazila is required"),
      present_addr_postcode: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Present Address Postcode is required"),
      permanent_addr_houseno: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Permanent Address House Number is required"),
      permanent_addr_area: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Permanent Address Area is required"),
      permanent_addr_district: Yup.string()
        .required("Permanent Address District is required"),
      permanent_addr_roadno: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Permanent Address Road Number is required"),
      permanent_addr_upazila: Yup.string()
        .required("Permanent Address Upazila is required"),
      permanent_addr_postcode: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Permanent Address Postcode is required"),
    });

    const schema_department = Yup.object().shape({
      // department: Yup.string().required('Department is required'),
      joining_date: Yup.date()
        .required("Joining date is required")
        .typeError("Invalid date format"), // Custom error message for date format
      // designation: Yup.string().required('Designation is required'),
      job_location: Yup.string().required("Job location is required"),
    });

    const schema_family = Yup.object().shape({
      father_name: Yup.string().required('Exam name is required'),
      mother_name: Yup.string().required('Institute name is required'),
      spouse_name: Yup.string().required('District is required'),
      number_of_child: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Grade is required"),

    });
    const schema_emergency_contact = Yup.object().shape({
      emergency_name: Yup.string().required('Exam name is required'),
      emergency_relation: Yup.string().required('Institute name is required'),
      emergency_phn_number: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Grade is required"),
      emergency_email: Yup.string().required('Institute name is required').email("Email is invalid"),
      emergency_addr: Yup.string().required('Institute name is required'),
      emergency_district: Yup.string().required('Institute name is required'),


    });
    const schema_education = Yup.object().shape({
      exam_name: Yup.string().required('Exam name is required'),
      institute_name: Yup.string().required('Institute name is required'),
      district: Yup.string().required('District is required'),
      subject: Yup.string().required('Subject is required'),
      upazila: Yup.string().required('Upazila is required'),
      passing_year: Yup.date()
        .required("Passing year is required")
        .typeError("Invalid date format"),
      grade: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Grade is required"),
    });
    return {
      backend_url: process.env.VUE_APP_API_URL,
      schema_basicInfo, schema_addr, schema_department, schema_family, schema_education, schema_emergency_contact,
      //image cropper
      show: false,
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: "",

      langExt: {
        hint: "Click or drag the file here to upload",
        loading: "Uploading…",
        noSupported:
          "Browser is not supported, please use IE10+ or other browsers",
        success: "Upload success",
        fail: "Upload failed",
        preview: "Preview",
        btn: {
          off: "Cancel",
          close: "Close",
          back: "Back",
          save: "Crop",
        },
        error: {
          onlyImg: "Image only",
          outOfSize: "Image exceeds size limit: ",
          lowestPx: "Image's size is too low. Expected at least: ",
        },
      },

      empData: {},
      departments: [],
      designations: [],
      basicInfo: {
        name: "",
        mobileNumber: "",
        gender: '',
        date_of_birth: '',
        email: "",
        password: "",
        designation: "",
        designation_id: "",
        image: "",
        blood_group: "",
        nid_number: "",
        passport_number: ""
      },

      addressDetails: {
        present_addr_houseno: "",
        present_addr_roadno: "",
        present_addr_area: "",
        present_addr_upazila: "",
        present_addr_district: "",
        present_addr_postcode: "",

        permanent_addr_houseno: "",
        permanent_addr_roadno: "",
        permanent_addr_area: "",
        permanent_addr_upazila: "",
        permanent_addr_district: "",
        permanent_addr_postcode: "",
      },
      jobs: {
        department: "",
        designation: "",
        joining_date: "",
        job_location: "",
      },

      educationArr: [],

      familly_info: {
        father_name: "",
        mother_name: "",
        spouse_name: "",
        number_of_child: "",
      },
      emergency_contact: {
        emergency_name: "",
        emergency_relation: "",
        emergency_phn_number: "",
        emergency_email: "",
        emergency_addr: "",
        emergency_district: "",
      },
    };
  },

  computed: {},

  methods: {
    setData() {
      this.empData = this.data;
      this.basicInfo.name = this.data.name;
      this.basicInfo.mobileNumber = this.data.mobile_number;
      this.basicInfo.gender = this.data.gender;
      this.basicInfo.date_of_birth = this.data.date_of_birth;
      this.basicInfo.email = this.data.email == "null" ? "" : this.data.email;
      this.basicInfo.status = this.data.status;
      this.basicInfo.designation = this.data.designation;
      this.basicInfo.blood_group = this.data.blood_group;
      this.basicInfo.nid_number = this.data.nid_number;
      this.basicInfo.passport_number = this.data.passport_number;
      this.basicInfo.designation_id = this.data.designation_id;
      this.imgDataUrl =
        this.base_url_for_resource + "images/" + this.data.image;

      this.addressDetails.present_addr_houseno = this.data.present_addr_houseno;
      this.addressDetails.present_addr_roadno = this.data.present_addr_roadno;
      this.addressDetails.present_addr_area = this.data.present_addr_area;
      this.addressDetails.present_addr_upazila = this.data.present_addr_upazila;
      this.addressDetails.present_addr_district =
        this.data.present_addr_district;
      this.addressDetails.present_addr_postcode =
        this.data.present_addr_postcode;
      this.addressDetails.permanent_addr_houseno =
        this.data.permanent_addr_houseno;
      this.addressDetails.permanent_addr_roadno =
        this.data.permanent_addr_roadno;
      this.addressDetails.permanent_addr_area = this.data.permanent_addr_area;
      this.addressDetails.permanent_addr_upazila =
        this.data.permanent_addr_upazila;
      this.addressDetails.permanent_addr_district =
        this.data.permanent_addr_district;
      this.addressDetails.permanent_addr_postcode =
        this.data.permanent_addr_postcode;

      this.jobs.department = this.data.department;
      this.jobs.designation = this.data.designation;
      this.jobs.job_location = this.data.job_location;
      this.jobs.joining_date = this.data.joining_date;

      this.educationArr = JSON.parse(this.data.education_history);

      this.familly_info.father_name = this.data.father_name;
      this.familly_info.mother_name = this.data.mother_name;
      this.familly_info.spouse_name = this.data.spouse_name;
      this.familly_info.number_of_child = this.data.number_of_child;

      this.emergency_contact.emergency_name = this.data.emergency_name;
      this.emergency_contact.emergency_relation = this.data.emergency_relation;
      this.emergency_contact.emergency_phn_number =
        this.data.emergency_phn_number;
      this.emergency_contact.emergency_email = this.data.emergency_email;
      this.emergency_contact.emergency_addr = this.data.emergency_addr;
      this.emergency_contact.emergency_district = this.data.emergency_district;
    },

    onDrag() {
      console.log(this.educationArr);
    },

    getDepartmentList() {
      this.axios.get(this.backend_url + "getDepartment").then((res) => {
        this.departments = res.data.data;
        console.log(this.departments);
      });
    },
    getDesignationList() {
      this.axios.get(this.backend_url + "getDesignationMgt").then((res) => {
        this.designations = res.data.data;
        console.log(this.designations);
      });
    },

    addNewEducationHistory: function () {
      this.educationArr.push({
        exam_name: "",
        institute_name: "",
        district: "",
        upazila: "",
        subject: "",
        passing_year: "",
        grade: "",
      });
    },

    removeEducationHistory: function (index) {
      this.educationArr.splice(index, 1);
    },
    cancelEdit() {
      this.$emit("cancel"); // Emit the 'cancel' event
    },
    saveProfile(type) {
      let formData = new FormData();
      formData.append("user_id", this.empData.user_id);
      if (type == "basicInfo") {
        formData.append("name", this.basicInfo.name);
        formData.append("mobile_number", this.basicInfo.mobileNumber);
        formData.append("gender", this.basicInfo.gender);
        formData.append("date_of_birth", this.basicInfo.date_of_birth);
        formData.append("email", this.basicInfo.email);
        formData.append("designation", this.basicInfo.designation);
        formData.append("blood_group", this.basicInfo.blood_group);
        formData.append("nid_number", this.basicInfo.nid_number);
        formData.append("passport_number", this.basicInfo.passport_number);
        formData.append("image", this.basicInfo.image);
        formData.append("status", this.basicInfo.status);

      }
      if (type == "addressDetail") {
        formData.append(
          "present_addr_houseno",
          this.addressDetails.present_addr_houseno
        );
        formData.append(
          "present_addr_roadno",
          this.addressDetails.present_addr_roadno
        );
        formData.append(
          "present_addr_area",
          this.addressDetails.present_addr_area
        );
        formData.append(
          "present_addr_upazila",
          this.addressDetails.present_addr_upazila
        );
        formData.append(
          "present_addr_district",
          this.addressDetails.present_addr_district
        );
        formData.append(
          "present_addr_postcode",
          this.addressDetails.present_addr_postcode
        );

        formData.append(
          "permanent_addr_houseno",
          this.addressDetails.permanent_addr_houseno
        );
        formData.append(
          "permanent_addr_roadno",
          this.addressDetails.permanent_addr_roadno
        );
        formData.append(
          "permanent_addr_area",
          this.addressDetails.permanent_addr_area
        );
        formData.append(
          "permanent_addr_upazila",
          this.addressDetails.permanent_addr_upazila
        );
        formData.append(
          "permanent_addr_district",
          this.addressDetails.permanent_addr_district
        );
        formData.append(
          "permanent_addr_postcode",
          this.addressDetails.permanent_addr_postcode
        );
      }

      if (type == "jobs") {
        formData.append("department", this.jobs.department);
        formData.append("designation", this.jobs.designation);
        formData.append("joining_date", this.jobs.joining_date);
        formData.append("job_location", this.jobs.job_location);
      }

      if (type == "education_history") {
        formData.append("education_history", JSON.stringify(this.educationArr));
      }

      if (type == "familly_info") {
        formData.append("father_name", this.familly_info.father_name);
        formData.append("mother_name", this.familly_info.mother_name);
        formData.append("spouse_name", this.familly_info.spouse_name);
        formData.append("number_of_child", this.familly_info.number_of_child);
      }

      if (type == "emergency_contact") {
        formData.append(
          "emergency_name",
          this.emergency_contact.emergency_name
        );
        formData.append(
          "emergency_relation",
          this.emergency_contact.emergency_relation
        );
        formData.append(
          "emergency_phn_number",
          this.emergency_contact.emergency_phn_number
        );
        formData.append(
          "emergency_email",
          this.emergency_contact.emergency_email
        );
        formData.append(
          "emergency_addr",
          this.emergency_contact.emergency_addr
        );
        formData.append(
          "emergency_district",
          this.emergency_contact.emergency_district
        );
      }

      this.axios
        .post(this.backend_url + "user/updateProfile", formData)
        .then((res) => {
          console.log(res.data);
          this.$toast.success("Employee Updated successfully.", {
            position: "top-right",
          });
        })
        .error((res) => {
          this.$toast.error(res.message, {
            position: "top-right",
          });
        });
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
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      this.basicInfo.image = imgDataUrl;
      console.log("field: " + field);
      console.log("dataUrl: " + imgDataUrl);
      this.show = !this.show;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },

  created() {
    this.getDepartmentList();
    this.getDesignationList();
    this.setData();
  },

  watch: {
    data(newValue) {
      this.empData = newValue;
      this.basicInfo.name = newValue.name;
      this.basicInfo.mobileNumber = newValue.mobile_number;
      this.basicInfo.email = newValue.email == "null" ? "" : newValue.email;
      this.basicInfo.designation = newValue.designation;
      this.basicInfo.designation_id = newValue.designation_id;
      this.imgDataUrl = this.base_url_for_resource + "images/" + newValue.image;

      this.addressDetails.present_addr_houseno = newValue.present_addr_houseno;
      this.addressDetails.present_addr_roadno = newValue.present_addr_roadno;
      this.addressDetails.present_addr_area = newValue.present_addr_area;
      this.addressDetails.present_addr_upazila = newValue.present_addr_upazila;
      this.addressDetails.present_addr_district =
        newValue.present_addr_district;
      this.addressDetails.present_addr_postcode =
        newValue.present_addr_postcode;
      this.addressDetails.permanent_addr_houseno =
        newValue.permanent_addr_houseno;
      this.addressDetails.permanent_addr_roadno =
        newValue.permanent_addr_roadno;
      this.addressDetails.permanent_addr_area = newValue.permanent_addr_area;
      this.addressDetails.permanent_addr_upazila =
        newValue.permanent_addr_upazila;
      this.addressDetails.permanent_addr_district =
        newValue.permanent_addr_district;
      this.addressDetails.permanent_addr_postcode =
        newValue.permanent_addr_postcode;

      this.jobs.department = newValue.department;
      this.jobs.designation = newValue.designation;
      this.jobs.job_location = newValue.job_location;
      this.jobs.joining_date = newValue.joining_date;

      this.educationArr = JSON.parse(newValue.education_history);

      this.familly_info.father_name = newValue.father_name;
      this.familly_info.mother_name = newValue.mother_name;
      this.familly_info.spouse_name = newValue.spouse_name;
      this.familly_info.number_of_child = newValue.number_of_child;

      this.emergency_contact.emergency_name = newValue.emergency_name;
      this.emergency_contact.emergency_relation = newValue.emergency_relation;
      this.emergency_contact.emergency_phn_number =
        newValue.emergency_phn_number;
      this.emergency_contact.emergency_email = newValue.emergency_email;
      this.emergency_contact.emergency_addr = newValue.emergency_addr;
      this.emergency_contact.emergency_district = newValue.emergency_district;
    },
  },
};
</script>

<style>
.ui.inverted.dimmer {
  color: #009688 !important;
}

.cropper {
  height: 400px;
  width: 400px;
  background: #ddd;
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