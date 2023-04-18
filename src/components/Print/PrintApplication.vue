<template>
<div id='abc'>
    <div class="row">
        <div class="col-md-12">
            <h2 class="text-center">Asia Shelter Forum Annual Conferance 2022</h2>
            <h4 class="text-center">Applicant Information</h4>
        </div>
    </div>
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
        <div class="col-md-12 form-bg">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-default" style="margin-right:-12px">
                        <div class="card-body" style="margin-left: 28px;">
                            <fieldset class="field_set_item">
                                <legend class="legendItem"> General Information</legend>
                                <div class="row">
                                    <div class="col-md-8">
                                        <!--  -->
                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Registration Type</div>
                                                </div>
                                                <span class="form-control h-auto" style="text-transform: capitalize;" v-html="applicationInfo.registration_type"></span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Full Name </div>
                                                </div>
                                                <span class="form-control h-auto" v-html="applicationInfo.full_name"></span>
                                            </div>
                                        </div>

                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Short Name </div>
                                                </div>
                                                <span class="form-control h-auto" v-html="applicationInfo.short_name"></span>
                                            </div>
                                        </div>

                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Sex</div>
                                                </div>
                                                <span class="form-control h-auto" v-html="applicationInfo.sex"></span>
                                            </div>
                                        </div>

                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Official Designation </div>
                                                </div>
                                                <span class="form-control" v-html="applicationInfo.official_designation"></span>
                                            </div>
                                        </div>

                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">Date Of Birth</div>
                                                </div>
                                                <span class="form-control" v-html="formatDate(applicationInfo.date_of_birth)"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">     
                                        <div class="p-2 text-center bg-light" style="border:1px solid #cccccc">
                                            <img v-if="applicationInfo.photo != ''" style="max-height: 200px;" :src="backendUrl+'/public/uploads/images/photos/'+applicationInfo.photo" alt="Guest Image" class="img-thumbnail">
                                            <img v-if="applicationInfo.photo == ''" style="max-height: 200px;" src="@/assets/img/dummy_man.png" alt="Guest Image" class="img-thumbnail">
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
                                            <span class="form-control" v-html="applicationInfo.country"></span>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Telephone</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.telephone"></span>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Website</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.website"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Mailing Address</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.mailing_address"></span>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Cell Phone </div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.cell_phone"></span>
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
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
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
                                            <span class="form-control" v-html="applicationInfo.emergency_name"></span>
                                        </div>
                                    </div>

                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Relationship</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.emergency_relationship"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Email</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.emergency_email"></span>
                                        </div>
                                    </div>

                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                            <div class="input-group-text">Phone</div>
                                            </div>
                                            <span class="form-control" v-html="applicationInfo.emergency_phone"></span>
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
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
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
                                                <span class="form-control" v-html="applicationInfo.type_of_disability"></span>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <label class="bg-cz d-block p-2">If you use any aids and/or assistive devices, please provide the details</label>
                                            <label class="form-control">{{applicationInfo.aids_or_assistive_devices}}</label>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <label class="bg-cz d-block p-2">If you require any disability related services and/or assistance, please provide details :</label>
                                            <label class="form-control">{{applicationInfo.require_assistance}}</label>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <label class="bg-cz d-block p-2">If a personal attendant will accompany you, please provide the details (please select yes if any personal attendant will accompany you):</label>
                                            <label class="form-control">{{applicationInfo.accompanied_by_attendant}}</label>
                                        </div>

                                        <div class="col-md-12 mb-2" v-if="applicationInfo.accompanied_by_attendant == 'YES'" style="margin-top: 100px">
                                            <div class="p-2 bg-light">
                                                <label class="bg-cz d-block p-2 text-center">Attendant Information</label>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Name</div>
                                                                </div>
                                                                <span class="form-control" v-html="applicationInfo.attenddant_person_name"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="col-auto">
                                                            <div class="input-group mb-2">
                                                                <div class="input-group-prepend">
                                                                <div class="input-group-text">Sex</div>
                                                                </div>
                                                                <span class="form-control" v-html="applicationInfo.attenddant_person_sex"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row m-0 mt-3">
                                                    <div class="col-md-6">
                                                        <div class="p-2 text-center bg-light" style="border:1px solid #cccccc">
                                                            <img v-if="applicationInfo.attenddant_photo != ''" style="max-height: 200px;" :src="backendUrl+'/public/uploads/images/photos/'+applicationInfo.attenddant_photo" alt="Guest Image" class="img-thumbnail">                                
                                                            <img v-if="applicationInfo.attenddant_photo == ''" style="max-height: 200px;" src="@/assets/img/dummy_man.png" alt="Guest Image" class="img-thumbnail">                                
                                                        </div>
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
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
        <div class="col-md-12 form-bg">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-default" style="margin-right:-12px">
                        <div class="card-body" style="margin-left: 28px;">
                            <fieldset class="field_set_item">
                                <legend class="legendItem"> Health Related Information</legend>
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Organizers should be aware of</label>
                                    <label class="form-control">{{applicationInfo.health_or_medical_condition}}</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  Food Diet Related information -->
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
        <div class="col-md-12 form-bg">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-default" style="margin-right:-12px">
                        <div class="card-body" style="margin-left: 28px;">
                            <fieldset class="field_set_item">
                                <legend class="legendItem"> Food Diet Related Information</legend>
                                
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Food preference</label>
                                    <label class="form-control">{{applicationInfo.food_preference}}</label>
                                </div>

                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Have any food/dietary reservations/restrictions</label>
                                    <label class="form-control">{{applicationInfo.food_restrictions}}</label>
                                </div>

                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Organizers should be aware of(food/dietary allergies)</label>
                                    <label class="form-control">{{applicationInfo.food_allergies}}</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  ACCOMMODATION RELATED INFORMATION -->
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
        <div class="col-md-12 form-bg">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-default" style="margin-right:-12px">
                        <div class="card-body" style="margin-left: 28px;">
                            <fieldset class="field_set_item">
                                <legend class="legendItem"> Accommodation Related Information</legend>
                                
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Organizers to also arrange accommodation</label>
                                    <label class="form-control">{{applicationInfo.arrange_accommodation}}</label>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Share your room with other participants?</label>
                                    <label class="form-control">{{applicationInfo.shared_room}}</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--  LANGUAGE RELATED INFORMATION -->
    <div class="row justify-content-center mb-2 ml-0 mr-0" style="margin-top:150px">
        <div class="col-md-12 form-bg">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-default" style="margin-right:-12px">
                        <div class="card-body" style="margin-left: 28px;">
                            <fieldset class="field_set_item">
                                <legend class="legendItem"> Language Related Information</legend>
                                
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Preferred simultaneous interpretation</label>
                                    <label class="form-control">{{applicationInfo.interpretation}}</label>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label class="bg-cz d-block p-2">Preferrd language for interpretations</label>
                                    <label class="form-control">{{applicationInfo.interpretation_language}}</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  PASSPORT RELATED INFORMATION -->
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="applicationInfo.registration_type == 'international'">
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
                                        <span class="form-control" v-html="applicationInfo.name_passport"></span>
                                    </div>
                                </div>

                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Nationality</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.nationality"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Place of Birth</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.place_of_birth"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Passport Number</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.passport_number"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Place of Issue</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.place_of_issue"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Date of Issue</div>
                                        </div>
                                        <span class="form-control" v-html="formatDate(applicationInfo.date_of_issue)"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Date of Expiry</div>
                                        </div>
                                        <span class="form-control" v-html="formatDate(applicationInfo.date_of_expiry)"></span>
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
    <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0" v-if="applicationInfo.accompanied_by_attendant == 'YES'">
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
                                        <span class="form-control" v-html="applicationInfo.attendant_name_passport"></span>
                                    </div>
                                </div>

                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Nationality</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.attendant_nationality"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Place of Birth</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.attendant_place_of_birth"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Passport Number</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.attendant_passport_number"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Place of Issue</div>
                                        </div>
                                        <span class="form-control" v-html="applicationInfo.attendant_place_of_issue"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Date of Issue</div>
                                        </div>
                                        <span class="form-control" v-html="formatDate(applicationInfo.attendant_date_of_issue)"></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                        <div class="input-group-text">Date of Expiry</div>
                                        </div>
                                        <span class="form-control" v-html="formatDate(applicationInfo.attendant_date_of_expiry)"></span>
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
</template>

<script>
import moment from 'moment';
export default {
    name:'Print Application',    
    props: ['applicationInfo'],

    methods: {
        //Data Return
        formatDate(value) {
            return moment(value).format('DD MMMM YYYY')
        }, 
    }
}
</script>


<style scoped>

</style>