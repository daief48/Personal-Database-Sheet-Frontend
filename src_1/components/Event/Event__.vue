<template>

  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title"><strong> Events</strong></h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">

          <div class="user-list" style="position:relative; top:-20px;">
            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
              <div class="col-8">
                <!-- Add New Event Button -->
                <button class="add-button"
                @click="addEvent"
                > 
                  <font-awesome-icon icon="fa-solid  fa-plus" /> 
                  Add New Event
                </button>

              </div>
              <div class="col-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Event..."
                  @input="searchEvent"
                  v-model="query.search"
                />
              </div>
            </div>

            <div class="pl-2 pr-2">
              <div class="" v-if="!isLoading" style="border:1px solid #eeeeee">
              <div class="col-md-12">
                <div class="row border-bottom border-top p-2 bg-light">
                  <div class="col-1">Sl </div>
                  <div class="col-3">Title</div>
                  <div class="col-2">Venue</div>
                  <div class="col-2">From_Date</div>
                  <div class="col-2">To_Date</div>
                  <div class="col-2">Actions</div>
                </div>
              </div>
                <div class="pt-1 pl-2 pb-1 pl-2 customize-border"  v-for="(event,index) in eventPaginatedData.data" :key="event.id">
                  <div class="row border-1 pb-1">
                    <div class="col-1 text-left">
                      {{ index + 1 }}
                    </div>

                    <div class="col-3" v-html="event.title">
                    </div>

                    <div class="col-2">
                       <strong class="text-info">{{ event.venue }} </strong>
                    </div>

                    <div class="col-2">
                      <strong class="text-info">{{ event.from_date }} </strong>
                    </div>

                    <div class="col-2">
                      <strong class="text-info">{{ event.to_date }} </strong>
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
                        class="btn btn-danger mx-2 btn-sm" disabled
                        title="Delete Event"
                        @click="deleteEvent(event.id)">
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
                            <ErrorMessage name="eventTitle" v-model="eventTitle" class="error-feedback" />
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
                            <ErrorMessage name="eventAbstract" v-model="eventAbstract" class="error-feedback" />
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
                            <ErrorMessage name="eventContent" v-model="eventContent" class="error-feedback" />
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
                                        <ErrorMessage name="eventVenue" v-model="eventVenue" class="error-feedback" />
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
                                        <ErrorMessage name="fromDate" v-model="fromDate" class="error-feedback" />
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
                                        <ErrorMessage name="toDate" v-model="toDate" class="error-feedback" />
                                    </div>
                                    <!-- End -->
                                    
                                    
                                    <!-- Concept Note -->
                                    <div class="col-md-12 form-group">
                                      <div class="input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text input-group-text-label p4" >Concept Note</span>
                                          </div>
                                          <Field name="concept_note"  type="file" id="concept_note" class="form-control" accept=".pdf" @change="pickFile"  v-model="concept_note" autocomplete="off"  style="height:44px" />
                                      </div>
                                      <ErrorMessage name="concept_note"  class="error-feedback" />
                                    </div>
                                    <!-- End -->

                                    <!-- Status -->
                                    <div class="col-md-12 form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text input-group-text-label p4" >Status*</span>
                                            </div>
                                            <Field name="eventStatus" as="select" class="form-control" v-model="eventStatus">
                                                <option value="">-- Select Status --</option>
                                                <option value="1">Active</option>
                                                <option value="2">In-active</option>
                                            </Field>                                    </div>
                                        <ErrorMessage name="eventStatus" v-model="eventStatus" class="error-feedback" />
                                    </div>
                                    <!-- End -->
                                </div>

                            </div>

                            <div class="col-md-6 d-inline-block">
                                <div class="col-md-12 form-group">
                                    <div class="form-bg text-center p-3">
                                        <div class=" box" style="display:block">
                                            <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                <img id="prvImg" src="../../assets/img/placeholder.png"
                                                    style="max-width:95%; width:95%">
                                            </div>
                                            <div class="upload-options mt-3">
                                                <label class="upload-options">
                                                    <i class="fas fa-plus-square"></i> Select Feature Image
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
      eventStatus: '',
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
      conceptNote: 'aaaaaaaaaaaaaa',       
    };
  },
  
  computed: {
    ...mapGetters(["eventPaginatedData","isLoading", "isDeleting", "deletedData"
              , "isCreating", "createdEventData", "isUpdating", "updatedEventData", "formAction","messageEvent","successStatus"]) },

  methods: {
    ...mapActions(["fetchAllEvent", "deleteEvent", "storeEvent","updateEvent",]),

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
    },

      handleUser(event) {
          console.log(this.conceptNote);
          console.log(event);
          
      if (this.$store.getters.formAction == 'insert') {        
        this.storeEvent({
          title: this.eventTitle,
          abstract: this.eventAbstract,
          content: this.eventContent,
          from_date: event.fromDate,
          to_date: event.toDate,
          venue: event.eventVenue,
          feature_image: this.gallerImage,
          concept_note: this.conceptNote,
          status:event.eventStatus
        });                 
      } else {  //edit
        
        this.updateEvent({
          id: this.id,
          title: this.eventTitle,
          abstract: this.eventAbstract,
          content: this.eventContent,
          from_date: event.fromDate,
          to_date: event.toDate,
          venue: event.eventVenue,
          status:event.eventStatus
        });
      }
      $(document).ready(function () {
        $('#exampleModalCenter').modal('hide');
      });   
    },

    onEdit(events) {
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
      this.id = events.id;
      this.eventTitle = events.title;
      this.eventAbstract = events.abstract;
      this.eventContent = events.content;
      this.fromDate = events.from_date;
      this.toDate = events.to_date;
      this.eventVenue = events.venue;
      this.eventStatus = events.status;
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
      }
    },


  },

}


</script>

<style scoped>

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