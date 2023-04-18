<template>
    <div class="card card-default">
       <div class="card-header">
           <h3 class="card-title"><strong>Registers </strong></h3>
           
       </div> 

       <div class="card-body">
            <!-- Add New Guest Button -->
            <div class="row mb-2">
                <div class="col-8">
                    <button class="add-button" @click="openAddNewGuestModal">
                        <font-awesome-icon icon="fa-solid  fa-user-plus" />
                        Add New Guest 
                    </button>
                </div>
            </div>

           <div class="row">
              <div class="col-md-12">
                <table class="table table-hover" id="datatable">
                    <thead>
                        <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Type</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Official Designation</th>
                        <th scope="col">Country</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(registeredGuest,index) in registeredGuests" :key="registeredGuest.id">
                        <th scope="row">{{index+1}}</th>
                        <td> {{registeredGuest.registration_type}}</td>
                        <td> {{registeredGuest.full_name}}</td>
                        <td> {{registeredGuest.official_designation == 'undefined' ? 'NA' : registeredGuest.official_designation}}</td>
                        <td>{{registeredGuest.country}}</td>
                        <td>
                            <button
                            class="btn btn-warning mx-2 btn-sm"
                            title="Edit Registered Guest"
                            @click="onEdit(registeredGuest)"
                            >
                            <font-awesome-icon icon="fa-solid  fa-pencil" />
                            </button>
                            |
                            <button
                            class="btn btn-info mx-2 btn-sm"
                            title="Details Information For Registered Guest"
                            @click="onShow(registeredGuest)">
                            <font-awesome-icon icon="fa-solid  fa-info-circle" />
                            </button>
                            |
                            <button
                            class="btn btn-info mx-2 btn-sm"
                            title="Mail to Registered Guest"
                            @click="onReply(registeredGuest)">
                            <font-awesome-icon icon="fa-solid fa-reply" />
                            </button>
                            |
                            <button
                            class="btn btn-danger mx-2 btn-sm"
                            title="Delete Registered Guest"
                            @click="onDelete(registeredGuest.id)">
                            <font-awesome-icon icon="fa-solid  fa-trash" />
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>      
              </div> 
           </div>
           <loader v-if="spinnerOn"></loader>
       </div>
    </div>


    <!-- Modal For Adding New Guest -->
    <div class="modal fade" id="modalForAddingNewGuest" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Guest  </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Form @submit="register" :validation-schema="regCreateValidation" ref="form">
                        <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                <div class="col-md-12 form-bg">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <!-- Guest Type -->
                                                    <fieldset class="field_set_item">
                                                    <legend class="legendItem"> Guest Type </legend>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="col-auto">
                                                                    <div class="input-group mb-2">
                                                                        <div class="input-group-prepend">
                                                                            <div class="input-group-text" style="background-color: #c1c4c7;font-weight: bold;">Guest Type
                                                                            </div>
                                                                        </div>
                                                                        <Field @change="selectRegistrationType" name="registrationType" as="select" v-model="registrationType" class="form-control status">
                                                                            <option value="International">International</option>
                                                                            <option value="National">National</option>
                                                                            <option value="Virtual">Virtual</option>
                                                                        </Field>
                                                                        <ErrorMessage name="registrationType" class="error-feedback" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <!-- End -->

                                                    <!-- General Information [Full Name,Short Name,Sex,Date Of Birth,Official Designation,Organization,Guest Image,Image Upload,Passport ,Vaccine Certificate] --> 
                                                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> General Information</legend>
                                                                                <div class="row">                                                           
                                                                                    <div class="col-md-6">

                                                                                        <!-- Full Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Full Name<span class="text-danger">*</span></div>
                                                                                                </div>                                                                                                       
                                                                                                <Field name="fullName" type="text" v-model="fullName" class="form-control h-auto" autocomplete="off" />                                                                                                                                                          
                                                                                            </div>
                                                                                            <ErrorMessage name="fullName" v-model="fullName" class="error-feedback" />
                                                                                        </div>

                                                                                        <!-- Short Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Short Name<span class="text-danger">*</span> </div>
                                                                                                </div>
                                                                                                <Field name="shortName" type="text" v-model="shortName" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <ErrorMessage name="shortName" v-model="shortName" class="error-feedback" />
                                                                                        </div>

                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Email<span class="text-danger">*</span> </div>
                                                                                                </div>
                                                                                                <Field name="email" type="email" v-model="email" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <ErrorMessage name="email" class="error-feedback" />
                                                                                        </div>
                                                                                        
                                                                                        <!-- Sex -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Sex<span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="sex" as="select" v-model="sex" class="form-control status">
                                                                                                    <option value="">-- Select Sex --</option>
                                                                                                    <option value="male">Male</option>
                                                                                                    <option value="female">Female</option>
                                                                                                    <option value="other">Other</option>
                                                                                                </Field>
                                                                                                </div>
                                                                                                <ErrorMessage name="sex" class="error-feedback" />
                                                                                        </div>
                                                                                                
                                                                                        <!-- Date Of Birth -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Date Of Birth<span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="dateOfBirth" type="date" v-model="dateOfBirth" class="form-control h-auto" autocomplete="off" />                                                                                                     
                                                                                            </div>
                                                                                            <ErrorMessage name="dateOfBirth"  class="error-feedback" />
                                                                                        </div>

                                                                                        <!-- Official Designation -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Official Designation
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="designation" type="text" v-model="designation" class="form-control h-auto" autocomplete="off" />
                                                                                                
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="officialDesignation" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- Organization -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Organization
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="organiztion" type="text" v-model="organiztion" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="organization" v-model="guest.organization" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- NID -->
                                                                                        <div v-if="registrationType =='National'" class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">NID
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="nid" type="text" v-model="nid" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="organization" v-model="guest.organization" class="error-feedback" /> -->
                                                                                        
                                                                                           
                                                                                                <div class="input-group mb-2">
                                                                                                    <div class="input-group-prepend">
                                                                                                        <span class="input-group-text input-group-text-label p4">Vaccine Certificate<span
                                                                                                                class="text-danger">*</span></span>
                                                                                                    </div>
                                                                                                    <Field name="covid19c" type="file" id="covid19c" class="form-control" accept=".pdf"
                                                                                                        v-model="covid19c" autocomplete="off" @change="pickVaccineCertificateFile"
                                                                                                        style="height:44px" />
                                                                                                </div>
                                                                                                <ErrorMessage name="covid19c" v-model="covid19c" class="error-feedback" />
                                                                                            
                                                                                  
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                    
                                                                                    <div class="col-md-6">
                                                                                        <!-- Guest Image -->
                                                                                        <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                                                            <img v-if="!editImageFlag" id="prvImg" src="../../assets/img/dummy_man.png"
                                                                                                style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;" class="img-thumbnail">
                                                                                        
                                                                                            <img v-if="editImageFlag" id="prvImg" :src="editImage"
                                                                                                style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;" class="">
                                                                                        </div>

                                                                                        <!-- Image Upload -->
                                                                                        <div class="upload-options mt-3">
                                                                                            <label class="upload-options" for="imageUpload">
                                                                                                <font-awesome-icon icon="fa-solid  fa-upload" /> Select Guest Image
                                                                                                <input type="file" class="image-upload" id="imageUpload" accept="image/*" @change="onFileUpload">
                                                                                            </label>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                <!-- Passport And  Vaccine Certificate -->
                                                                                <div class="row mt-3" v-if="registrationType == 'International'">
                                                                                    <div class="col-md-6">

                                                                                        <!-- Passport -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2">
                                                                                                <div class="input-group-prepend">
                                                                                                    <span class="input-group-text input-group-text-label p4">Passport<span class="text-danger">*</span></span>
                                                                                                </div>
                                                                                                <Field name="passport" type="file" id="passport" class="form-control" accept=".pdf" @change="pickPassportFile"
                                                                                                     autocomplete="off" style="height:44px" />
                                                                                            </div>
                                                                                            <ErrorMessage name="passport"  class="error-feedback" />
                                                                                        </div>

                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                        <!-- Vaccine Certificate -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2">
                                                                                                <div class="input-group-prepend">
                                                                                                    <span class="input-group-text input-group-text-label p4">Vaccine Certificate<span
                                                                                                            class="text-danger">*</span></span>
                                                                                                </div>
                                                                                                <Field name="covid19c" type="file" id="covid19c" class="form-control" accept=".pdf"
                                                                                                     v-model="covid19c" autocomplete="off" @change="pickVaccineCertificateFile"
                                                                                                    style="height:44px" />
                                                                                            </div>
                                                                                            <ErrorMessage name="covid19c" class="error-feedback" />
                                                                                        </div>
                                                                                    
                                                                                    </div>
                                                                                </div>

                                                                            </fieldset>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->
                                                    
                                                    <!-- Contact Details [Country,Mailing Address,Cell phone,Telephone,Website] -->
                                                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Contact Details </legend>

                                                                                <!-- Country -->
                                                                                <div class="row">
                                                                                    <div class="col-md-12">                                                                                              
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Country <span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="country" as="select" v-model="country" class="form-control h-auto" autocomplete="off">
                                                                                                    <option value="">-- Select Country --</option>
                                                                                                    <option v-for="country in countryList.countryList" :key="country.code" :selected="country === country.name" :value="country.name">{{country.name}}</option>                                                                                                                                                                                     
                                                                                                </Field>
                                                                                            </div>
                                                                                            <ErrorMessage name="country" class="error-feedback" />
                                                                                        </div>                                                                                            
                                                                                    </div>
                                                                                </div>

                                                                                <div class="row">

                                                                                    <div class="col-md-6">
                                                                                        <!-- Mailing Address-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Mailing Address
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="mailingAddress" type="text" v-model="mailingAddress" class="form-control h-auto"
                                                                                                    autocomplete="off" />                          
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="mailingAddress" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                        <!-- Cell phone-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Cell phone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="cellPhone" type="text" v-model="cellPhone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="cellPhone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="col-md-6">
                                                                                        <!-- Telephone-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Telephone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="telephone" type="text" v-model="telephone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="telephone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                        <!-- Website -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Website
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="website" type="text" v-model="website" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="website" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>

                                                                                </div>


                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Passport Related Information [Name as in Passport,Place of Birth as in Passport,Nationality in Passport,Passport Number,Place of Issue in Passport,Date of Expiry in Passport,Date of Issue in Passport] -->
                                                    <div v-if="registrationType == 'International'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Passport Related Information</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-6">

                                                                                    <!-- Name as in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Name as in Passport<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="name_in_passport" type="text" v-model="passportName" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="name_in_passport" v-model="passportName" class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Place of Birth as in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Place of Birth<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_place_of_birth" type="text" v-model="passport_place_of_birth" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_place_of_birth" v-model="passport_place_of_birth" class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Place of Issue in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Place of Issue<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_place_of_issue" type="text" v-model="passport_place_of_issue" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_place_of_issue" v-model="passport_place_of_issue" class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Date of Expiry in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Date of Expiry<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_date_of_expiry" type="date" v-model="passport_date_of_expiry" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_date_of_expiry"  class="error-feedback" />
                                                                                    </div>

                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                    <!-- Nationality in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Nationality<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_nationality" type="text" v-model="passport_nationality" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_nationality" v-model="passport_nationality" class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Passport Number -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Passport Number<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_number" type="text" v-model="passport_number" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_number"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Date of Issue in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Date of Issue<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_date_of_issue" type="date" v-model="passport_date_of_issue" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_date_of_issue"  class="error-feedback" />
                                                                                    </div>

                                                                                    </div>
                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Emergency Contact Details [Name,Relationship,Email,Phone]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Emergency Contact Details</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-6">

                                                                                        <!--  Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Name
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntName" type="text" v-model="emCntName" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntName" v-model="guest.officialDesignation" class="error-feedback" /> -->

                                                                                        </div>

                                                                                        <!--  Email -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Email
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntEmail" type="text" v-model="emCntEmail" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntEmail" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                        <!-- Relationship -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Relationship
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="relationship" type="text" v-model="relationship" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="relationship" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- Phone -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Phone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntPhone" type="text" v-model="emCntPhone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntPhone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>
                                                                                </div>                                                           
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Language Related Information [Prefer simultaneous interpretation,Preferd language for interpretations]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Language Related Information </legend>

                                                                                    <div class="row">

                                                                                        <!-- Prefer simultaneous interpretation -->
                                                                                        <div class="col-md-6">
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Prefer simultaneous interpretation
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="interpretation" as="select" class="form-control" v-model="interpretation">
                                                                                                   
                                                                                                    <option value="Yes">Yes</option>
                                                                                                    <option value="No">No</option>
                                                                                                </Field>
                                                                                            </div>
                                                                                    
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- Preferd language for interpretations -->
                                                                                    <div class="col-md-6">
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Preferd language for interpretations
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="interpretations_language" type="text" v-model="interpretations_language" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                    
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Disability Related Information [Disability Related Information,If you use any aids and/or assistive devices, please provide the details,If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Disability Related Information </legend>
                                                                                    <div class="row">

                                                                                        <!-- Disability Related Information  -->
                                                                                        <div class="col-md-12">
                                                                                            <div class="col-auto">
                                                                                                <div class="input-group mb-2">
                                                                                                    <div class="input-group-prepend">
                                                                                                        <div class="input-group-text">Type of Disability
                                                                                                        </div>
                                                                                                    </div>
                                                                                                        <Field name="typeOfDisibility" type="text" v-model="typeOfDisibility" class="form-control h-auto"
                                                                                                            autocomplete="off" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <!-- If you use any aids and/or assistive devices, please provide the details -->
                                                                                        <div class="col-md-12 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If you use any aids and/or
                                                                                                assistive devices, please provide the details :</label>
                                                                                            <Field name="device" type="text" v-model="device" class="form-control h-auto"
                                                                                                autocomplete="off" />

                                                                                        </div>

                                                                                        <!-- If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details  -->
                                                                                        <div class="col-md-12 mt-2 mb-2 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details :</label>
                                                                                                <Field name="assistance" type="text" v-model="assistance" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        </div>

                                                                                        <!-- If a personal attendant
                                                                                                will accompany you, please provide the details (please
                                                                                                select yes if any personal attendant will accompany
                                                                                                you -->
                                                                                        <div class="col-md-12 mt-2 mb-2 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If a personal attendant
                                                                                                will accompany you, please provide the details (please
                                                                                                select yes if any personal attendant will accompany
                                                                                                you):</label>
                                                                                                <Field name="personalAttendant" as="select" class="form-control" v-model="personalAttendant">
                                                                                                    <option value="">-- Accompanied By Attendant --</option>
                                                                                                    <option value="Yes">Yes</option>
                                                                                                    <option value="No">No</option>
                                                                                                </Field>

                                                                                                <!-- Attendant Basic Information -->
                                                                                                <div v-if="personalAttendant == 'Yes'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                                                                    <div class="col-md-12 form-bg">
                                                                                                        <div class="row">
                                                                                                            <div class="col-md-12">
                                                                                                                <div class="card card-default">
                                                                                                                    <div class="card-body">
                                                                                                                        <fieldset class="field_set_item"  style="border-style: outset;border-width: 3px;">
                                                                                                                            <legend class="legendItem" style="font-size: 20px;"> Attendant Basic Information</legend>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-md-6">

                                                                                                                                    <!-- Attendant Name -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Name<span class="text-danger">*</span> </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="assistance_name" type="text" v-model="assistance_name" class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="assistance_name"  class="error-feedback" />
                                                                                                                                    </div>
                                                                                                                                    
                                                                                                                                    <!--Attendant Passport -->
                                                                                                                                    <div class="col-auto" v-if="registrationType == 'International'">
                                                                                                                                        <div class="input-group mb-2">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <span class="input-group-text input-group-text-label p4">Attendant Passport<span class="text-danger">*</span></span>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendent_passport" type="file" id="attendantPassport" class="form-control" accept=".pdf" @change="pickAttendantPassportFile"
                                                                                                                                                v-model="attendent_passport" autocomplete="off" style="height:44px" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendent_passport"  class="error-feedback" />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                                <div class="col-md-6">

                                                                                                                                    <!-- Attendant Sex --> 
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Sex<span class="text-danger">*</span></div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="assistance_sex" as="select" v-model="assistance_sex" class="form-control status">
                                                                                                                                                <option value="">-- Select Sex --</option>
                                                                                                                                                <option value="male">Male</option>
                                                                                                                                                <option value="female">Female</option>
                                                                                                                                                <option value="other">Other</option>
                                                                                                                                            </Field>
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="assistance_sex" class="error-feedback" /> 
                                                                                                                                    </div>

                                                                                                                                    <!--Attendant Photo -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <span class="input-group-text input-group-text-label p4">Attendant Photo<span
                                                                                                                                                        class="text-danger">*</span></span>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendent_photo" type="file" id="" class="form-control" accept="image/*" @change="pickAttendantPhotoFile"
                                                                                                                                                 v-model="attendent_photo" autocomplete="off" style="height:44px" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendent_photo"  class="error-feedback" />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </fieldset>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <!-- End -->

                                                                                                <!-- Attendant  Passport Related Information [Name as in Passport,Place of Birth as in Passport,Nationality in Passport,Passport Number,Place of Issue in Passport,Date of Expiry in Passport,Date of Issue in Passport] -->
                                                                                                <div v-if="registrationType == 'International' && personalAttendant =='Yes'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                                                                    <div class="col-md-12 form-bg">
                                                                                                        <div class="row">
                                                                                                            <div class="col-md-12">
                                                                                                                <div class="card card-default">
                                                                                                                    <div class="card-body">
                                                                                                                        <fieldset class="field_set_item" style="border-style: outset;border-width: 3px;">
                                                                                                                            <legend class="legendItem"  style="font-size: 20px;"> Passport Related Information of Personal Attendant</legend>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-md-6">
                                                                                                
                                                                                                                                    <!--Attendant Name as in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Name as in Passport<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_name_in_passport" type="text" v-model="attendant_name_in_passport"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_name_in_passport"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Place of Birth as in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Place of Birth<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_place_of_birth" type="text" v-model="attendant_passport_place_of_birth"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_place_of_birth"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Place of Issue in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Place of Issue<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_place_of_issue" type="text" v-model="attendant_passport_place_of_issue"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_place_of_issue" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Date of Expiry in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Date of Expiry<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_date_of_expiry" type="date" 
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_date_of_expiry" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                </div>
                                                                                                                                <div class="col-md-6">
                                                                                                
                                                                                                                                    <!--Attendant Nationality in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Nationality<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_nationality" type="text"
                                                                                                                                                 class="form-control h-auto"
                                                                                                                                                autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_nationality" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Passport Number -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Passport Number<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_number" type="text" 
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_number" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Date of Issue in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Date of Issue<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_date_of_issue" type="date"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_date_of_issue"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                
                                                                                                                        </fieldset>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <!-- End -->


                                                                                        </div>


                                                                                    </div>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Health Related Information -->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Health Related Information</legend>

                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <label class="bg-cz d-block p-2">If you have any health/medical
                                                                                            condition whatsoever, which you feel the organizers should be
                                                                                            aware of, and be prepared
                                                                                            for, please provide the details :</label>
                                                                                            <Field name="medical_conditon" type="text"  class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                    </div>

                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Food Diet Related Information -->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Food Diet Related Information</legend>
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Food preference</label>
                                                                                            <Field name="food_preference" as="select" class="form-control" v-model="food_preference">
                                                                                                <option value="Non Vegetrian">Non Vegetrian</option>
                                                                                                <option value="Vegetrian">Vegetrian</option>
                                                                                            </Field>
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Have any food/dietary
                                                                                            reservations/restrictions</label>
                                                                                        <Field name="food_restirction" type="text"  class="form-control h-auto"
                                                                                            autocomplete="off" />
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Organizers should be aware
                                                                                            of(food/dietary allergies)</label>
                                                                                        <Field name="food_alergy" type="text"  class="form-control h-auto"
                                                                                            autocomplete="off" />
                                                                                    </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Accommodation Related Information -->
                                                    <div v-if="registrationType == 'International'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Accommodation Related Information</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Organizers to also arrange
                                                                                            accommodation</label>
                                                                                        <Field name="hotel_data" as="select" class="form-control" v-model="hotel_data">
                                                                                            <option value="Yes">Yes</option>
                                                                                            <option value="No">No</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Share your room with other
                                                                                            participants?</label>
                                                                                        <Field name="share_room" as="select" class="form-control">
                                                                                            <option value="Yes">Yes</option>
                                                                                            <option value="No">No</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary mr-2" id="registerBtn">
                                        Submit
                                    </button>
                                
                                    <button class="btn btn-danger ml-2" type="reset">Reset</button>
                                
                                </div>
                        </div>                       
                    </Form>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>
    <!-- End -->

    <!-- Modal For Update Guest -->
        <div class="modal fade" id="modalForUpdateGuest" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Guest</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Form @submit="updateGuest" :validation-schema="regCreateValidation" ref="form">
                        <Field name="event_id" type="hidden" v-model="editData.id" /> 
                        <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                <div class="col-md-12 form-bg">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <!-- Guest Type -->
                                                    <fieldset class="field_set_item">
                                                    <legend class="legendItem"> Guest Type </legend>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="col-auto">
                                                                    <div class="input-group mb-2">
                                                                        <div class="input-group-prepend">
                                                                            <div class="input-group-text" style="background-color: #c1c4c7;font-weight: bold;">Guest Type
                                                                            </div>
                                                                        </div>
                                                                        <Field @change="selectRegistrationType" name="registrationType" as="select" v-model="editData.registration_type" class="form-control status">
                                                                            <option value="International">International</option>
                                                                            <option value="National">National</option>
                                                                            <option value="Virtual">Virtual</option>
                                                                        </Field>
                                                                        <ErrorMessage name="registrationType" class="error-feedback" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <!-- End -->

                                                    <!-- General Information [Full Name,Short Name,Sex,Date Of Birth,Official Designation,Organization,Guest Image,Image Upload,Passport ,Vaccine Certificate] --> 
                                                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> General Information</legend>
                                                                                <div class="row">                                                           
                                                                                    <div class="col-md-6">

                                                                                        <!-- Full Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Full Name<span class="text-danger">*</span></div>
                                                                                                </div>                                                                                                       
                                                                                                <Field name="fullName" type="text" v-model="editData.full_name" class="form-control h-auto" autocomplete="off" />                                                                                                                                                          
                                                                                            </div>
                                                                                            <ErrorMessage name="fullName" v-model="fullName" class="error-feedback" />
                                                                                        </div>

                                                                                        <!-- Short Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Short Name<span class="text-danger">*</span> </div>
                                                                                                </div>
                                                                                                <Field name="shortName" type="text" v-model="editData.short_name" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <ErrorMessage name="shortName" v-model="shortName" class="error-feedback" />
                                                                                        </div>

                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Email<span class="text-danger">*</span> </div>
                                                                                                </div>
                                                                                                <Field name="email" type="email" v-model="editData.email" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <ErrorMessage name="email" class="error-feedback" />
                                                                                        </div>
                                                                                        
                                                                                        <!-- Sex -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Sex<span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="sex" as="select" v-model="editData.sex" class="form-control status">
                                                                                                    <option value="">-- Select Sex --</option>
                                                                                                    <option value="male">Male</option>
                                                                                                    <option value="female">Female</option>
                                                                                                    <option value="other">Other</option>
                                                                                                </Field>
                                                                                                </div>
                                                                                                <ErrorMessage name="sex" class="error-feedback" />
                                                                                        </div>
                                                                                                
                                                                                        <!-- Date Of Birth -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Date Of Birth<span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="dateOfBirth" type="date" v-model="editData.date_of_birth" class="form-control h-auto" autocomplete="off" />                                                                                                     
                                                                                            </div>
                                                                                            <ErrorMessage name="dateOfBirth"  class="error-feedback" />
                                                                                        </div>

                                                                                        <!-- Official Designation -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Official Designation
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="designation" type="text" v-model="editData.official_designation" class="form-control h-auto" autocomplete="off" />
                                                                                                
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="officialDesignation" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- Organization -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Organization
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="organiztion" type="text" v-model="editData.organiztion" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="organization" v-model="guest.organization" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- NID -->
                                                                                        <div v-if="registrationType =='National'" class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">NID
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="nid" type="text" v-model="editData.nid" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="organization" v-model="guest.organization" class="error-feedback" /> -->
                                                                                        
                                                                                           
                                                                                                <div class="input-group mb-2">
                                                                                                    <div class="input-group-prepend">
                                                                                                        <span class="input-group-text input-group-text-label p4">Vaccine Certificate<span
                                                                                                                class="text-danger">*</span></span>
                                                                                                    </div>
                                                                                                    <Field name="covid19c" type="file" id="covid19c" class="form-control" accept=".pdf"
                                                                                                        v-model="covid19c" autocomplete="off" @change="pickVaccineCertificateFile"
                                                                                                        style="height:44px" />
                                                                                                </div>
                                                                                                <ErrorMessage name="covid19c"  class="error-feedback" />
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                    
                                                                                    <div class="col-md-6">
                                                                                        <!-- Guest Image -->
                                                                                        <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                                                            <img v-if="editData.photo == ''" id="prvImg" src="../../assets/img/dummy_man.png"
                                                                                                style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;" class="img-thumbnail">
                                                                                            <img v-if="editData.photo != ''" id="prvImg" :src="base_url_for_resource+'uploads/images/photos/'+editData.photo"
                                                                                                style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;" class="img-thumbnail">    
                                                                                        
                                                                                            <img v-if="editImageFlag" id="prvImg" :src="editImage"
                                                                                                style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;" class="">
                                                                                        </div>

                                                                                        <!-- Image Upload -->
                                                                                        <div class="upload-options mt-3">
                                                                                            <label class="upload-options" for="imageUpload">
                                                                                                <font-awesome-icon icon="fa-solid  fa-upload" /> Select Guest Image
                                                                                                <input type="file" class="image-upload" id="imageUpload" accept="image/*" @change="onFileUpload">
                                                                                            </label>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                <!-- Passport And  Vaccine Certificate -->
                                                                                <div class="row mt-3" v-if="registrationType == 'International'">
                                                                                    <div class="col-md-6">

                                                                                        <!-- Passport -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2">
                                                                                                <div class="input-group-prepend">
                                                                                                    <span class="input-group-text input-group-text-label p4">Passport<span class="text-danger">*</span></span>
                                                                                                </div>
                                                                                                <Field name="passport" type="file" id="passport" class="form-control" accept=".pdf" @change="pickPassportFile"
                                                                                                     autocomplete="off" style="height:44px" />
                                                                                            </div>
                                                                                            <ErrorMessage name="passport"  class="error-feedback" />
                                                                                        </div>

                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                        <!-- Vaccine Certificate -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2">
                                                                                                <div class="input-group-prepend">
                                                                                                    <span class="input-group-text input-group-text-label p4">Vaccine Certificate<span
                                                                                                            class="text-danger">*</span></span>
                                                                                                </div>
                                                                                                <Field name="covid19c" type="file" id="covid19c" class="form-control" accept=".pdf"
                                                                                                     v-model="covid19c" autocomplete="off" @change="pickVaccineCertificateFile"
                                                                                                    style="height:44px" />
                                                                                            </div>
                                                                                            <ErrorMessage name="covid19c" class="error-feedback" />
                                                                                        </div>
                                                                                    
                                                                                    </div>
                                                                                </div>

                                                                            </fieldset>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->
                                                    
                                                    <!-- Contact Details [Country,Mailing Address,Cell phone,Telephone,Website] -->
                                                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Contact Details </legend>

                                                                                <!-- Country -->
                                                                                <div class="row">
                                                                                    <div class="col-md-12">                                                                                              
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Country <span class="text-danger">*</span></div>
                                                                                                </div>
                                                                                                <Field name="country" as="select" v-model="editData.country" class="form-control h-auto" autocomplete="off">
                                                                                                    <option value="">-- Select Country --</option>
                                                                                                    <option v-for="country in countryList.countryList" :key="country.code" :selected="country === country.name" :value="country.name">{{country.name}}</option>                                                                                                                                                                                     
                                                                                                </Field>
                                                                                            </div>
                                                                                            <ErrorMessage name="country" class="error-feedback" />
                                                                                        </div>                                                                                            
                                                                                    </div>
                                                                                </div>

                                                                                <div class="row">

                                                                                    <div class="col-md-6">
                                                                                        <!-- Mailing Address-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Mailing Address
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="mailingAddress" type="text" v-model="editData.mailing_address" class="form-control h-auto"
                                                                                                    autocomplete="off" />                          
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="mailingAddress" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                        <!-- Cell phone-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Cell phone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="cellPhone" type="text" v-model="editData.cell_phone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="cellPhone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="col-md-6">
                                                                                        <!-- Telephone-->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Telephone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="telephone" type="text" v-model="editData.telephone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="telephone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                        <!-- Website -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Website
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="website" type="text" v-model="editData.website" class="form-control h-auto" autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="website" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>

                                                                                </div>


                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Passport Related Information [Name as in Passport,Place of Birth as in Passport,Nationality in Passport,Passport Number,Place of Issue in Passport,Date of Expiry in Passport,Date of Issue in Passport] -->
                                                    <div v-if="registrationType == 'International'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Passport Related Information</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-6">

                                                                                    <!-- Name as in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Name as in Passport<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="name_in_passport" type="text" v-model="editData.name_passport" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="name_in_passport"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Place of Birth as in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Place of Birth<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_place_of_birth" type="text" v-model="editData.place_of_birth" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_place_of_birth"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Place of Issue in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Place of Issue<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_place_of_issue" type="text" v-model="editData.place_of_issue" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_place_of_issue"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Date of Expiry in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Date of Expiry<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_date_of_expiry" type="date" v-model="editData.date_of_expiry" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_date_of_expiry"  class="error-feedback" />
                                                                                    </div>

                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                    <!-- Nationality in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Nationality<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_nationality" type="text" v-model="editData.nationality" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_nationality"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Passport Number -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Passport Number<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_number" type="text" v-model="editData.passport_number" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_number"  class="error-feedback" />
                                                                                    </div>

                                                                                    <!-- Date of Issue in Passport -->
                                                                                    <div class="col-auto">
                                                                                        <div class="input-group mb-2 mt-1">
                                                                                            <div class="input-group-prepend">
                                                                                                <div class="input-group-text">Date of Issue<span class="text-danger">*</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <Field name="passport_date_of_issue" type="date" v-model="editData.passport_date_of_issue" class="form-control h-auto"
                                                                                                autocomplete="off" />
                                                                                        </div>
                                                                                        <ErrorMessage name="passport_date_of_issue"  class="error-feedback" />
                                                                                    </div>

                                                                                    </div>
                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Emergency Contact Details [Name,Relationship,Email,Phone]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Emergency Contact Details</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-6">

                                                                                        <!--  Name -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Name
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntName" type="text" v-model="editData.emergency_name" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntName" v-model="guest.officialDesignation" class="error-feedback" /> -->

                                                                                        </div>

                                                                                        <!--  Email -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Email
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntEmail" type="text" v-model="editData.emergency_email" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntEmail" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">

                                                                                        <!-- Relationship -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Relationship
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="relationship" type="text" v-model="editData.emergency_relationship" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="relationship" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>

                                                                                        <!-- Phone -->
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Phone
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="emCntPhone" type="text" v-model="editData.emergency_phone" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                            <!-- <ErrorMessage name="emCntPhone" v-model="guest.officialDesignation" class="error-feedback" /> -->
                                                                                        </div>
                                                                                    </div>
                                                                                </div>                                                           
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Language Related Information [Prefer simultaneous interpretation,Preferd language for interpretations]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Language Related Information </legend>

                                                                                    <div class="row">

                                                                                        <!-- Prefer simultaneous interpretation -->
                                                                                        <div class="col-md-6">
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Prefer simultaneous interpretation
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="interpretation" as="select" class="form-control" v-model="editData.interpretation">
                                                                                                   
                                                                                                    <option value="Yes">Yes</option>
                                                                                                    <option value="No">No</option>
                                                                                                </Field>
                                                                                            </div>
                                                                                    
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- Preferd language for interpretations -->
                                                                                    <div class="col-md-6">
                                                                                        <div class="col-auto">
                                                                                            <div class="input-group mb-2 mt-1">
                                                                                                <div class="input-group-prepend">
                                                                                                    <div class="input-group-text">Preferd language for interpretations
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Field name="interpretations_language" type="text" v-model="editData.interpretation_language" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                            </div>
                                                                                    
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Disability Related Information [Disability Related Information,If you use any aids and/or assistive devices, please provide the details,If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details]-->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Disability Related Information </legend>
                                                                                    <div class="row">

                                                                                        <!-- Disability Related Information  -->
                                                                                        <div class="col-md-12">
                                                                                            <div class="col-auto">
                                                                                                <div class="input-group mb-2">
                                                                                                    <div class="input-group-prepend">
                                                                                                        <div class="input-group-text">Type of Disability
                                                                                                        </div>
                                                                                                    </div>
                                                                                                        <Field name="typeOfDisibility" type="text" v-model="editData.type_of_disability" class="form-control h-auto"
                                                                                                            autocomplete="off" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <!-- If you use any aids and/or assistive devices, please provide the details -->
                                                                                        <div class="col-md-12 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If you use any aids and/or
                                                                                                assistive devices, please provide the details :</label>
                                                                                            <Field name="device" type="text" v-model="editData.aids_or_assistive_devices" class="form-control h-auto"
                                                                                                autocomplete="off" />

                                                                                        </div>

                                                                                        <!-- If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details  -->
                                                                                        <div class="col-md-12 mt-2 mb-2 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If you require any
                                                                                                disability related services and/or assistance, please
                                                                                                provide details :</label>
                                                                                                <Field name="assistance" type="text" v-model="editData.require_assistance" class="form-control h-auto"
                                                                                                    autocomplete="off" />
                                                                                        </div>

                                                                                        <!-- If a personal attendant
                                                                                                will accompany you, please provide the details (please
                                                                                                select yes if any personal attendant will accompany
                                                                                                you -->
                                                                                        <div class="col-md-12 mt-2 mb-2 ml-2 pr-4">
                                                                                            <label class="bg-cz d-block p-2">If a personal attendant
                                                                                                will accompany you, please provide the details (please
                                                                                                select yes if any personal attendant will accompany
                                                                                                you):</label>
                                                                                                <Field name="personalAttendant" as="select" class="form-control" v-model="editData.accompanied_by_attendant">
                                                                                                    <option value="">-- Accompanied By Attendant --</option>
                                                                                                    <option value="Yes">Yes</option>
                                                                                                    <option value="No">No</option>
                                                                                                </Field>

                                                                                                <!-- Attendant Basic Information -->
                                                                                                <div v-if="personalAttendant == 'Yes'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                                                                    <div class="col-md-12 form-bg">
                                                                                                        <div class="row">
                                                                                                            <div class="col-md-12">
                                                                                                                <div class="card card-default">
                                                                                                                    <div class="card-body">
                                                                                                                        <fieldset class="field_set_item"  style="border-style: outset;border-width: 3px;">
                                                                                                                            <legend class="legendItem" style="font-size: 20px;"> Attendant Basic Information</legend>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-md-6">

                                                                                                                                    <!-- Attendant Name -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Name<span class="text-danger">*</span> </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="assistance_name" type="text" v-model="editData.attenddant_person_name" class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="assistance_name"  class="error-feedback" />
                                                                                                                                    </div>
                                                                                                                                    
                                                                                                                                    <!--Attendant Passport -->
                                                                                                                                    <div class="col-auto" v-if="registrationType == 'International'">
                                                                                                                                        <div class="input-group mb-2">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <span class="input-group-text input-group-text-label p4">Attendant Passport<span class="text-danger">*</span></span>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendent_passport" type="file" id="attendantPassport" class="form-control" accept=".pdf" @change="pickAttendantPassportFile"
                                                                                                                                                v-model="attendent_passport" autocomplete="off" style="height:44px" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendent_passport"  class="error-feedback" />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                                <div class="col-md-6">

                                                                                                                                    <!-- Attendant Sex --> 
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Sex<span class="text-danger">*</span></div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="assistance_sex" as="select" v-model="editData.attenddant_person_sex" class="form-control status">
                                                                                                                                                <option value="">-- Select Sex --</option>
                                                                                                                                                <option value="male">Male</option>
                                                                                                                                                <option value="female">Female</option>
                                                                                                                                                <option value="other">Other</option>
                                                                                                                                            </Field>
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="assistance_sex" class="error-feedback" /> 
                                                                                                                                    </div>

                                                                                                                                    <!--Attendant Photo -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <span class="input-group-text input-group-text-label p4">Attendant Photo<span
                                                                                                                                                        class="text-danger">*</span></span>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendent_photo" type="file" id="" class="form-control" accept="image/*" @change="pickAttendantPhotoFile"
                                                                                                                                                 v-model="attendent_photo" autocomplete="off" style="height:44px" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendent_photo"  class="error-feedback" />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </fieldset>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <!-- End -->

                                                                                                <!-- Attendant  Passport Related Information [Name as in Passport,Place of Birth as in Passport,Nationality in Passport,Passport Number,Place of Issue in Passport,Date of Expiry in Passport,Date of Issue in Passport] -->
                                                                                                <div v-if="registrationType == 'International' && personalAttendant =='Yes'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                                                                    <div class="col-md-12 form-bg">
                                                                                                        <div class="row">
                                                                                                            <div class="col-md-12">
                                                                                                                <div class="card card-default">
                                                                                                                    <div class="card-body">
                                                                                                                        <fieldset class="field_set_item" style="border-style: outset;border-width: 3px;">
                                                                                                                            <legend class="legendItem"  style="font-size: 20px;"> Passport Related Information of Personal Attendant</legend>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-md-6">
                                                                                                
                                                                                                                                    <!--Attendant Name as in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Name as in Passport<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_name_in_passport" type="text" v-model="editData.attendent_passport"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_name_in_passport"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Place of Birth as in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Place of Birth<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_place_of_birth" type="text" v-model="editData.attendant_place_of_birth"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_place_of_birth"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Place of Issue in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Place of Issue<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_place_of_issue" type="text" v-model="editData.attendant_place_of_issue"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_place_of_issue" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Date of Expiry in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Date of Expiry<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_date_of_expiry" type="date" v-model="editData.attendant_date_of_expiry"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_date_of_expiry" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                </div>
                                                                                                                                <div class="col-md-6">
                                                                                                
                                                                                                                                    <!--Attendant Nationality in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Nationality<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_nationality" type="text" v-model="editData.attendant_nationality"
                                                                                                                                                class="form-control h-auto"
                                                                                                                                                autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_nationality" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Passport Number -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Passport Number<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_number" type="text" v-model="editData.attendant_passport_number"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_number" 
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                    <!--Attendant Date of Issue in Passport -->
                                                                                                                                    <div class="col-auto">
                                                                                                                                        <div class="input-group mb-2 mt-1">
                                                                                                                                            <div class="input-group-prepend">
                                                                                                                                                <div class="input-group-text">Date of Issue<span
                                                                                                                                                        class="text-danger">*</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <Field name="attendant_passport_date_of_issue" type="date" v-model="editData.attendant_date_of_issue"
                                                                                                                                                class="form-control h-auto" autocomplete="off" />
                                                                                                                                        </div>
                                                                                                                                        <ErrorMessage name="attendant_passport_date_of_issue"
                                                                                                                                            class="error-feedback" />
                                                                                                                                    </div>
                                                                                                
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                
                                                                                                                        </fieldset>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <!-- End -->


                                                                                        </div>


                                                                                    </div>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Health Related Information -->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Health Related Information</legend>

                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <label class="bg-cz d-block p-2">If you have any health/medical
                                                                                            condition whatsoever, which you feel the organizers should be
                                                                                            aware of, and be prepared
                                                                                            for, please provide the details :</label>
                                                                                            <Field name="medical_conditon" type="text"  class="form-control h-auto" v-model="editData.health_or_medical_condition"
                                                                                                autocomplete="off" />
                                                                                    </div>

                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Food Diet Related Information -->
                                                    <div v-if="registrationType != 'Virtual'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Food Diet Related Information</legend>
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Food preference</label>
                                                                                            <Field name="food_preference" as="select" class="form-control" v-model="editData.food_preference">
                                                                                                <option value="Non Vegetrian">Non Vegetrian</option>
                                                                                                <option value="Vegetrian">Vegetrian</option>
                                                                                            </Field>
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Have any food/dietary
                                                                                            reservations/restrictions</label>
                                                                                        <Field name="food_restirction" type="text"  class="form-control h-auto" v-model="editData.food_restrictions"
                                                                                            autocomplete="off" />
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Organizers should be aware
                                                                                            of(food/dietary allergies)</label>
                                                                                        <Field name="food_alergy" type="text"  class="form-control h-auto" v-model="editData.food_allergies"
                                                                                            autocomplete="off" />
                                                                                    </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Accommodation Related Information -->
                                                    <div v-if="registrationType == 'International'" class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                                        <div class="col-md-12 form-bg">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="card card-default">
                                                                        <div class="card-body">
                                                                            <fieldset class="field_set_item">
                                                                                <legend class="legendItem"> Accommodation Related Information</legend>
                                                                                <div class="row">
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Organizers to also arrange
                                                                                            accommodation</label>
                                                                                        <Field name="hotel_data" as="select" class="form-control" v-model="editData.arrange_accommodation">
                                                                                            <option value="Yes">Yes</option>
                                                                                            <option value="No">No</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                    <div class="col-md-12 mb-2">
                                                                                        <label class="bg-cz d-block p-2">Share your room with other
                                                                                            participants?</label>
                                                                                        <Field name="share_room" as="select" class="form-control" v-model="editData.shared_room">
                                                                                            <option value="Yes">Yes</option>
                                                                                            <option value="No">No</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                </div>
                                                    
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary mr-2" id="registerBtn">
                                        Submit
                                    </button>
                                
                                    <button class="btn btn-danger ml-2" type="reset">Reset</button>
                                
                                </div>
                        </div>                       
                    </Form>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
        </div>
    <!-- End -->

    <!-- Open Model For Image Cooper -->
    <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body p-3">
                    <div class="">
                        <cropper class="cropper" 
                        :src="img" 
                        :stencil-props="{
                        aspectRatio: 1.8/2
                        }" ref="refs" 
                        @change="changes" />
                    </div>
                </div>
    
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">
                        <font-awesome-icon icon="fa-solid  fa-ban" /> Cancel Crop
                    </button>
                    <button type="button" class="btn btn-danger" @click="cropImage">
                        <font-awesome-icon icon="fa-solid  fa-crop-simple" /> Crop
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Close Model For Image Cooper-->


      <!-- Modal For Registers -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Guest Details <button @click="print" class="ml-3 btn btn-sm btn-success">print</button></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <!-- General Information -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> General Information</legend>
                                                <div class="row">
                                                    
                                    
                                                    <div class="col-md-6">
                                                        <!--  -->
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Registration Type</div>
                                                                </div>
                                                                <span class="form-control h-auto" v-html="registeredGuestInModdal.registration_type"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Full Name </div>
                                                                </div>
                                                                <span class="form-control h-auto" v-html="registeredGuestInModdal.full_name"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Short Name </div>
                                                                </div>
                                                                <span class="form-control h-auto" v-html="registeredGuestInModdal.short_name"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Sex</div>
                                                                </div>
                                                                <span class="form-control h-auto" v-html="registeredGuestInModdal.sex"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Official Designation </div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.official_designation"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Date Of Birth</div>
                                                                </div>
                                                                <span class="form-control" v-html="formatDate(registeredGuestInModdal.date_of_birth)"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                    
                                                    <div class="col-md-6">
                                    
                                                     
                                                        <div class="p-2 text-center bg-light" style="border:1px solid #cccccc">
                                                            <img v-if="registeredGuestInModdal.photo != ''" style="max-height: 200px;" :src="base_url_for_resource+'/uploads/images/photos/'+registeredGuestInModdal.photo" alt="Guest Image" class="img-thumbnail">
                                                            <img v-if="registeredGuestInModdal.photo == ''" style="max-height: 200px;" src="@/assets/img/dummy_man.png" alt="Guest Image" class="img-thumbnail">
                                                        </div>
                                                        <div class="mt-3 mb-3" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                                                            <a v-if="registeredGuestInModdal.registration_type == 'International'" class="btn btn-sm btn-info m-1 mb-2" :href="base_url_for_resource+'/uploads/passport/'+registeredGuestInModdal.passport" 
                                                            title="Guest Passport" 
                                                            target="_blank"
                                                            >
                                                            <font-awesome-icon icon="fa-solid  fa-eye" /> PASSPORT
                                                            </a>
                                                            <a  class="btn btn-sm btn-info m-1 mb-2" :href="base_url_for_resource+'/uploads/covid19c/'+registeredGuestInModdal.covid19c" title="Guest Passport" target="_blank" >
                                                                <font-awesome-icon icon="fa-solid  fa-eye" /> COVID-19 vaccine certificate
                                                            </a>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Details -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Contact Details </legend>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Country</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.country"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Telephone</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.telephone"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Website</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.website"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Mailing Address</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.mailing_address"></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Cell Phone </div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.cell_phone"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Emergency Contact Details -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem">Emergency Contact Details </legend>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Name</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.emergency_name"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Relationship</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.emergency_relationship"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Email</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.emergency_email"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Phone</div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.emergency_phone"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Disability Related Information And Language Related Information -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Disability Related Information</legend>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Type of Disability </div>
                                                                </div>
                                                                <span class="form-control" v-html="registeredGuestInModdal.type_of_disability"></span>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 mb-2">
                                                            <label class="bg-cz d-block p-2">If you use any aids and/or assistive devices, please provide the details</label>
                                                            <label class="form-control">{{registeredGuestInModdal.aids_or_assistive_devices}}</label>
                                                        </div>

                                                        <div class="col-md-12 mb-2">
                                                            <label class="bg-cz d-block p-2">If you require any disability related services and/or assistance, please provide details :</label>
                                                            <label class="form-control">{{registeredGuestInModdal.require_assistance}}</label>
                                                        </div>

                                                        <div class="col-md-12 mb-2">
                                                            <label class="bg-cz d-block p-2">If a personal attendant will accompany you, please provide the details (please select yes if any personal attendant will accompany you):</label>
                                                            <label class="form-control">{{registeredGuestInModdal.accompanied_by_attendant}}</label>
                                                        </div>

                                                        <div class="col-md-12 mb-2" v-if="registeredGuestInModdal.accompanied_by_attendant == 'Yes'">
                                                            <div class="p-2 bg-light">
                                                                <label class="bg-cz d-block p-2 text-center">Attandant Information</label>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="col-auto">
                                                                            <div class="input-group mb-2">
                                                                                <div class="input-group-prepend">
                                                                                <div class="input-group-text">Name</div>
                                                                                </div>
                                                                                <span class="form-control" v-html="registeredGuestInModdal.attenddant_person_name"></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="col-auto">
                                                                            <div class="input-group mb-2">
                                                                                <div class="input-group-prepend">
                                                                                <div class="input-group-text">Sex</div>
                                                                                </div>
                                                                                <span class="form-control" v-html="registeredGuestInModdal.attenddant_person_sex"></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row m-0 mt-3">
                                                                    <div class="col-md-6">
                                                                        <div class="p-2 text-center bg-light" style="border:1px solid #cccccc">
                                                                            <img v-if="registeredGuestInModdal.attenddant_photo != ''" style="max-height: 200px;" :src="base_url_for_resource+'/uploads/images/photos/'+registeredGuestInModdal.attenddant_photo" alt="Guest Image" class="img-thumbnail">                                
                                                                            <img v-if="registeredGuestInModdal.attenddant_photo == ''" style="max-height: 200px;" src="@/assets/img/dummy_man.png" alt="Guest Image" class="img-thumbnail">                                
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6" v-if="registeredGuestInModdal.attendent_passport != ''">
                                                                        <a class="btn btn-sm btn-info m-1 mb-2" :href="base_url_for_resource+'/uploads/passport/'+registeredGuestInModdal.attendent_passport" 
                                                                            title="Attandant Passport" 
                                                                            target="_blank"
                                                                            download>
                                                                            <font-awesome-icon icon="fa-solid  fa-eye" /> Attandant Passport
                                                                            </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Health Related Information -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Health Related Information</legend>
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">If you have any health/medical condition whatsoever, which you feel the organizers should be aware of, and be prepared
                                                            for, please provide the details :</label>
                                                    <label class="form-control">{{registeredGuestInModdal.health_or_medical_condition}}</label>
                                                </div>
                                                
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  Food Diet Related information -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Food Diet Related information</legend>
                                                
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Food preference</label>
                                                    <label class="form-control">{{registeredGuestInModdal.food_preference}}</label>
                                                </div>

                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Have any food/dietary reservations/restrictions</label>
                                                    <label class="form-control">{{registeredGuestInModdal.food_restrictions}}</label>
                                                </div>

                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Organizers should be aware of(food/dietary allergies)</label>
                                                    <label class="form-control">{{registeredGuestInModdal.food_allergies}}</label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  ACCOMMODATION RELATED INFORMATION -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type == 'International'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Accommodation Related Information</legend>
                                                
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Organizers to also arrange accommodation</label>
                                                    <label class="form-control">{{registeredGuestInModdal.arrange_accommodation}}</label>
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Share your room with other participants?</label>
                                                    <label class="form-control">{{registeredGuestInModdal.shared_room}}</label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <!--  LANGUAGE RELATED INFORMATION -->
                     <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type != 'Virtual'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Language Related Information</legend>
                                                
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Prefer simultaneous interpretation</label>
                                                    <label class="form-control">{{registeredGuestInModdal.interpretation}}</label>
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <label class="bg-cz d-block p-2">Preferd language for interpretations</label>
                                                    <label class="form-control">{{registeredGuestInModdal.interpretation_language}}</label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  PASSPORT RELATED INFORMATION -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.registration_type == 'international'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Passport Related Information</legend>

                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Name as in Passport</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.name_passport"></span>
                                                    </div>
                                                </div>

                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Nationality</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.nationality"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Place of Birth</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.place_of_birth"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Passport Number</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.passport_number"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Place of Issue</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.place_of_issue"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Date of Issue</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.date_of_issue"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Date of Expiry</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.date_of_expiry"></span>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!--  Passport related information of personal attendant -->
                    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="registeredGuestInModdal.accompanied_by_attendant == 'YES' && registeredGuestInModdal.registration_type == 'International'">
                        <div class="col-md-12 form-bg">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-default" style="margin-right:-12px">
                                        <div class="card-body" style="margin-left: 28px;">
                                            <fieldset class="field_set_item">
                                                <legend class="legendItem"> Passport Related Information of Personal Attendant</legend>

                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Name as in Passport</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_name_passport"></span>
                                                    </div>
                                                </div>

                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Nationality</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_nationality"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Place of Birth</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_place_of_birth"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Passport Number</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_passport_number"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Place of Issue</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_place_of_issue"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Date of Issue</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_date_of_issue"></span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="input-group mb-2">
                                                        <div class="input-group-prepend">
                                                        <div class="input-group-text">Date of Expiry</div>
                                                        </div>
                                                        <span class="form-control" v-html="registeredGuestInModdal.attendant_date_of_expiry"></span>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

            </div>
            </div>
        </div>
      <!-- End -->

    <!-- Modal For Sending Mail -->
        <div class="modal fade" id="exampleModalCenterForSendingMail" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Send Mail</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body" id="ck-control">
                    <div class="justify-content-center mt-2 mb-2 ml-0 mr-0">

                        <!-- Mail To -->
                        <div class="row">
                            <div class="col-md-12 form-group">
                                  <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p5" >Mail To*</span>
                                    </div>
                                    <input name="mailTo" type="text" v-model="mailTo" class="form-control" autocomplete="off" readonly/>
                                  </div>
                              
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Mail Subject -->
                        <div class="row">
                            <div class="col-md-12 form-group">
                                  <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p5" >Mail Subject*</span>
                                    </div>
                                    <input name="mailSubject" type="text" v-model="mailSubject" class="form-control" autocomplete="off"/>
                                  </div>
                              
                            </div>
                        </div>
                        <!-- End -->


                        <!-- Mail Body -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                                <div class="">
                                    <span class="input-group-text p4 mb-2" >Mail Body*</span>
                                </div>
                                <ckeditor name="mailBody" autocomplete="off" class="form-control" :editor="editor" v-model="mailBody" :config="editorConfig" /> 
                            </div>
                           
                          </div>
                        </div>
                        <!-- End -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info" @click="onSend"> Send Now <font-awesome-icon icon="fa-solid fa-square-up-right" /> </button>
                </div>

            </div>
            </div>
            
        </div>
    <!--  -->
    <div id="printApplicationContent" class="d-none"><printApplication :applicationInfo="registeredGuestInModdal" /></div>

</template>
<script>
import moment from 'moment';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from '../Loader.vue';
import $ from 'jquery';
import PrintApplication from "@/components/Print/PrintApplication.vue";

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import countryList from "../../assets/js/countryList";





export default {
    name: 'Event Registration',
    components: {
        Loader,
        PrintApplication,
        Form,
        Field,
        ErrorMessage,
        Cropper
    },
    data() {
        const validationCreate = yup.object().shape({
            registrationType: yup
                .string()
                .required("Registration type is required!"),
            fullName: yup
                .string()
                .required("Full Name is required!"),
            shortName: yup
                .string()
                .required("Short Name is required!"),
            sex: yup
                .string()
                .required("Sex is required!"),

            email: yup
                .string()
                .required("Email is required!"),    
            
            dateOfBirth: yup
                .date()
                .typeError('Date Of Birth is required!')
                .required("Date Of Birth is required!"),

            passport: yup
                .string()
                .when('registrationType', {
                    is: 'International',
                    then: yup.string()
                        .required('Passport is required.'),
                    }),

            covid19c: yup
                .string()
                .when('registrationType', (registrationType) => {
                    if(registrationType != 'Virtual')
                    return yup.string().required("Certificate is required")
                }),

            country: yup
                .string()
                .required("Country is required!"),

            name_in_passport: yup
                .string()
                .when('registrationType', {
                    is: 'International',
                    then: yup.string()
                        .required('Name in passport is required.'),
                }),    
            passport_nationality: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Nationality is required.'),
            }),  
            passport_place_of_birth: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Place of birth is required.'),
            }),  
            
            passport_number: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Passport number is required.'),
            }),  
            
            passport_place_of_issue: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Place of issue is required.'),
            }),  
            passport_date_of_issue: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Date of issue is required.'),
            }),  
            passport_date_of_expiry: yup
            .string()
            .when('registrationType', {
                is: 'International',
                then: yup.string()
                    .required('Date of expiry is required.'),
            }),
            assistance_name: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => (registrationType =='International' || registrationType =='National' )  && personalAttendant=='Yes',
                then: yup.string().required('Name is required.'),
            }), 

            assistance_sex: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => (registrationType =='International' || registrationType =='National' ) && personalAttendant=='Yes',
                then: yup.string().required('Sex is required.'),
            }), 
            
            attendent_passport: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International' && personalAttendant=='Yes',
                then: yup.string().required('Passport is required.'),
            }), 

            attendent_photo: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => (registrationType =='International' || registrationType =='National')  && personalAttendant=='Yes',
                then: yup.string().required('Photo is required.'),
            }), 

            attendant_name_in_passport: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Name is required.'),
            }), 

            attendant_passport_nationality: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Nationality is required.'),
            }), 

            attendant_passport_place_of_birth: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Place of birth is required.'),
            }), 

            attendant_passport_number: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Passport number is required.'),
            }), 

            attendant_passport_place_of_issue: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Place of issue is required.'),
            }), 

            attendant_passport_date_of_issue: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Date of issue is required.'),
            }), 

            attendant_passport_date_of_expiry: yup
            .string()
            .when(['registrationType', 'personalAttendant'], {
                is: (registrationType, personalAttendant) => registrationType =='International'  && personalAttendant=='Yes',
                then: yup.string().required('Date of expiry is required.'),
            }), 
     
            
        })
        
        return {
            event_id:0,
            file: '',
            loading:false,
            base_url: this.backendUrl,
            registeredGuests: {},
            registeredGuestInModdal: '',
            spinnerOn: false,
            mailTo:'',
            mailSubject: '',
            mailBody: '',
            eventId: '',
            editor: ClassicEditor,
            editorData: '',
                editorConfig: {
                    toolbar: {
                        items: [
                          'paragraph',
                          'heading',
                          'bold',
                          'italic',
                          'link',
                          'BulletedList',
                          'NumberedList',
                          'undo',
                          'redo',
                          'aignment'
                        ]
                    }
                },
            //RegFormData
            regCreateValidation: validationCreate,
            countryList, 
            cropData: '',
            registrationType: 'International',
            personalAttendant:'No',
            img:'',
            fullName: '',
            shortName: '',
            image:'',
            passport:'',
            covid19c:'',
            attendent_photo:'',
            attendent_passport:'',
            editData:{id:0,event_id:0,registration_type:'',full_name:'',short_name:'',email:'',date_of_birth:''
                        ,sex:'',photo:'',official_designation:'',organization:'',passport:'',covid19c:'',nid:''
                        ,country:'',mailing_address:'',telephone:'',cell_phone:'',website:'',emergency_name:''
                        ,emergency_relationship:'',emergency_email:'',emergency_phone:'',type_of_disability:''
                        ,aids_or_assistive_devices:'',require_assistance:'',accompanied_by_attendant:'',attenddant_person_name:''
                        ,attenddant_person_sex:'',attenddant_photo:'',attendent_passport:'',health_or_medical_condition:''
                        ,food_preference:'',food_restrictions:'',food_allergies:'',arrange_accommodation:'',shared_room:''
                        ,interpretation:'',interpretation_language:'',name_passport:'',nationality:'',place_of_birth:''
                        ,passport_number:'',place_of_issue:'',date_of_issue:'',date_of_expiry:'',attendant_name_passport:''
                        ,attendant_nationality:'',attendant_place_of_birth:'',attendant_passport_number:'',attendant_place_of_issue:''
                        ,attendant_date_of_issue:'',attendant_date_of_expiry:''},
        }
    },

    methods: {

        register(formData, { resetForm }) {
            $("#registerBtn").attr("disabled", "true");
            console.log(formData);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();
            data.append('registrationType', formData.registrationType);
            data.append('fullName', formData.fullName);
            data.append('shortName', formData.shortName);
            data.append('email', formData.email);
            data.append('dateOfBirth', formData.dateOfBirth);
            data.append('sex', formData.sex);
            data.append('image', this.image);
            data.append('designation', formData.designation);
            data.append('organiztion', formData.organiztion);
            if(this.registrationType =='International'){
                data.append('passport', this.passport);
            }        
            if(this.registrationType =='National'){
                data.append('nid', formData.nid);
            }
            data.append('country', formData.country);
            data.append('mailingAddress', formData.mailingAddress);
            data.append('telephone', formData.telephone);
            data.append('cellPhone', formData.cellPhone);
            data.append('website', formData.website);
            if(this.personalAttendant =='Yes'){
                data.append('personalAttendant', formData.personalAttendant);
                data.append('assistance_name', formData.assistance_name);
                data.append('assistance_sex', formData.assistance_sex);
                data.append('attendent_photo', this.attendent_photo);
                if(this.registrationType =='International'){
                    data.append('attendent_passport', this.attendent_passport);
                }
            }
            if(this.registrationType !='Virtual'){
                data.append('covid19c', this.covid19c);
                data.append('medical_conditon', formData.medical_conditon);
                data.append('food_preference', formData.food_preference);
                data.append('food_restirction', formData.food_restirction);
                data.append('food_alergy', formData.food_alergy);
                data.append('interpretation', formData.interpretation);
                data.append('interpretations_language', formData.interpretations_language);
                data.append('emCntName', formData.emCntName);
                data.append('relationship', formData.relationship);
                data.append('emCntEmail', formData.emCntEmail);
                data.append('emCntPhone', formData.emCntPhone);
                data.append('typeOfDisibility', formData.typeOfDisibility);
                data.append('device', formData.device);
                data.append('assistance', formData.assistance);

                if(this.registrationType =='International'){
                    data.append('hotel_data', formData.hotel_data);
                    data.append('share_room', formData.share_room);
                    data.append('name_in_passport', formData.name_in_passport);
                    data.append('passport_nationality', formData.passport_nationality);
                    data.append('passport_place_of_birth', formData.passport_place_of_birth);
                    data.append('passport_number', formData.passport_number);
                    data.append('passport_place_of_issue', formData.passport_place_of_issue);
                    data.append('passport_date_of_issue', formData.passport_date_of_issue);
                    data.append('passport_date_of_expiry', formData.passport_date_of_expiry);
                }

                if(this.registrationType =='International' && this.personalAttendant =='Yes'){
                    data.append('attendant_name_in_passport', formData.attendant_name_in_passport);
                    data.append('attendant_passport_nationality', formData.attendant_passport_nationality);
                    data.append('attendant_passport_place_of_birth', formData.attendant_passport_place_of_birth);
                    data.append('attendant_passport_number', formData.attendant_passport_number);
                    data.append('attendant_passport_place_of_issue', formData.attendant_passport_place_of_issue);
                    data.append('attendant_passport_date_of_issue', formData.attendant_passport_date_of_issue);
                    data.append('attendant_passport_date_of_expiry', formData.attendant_passport_date_of_expiry);
                }
            }
            

            this.axios
                .post(this.base_url + '/api/addGuest', data, config)
                .then(function (response) {
                    console.log(response);
                    resetForm();
                    location.reload();
                    //$('#modalForAddingNewGuest').modal('hide');
                })
                .catch(function (err) {
                    console.log(err);
                    $("#registerBtn").removeAttr("disabled");
                });

            
        },


        // For Open Add New Guest Moadal
        openAddNewGuestModal() { 
            this.$refs.form.resetForm();
            $('#modalForAddingNewGuest').modal('show');
            
            
        },
        

        pickAttendantPhotoFile(ev) {
            this.attendent_photo = ev.target.files[0];
        },

        pickPassportFile(ev) {

            this.passport = ev.target.files[0];
        },

        pickAttendantPassportFile(ev) {
            this.attendent_passport = ev.target.files[0];
        },

        pickVaccineCertificateFile(ev) { 
            this.covid19c = ev.target.files[0];
        },

        //Croping image
        cropImage(e) {
            console.log(e);
            let reader = new FileReader();
            console.log(reader);
            this.image = this.cropData;
            console.log(this.image);
            var pic = this.image;
            $(document).ready(function () {
                $('#remarkModal').modal('hide');
                $('#prvImg').attr('src', pic);
                $('body').css('height','auto', 'padding-right', '17px');
                $('body').addClass('modal-open');
            });
        },


        //Croping image params
        changes({ coordinates, canvas }) {
            console.log(coordinates, canvas);
            this.cropData = canvas.toDataURL(this.image);
        },

        // Image
        onFileUpload(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            this.img = '';
            if (file["size"] < 10111775) {
                reader.onloadend = (file) => {
                    console.log(file);
                    this.img = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert("File size can not be bigger than 10 MB");
            }
            $('#remarkModal').modal('show');
        },

        print() {
            this.$htmlToPaper('printApplicationContent')
        },

        // For Clearing Mail Modal
        onClear() { 
            this.mailTo = '';
            this.mailSubject = '';
            this.mailBody = '';
        },

        // For Reply Button
        onReply(registeredGuest) { 
            this.mailTo = registeredGuest.email; 
            this.registeredGuestName = registeredGuest.full_name;
            this.eventId = registeredGuest.event_id;
            $(document).ready(function () {
                $('#exampleModalCenterForSendingMail').modal('show');
            });
        },

        // For Sending Mail
        onSend() { 
            this.spinnerOn = true;
            $(document).ready(function () {
                $('#exampleModalCenterForSendingMail').modal('hide');
            });
            this.axios
                .post(this.base_url + '/api/send-reply', {
                    subject: this.mailSubject,
                    //title: this.mailTitle,
                    message_body: this.mailBody,
                    email: this.mailTo,
                    name: this.registeredGuestName,
                    event_id:this.eventId
                    
                })
                .then((res) => { 
                    console.log(res);
                    createToast('Mail Sent Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    })
                    this.spinnerOn = false;
                    this.onClear();
                })
                .catch((err) => { 
                    console.log(err);
                    createToast('Mail Sent Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    })
                    this.spinnerOn = false;
                    this.onClear();
                })
        },

        // For Fatching All Registered Guest Information
        getAllRegisteredGuest() { 
            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getGuest")
                .then((res) => {
                    this.registeredGuests = res.data.userList;
                    console.log(this.registeredGuests);
                $(document).ready(function(){
                    $('#datatable').DataTable();
                });
            })
            .catch((err) => { 
                console.log(err);
            })
        },
        
        // Show Specific Guest Information
        onShow(registeredGuest) { 
            this.registeredGuestInModdal = registeredGuest;
            $(document).ready(function () {
                $('#exampleModalCenter').modal('show');
            });
        },

        //Data Return
        formatDate(value) {
            return moment(value).format('DD MMMM YYYY')
        }, 


        onEdit(data){
            //console.log(data);
            this.editData = data;
            console.log(this.editData.id);
            $('#modalForUpdateGuest').modal('show');
        },


        onDelete(id){
            this.$swal
            .fire({
            text: "Are you sure to delete ?",
            icon: "error",
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Confirm Delete",
            showCancelButton: true,
            })
            .then((result) => {
                if (result["isConfirmed"]) {
                    this.axios.delete(this.base_url + '/api/deleteGuest/'+id)
                    .then(function (response) {
                        console.log(response);
                        this.getAllRegisteredGuest();
                        this.$swal.fire({
                            text: "Success, Deleted Successfully.",
                            icon: "success",
                            position: 'top-end',
                            timer: 1000,
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 
                }
            });
        },

        myfunction(){
            alert("test Alert");
        }

    },

    created() {
        this.getAllRegisteredGuest();
    },

    watch(){

        
    }
}
</script>

<style scoped>
.legendItem {
    margin-top: -36px;
    background-color: white;
    padding: 0 7px;
    display: inline-block;
    width: auto;
    line-height: 10px;
}

.field_set_item {
    border-width: 2px;
    border-style: groove;
    border-color: threedface;
    padding: 30px;
}

.view {
    margin-top: 8px;
    display: inline-block;
    font-weight: 16px;
    font-size: 16px;
    text-decoration: none;
    padding-left: 15px;
    padding-right: 22px;
    color: white;
    background-color: #11539b;
    margin-left: 50px;
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 5px 60px 5px 60px;
    

}

.view:hover {
    background-color: #d1d9e0;
    color: black;

}
.bg-cz{
    padding: 0.375rem 0.75rem;
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: 400 !important;
    line-height: 1.5;
    color: #495057;
    text-align: left;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
#exampleModalCenter .form-control{
    height: auto !important;
}



.upload-options label {
    display: block;
    align-items: center;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    padding: 10px;
    text-align: center;
    background: #007dac;
    color: white;
    margin: 0;
    border-radius: 3px;
}

.upload-options label:hover {
    background-color: #0a466e;
}

.upload-options input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
.error-feedback{
    color:red;
}
</style>