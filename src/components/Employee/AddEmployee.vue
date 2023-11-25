<template>
  <div>
    <div class="card card-default">
      <div class="card-header">
        <strong> Add New Employee </strong>
        <button class="btn btn-sm btn-secondary float-right" @click="cancelAdd">
          Cancel
        </button>
      </div>
      <div class="card-body">
        <section class="register" v-if="!hasSeenCongrats">
          <div class="register-stepper">
            <div class="step" :class="{ 'step-active': step === 1, 'step-done': step > 1 }">
              <span class="step-number">1</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 2, 'step-done': step > 2 }">
              <span class="step-number">2</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 3, 'step-done': step > 3 }">
              <span class="step-number">3</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 4, 'step-done': step > 4 }">
              <span class="step-number">4</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 5, 'step-done': step > 5 }">
              <span class="step-number">5</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 6, 'step-done': step > 6 }">
              <span class="step-number">6</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 7, 'step-done': step > 7 }">
              <span class="step-number">7</span>
            </div>
            <div class="step" :class="{ 'step-active': step === 8, 'step-done': step > 8 }">
              <span class="step-number">8</span>
            </div>
          </div>

          <transition name="slide-fade">
            <section v-show="step === 1">
              <h3 class="text-center text-dark">
                <span class="s-title">Basic Information</span>
              </h3>
              <Form class="form" method="post" action="#" @submit="next" :validation-schema="schema_basicInfo"
                v-slot="{ errors }">
                <div class="p-2">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="">
                        <div class="bg-light p-2 text-center" style="max-width: 270px; margin: 0 auto">
                          <img :src="imgDataUrl" class="d-block" width="250" />
                          <a class="btn d-block btn-info text-white mt-1" @click="toggleShow">Profile Image</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      {{ basicInfo.name }}
                      <div class="input-group mb-4 mt-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Name:</span>
                        </div>
                        <Field type="text" required class="form-control" v-model="basicInfo.name" name="name"
                          :class="{ 'is-invalid': errors.name }" />
                        <div class="invalid-feedback">{{ errors.name }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Designation:</span>
                        </div>
                        <Field name="designation" as="select" v-model="basicInfo.designation" class="form-control"
                          :class="{ 'is-invalid': errors.designation }">
                          <option :value="designation.id" v-for="designation in designations" :key="designation.id">
                            {{ designation.designation_name }}
                          </option>
                        </Field>
                        <div class="invalid-feedback">{{ errors.department }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Department Name:</span>
                        </div>
                        <Field name="department" as="select" v-model="basicInfo.department" class="form-control"
                          :class="{ 'is-invalid': errors.department }">
                          <option :value="department.id" v-for="department in departments" :key="department.id">
                            {{ department.dept_name }}
                          </option>
                        </Field>
                        <div class="invalid-feedback">{{ errors.department }}</div>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Gender:</span>
                        </div>
                        <Field name="gender" as="select" v-model="basicInfo.gender" class="form-control"
                          :class="{ 'is-invalid': errors.gender }">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                        <div class="invalid-feedback">{{ errors.gender }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Date of Birth</span>
                        </div>
                        <Field type="date" v-model="basicInfo.date_of_birth" class="form-control" autocomplete="off"
                          name="date_of_birth" :class="{ 'is-invalid': errors.date_of_birth }" />
                        <div class="invalid-feedback">{{ errors.date_of_birth }}</div>

                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Mobile Number:</span>
                        </div>
                        <Field type="tel" required class="form-control" v-model="basicInfo.mobileNumber" name="phone"
                          :class="{ 'is-invalid': errors.phone }" />
                        <div class="invalid-feedback">{{ errors.phone }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Email:</span>
                        </div>
                        <Field type="email" required class="form-control" v-model="basicInfo.email" name="email"
                          :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                      </div>
                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Password:</span>
                        </div>
                        <Field type="password" required class="form-control" v-model="basicInfo.password" name="password"
                          :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                      </div>





                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Blood Group:</span>
                        </div>
                        <Field name="blood_group" type="text" v-model="basicInfo.blood_group" class="form-control"
                          :class="{ 'is-invalid': errors.blood_group }">
                        </Field>
                        <div class="invalid-feedback">{{ errors.blood_group }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">NID Number:</span>
                        </div>
                        <Field name="nid_number" type="number" v-model="basicInfo.nid_number" class="form-control"
                          :class="{ 'is-invalid': errors.nid_number }">
                        </Field>
                        <div class="invalid-feedback">{{ errors.nid_number }}</div>
                      </div>

                      <div class="input-group mb-4">
                        <div class="input-group-append">
                          <span class="input-group-text">Passport Number:</span>
                        </div>
                        <Field name="passport_number" type="number" v-model="basicInfo.passport_number"
                          class="form-control" :class="{ 'is-invalid': errors.passport_number }">
                        </Field>
                        <div class="invalid-feedback">{{ errors.passport_number }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                  <p class="cta-color text-right">
                    <span class="link_wrap">
                      <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                          class="fa fa-arrow-right text-white"></i></button>
                    </span>
                  </p>
                </div>

              </Form>
            </section>
          </transition>
          <transition name="slide-fade">
            <section v-show="step === 2">
              <Form class="form" method="post" action="#" @submit="next" :validation-schema="schema_addr"
                v-slot="{ errors }">
                <h3 class="text-center text-dark">
                  <span class="s-title">Address</span>
                </h3>
                <!-- <h1>   {{ value.present_district }}</h1> -->
                <h5 class="text-left text-dark">Present Address</h5>
                <hr />
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">House No:</span>
                      </div>
                      <Field type="text" v-model="addressDetails.present_addr_houseno" class="form-control"
                        name="present_addr_houseno" :class="{ 'is-invalid': errors.present_addr_houseno }" />
                      <div class="invalid-feedback">{{ errors.present_addr_houseno }}</div>
                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Area/Word</span>
                      </div>
                      <Field type="number" v-model="addressDetails.present_addr_area" class="form-control"
                        name="present_addr_area" :class="{ 'is-invalid': errors.present_addr_area }" />
                      <div class="invalid-feedback">{{ errors.present_addr_area }}</div>

                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">District:</span>
                      </div>

                      <multiselect v-model="present_district" :options="district" :custom-label="nameWithPresentDistrict"
                        class="form-control p-0" :close-on-select="true" placeholder="Select one" label="name"
                        track-by="id">
                      </multiselect>
                    </div>





                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Road No:</span>
                      </div>
                      <Field type="number" v-model="addressDetails.present_addr_roadno" class="form-control"
                        name="present_addr_roadno" :class="{ 'is-invalid': errors.present_addr_roadno }" />
                      <div class="invalid-feedback">{{ errors.present_addr_roadno }}</div>

                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Upozila:</span>
                      </div>

                      <multiselect v-model="present_addr_upazila" :options="upozila"
                        :custom-label="nameWithPresentUpazila" class="form-control p-0" :close-on-select="true"
                        placeholder="Select one" label="name" track-by="id">
                      </multiselect>
                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Post Code:</span>
                      </div>
                      <Field type="number" v-model="addressDetails.present_addr_postcode" class="form-control"
                        name="present_addr_postcode" :class="{ 'is-invalid': errors.present_addr_postcode }" />
                      <div class="invalid-feedback">{{ errors.present_addr_postcode }}</div>
                    </div>
                  </div>
                </div>

                <h5 class="mt-4 text-dark">Parmanent Address</h5>
                <hr />
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">House No:</span>
                      </div>
                      <Field type="number" v-model="addressDetails.permanent_addr_houseno" class="form-control"
                        name="permanent_addr_houseno" :class="{ 'is-invalid': errors.permanent_addr_houseno }" />
                      <div class="invalid-feedback">{{ errors.permanent_addr_houseno }}</div>

                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Area/Word</span>
                      </div>
                      <Field type="number" v-model="addressDetails.permanent_addr_area" class="form-control"
                        name="permanent_addr_area" :class="{ 'is-invalid': errors.permanent_addr_area }" />
                      <div class="invalid-feedback">{{ errors.permanent_addr_area }}</div>

                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">District:</span>
                      </div>

                      <multiselect v-model="permanent_addr_district" :options="district"
                        :custom-label="nameWithPresentDistrict" class="form-control p-0" :close-on-select="true"
                        placeholder="Select one" label="name" track-by="id">
                      </multiselect>
                    </div>


                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Road No:</span>
                      </div>
                      <Field type="number" v-model="addressDetails.permanent_addr_roadno" class="form-control"
                        name="permanent_addr_roadno" :class="{ 'is-invalid': errors.permanent_addr_roadno }" />
                      <div class="invalid-feedback">{{ errors.permanent_addr_roadno }}</div>

                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Upozila:</span>
                      </div>

                      <multiselect v-model="permanent_addr_upazila" :options="upozila"
                        :custom-label="nameWithPresentUpazila" class="form-control p-0" :close-on-select="true"
                        placeholder="Select one" label="name" track-by="id">
                      </multiselect>
                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Post Code:</span>
                      </div>
                      <Field type="number" v-model="addressDetails.permanent_addr_postcode" class="form-control"
                        name="permanent_addr_postcode" :class="{ 'is-invalid': errors.permanent_addr_postcode }" />
                      <div class="invalid-feedback">{{ errors.permanent_addr_postcode }}</div>

                    </div>
                  </div>
                </div>

                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                          style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                            class="arrow-prev fa fa-arrow-left" style="margin-right: 6px;"></span>
                          Previous
                        </a>
                      </span>
                    </p>
                  </div>
                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>
          <transition name="slide-fade">

            <section v-show="step === 3">
              <Form class="form" action="#" @submit="next" :validation-schema="schema_department" v-slot="{ errors }">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Job</span>
                </h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Department Name:</span>
                      </div>
                      <Field name="department" as="select" v-model="jobs.department" class="form-control"
                        :class="{ 'is-invalid': errors.department }">
                        <option :value="department.id" v-for="department in departments" :key="department.id">
                          {{ department.dept_name }}
                        </option>
                      </Field>
                      <div class="invalid-feedback">{{ errors.department }}</div>
                    </div>
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Designation:</span>
                      </div>
                      <Field name="designation" as="select" v-model="jobs.designation" class="form-control"
                        :class="{ 'is-invalid': errors.designation }">
                        <option :value="designation.id" v-for="designation in designations" :key="designation.id">
                          {{ designation.designation_name }}
                        </option>
                      </Field>
                      <div class="invalid-feedback">{{ errors.department }}</div>
                    </div>

                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Joining Date:</span>
                      </div>
                      <Field type="date" v-model="jobs.joining_date" class="form-control" name="joining_date"
                        :class="{ 'is-invalid': errors.joining_date }" />
                      <div class="invalid-feedback">{{ errors.joining_date }}</div>
                    </div>
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Job Location:</span>
                      </div>
                      <Field type="text" v-model="jobs.job_location" class="form-control" name="job_location"
                        :class="{ 'is-invalid': errors.job_location }" />
                      <div class="invalid-feedback">{{ errors.job_location }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left" style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>
                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>

          <transition name="slide-fade">
            <section v-show="step === 4">
              <Form class="form" action="#" @submit="next" :validation-schema="schema_education" v-slot="{ errors }">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Education</span>
                </h3>
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
                      <div class="p-4 jumbutton">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Institute Name</span>
                              </div>
                              <Field type="text" v-model="education.institute_name" class="form-control"
                                autocomplete="off" name="institute_name"
                                :class="{ 'is-invalid': errors.institute_name }" />
                              <div class="invalid-feedback">{{ errors.institute_name }}</div>

                            </div>
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Designation:</span>
                              </div>
                              <Field name="designation" as="select" v-model="jobs.designation" class="form-control"
                                :class="{ 'is-invalid': errors.designation }">
                                <option :value="designation.id" v-for="designation in designations" :key="designation.id">
                                  {{ designation.designation_name }}
                                </option>
                              </Field>
                              <div class="invalid-feedback">{{ errors.department }}</div>
                            </div>
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Subject</span>
                              </div>
                              <Field type="text" v-model="education.subject" class="form-control" autocomplete="off"
                                name="subject" :class="{ 'is-invalid': errors.subject }" />
                              <div class="invalid-feedback">{{ errors.subject }}</div>

                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Upazila</span>
                              </div>
                              <Field type="text" v-model="education.upazila" class="form-control" autocomplete="off"
                                name="upazila" :class="{ 'is-invalid': errors.upazila }" />
                              <div class="invalid-feedback">{{ errors.upazila }}</div>
                            </div>
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Passing Year</span>
                              </div>
                              <Field type="date" v-model="education.passing_year" class="form-control" autocomplete="off"
                                name="passing_year" :class="{ 'is-invalid': errors.passing_year }" />
                              <div class="invalid-feedback">{{ errors.passing_year }}</div>

                            </div>
                            <div class="input-group mb-4">
                              <div class="input-group-append">
                                <span class="input-group-text">Grade</span>
                              </div>
                              <Field type="text" v-model="education.grade" name="grade" class="form-control"
                                autocomplete="off" :class="{ 'is-invalid': errors.grade }" />
                              <div class="invalid-feedback">{{ errors.grade }}</div>

                            </div>
                          </div>
                        </div>
                      </div>

                      <button class="btn btn-sm btn-danger float-right ml-1" type="button" style="
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
                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left" style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>
                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>

          <transition name="slide-fade">
            <section v-show="step === 5">
              <Form class="form" action="#" @submit="next" :validation-schema="schema_family" v-slot="{ errors }">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Family Information</span>
                </h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Father Name</span>
                      </div>
                      <Field type="text" v-model="familly_info.father_name" class="form-control" autocomplete="off"
                        name="father_name" :class="{ 'is-invalid': errors.father_name }" />
                      <div class="invalid-feedback">{{ errors.father_name }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Mother Name</span>
                      </div>
                      <Field type="text" v-model="familly_info.mother_name" class="form-control" name="mother_name"
                        :class="{ 'is-invalid': errors.mother_name }" />
                      <div class="invalid-feedback">{{ errors.mother_name }}</div>

                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Spouse Name</span>
                      </div>
                      <Field type="text" v-model="familly_info.spouse_name" class="form-control" autocomplete="off"
                        name="spouse_name" :class="{ 'is-invalid': errors.spouse_name }" />
                      <div class="invalid-feedback">{{ errors.spouse_name }}</div>

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Number Of Child</span>
                      </div>
                      <Field type="text" v-model="familly_info.number_of_child" name="number_of_child"
                        class="form-control" :class="{ 'is-invalid': errors.number_of_child }" />
                      <div class="invalid-feedback">{{ errors.number_of_child }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left" style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>
                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>

          <transition name="slide-fade">
            <section v-show="step === 6">
              <Form class="form" action="#" @submit="next" :validation-schema="schema_emergency_contact"
                v-slot="{ errors }">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Emergency Contact</span>
                </h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Name</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_name" class="form-control"
                        name="emergency_name" :class="{ 'is-invalid': errors.emergency_name }" />
                      <div class="invalid-feedback">{{ errors.emergency_name }}</div>


                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Relation</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_relation" class="form-control"
                        name="emergency_relation" :class="{ 'is-invalid': errors.emergency_relation }" />
                      <div class="invalid-feedback">{{ errors.emergency_relation }}</div>

                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Mobile No</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_phn_number" class="form-control"
                        name="emergency_phn_number" :class="{ 'is-invalid': errors.emergency_phn_number }" />
                      <div class="invalid-feedback">{{ errors.emergency_phn_number }}</div>

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Email</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_email" class="form-control"
                        name="emergency_email" :class="{ 'is-invalid': errors.emergency_email }" />
                      <div class="invalid-feedback">{{ errors.emergency_email }}</div>

                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Address</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_addr" class="form-control"
                        name="emergency_addr" :class="{ 'is-invalid': errors.emergency_addr }" />
                      <div class="invalid-feedback">{{ errors.emergency_addr }}</div>

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">District</span>
                      </div>
                      <Field type="text" v-model="emergency_contact.emergency_district" class="form-control"
                        name="emergency_district" :class="{ 'is-invalid': errors.emergency_district }" />
                      <div class="invalid-feedback">{{ errors.emergency_district }}</div>

                    </div>
                  </div>
                </div>

                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left " style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>
                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>

          <transition name="slide-fade">
            <section v-show="step === 7">
              <Form class="form" action="#" @submit="next" :validation-schema="schema_emergency_contact"
                v-slot="{ errors }">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Freedom Fighter</span>
                </h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Freedom Fighter Number:</span>
                      </div>
                      <Field type="number" v-model="freedomFighter.freedom_fighter_num" class="form-control"
                        name="freedom_fighter_num" :class="{ 'is-invalid': errors.freedom_fighter_num }"
                        style="width: 370px;" />
                      <div class="invalid-feedback">{{ errors.freedom_fighter_num }}</div>

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Freedom Fighter Sector:</span>
                      </div>
                      <Field type="text" v-model="freedomFighter.Sector" class="form-control" name="Sector"
                        :class="{ 'is-invalid': errors.Sector }" />
                      <div class="invalid-feedback">{{ errors.Sector }}</div>

                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-append">
                        <span class="input-group-text">Freedom Fighter Division:</span>
                      </div>
                      <Field type="text" v-model="freedomFighter.fighting_divi" class="form-control" name="fighting_divi"
                        :class="{ 'is-invalid': errors.fighting_divi }" />
                      <div class="invalid-feedback">{{ errors.fighting_divi }}</div>

                    </div>
                  </div>
                  <div class="col-md-6">

                  </div>
                </div>
                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left" style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>

                  <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                    <p class="cta-color text-right">
                      <span class="link_wrap">
                        <button href="" type="submit" value="Next" class="btn btn-success link_text bg-success"> Next <i
                            class="fa fa-arrow-right text-white"></i></button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>

            </section>
          </transition>


          <transition name="slide-fade">
            <section v-show="step === 8">
              <Form class="form" action="#" @submit="saveProfile(); saveFreedom()"
                :validation-schema="schema_emergency_contact">
                <h3 class="text-center text-dark mb-4">
                  <span class="s-title">Documents</span>
                </h3>
                <div class="col-12 mt-3 d-flex justify-content-end">
                  <button class="btn btn-primary" @click="addField">
                    Add Documents
                  </button>
                </div>
                <div class="container m-0 mb-2 ">

                  <div v-for="(field, index) in fields" :key="index">
                    <div class="d-flex flex-row p-3 card">
                      <div class="w-50">
                        <div class="mt-3 p-3 border">
                          <input class="form-control" v-model="field.field1" placeholder="Document Name">
                        </div>
                      </div>
                      <div class="w-25">
                        <div class="mt-3 p-3 border d-flex flex-column align-items-center">
                          <input type="file" class="form-control" id="fileInput" @change="handleFileChange">
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



                <div class="form-group cta-step">
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <div class="cta prev">
                          <p class="cta-color">
                            <span class="link_wrap">
                              <a class="link_text bg-secondary" href="#" @click.prevent="prev()"
                                style="display: flex;align-items: center;padding: 7px;width: 93px;height: 35px;"><span
                                  class="arrow-prev fa fa-arrow-left " style="margin-right: 6px;"></span>
                                Previous
                              </a>
                            </span>
                          </p>
                        </div>
                      </span>
                    </p>
                  </div>
                  <div class="cta prev">
                    <p class="cta-color">
                      <span class="link_wrap">
                        <button type="submit" class="link_text bg-success" href="#"><span class="arrow-prev"></span>Save


                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </section>
          </transition>

        </section>
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
import pImage from "@/assets/img/avatar.png";
import { Form, Field } from 'vee-validate';
import * as Yup from "yup";
const address = require('@bangladeshi/bangladesh-address');
import Multiselect from 'vue-multiselect';

export default {
  components: {
    myUpload,
    draggable: VueDraggableNext,
    Form, Field, Multiselect
  },
  props: ["data"],
  data() {
    //     blood_group
    // nid_number
    // passport_number
    const schema_basicInfo = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      //  gender: Yup.string().required("Gender is required"),
      /* date_of_birth: Yup.date()
         .required("Date of Birth date is required")
         .typeError("Invalid date format"), // Custom error message for date format
       blood_group: Yup.string().required("Blood Group is required"),
       nid_number: Yup.string()
         .matches(/^\d+$/, "Only numbers are allowed")
         .required("NID Number is required"),
       passport_number: Yup.string()
         .matches(/^\d+$/, "Only numbers are allowed")
         .required("Passport Number is required"),*/
      phone: Yup.string()
        .matches(/^\d+$/, "Phone should only contain numbers")
        .required("Phone is required"),
      // email: Yup.string()
      //   .required("Email is required")
      //   .email("Email is invalid"),
      // password: Yup.string().required("Password is required"),
      // designation: Yup.string().required('Designation is required'),
    });



    const schema_addr = Yup.object().shape({
      // present_addr_houseno: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Present Address House Number is required"),
      // present_addr_area: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Present Address Area is required"),
      // present_addr_district: Yup.string()
      //   .required("Present Address District is required"),
      // present_addr_roadno: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Present Address Road Number is required"),
      // present_addr_upazila: Yup.string()
      //   .required("Present Address Upazila is required"),
      // present_addr_postcode: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Present Address Postcode is required"),
      // permanent_addr_houseno: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Permanent Address House Number is required"),
      // permanent_addr_area: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Permanent Address Area is required"),
      // permanent_addr_district: Yup.string()
      //   .required("Permanent Address District is required"),
      // permanent_addr_roadno: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Permanent Address Road Number is required"),
      // permanent_addr_upazila: Yup.string()
      //   .required("Permanent Address Upazila is required"),
      // permanent_addr_postcode: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Permanent Address Postcode is required"),
    });

    const schema_department = Yup.object().shape({
      // department: Yup.string().required('Department is required'),
      // joining_date: Yup.date()
      //   .required("Joining date is required")
      //   .typeError("Invalid date format"), // Custom error message for date format
      // designation: Yup.string().required('Designation is required'),
      // job_location: Yup.string().required("Job location is required"),
    });

    const schema_education = Yup.object().shape({
      // exam_name: Yup.string().required('Exam name is required'),
      // institute_name: Yup.string().required('Institute name is required'),
      // district: Yup.string().required('District is required'),
      // subject: Yup.string().required('Subject is required'),
      // upazila: Yup.string().required('Upazila is required'),
      // passing_year: Yup.date()
      //   .required("Passing year is required")
      //   .typeError("Invalid date format"),
      // grade: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Grade is required"),
    });

    const schema_family = Yup.object().shape({
      // father_name: Yup.string().required('Exam name is required'),
      // mother_name: Yup.string().required('Institute name is required'),
      // spouse_name: Yup.string().required('District is required'),
      // number_of_child: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Grade is required"),

    });

    const schema_emergency_contact = Yup.object().shape({
      // emergency_name: Yup.string().required('Exam name is required'),
      // emergency_relation: Yup.string().required('Institute name is required'),
      // emergency_phn_number: Yup.string()
      //   .matches(/^\d+$/, "Only numbers are allowed")
      //   .required("Grade is required"),
      // emergency_email: Yup.string().required('Institute name is required').email("Email is invalid"),
      // emergency_addr: Yup.string().required('Institute name is required'),
      // emergency_district: Yup.string().required('Institute name is required'),


    });
    return {
      schema_basicInfo,
      schema_addr, schema_department, schema_education, schema_family, schema_emergency_contact,
      backend_url: process.env.VUE_APP_API_URL, divisions: [], district: [], upozila: [],
      //image cropper
      show: false,
      params: {
        token: "123456798",
        name: "avatar",
      },
    
      headers: {
        smail: "*_~",
      },
      imgDataUrl: pImage,

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
        department: "",
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

      educationArr: [
        {
          exam_name: "",
          institute_name: "",
          district: "",
          upazila: "",
          subject: "",
          passing_year: "",
          grade: "",
        },
      ],

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
      freedomFighter: {
        freedom_fighter_num: "",
        fighting_divi: "",
        Sector: ""
      },
      fields: [{ firstName: "", lastName: "" }],
      steps: {},
      step: 1,
      present_district: { district: '' },
      present_addr_upazila: { upozila: '' },
      permanent_addr_district: { district: '' },
      permanent_addr_upazila: { upozila: '' }

    };
  },

  computed: {},

  methods: {
    deleteField(index) {
        this.fields.splice(index, 1);
      },
      addField() {
        this.fields.push({ firstName: "", lastName: "" });
      },
    handleFileChange(event) {
      // Access the selected file using event.target.files[0]
      const selectedFile = event.target.files[0];

      // Do something with the selected file, such as updating your data
      this.field.field2 = selectedFile;
    },
    nameWithPresentDistrict({ district }) {
      return `${district}`
    },
    nameWithPresentUpazila({ upozila }) {
      return `${upozila}`
    },

    prev() {
      this.step--;
    },

    next() {
      this.step++;
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
    cancelAdd() {
      this.$emit("cancel"); // Emit the 'cancel' event
    },
    saveFreedom() {
      console.log(this.freedomFighter);

    },
    saveProfile() {
      let formData = new FormData();
      formData.append("name", this.basicInfo.name);
      formData.append("mobileNumber", this.basicInfo.mobileNumber);
      formData.append("email", this.basicInfo.email);
      formData.append("designation", this.basicInfo.designation);
      formData.append("department", this.basicInfo.department);
      formData.append("blood_group", this.basicInfo.blood_group);
      formData.append("gender", this.basicInfo.gender);
      formData.append("nid_number", this.basicInfo.nid_number);
      formData.append("date_of_birth", this.basicInfo.date_of_birth);
      formData.append("passport_number", this.basicInfo.passport_number);
      formData.append("image", this.basicInfo.image);
      formData.append("image", this.basicInfo.password);
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
        this.present_addr_upazila.upozila
      );
      formData.append(
        "present_addr_district",
        this.present_district.district
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
        this.permanent_addr_upazila.upozila
      );
      formData.append(
        "permanent_addr_district",
        this.permanent_addr_district.district
      );
      formData.append(
        "permanent_addr_postcode",
        this.addressDetails.permanent_addr_postcode
      );

      formData.append("department", this.jobs.department);
      formData.append("designation", this.jobs.designation);
      formData.append("joining_date", this.jobs.joining_date);
      formData.append("job_location", this.jobs.job_location);

      formData.append("education_history", JSON.stringify(this.educationArr));

      formData.append("father_name", this.familly_info.father_name);
      formData.append("mother_name", this.familly_info.mother_name);
      formData.append("spouse_name", this.familly_info.spouse_name);
      formData.append("number_of_child", this.familly_info.number_of_child);

      formData.append("emergency_name", this.emergency_contact.emergency_name);
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
      formData.append("emergency_addr", this.emergency_contact.emergency_addr);
      formData.append(
        "emergency_district",
        this.emergency_contact.emergency_district
      );

      console.log(formData);
      this.axios
        .post(this.backend_url + "user/addProfile", formData)
        .then((res) => {


          console.log(res.data);
          this.$toast.success("Employee Updated successfully.", {
            position: "top-right",
          });
          window.location.href = '/employees';

          // another request 
          this.axios
            .post(this.backend_url + "addFreedomFighter", this.freedomFighter)
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

          // end



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

    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      this.basicInfo.image = imgDataUrl;
      console.log("field: " + field);
      console.log("dataUrl: " + imgDataUrl);
      this.show = !this.show;
    },

    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },

    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },

  created() {
    this.getDepartmentList();
    this.getDesignationList();
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
};
</script>

<style>
.multiselect__option--selected.multiselect__option--highlight {
  background: #41b883 !important;
  color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #41b883 !important;
  content: attr(data-deselect);
  color: #fff;
}

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

.pen-description {
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}

.pen-description h1 {
  text-align: center;
  margin-top: 2rem;
  color: #fff;
}

.pen-description p {
  margin: 0;
  line-height: 1;
}

.pen-description .pen-copyright img {
  border-radius: 25px;
  padding: 5px;
  margin: 5px;
  transition: box-shadow 0.5s ease-in-out;
}

.pen-description .pen-copyright:hover img {
  box-shadow: 0 10px 20px #0e2101;
}

.register {
  display: block;
  color: #fff;
  max-width: auto;
  margin: 0 auto 2rem;
  padding: 2rem;
  background: #fff;
}

.register-icon {
  display: flex;
  background: #fff;
  border-radius: 2rem;
  width: 50px;
  height: 50px;
  padding: 1rem;
  margin: -50px auto 20px;
}

.register-icon-item {
  width: 100%;
}

.register-title {
  font-weight: 300;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-align: center;
  color: #fff;
  padding: 0 2rem;
  margin-top: 2rem;
}

.register-stepper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin: 0 auto 1.5em;
}

.register-stepper::before {
  z-index: 0;
  content: "";
  display: block;
  position: absolute;
  height: 2px;
  top: calc(50% - 1px);
  background: #275b8f;
  width: calc(100% - 20px);
}

.register-stepper .step {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 2px solid #275b8f;
  color: #000000;
  background-color: #fff;
  border-radius: 50%;
  min-width: 35px;
  min-height: 35px;
  line-height: 30px;
  font-size: 16px;
}

.register-stepper .step-active {
  color: #ffffff;
  background-color: #10477e;
  border-color: #275b8f;
}

.register-stepper .step-done {
  color: #a7e4b5;
  border-color: #a7e4b5;
}

.register-stepper .step-number {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  line-height: 1;
  vertical-align: middle;
}

.cta-step {
  text-align: center;
}

.cta-step div {
  display: inline-block;
  margin: 20px;
}

.link_text {
  padding: 5px 10px;
  background: #eeeeee;
  color: #333333;
  line-height: 24px;
  display: inline-block;
  border: none;
  border-radius: 5px;
  width: 83px;
  text-decoration: none;
}

.s-title {
  position: relative;
}

.s-title::after {
  position: absolute;
  bottom: -10px;
  content: "";
  height: 3px;
  background: #275b8f;
  left: 0;
}
</style>