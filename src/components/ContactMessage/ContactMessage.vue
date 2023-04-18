<template>
    <div class="card card-default">
        <div class="card-header">
            <h3 class="card-title"><strong>Messages</strong></h3>
        </div>
        <div class="card-body">
           <div class="row">
            <div class="col-md-12">
                <table class="table table-hover" id="datatable">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(message,index) in messages" :key="message.id">
                            <td scope="row">{{index+1}}</td>
                            <td>{{message.name}}</td>
                            <td>{{message.email}}</td>
                            <td>{{message.subject}}</td>
                            <td>
                            <button class="btn btn-info mx-2 btn-sm" title="Message Details"
                            @click="onShow(message)">
                            <font-awesome-icon icon="fa-solid  fa-info-circle" />
                            </button>
                            |
                            <button class="btn btn-info mx-2 btn-sm" title="Reply" 
                            @click="onReply(message)">
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
                                                    <legend class="legendItem"> Message Details </legend>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <!--  -->
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Name</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="messageModalData.name"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-6">
                                                            <div class="col-auto">
                                                                <div class="input-group mb-2">
                                                                    <div class="input-group-prepend">
                                                                    <div class="input-group-text">Email</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="messageModalData.email"></span>
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
                                                                    <div class="input-group-text">Subject</div>
                                                                    </div>
                                                                    <span class="form-control" v-html="messageModalData.subject"></span>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-12 form-group">
                                                            <div class="pl-2 pr-2">
                                                                <div class="">
                                                                    <span class="input-group-text p4 mb-2">Message</span>
                                                                </div>
                                                                <p class="p-2 m-1" style="border:1px solid #ccc; height:250px; overflow-y: auto; border-radius:3px;" v-html="messageModalData.message"></p> 
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
                        <button class="btn btn-info mx-2 btn-sm" title="Reply" 
                            @click="onReply(messageModalData)">
                            <font-awesome-icon icon="fa-solid fa-envelope" />
                            </button>
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
                <h5 class="modal-title" id="exampleModalLongTitle">Feedback</h5>
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
                                        <span class="input-group-text p5" >To*</span>
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
                                        <span class="input-group-text p5" >Subject*</span>
                                    </div>
                                    <input name="mailSubject" type="text" v-model="mailSubject" class="form-control" autocomplete="off"/>
                                  </div>

                                  <div>
                                        <p class="mb-0 text-danger" v-if="errMailSubjectMsg">Subject Is Required !</p>
                                  </div>
                              
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Mail Body -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                                <div class="">
                                    <span class="input-group-text p4 mb-2" >Feedback*</span>
                                </div>
                                <ckeditor name="mailBody" autocomplete="off" class="form-control" :editor="editor" v-model="mailBody" :config="editorConfig" /> 
                            </div>

                            <div>
                                <p class="mb-0 text-danger" v-if="errMailBodyMsg">Feedback Is Required !</p>
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
    <!--  -->
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from '../Loader.vue';
import $ from 'jquery';

export default {
    name: 'Contact Message',
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
            messages: {},
            messageModalData: {},
            contactPersonName:'',
            mailSubject:'',
            mailTo:'',
            mailBody:'',
            registeredGuestName:'',
            eventId:'',
            errMailSubjectMsg:false,
            errMailBodyMsg:false
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
        // Gel Market Place Data
        getMessages() { 

            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getContactMessages")
                .then((res) => { 
                    this.messages = res.data.messages;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
                })

        },

        // Show All Market Place
        onShow(message) { 

            this.messageModalData = message;

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
                .post(this.base_url + '/api/contactMmessageReply', {
                    subject: this.mailSubject,
                    //title: this.mailTitle,
                    message_body: this.mailBody,
                    email: this.mailTo,
                    name: this.registeredGuestName,
                    event_id:this.eventId
                    
                })
                .then((res) => { 
                    console.log(res);
                    createToast('Feedback Sent Successfully !', {
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
                    createToast('Feedback Couldnot Sent!', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'danger',
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
    },
    created() {
        this.getMessages();
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
</style>