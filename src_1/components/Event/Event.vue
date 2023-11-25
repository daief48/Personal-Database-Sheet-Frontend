<template>
 <div>
  <h4 class="text-bold heading-style">Events</h4>

  <div class="card card-default">
    <div class="card-header">
      <div class="col-8">
                <!-- Add New Event Button -->
                <button class="add-button"
                @click="addEvent"
                > 
                  <font-awesome-icon icon="fa-solid  fa-plus" /> 
                  Add New Event
                </button>
                <button class="btn btn-success ml-2" style="padding:5px 6px" @click="printEvent">
                      <font-awesome-icon icon="fa-solid  fa-rectangle-list" />
                      Export
                </button>

              </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">

          <div class="user-list" style="position:relative; top:-20px;">
            
            <div class="row mt-2 mb-2 ml-0 mr-0">
              <div class="col-12">
                <div class="col-3 float-right">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Event..."
                  @input="searchEvent"
                  v-model="query.search"
                />
              </div>

              </div>
            </div>

            <div class="pl-2 pr-2">
              <div class="" v-if="!isLoading" style="border:1px solid #eeeeee">
              <div class="col-md-12">
                <div class="row border-bottom border-top p-2 bg-light">
                  <div class="col-1">Sl </div>
                  <div class="col-3">Title</div>
                  <div class="col-2">Venue</div>
                  <div class="col-1">From_Date</div>
                  <div class="col-1">To_Date</div>
                  <div class="col-2">Registration_Status</div>
                  <div class="col-2">Actions</div>
                </div>
              </div>
                <div class="pt-1 pl-2 pb-1 pl-2 customize-border"  v-for="(event,index) in eventPaginatedData.data" :key="event.id">
                  <div class="row border-1 pb-1">
                    <div class="col-1 text-left">
                      {{ index + 1 }} 
                    </div>

                    <div class="col-3" > 
                      {{event.title}}
                      <strong class="badge badge-light border border-warning"><span v-if="event.status"><i class="fa fa-check" aria-hidden="true"></i> Active</span><span v-else> <i class="fa fa-times" aria-hidden="true"></i> In-active</span></strong>
                    </div>

                    <div class="col-2">
                       <strong class="text-info">{{ event.venue }} </strong>
                    </div>

                    <div class="col-1">
                      <strong class="text-info">{{ $filters.myDateFormate(event.from_date) }} </strong>
                    </div>

                    <div class="col-1">
                      <strong class="text-info">{{ $filters.myDateFormate(event.to_date) }} </strong>
                    </div>

                    <div class="col-2">
                      <strong title="You can only activate one registration status."  class="badge" :class="(event.reg_active_status == 1 ? 'badge-success' : 'badge-danger')"> <span v-if="(event.reg_active_status == 1)"> active</span> <span v-else > In-active</span> </strong>
                    </div>

                    <div class="col-2">
                      <button
                        class="btn btn-warning mx-2 btn-sm"
                        title="Edit Event"
                        @click="onEdit(event)"
                      >
                      
                        <font-awesome-icon icon="fa-solid  fa-pencil" />
                      </button>
                      <button
                        class="btn btn-danger mx-2 btn-sm" 
                        title="Delete Event"
                        @click="deleteEvent(event.id)" disabled>
                        <font-awesome-icon icon="fa-solid  fa-trash" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              <div v-if="isLoading" class="text-center pt-0 pb-0 pl-5 pr-5 mt-5 mb-5 d-flex align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div>
            </div>
            

            <div v-if="eventPaginatedData.pagination != null" class="vertical-center mt-3 mb-5">
          
              <v-pagination
                v-model="query.page"
                :pages="eventPaginatedData.pagination.total_pages"
                :range-size="2"
                active-color="#DCEDFF"
                @update:modelValue="getResults"
                :class="justify-center"
              />
            </div>        
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal For Schedule -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Entry New Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="ck-control">
            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                  <div class="col-md-12 form-bg">
                      <Form @submit="handleUser" :validation-schema="eventForm" ref="form">
                  
                          <!-- Event Title,Event Abstract & Event Content -->

                          <!-- Event Title -->
                          <div class="row">
                            <div class="col-md-12 form-group">
                              <div class="mb-2">
                                <div class="input-group mb-2">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text input-group-text-label p4" >Event Title*</span>
                                      </div>
                                    <Field name="eventTitle" type="text" v-model="eventTitle" class="form-control" autocomplete="off"/>
                                  </div>
                                </div>
                              <ErrorMessage name="eventTitle" class="error-feedback" />
                            </div>
                          </div>
                          <!-- End -->

                          <!-- Event Abstract -->
                          <div class="row">
                            <div class="col-md-12 form-group">
                              <div class="mb-2">
                                  <div class="">
                                      <span class="input-group-text p4 mb-2" >Abstract*</span>
                                  </div>
                                  <ckeditor name="eventAbstract" autocomplete="off" class="form-control" :editor="editor" v-model="eventAbstract" :config="editorConfig" />
                              </div>
                              <ErrorMessage name="eventAbstract" class="error-feedback" />
                            </div>
                          </div>
                          <!-- End -->

                          <!-- Event Content -->
                          <div class="row">
                            <div class="col-md-12 form-group">
                              <div class="mb-2">
                                  <div class="">
                                      <span class="input-group-text p4 mb-2" >Content*</span>
                                  </div>
                                  <ckeditor name="eventContent" autocomplete="off" class="form-control" :editor="editor" v-model="eventContent" :config="editorConfig" />
                              </div>
                              <ErrorMessage name="eventContent" class="error-feedback" />
                            </div>
                          </div>
                          <!-- End -->

                          <!-- From time,To time & Status-->
                          <div class="row">
                            <div class="col-md-12">
                              
                              <div class="col-md-6 mt-4 d-inline-block float-left">

                                  <div class="row">
                                      <!-- Event Venue -->
                                      <div class="col-md-12 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text input-group-text-label p4" >Venue*</span>
                                              </div>
                                              <Field name="eventVenue" type="text" v-model="eventVenue" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="eventVenue" class="error-feedback" />
                                      </div>
                                      <!-- End -->
                                      <!-- From Date -->
                                      <div class="col-md-12 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text input-group-text-label p4" >From Date*</span>
                                              </div>
                                              <Field name="fromDate" type="date" v-model="fromDate" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="fromDate" class="error-feedback" />
                                      </div>
                                      <!-- End -->

                                      <!-- To Date -->
                                      <div class="col-md-12 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text input-group-text-label p4" >To Date*</span>
                                              </div>
                                              <Field name="toDate" type="date" v-model="toDate" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="toDate" class="error-feedback" />
                                      </div>
                                      <!-- End -->
                                      
                                      
                                      <!-- Concept Note -->
                                      <div class="col-md-12 form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text input-group-text-label p4" >Concept Note</span>
                                            </div>
                                            <Field name="concept_note"  type="file" id="concept_note" class="form-control" accept=".pdf" @change="pickFile"  v-model="concept_note" autocomplete="off"  style="height:44px" />
                                  
                                            <a v-if="editConceptNote" :href="editConceptNote" target="_blank" class="fa fa-eye iconsubmit"></a>
                                        </div>
                                        <ErrorMessage name="concept_note"  class="error-feedback" />
                                      </div>
                                      <!-- End -->

                                      <!-- Status -->
                                      <div class="col-md-12 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text input-group-text-label p4" >Status* </span>
                                              </div>
                                              <Field name="eventStatus" as="select" class="form-control" v-model="eventStatus">
                                                  <option value="">-- Select Status  --</option>
                                                  <option value="1">Active</option>
                                                  <option value="0">In-active</option>
                                              </Field>                                    </div>
                                          <ErrorMessage name="eventStatus" class="error-feedback" />
                                      </div>
                                      <!-- End -->
                                      <!-- Registration active status -->
                                        <div class="col-md-12 mt-2  mb-3 form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <input type="checkbox" id="imageForHomePage" value="1" v-model="reqActiveStatus" />
                                                    <label class="mt-2 ml-2" for="imageForHomePage">Registration Activation <span style="font-size: small;margin-left: 15px;color: red;">**Click yes, if you want activated.</span> </label>
                                                </div>

                                            </div>
                                            <ErrorMessage name="reqActiveStatus" class="error-feedback" />
                                        </div>
                                        <!-- End -->
                                  </div>

                              </div>

                              <div class="col-md-6 d-inline-block">
                                  <div class="col-md-12 form-group">
                                      <div class="form-bg text-center p-3">
                                          <div class=" box" style="display:block">
                                              <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                  <img id="prvImg" v-if="!editImageFlag" src="@/assets/img/placeholder.png"
                                                  style="max-width:95%; width:95%">

                                                  <img id="prvImg"  v-if="editImageFlag" :src="editImage"
                                                  style="max-width:95%; width:95%">
                                              </div>
                                              <div class="upload-options mt-3">
                                                  <label class="upload-options">
                                                      <i class="fas fa-plus-square"></i> Select Banner Image
                                                      <input type="file" class="image-upload" accept="image/*" @change="onFileUpload">
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>


                            </div>
                          </div>
                              <div class="modal-footer">
                                <div class="form-group">
                                    <button class="btn btn-primary mr-2" :disabled="isCreating || isUpdating">
                                      <span v-show="isCreating" class="spinner-border spinner-border-sm"></span>
                                      Submit
                                    </button>

                                    <button class="btn btn-danger ml-2" type="reset">Reset</button>
                                </div>
                              </div>

                      </Form>
                  </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  <!-- End -->

  <!-- Modal For Print Guest -->
    <div class="modal fade" id="modalForPrintEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Events  </h5>
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
                      <th scope="col" >Title</th>
                      <th scope="col" >Abstract</th>
                      <th scope="col" >Content</th> 
                      <th scope="col" >Venue</th> 
                      <th scope="col" >From Date</th>
                      <th scope="col" >To Date</th>
                      <th scope="col" >Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(event,index) in allEvent" :key="event.id">
                      <th scope="row">{{index+1}}</th>
                      <td > {{event.title}}</td>
                      <td v-html="event.abstract"></td>
                      <td v-html="event.content"></td>
                      <td > {{event.venue}}</td>
                      <td >{{$filters.myDateFormate(event.from_date)}}</td>
                      <td >{{$filters.myDateFormate(event.to_date)}}</td>
                      <td > {{event.status == 1 ? 'Active' : 'Inactive'}}</td>
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
import moment from 'moment';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {useStore, mapGetters, mapActions } from "vuex"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../assets/css/custom.css';
import $ from 'jquery';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    VPagination,
  },

  data() {
    const store = useStore();
    const validationCreate = yup.object().shape({
        eventTitle: yup
            .string()
            .required("Event title date is required"),

          fromDate: yup
            .string()
            .required("From date is required"), 
          toDate: yup
            .string()
            .required("To date is required"), 
          eventVenue: yup
            .string()
            .required("To date is required"), 
          eventStatus: yup
            .string()
            .required("Status is required"),
      });

      const validationEdit = yup.object().shape({
        eventTitle: yup
            .string()
            .required("Event title date is required"),
        // eventAbstract: yup
        //     .string()
        //     .required("Abstract is required"),
        // eventContent: yup
        //     .string()
        //     .required("Content is required"),
          // scheduleDetail: yup
          //   .string()
          //   .required("Schedule details is required"), 
          fromDate: yup
            .string()
            .required("From date is required"), 
          toDate: yup
            .string()
              .required("To date is required"),
          eventVenue: yup
            .string()
            .required("Venue time is required"),  
          eventStatus: yup
            .string()
            .required("Status is required"),
      });

    return {
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

      backend_url: process.env.VUE_APP_API_URL, 
      store,
      events: {},
      // Properties
      eventTitle:'',
      eventAbstract: '',
      eventContent: '',
      fromDate: '',
      toDate: '',
      eventStatus: 0,
      eventVenue: '',
      gallerImage: '',
      loading: false,
      id:0,
      query: {
        page: 1,
        search: "",
      },
      myValue: '',
      validationCreate: validationCreate,
      validationEdit: validationEdit,
      eventForm: validationCreate, 
      concept_note:'',  
      conceptNote: '', 
      editConceptNote: '', 
      editImage:'',
      editImageFlag:false,
      allEvent:'',
      reqActiveStatus: false
    };
  },
  
  computed: {
    ...mapGetters(["eventPaginatedData","isLoading", "isDeleting", "deletedData"
              , "isCreating", "createdEventData", "isUpdating", "updatedEventData", "formAction","messageEvent","successStatus"]) },

  methods: {
    ...mapActions(["fetchAllEvent", "deleteEvent", "storeEvent","updateEvent",]),

    // Print Event
    printEvent(){ 
            $(document).ready(function () {
                $('#modalForPrintEvent').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.backend_url + "events")
                .then((res) => {
                this.allEvent = res.data.userList;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                          {
                                extend: 'csv',
                                messageTop: 'Event Informations',
                                title: 'Asf 2022 Event Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Event Informations',
                                title: 'Asf 2022 Event Information Table'
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

    getResults() {
      this.fetchAllEvent(this.query);
    },

    searchEvent() {
     this.query.page = null;
     this.fetchAllEvent(this.query);
    },

    onFileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file["size"] < 10111775) {
            reader.onloadend = (file) => {
                console.log(file);
                this.gallerImage = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert("File size can not be bigger than 10 MB");
        }
        reader.onload = function (e) {
            $('#prvImg').attr('src', e.target.result);
        };

    },

    // button click for open modal
    addEvent() { 
      this.editConceptNote ="";
      this.editImageFlag = false;
      this.eventTitle = "";
      this.eventAbstract = "";
      this.eventContent = "";
      this.$refs.form.resetForm();
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
    },

    pickFile(ev){
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onloadend = (file) => {
          console.log(file);
          this.conceptNote = reader.result;
      };
      reader.readAsDataURL(file);    
      //this.conceptNote = ev.target.files[0];   
    },

      handleUser(event) {
          console.log(this.conceptNote);
          console.log(event);
          
      if (this.$store.getters.formAction == 'insert') {   
        
      this.$swal
        .fire({
          text: "If You Insert This Event, Other Event Will be Inactivated !",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm This Event",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.storeEvent({
            title: this.eventTitle,
            abstract: this.eventAbstract,
            content: this.eventContent,
            from_date: event.fromDate,
            to_date: event.toDate,
            venue: event.eventVenue,
            feature_image: this.gallerImage,
            concept_note: this.conceptNote,
            reg_active_status: this.reqActiveStatus == true ? 1 : 0,
            status:event.eventStatus
        });               
        this.fetchAllSchedule({
            page: 1,
            search: ''
            });
        this.$swal.fire({
          text: "Success, User has been deleted.",
          icon: "success",
          position: 'top-end',
          timer: 1000,
        });           
        }
        });
               
      } else {  //edit
        if(event.eventStatus == 1){
        this.$swal
          .fire({
            text: "If You Update This Event, Other Event Will be Inactivated !",
            icon: "error",
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Update This Event",
            showCancelButton: true,
          })
          .then((result) => {
            if (result["isConfirmed"]) {
            this.updateEvent({
            id: this.id,
            title: this.eventTitle,
            abstract: this.eventAbstract,
            content: this.eventContent,
            concept_note: this.conceptNote,
            from_date: event.fromDate,
            to_date: event.toDate,
            venue: event.eventVenue,
            reg_active_status: this.reqActiveStatus == true ? 1 : 0,
            feature_image: this.gallerImage,
            status:event.eventStatus
          });
            this.$swal.fire({
              text: "Success, User has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });            
          }
          });
        }else{
          this.updateEvent({
            id: this.id,
            title: this.eventTitle,
            abstract: this.eventAbstract,
            content: this.eventContent,
            concept_note: this.conceptNote,
            from_date: event.fromDate,
            to_date: event.toDate,
            venue: event.eventVenue,
            reg_active_status: this.reqActiveStatus == true ? 1 : 0,
            feature_image: this.gallerImage,
            status:0
          });
        }

      }
      $(document).ready(function () {
        $('#exampleModalCenter').modal('hide');
      });   
    },

    onEdit(events) {
      console.log(events);
      this.editImageFlag = true;
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
      console.log(events);
      this.id = events.id;
      this.eventTitle = events.title;
      this.eventAbstract = events.abstract;
      this.eventContent = events.content;
      this.fromDate = events.from_date;
      this.toDate = events.to_date;
      this.eventVenue = events.venue;

      this.reqActiveStatus = events.reg_active_status == 1 ? true : false;
      this.eventStatus = events.status;
      this.editImage = this.base_url_for_resource +'uploads/events_feature_image/'+events.feature_image;
      this.editConceptNote = this.base_url_for_resource +'uploads/conceptNote/'+events.concept_note;
      this.$store.commit('fromActionStatus', 'edit');
      this.eventForm = this.validationEdit;
    },

    deleteEvent(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the user ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
              this.deleteEvent(id);
              
                this.fetchAllEvent({
                page: 1,
                search: ''
                });
            this.$swal.fire({
              text: "Success, User has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });
            
          }
        });
    },
    //Data Return
    formatDate(value) {
        return moment(value).format('DD MMMM YYYY')
    }, 

  },

  created() {
   this.fetchAllEvent(this.query);
  },

  watch: {   
      createdEventData: function () {
          if (this.createdEventData !== null && !this.isCreating) {
        this.fetchAllEvent({
              page: 1,
              search: ''
            });
        this.$swal.fire({
          text: "Success, Event has been added successfully.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
        //setTimeout(function(){ location.reload(); }, 500);
      }
    },

    updatedEventData: function () {
      if (this.updatedEventData != null && !this.isUpdating) {
        this.fetchAllEvent({
              page: 1,
              search: ''
            });
        this.$store.commit('fromActionStatus', 'insert');
        this.eventForm = this.validationCreate;
        this.$swal.fire({
          text: "Success, Event has been Updated.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
        //setTimeout(function(){ location.reload(); }, 500);
      }
    },


  },

}


</script>

<style scoped>

.iconsubmit {
    position: relative;
    font-size: 1.3em;
    z-index: 1;
    left: -30px;
    top: 11px;
    cursor:pointer;
    width: 0;
}

.iconsubmit:hover {
  color: #add8e6;
}

.ui.inverted.dimmer {
color: #009688 !important;

}
.upload-options {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 5px;
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

.input-group-text-label {
  width: 117px !important;
}


#ck-control-two div.ck-content {
    max-height: 80px !important;
    height: 80px;
}
.error-feedback {
    position: absolute;
    bottom: -15px;

}
@media (max-width: 1000px) {
    .modal-xl {
        max-width:90%;
    }
}
</style>