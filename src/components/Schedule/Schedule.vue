<template>
<div>
  <h4 class="text-bold heading-style">Schedules</h4>
  <div class="card card-default">
    <div class="card-header">
      <div class="col-8">
                <!-- Add New Schedule Button -->
                <button class="add-button btn-sm"
                @click="addSchedule"
                > 
                  <font-awesome-icon icon="fa-solid  fa-plus" /> 
                  Add New Schedule
                </button>
                <button class="btn btn-success ml-2" style="padding:5px 6px" @click="printSchedule">
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
                  placeholder="Search Schedule..."
                  @input="searchSchedules"
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
                  <div class="col-2">Date</div>
                  <div class="col-6">Title</div>
                  <div class="col-3">Actions</div>
                </div>
              </div>
                <div class="pt-1 pl-2 pb-1 pl-2 customize-border"  v-for="(schedule,index) in schedulePaginatedData.data" :key="schedule.id">
                  <div class="row border-1 pb-1">
                    <div class="col-1 text-left">
                      {{ index + 1 }}
                    </div>
                    <div class="col-2">
                      <strong class="text-info">{{ formatDate(schedule.date) }}</strong>
                    </div>
                    <div class="col-6" v-html="schedule.title">
                    </div>

                    <div class="col-3">
                      <button
                        class="btn btn-warning mx-2 btn-sm"
                        title="Edit Shedule"
                        @click="onEdit(schedule)"
                      >
                      
                        <font-awesome-icon icon="fa-solid  fa-pencil" />
                      </button>
                      <button
                        class="btn btn-danger mx-2 btn-sm"
                        title="Delete Schedule"
                        @click="deleteUserModal(schedule.id)">
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
            

            <div v-if="schedulePaginatedData.pagination != null" class="vertical-center mt-3 mb-5">
          
              <v-pagination
                v-model="query.page"
                :pages="schedulePaginatedData.pagination.total_pages"
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
          <h5 class="modal-title" id="exampleModalLongTitle">Shedule Form</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="ck-control">
          <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                <div class="col-md-12 form-bg">
                    <Form @submit="handleUser" :validation-schema="scheduleForm" ref="form">
                      <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="input-group border border-dark rounded">
                                <div class="input-group-prepend">
                                  <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                </div>
                                <label class="ml-3 mt-2 ">{{activeEventTitleForSchedule.title}}</label>
                            </div>
                        </div>
                      </div>
                
                        <!-- Event Date Dropdown && Event Actual Date -->
                        <div class="row">
                          <!-- Event Date -->
                          <div class="col-md-6 form-group">
                              <div class="input-group mb-2">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text p4" >Date*</span>
                                  </div>
                                  <Field name="actualDate" type="date" v-model="actualDate" class="form-control" autocomplete="off"/>
                              </div>
                              <ErrorMessage name="actualDate" v-model="actualDate" class="error-feedback" />
                          </div>

                          <div class="col-md-6 form-group">
                                  <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p4" >Status*</span>
                                    </div>
                                    <Field name="scheduleStatus" as="select" class="form-control" v-model="scheduleStatus">
                                      <option value="1">Active</option>
                                      <option value="0">Inactive</option>
                                    </Field>
                                  </div>
                                  <ErrorMessage name="scheduleStatus" v-model="scheduleStatus" class="error-feedback" />
                              </div>
                          <!-- End -->
                        </div>

                        <!-- Schedule Title -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                              <div class="input-group mb-2">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text p4" >Schedule Title*</span>
                                  </div>
                                  <Field name="scheduleTitle" type="text" v-model="scheduleTitle" class="form-control" autocomplete="off"/>
                                  
                              </div>
                              <div class=""><ErrorMessage name="scheduleTitle" v-model="scheduleTitle" class="error-feedback" /></div>
                            </div>
                          </div>
                        </div>
                        <!-- End -->
                        <!-- Venue -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                              <div class="input-group mb-2">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text p4" ><font-awesome-icon class="mr-2" icon="fa-solid fa-location-dot" /> Venue</span>
                                  </div>
                                  <Field name="venue" type="text" v-model="venue" class="form-control" autocomplete="off"/>
                                  
                              </div>
                              <div class=""><ErrorMessage name="venue" class="error-feedback" /></div>
                            </div>
                          </div>
                        </div>
                        <!-- End -->

                        <!-- Map Link -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                              <div class="input-group mb-2">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text p4" > <font-awesome-icon class="mr-2" icon="fa-solid fa-map-location-dot" /> Map Link</span>
                                  </div>
                                  <Field name="mapLink" type="text" v-model="mapLink" class="form-control" autocomplete="off"/>
                                  
                              </div>
                              <div class=""><ErrorMessage name="mapLink" class="error-feedback" /></div>
                            </div>
                          </div>
                        </div>
                        <!-- End -->

                        <!-- Schedule Details -->
                        <div class="row">
                          <div class="col-md-12 form-group">
                            <div class="mb-2">
                                <div class="">
                                    <span class="input-group-text p4 mb-2" >Summary</span>
                                </div>
                                <ckeditor name="scheduleDetail" autocomplete="off" class="form-control" :editor="editor" v-model="scheduleDetail" :config="editorConfig" />
                            </div>
                            <ErrorMessage name="scheduleDetail" v-model="scheduleDetail" class="error-feedback" />
                          </div>
                        </div>
                        <!-- End -->

                        <!-- From time,To time & Status-->
                        <div class="justify-content-center">
                          <fieldset class="field_set_item ">
                          <legend align="center" class="legendItem"> Time Schedules</legend>
                          <div class="row">
                            <div class="col-md-12 jumbotron p-3" v-for="(field, index) in schedulesArr" :key="index">
                              <button class="btn btn-danger" type="button" @click="removeSchedule(index)" style="position:absolute; right:0; top:-12px; z-index: 99; padding:0 6px">X</button>
                              <div class="row">
                                <div class="col-md-12 mb-3">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p4" >Resource Person</span> 
                                    </div>
                                    <input type="text" v-model="field.resourcePerson" class="form-control" autocomplete="off"/>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 mb-3">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p4" >Designation</span> 
                                    </div>
                                    <input type="text" v-model="field.designation" class="form-control" autocomplete="off"/>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                  <!-- From Time -->
                                    <div class="col-md-6 mb-2 d-inline-block  form-group">
                                        <div class="input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4" >From Time*</span>
                                          </div>
                                          <input type="text" v-model="field.from" class="form-control" autocomplete="off"/>
                                        </div>
                                        
                                    </div>
                                  <!-- End -->

                                  <!-- To Time -->
                                    <div class="col-md-6 mb-2 d-inline-block form-group">
                                        <div class="input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4" >To Time*</span>
                                          </div>
                                          <input type="text" v-model="field.to" class="form-control" autocomplete="off"/>
                                        </div>
                                    </div>
                                  <!-- End -->
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p4" >Title</span>
                                    </div>
                                    <input type="text" v-model="field.title" class="form-control" autocomplete="off"/>
                                  </div>
                                </div>
                                <div class="col-md-12 mt-3">
                                  <div style="text-align: center; padding:5px; border-left:1px solid #ced4da; border-top:1px solid #ced4da; border-right:1px solid #ced4da;">Detail</div>
                                  <ckeditor autocomplete="off" class="form-control" :editor="editor" v-model="field.detail" :config="editorConfig" />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12 m-0">
                              <button type="button" class="d-block text-center btn btn-info btn-sm" style="width:100%" @click="addNewSchedule"><font-awesome-icon icon="fa-solid  fa-plus" /> Add Schedule</button>
                            </div>
                        <!-- <div class="col-md-12">
                          <pre>{{schedulesArr}}</pre>
                        </div> -->
                          </div>
                        </fieldset>
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


  <!-- Modal For Print Schedule -->
  <div class="modal fade" id="modalForPrintSchedule" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Schedules  </h5>
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
                      <th scope="col" >Details</th>
                      <th scope="col" >Date</th> 
                      <th scope="col" >Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(schedule,index) in allSchedule" :key="schedule.id">
                      <th scope="row">{{index+1}}</th>
                      <td > {{schedule.title}}</td>
                      <td v-html="schedule.details"></td>
                      <td >{{$filters.myDateFormate(schedule.date)}}</td>
                      <td > {{schedule.status == 1 ? 'Active' : 'Inactive'}}</td>
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
import '@/assets/css/custom.css';
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
          
          actualDate: yup
            .string()
            .required("Date is required"),
          scheduleTitle: yup
            .string()
            .required("Schedule title is required"),
          // scheduleDetail: yup
          //   .string()
          //   .required("Schedule details is required"), 
          // fromTime: yup
          //   .string()
          //   .required("From time is required"), 
          // toTime: yup
          //   .string()
          //   .required("To time is required"), 
          scheduleStatus: yup
            .string()
            .required("Status is required"),
      });

      const validationEdit = yup.object().shape({
          // eventDate: yup
          //   .string()
          //   .required("Event date is required"),
          actualDate: yup
            .string()
            .required("Date is required"),
          scheduleTitle: yup
            .string()
            .required("Schedule title is required"),
          // scheduleDetail: yup
          //   .string()
          //   .required("Schedule details is required"), 
          // fromTime: yup
          //   .string()
          //   .required("From time is required"), 
          // toTime: yup
          //   .string()
          //   .required("To time is required"), 
          scheduleStatus: yup
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
      schedules: {},
      scheduleDate:'',
      eventDate: '',
      actualDate: '',
      scheduleTitle: '',
      scheduleDetail: '',
      fromTime: '',
      toTime: '',
      scheduleStatus: 1,
      loading: false,
      remark: '',
      venue:'',
      mapLink:'',
      id:0,
      query: {
        page: 1,
        search: "",
      },
      myValue: '',
      validationCreate: validationCreate,
      validationEdit: validationEdit,
      scheduleForm: validationCreate,    
      
      schedulesArr: [],
      eventId:0,
      allSchedule:{}
    };
  },
  
  computed: {
    ...mapGetters(["activeEventTitleForSchedule","schedulePaginatedData","isLoading", "isDeleting", "deletedData"
              , "isCreating", "createdScheduleData", "isUpdating", "updatedScheduleData", "formAction","messagee","successStatus"]) },

  methods: {
    ...mapActions(["fetchAllSchedule", "deleteSchedule", "storeSchedule","updateSchedule",]),

    //Print Schedule
    printSchedule(){
      $(document).ready(function () {
                $('#modalForPrintSchedule').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.backend_url + "schedules")
                .then((res) => {
                this.allSchedule = res.data.data;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                          {
                                extend: 'csv',
                                messageTop: 'Schedule Informations',
                                title: 'Asf 2022 Schedule Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Schedule Informations',
                                title: 'Asf 2022 Schedule Information Table'
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
      this.fetchAllSchedule(this.query);
    },

    searchSchedules() {
     this.query.page = null;
     this.fetchAllSchedule(this.query);
    },

    // button click for open modal
    addSchedule() { 
      this.scheduleTitle = "";
      this.scheduleDetail = "";
      this.venue = "";
      this.mapLink = "";
      this.schedulesArr = [{designation:'', resourcePerson:'',from: '',to: '', title:'', detail:'' }];
      this.$refs.form.resetForm();
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
    },

    handleUser(schedule) {
    
      if (this.$store.getters.formAction == 'insert') {
        
        this.storeSchedule({
          title: this.scheduleTitle,
          details: this.scheduleDetail,
          event_id: schedule.eventDate,
          date: schedule.actualDate,
          venue : schedule.venue,
          map_link : schedule.mapLink,
          // from: schedule.fromTime,
          // to: schedule.toTime,
          schedules: JSON.stringify(this.schedulesArr),
          status:schedule.scheduleStatus,

        });                 
      }else{  //edit
        this.updateSchedule({
          id: this.id,
          title: this.scheduleTitle,
          details: this.scheduleDetail,
          event_id: this.eventId,
          date: schedule.actualDate,
          venue : schedule.venue,
          map_link : schedule.mapLink,
          // from: schedule.fromTime,
          // to: schedule.toTime,
          schedules: JSON.stringify(this.schedulesArr),
          status:schedule.scheduleStatus
        });
      }
      $(document).ready(function () {
        $('#exampleModalCenter').modal('hide');
      });   
    },

    onEdit(user) {
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
      this.id = user.id;
      this.scheduleTitle = user.title;
      this.scheduleDetail = user.details;
      this.eventId = user.event_id;
      this.eventDate = user.event_id;
      this.actualDate = user.date;
      this.venue = user.venue;
      this.mapLink = user.map_link;
      this.fromTime = user.from;
      this.toTime = user.to;
      this.scheduleStatus = user.status;
      this.$store.commit('fromActionStatus', 'edit');
      this.scheduleForm = this.validationEdit;
      if(user.schedules != null){
        this.schedulesArr = JSON.parse(user.schedules);
      }else{
        this.schedulesArr = [];
      }
    },

    deleteUserModal(id) {
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
              this.deleteSchedule(id);
              
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
    },
    //Data Return
    formatDate(value) {
        return moment(value).format('DD MMMM YYYY')
    }, 

    addNewSchedule: function () {
      this.schedulesArr.push({ from: '',to: '', title:'', detail:'' });
    },
    removeSchedule(index){
      console.log(this.schedulesArr.length);
      if(this.schedulesArr.length > 1){
        this.schedulesArr.splice(index, 1);
      } 
    },

  },

  created() {
   this.fetchAllSchedule(this.query);
  },

  watch: {   
      createdScheduleData: function () {
          if (this.createdScheduleData !== null && !this.isCreating) {
        this.fetchAllSchedule({
              page: 1,
              search: ''
            });
        this.$swal.fire({
          text: "Success, Schedule has been added successfully.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
      }
    },

    updatedScheduleData: function () {
      if (this.updatedScheduleData != null && !this.isUpdating) {
        this.fetchAllSchedule({
              page: 1,
              search: ''
            });
        this.$store.commit('fromActionStatus', 'insert');
        this.scheduleForm = this.validationCreate;
        this.$swal.fire({
          text: "Success, Schedule has been Updated.",
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

  #ck-control-two div.ck-content {
    max-height: 80px !important;
    height: 80px;
   }
   .error-feedback {
      position: absolute;
      bottom: -15px;

   }

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

  @media (max-width: 1000px) {
    .modal-xl {
        max-width:90%;
    }
  }
</style>