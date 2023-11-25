<template>
    <div>
    <h4 class="text-bold heading-style">Market Place </h4>
    <div class="card card-default">
        <div class="card-header">
            <button class="btn btn-success print-button-style" style="padding:5px 6px" @click="printMarketPlace">
                      <font-awesome-icon icon="fa-solid  fa-rectangle-list" />
                      Export
            </button>
        </div>
        <div class="card-body">
           <div class="row">
            <div class="col-md-12">
                <table class="table table-hover" id="datatable">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Organization Name</th>
                            <th scope="col">Content Person Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Mail Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(marketPlace,index) in marketPlaces" :key="marketPlace.id">
                            <td scope="row">{{index+1}}</td>
                            <td>{{marketPlace.organization_name}}</td>
                            <td>{{marketPlace.contact_person_name}}</td>
                            <td>{{marketPlace.mobile}}</td>
                            <td>{{marketPlace.email}}</td>
                            <td>
                            <button class="btn btn-info mx-2 btn-sm" title="Details Information For Registered Guest"
                            @click="onShow(marketPlace)">
                            <font-awesome-icon icon="fa-solid  fa-info-circle" />
                            </button>
                            |
                            <button class="btn btn-info mx-2 btn-sm" title="Mail to Registered Guest" 
                            @click="onReply(marketPlace)">
                            <font-awesome-icon icon="fa-solid fa-envelope" />
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
        <!-- Modal For Schedule -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="ck-control">
                        <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                            <div class="col-md-12 form-bg">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card card-default" style="margin-right:-12px">
                                            <div class="card-body" style="margin-left: 28px;">
                                                <fieldset class="field_set_item">
                                                    <legend class="legendItem"> Market Place Details </legend>
                                                    
                                                    <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <div class="input-group border border-dark rounded">
                                                                    <div class="input-group-prepend">
                                                                    <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                                                    </div>
                                                                    <label class="ml-3 mt-2 ">{{eventTitle}}</label>
                                                                </div>
                                                            </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Registration Date</div>
                                                                    </div>
                                                                    <span class="form-control text-bold" readonly>{{formatDate(marketPlaceModalData.created_at)}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <!--  -->
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Organization Name</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.organization_name"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-6">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Contact Person Name</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.contact_person_name"></span>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div> 
                                                    
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <!--  -->
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Email</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.email"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-6">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Phone</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.mobile"></span>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div> 

                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <!--  -->
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Address</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.address"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-12">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Display Metrials</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.description_of_display_metrials"></span>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div> 

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <!--  -->
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Stall Size</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.required_stall_size"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-6">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Remarks</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="marketPlaceModalData.remarks"></span>
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

                                  <div>
                                        <p class="mb-0 text-danger" v-if="errMailSubjectMsg">Email Subject Is Required !</p>
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

                            <div>
                                <p class="mb-0 text-danger" v-if="errMailBodyMsg">Mail Content Is Required !</p>
                            </div>
                           
                          </div>
                        </div>
                        <!-- End -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info" @click="onSend"> Send  <font-awesome-icon icon="fa-solid fa-square-up-right" /> </button>
                </div>

            </div>
            </div>
            </div>
        <!-- End -->

        <!-- Modal For Print Schedule -->
            <div class="modal fade" id="modalForPrintMarketPlace" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Market Place  </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                    <div class="col-md-12">
                    <div class="table-responsive">
                    <table class="table table-striped table-bordered" id="datatablePrint">
                        <thead>
                            <tr>
                            <th scope="col" >SL</th>
                            <th scope="col" >Organization Name</th>
                            <th scope="col" >Contact Person Name</th>
                            <th scope="col" >Mobile</th> 
                            <th scope="col" >Email</th> 
                            <th scope="col" >Address</th> 
                            <th scope="col" >Display Metrials</th>
                            <th scope="col" >Stall Size</th>
                            <th scope="col" >Application Date</th>
                            <th scope="col" >Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(marketPlace,index) in allMarketPlaceData" :key="marketPlace.id">
                            <th scope="row">{{index+1}}</th>
                            <td v-html="marketPlace.organization_name"></td>
                            <td v-html="marketPlace.contact_person_name"></td>
                            <td >{{marketPlace.mobile}}</td>
                            <td >{{marketPlace.email}}</td>
                            <td v-html="marketPlace.address"></td>
                            <td v-html="marketPlace.description_of_display_metrials"></td>
                            <td > {{marketPlace.required_stall_size}}</td>
                            <td >{{$filters.myDateFormate(marketPlace.created_at)}}</td>
                            <td v-html="marketPlace.remarks"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>      
                    </div> 
                </div>

                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
            </div>
        <!-- End -->
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from '../Loader.vue';
import $ from 'jquery';
import moment from 'moment';

export default {
    name: 'Market Place',
    components: {
        Loader,
    },
    data() {
        return {
            //  Spinner
            spinnerOn:false,
            // Ck - editorConfig
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
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
            // Base Url
            base_url: this.backendUrl,
            // Properties
            marketPlaces: {},
            marketPlaceModalData: {},
            contactPersonName:'',
            mailSubject:'',
            mailTo:'',
            mailBody:'',
            registeredGuestName:'',
            eventId:'',
            errMailSubjectMsg:false,
            errMailBodyMsg:false,
            allMarketPlaceData:{},
            eventTitle:''
        }
    },
    methods: {
        onClear(){

            this.mailTo = '';
            this.mailBody = '';
            this.mailSubject = '';

            this.errMailBodyMsg = false;
            this.errMailSubjectMsg = false;

        },
        //Print Market Place
        printMarketPlace(){
            $(document).ready(function () {
                $('#modalForPrintMarketPlace').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getMarketPlace")
                .then((res) => {
                this.allMarketPlaceData = res.data.data;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                            {
                                extend: 'csv',
                                messageTop: 'Market Place Informations',
                                title: 'Asf 2022 Market Place Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Market Place Informations',
                                title: 'Asf 2022 Market Place Information Table'
                           },
                        ]
                    } );
                    $('.buttons-print').each(function() {
                    $(this).removeClass('btn-default').addClass('print-button')
                    })

                    $('.buttons-csv').each(function() {
                    $(this).removeClass('btn-default').addClass('csv-button')
                    }) 

                    $('.dt-buttons').each(function() { 
                    $(this).css({ float: 'left' });
                    })


                    $('.dataTables_length').each(function() { 
                    $(this).css({ margin: '10px' });
                    })

                    $('#datatablePrint .dataTables_filter').each(function() { 
                    $(this).css({ float: 'right' });
                    })

                } );
            })

        },
        
        // Gel Market Place Data
        getMarketPlace() { 

            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getMarketPlace")
                .then((res) => { 
                    this.marketPlaces = res.data.data;
                    this.eventTitle = res.data.activeEvent.title;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
                })

        },

        // Show All Market Place
        onShow(marketPlace) { 

            this.marketPlaceModalData = marketPlace;

            $(document).ready(function () {
                $('#exampleModalCenter').modal('show');
            });
        } ,
        
        onReply(data) { 
            this.onClear();
            this.mailTo = data.email; 
            this.contactPersonName = data.contact_person_name;
            this.eventId = data.event_id;
            console.log(data.email);
            $(document).ready(function () {
                $('#exampleModalCenterForSendingMail').modal('show');
            });
        },

        // For Sending Mail
        onSend() { 
            
            if( this.mailSubject !='' && this.mailBody != '') {
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

            }else{

            if(this.mailSubject != '') {
                this.errMailSubjectMsg = false;
            }else{
                this.errMailSubjectMsg = true; 
            }

            if(this.mailBody != '') {
                this.errMailBodyMsg = false;
            }else{
                this.errMailBodyMsg = true; 
            }
            this.spinnerOn = false;
            }
        },

        formatDate(value) {
            
            return moment(value).format('ddd, MMMM Do YYYY, h:mm:ss a')
        },

    },
    created() {
        this.getMarketPlace();
    },
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
.form-control{
    height:auto !important;
}
</style>