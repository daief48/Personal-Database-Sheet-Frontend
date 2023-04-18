<template>
<div>
  <h4 class="text-bold heading-style">Speakers</h4>
  <div class="card card-default">
    <div class="card-header">
      <div class="col-8">
                <!-- Add New Speaker Button -->
                <button class="add-button btn-sm"
                @click="addSpeaker"
                > 
                  <font-awesome-icon icon="fa-solid  fa-plus" /> 
                  Add New Speaker
                </button>
                <button class="btn btn-success ml-2" style="padding:5px 6px"  @click="printSpeaker">
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
                  placeholder="Search Speaker..."
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
                  <div class="col-2">Image</div>
                  <div class="col-3">Name </div>
                  <div class="col-2">Occupation</div>
                  <div class="col-2">Organization</div>
                  <div class="col-2">Actions</div>
                </div>
              </div>
                <div class="pt-1 pl-2 pb-1 pl-2 border-b customize-border" v-for="(speaker,index) in speakerPaginatedData.data" :key="speaker.id">
                  <div class="row border-1 pb-1">
                    <div class="col-1 text-left">
                      {{ index + 1 }}
                    </div>

                    <div class="col-2">
                       <img :src="backendUrl+'/public/uploads/images/speakers/'+speaker.image" alt="Speaker Image" class="img-thumbnail speaker-image"/>
                    </div>

                    <div class="col-3">
                       <strong class="text-info">{{ speaker.name }} </strong>
                    </div>

                    <div class="col-2">
                      <strong class="text-info">{{ speaker.occupation }} </strong>
                    </div>

                    <div class="col-2">
                      <strong class="text-info">{{ speaker.organization }} </strong>
                    </div>

                    <div class="col-2">
                      <button
                        class="btn btn-warning mx-2 btn-sm"
                        title="Edit Shedule"
                        @click="onEdit(speaker)"
                      >
                      
                        <font-awesome-icon icon="fa-solid  fa-pencil" />
                      </button>
                      <button
                        class="btn btn-danger mx-2 btn-sm"
                        title="Delete Schedule"
                        @click="deleteSpeakerModal(speaker.id)">
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
            

            <div v-if="speakerPaginatedData.pagination != null" class="vertical-center mt-3 mb-5">
          
              <v-pagination
                v-model="query.page"
                :pages="speakerPaginatedData.pagination.total_pages"
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


  <!-- Modal For Speaker -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Speakers</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body" id="ck-control">
            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                  <div class="col-md-12 form-bg">
                    <!-- Form Start From Here -->
                      <Form @submit="handleSpeaker" :validation-schema="speakerForm" ref="form">
                          <!-- Speaker Name ,Speaker Occupation & Organization -->
                          <div class="row">
                            <div class="col-md-12">
                              <div class="input-group border border-dark rounded">
                                <div class="input-group-prepend">
                                  <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                </div>
                                <label class="ml-3 mt-2 ">{{activeEventTitle.title}}</label>
                              </div>
                              
                              </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="col-md-6 mt-4 d-inline-block float-left">

                                  <div class="row">
                                      <!-- Speaker Name -->
                                      <div class="col-md-12 mt-2 mb-3 form-group">
                                          <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text p4 input-group-text-label" >Name*</span>
                                              </div>
                                              <Field name="speakerName" type="text" v-model="speakerName" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="speakerName" v-model="speakerName" class="error-feedback" style="margin-bottom: -8px;" />
                                      </div>
                                      <!-- End -->

                                      <!-- Speaker Occupation -->
                                      <div class="col-md-12 mt-2  mb-3 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text p4 input-group-text-label" >Occupation*</span>
                                              </div>
                                              <Field name="speakerOccupation" type="text" v-model="speakerOccupation" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="speakerOccupation" v-model="speakerOccupation" class="error-feedback" />
                                      </div>
                                      <!-- End -->

                                      <!-- Organization -->
                                      <div class="col-md-12 mt-2  mb-3 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text p4 input-group-text-label" >Organization</span>
                                              </div>
                                              <Field name="speakerOrganization" type="text" v-model="speakerOrganization" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="speakerOrganization" v-model="speakerOrganization" class="error-feedback" />
                                      </div>
                                      <!-- End -->

                                      <div class="col-md-12 mt-2  mb-3 form-group">
                                          <div class="input-group mb-2">
                                              <div class="input-group-prepend">
                                                  <span class="input-group-text p4 input-group-text-label" >order</span>
                                              </div>
                                              <Field name="order" type="number" v-model="order" class="form-control" autocomplete="off"/>
                                          </div>
                                          <ErrorMessage name="order"  class="error-feedback" />
                                      </div>

                                      <!-- Speaker Status -->
                                            <div class="col-md-12  mt-2  mb-3 form-group">
                                              <div class=" input-group mb-2">
                                                  <div class="input-group-prepend">
                                                      <span class="input-group-text p4 input-group-text-label">Status*</span>
                                                  </div>
                                                <Field name="speakerStatus" as="select" class="form-control" v-model="speakerStatus">
                                                  <option value="">-- Select Status --</option>
                                                  <option value="1">Active</option>
                                                  <option value="0">Inactive</option>
                                                </Field>
                                                  <ErrorMessage name="speakerStatus" class="error-feedback" style="margin-bottom: -10px;" />
                                              </div>
                                            </div>
                                      <!-- End -->
                                  </div>

                              </div>

                              <!-- Speaker Image -->
                              <div class="col-md-6 d-inline-block">
                                  <div class="col-md-12 form-group">
                                      <div class="form-bg text-center p-3">
                                          <div class=" box" style="display:block">
                                              <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                  <img v-if="!editImageFlag"
                                                    id="prvImg" 
                                                    src="@/assets/img/dummy_man.png"
                                                    style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;"
                                                    class="img-thumbnail"
                                                  >

                                                  <img v-if="editImageFlag"
                                                    id="prvImg" 
                                                    :src="editImage"
                                                    style="max-width:45%; height: 220px;border: 3px #c5b7b7 solid;"
                                                    class=""
                                                  >
                                              </div>
                                              
                                              <div class="upload-options mt-3">
                                                  <label class="upload-options" for="imageUpload">
                                                      <font-awesome-icon icon="fa-solid  fa-upload"/> Select Speaker Image
                                                      <input 
                                                        type="file" 
                                                        class="image-upload"
                                                        id="imageUpload" 
                                                        accept="image/*" 
                                                        @change="onFileUpload"
                                                      >
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <!--  -->
                            </div>
                          </div>
                          <!-- End -->

                          <div class="row">
                            <div class="col-md-12 form-group">
                              <!-- Biography -->
                              <div class="row">
                                <div class="col-md-12 form-group">
                                  <div class="mb-2">
                                      <div class="">
                                          <span class="input-group-text p4 mb-2" >Details*</span>
                                      </div>
                                      <ckeditor name="details" autocomplete="off" class="form-control" :editor="editor" v-model="details" :config="editorConfig" />
                                  </div>
                                  <ErrorMessage name="details" v-model="details" class="error-feedback" />
                                </div>
                              </div>
                              <!-- End -->

                              <div class="row">
                                 <div class="col-md-12 form-group">
                                   <div class="col-md-6 mt-4 d-inline-block float-left">
                                     <!-- Facebook -> Social Link -->
                                      <div class=" input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4 input-group-text-label"> <strong><font-awesome-icon icon="fab fa-facebook"/> Facebook</strong></span>
                                          </div>
                                          <Field name="socialLink.speakerFacebook" type="text" v-model="socialLink.speakerFacebook" class="form-control" autocomplete="off"/>
                                          <ErrorMessage name="socialLink.speakerFacebook" class="error-feedback" style="margin-bottom: -10px;" />
                                      </div>
                                     <!-- End -->

                                     <!-- Instragram -> Social Link -->
                                      <div class=" input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4 input-group-text-label"> <strong><font-awesome-icon icon="fab fa-instagram"/> Instagram</strong></span>
                                          </div>
                                          <Field name="socialLink.speakerInstagram" type="text" v-model="socialLink.speakerInstagram" class="form-control" autocomplete="off"/>
                                          <ErrorMessage name="socialLink.speakerInstagram" class="error-feedback" style="margin-bottom: -10px;" />
                                      </div>
                                     <!-- End -->
                                   </div>
                                  
                                  <div class="col-md-6 mt-4 d-inline-block float-right">
                                      <!-- Twitter -> Social Link -->
                                      <div class=" input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4 input-group-text-label"> <strong><font-awesome-icon icon="fab fa-twitter"/> Twitter</strong></span>
                                          </div>
                                          <Field name="socialLink.speakerTwitter" type="text" v-model="socialLink.speakerTwitter" class="form-control" autocomplete="off"/>
                                          <ErrorMessage name="socialLink.speakerTwitter" class="error-feedback" style="margin-bottom: -10px;" />
                                      </div>
                                     <!-- End -->

                                      <!-- linkedin -> Social Link -->
                                      <div class=" input-group mb-2">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text p4 input-group-text-label"> <strong><font-awesome-icon icon="fab fa-linkedin"/> Linkedin</strong></span>
                                          </div>
                                          <Field name="socialLink.speakerLinkedin" type="text" v-model="socialLink.speakerLinkedin" class="form-control" autocomplete="off"/>
                                          <ErrorMessage name="socialLink.speakerLinkedin" class="error-feedback" style="margin-bottom: -10px;" />
                                      </div>
                                     <!-- End -->
                                  </div>
                                 </div> 
                              </div>
                            </div>
                          </div>



                          <!-- Modal Footer -->
                          <div class="modal-footer">
                            <div class="form-group">
                                <button class="btn btn-primary mr-2" :disabled="isCreating || isUpdating">
                                  <span v-show="isCreating" class="spinner-border spinner-border-sm"></span>
                                  Submit 
                                </button>

                                <button class="btn btn-danger ml-2" type="reset">Reset</button>
                            </div>
                          </div>
                          <!-- End -->
                      </Form>
                      <!-- End -->
                  </div>

            </div>
          </div>
          <!-- End -->

        </div>
      </div>
    </div>
  <!-- Open Model For Image Cooper -->
    <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                                        <div class="modal-body p-3">
                                            <div class="">
                                                <cropper
                                                    class="cropper"
                                                    :src="img"
                                                    :stencil-props="{
                                                    aspectRatio: 1.8/2
                                                    }"
                                                    ref="refs"
                                                    @change="changes"
                                                />
                                            </div>
                                    </div>

                        <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal"><font-awesome-icon icon="fa-solid  fa-ban" /> Cancel Crop</button>
                                <button type="button" class="btn btn-danger" @click="cropImage"> <font-awesome-icon icon="fa-solid  fa-crop-simple" /> Crop</button>
                        </div>
                </div>
        </div>
    </div>
  <!-- Close Model For Image Cooper-->

  <!-- Modal For Print Speaker -->
    <div class="modal fade" id="modalForPrintSpeaker" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Speaker </h5>
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
                      <th scope="col" >SL  </th>
                      <th scope="col" >Name</th>
                      <th scope="col" >Occupation</th>
                      <th scope="col" >Organization</th> 
                      <th scope="col" >Order</th> 
                      <th scope="col" >Details</th>
                      <th scope="col" >Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(speaker,index) in allSpeaker" :key="speaker.id">
                      <th scope="row">{{index+1}}</th>
                      <td > {{speaker.name}}</td>
                      <td >{{speaker.occupation}}</td>
                      <td >{{speaker.organization}}</td>
                      <td > {{speaker.venue}}</td>
                      <td v-html="speaker.details"></td>
                      <td > {{speaker.status == 1 ? 'Active' : 'Inactive'}}</td>
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
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
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
    Cropper
  },

  data() {
    const store = useStore();
    const validationCreate = yup.object().shape({
        // details: yup
        //     .string()
        //     .required("Speaker Biography is required"),
          speakerName: yup
            .string()
            .required("Speaker Name is required"), 
          speakerOccupation: yup
            .string()
            .required("Speaker Occupation is required"), 
          // speakerOrganization: yup
          //   .string()
          //   .required("Speaker Organization is required"), 
          speakerStatus: yup
            .string()
            .required("Speaker Status is required"),

      });

      const validationEdit = yup.object().shape({
          speakerName: yup
            .string()
            .required("Speaker Name is required"), 
          speakerOccupation: yup
            .string()
            .required("Speaker Occupation is required"), 
          // speakerOrganization: yup
          //   .string()
          //   .required("Speaker Organization is required"), 
          speakerStatus: yup
            .string()
            .required("Speaker Status is required"),
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
      img: '',
      image: '',
      cropData: '',
      speakerName:'',
      speakerOccupation: '',
      speakerOrganization: '',
      details: '',
      order:0,
      speakerStatus: 1,
      socialLinkTxt: '',
      socialLink: {},
      editImage: '',
      imageUpdate: '',
      editImageFlag:false,
      id:0,
      query: {
        page: 1,
        search: "",
      },
      myValue: '',
      validationCreate: validationCreate,
      validationEdit: validationEdit,
      speakerForm: validationCreate,  
      allSpeaker:{},        
    };
  },
  
  computed: {
    ...mapGetters(["activeEventTitle","speakerPaginatedData","isLoading", "isDeleting", "deletedData"
              , "isCreating", "createdSpeakerData", "isUpdating", "updatedSpeakerData", "formAction","messageForSpeaker","successStatus"]) },

  methods: {
    ...mapActions(["fetchAllSpeaker", "fetchDetailSpeaker", "storeSpeaker","updateSpeaker","deleteSpeaker"]),

    // Print Speaker
    printSpeaker(){ 
            $(document).ready(function () {
                $('#modalForPrintSpeaker').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.backend_url + "getAllSpeaker")
                .then((res) => {
                this.allSpeaker = res.data.list;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                          {
                                extend: 'csv',
                                messageTop: 'Speakers Informations',
                                title: 'Asf 2022 Speaker Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Speakers Informations',
                                title: 'Asf 2022 Speaker Information Table'
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
      this.fetchAllSpeaker(this.query);
    },
    //Croping image(Crop(image) -> Button) =>
    cropImage(e){
      console.log(e);
      let reader = new FileReader();
      console.log(reader);
      this.image = this.cropData;

        var pic = this.image;

        $(document).ready(function(){
        $('#remarkModal').modal('hide');
        $('#prvImg').attr('src',pic);
        });
    },

    //Croping image params
    changes({ coordinates, canvas }) {
      console.log(coordinates, canvas);
      this.cropData = canvas.toDataURL(this.image);
		},

    searchEvent() {
     this.query.page = null;
     this.fetchAllSpeaker(this.query);
      },

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

    // button click for open modal
    addSpeaker() { 
      this.image = '';
      this.$refs.form.resetForm();
      this.details = '';
      this.editImageFlag = false;
      $(document).ready(function () {
        $('#exampleModalCenter').modal('show');
      });
    },

      handleSpeaker(speaker) {
      if (this.$store.getters.formAction == 'insert') {
        const socialLinkTxt = JSON.stringify(this.socialLink);
        this.socialLinkTxt = socialLinkTxt;
        this.editImageFlag = true;
        this.storeSpeaker({
          name: speaker.speakerName,
          image: this.image= this.image ? this.image : this.img,
          occupation: speaker.speakerOccupation,
          organization: speaker.speakerOrganization,
          details: this.details,
          social_link: this.socialLinkTxt,
          order:speaker.order,
          status:speaker.speakerStatus
        });                 
      } else {  //edit
        const socialLinkTxt = JSON.stringify(this.socialLink);
        this.socialLinkTxt = socialLinkTxt;
        this.updateSpeaker({
          id: this.id,
          name: speaker.speakerName,
          image: this.image= this.image ? this.image : false,
          occupation: speaker.speakerOccupation,
          organization: speaker.speakerOrganization,
          details: this.details,
          social_link: this.socialLinkTxt,
          order:speaker.order,
          status:speaker.speakerStatus
        });
      }
      $(document).ready(function () {
        $('#exampleModalCenter').modal('hide');
      });   
    },

    onEdit(speaker) {
      this.editImageFlag = true;
      this.id = speaker.id;
      this.speakerName = speaker.name;
      this.speakerOccupation = speaker.occupation;
      this.speakerOrganization = speaker.organization;
      this.socialLink = JSON.parse(speaker.social_link);
      this.speakerStatus = speaker.status;
      this.details = speaker.details;
      this.editImage = this.backendUrl+'/public/uploads/images/speakers/'+speaker.image;
      this.$store.commit('fromActionStatus', 'edit');
      this.speakerForm = this.validationEdit;
      this.order = speaker.order;
      //this.imageUpdate = speaker.image;
      console.log(speaker);
      $('#exampleModalCenter').modal('show');
     
    },

    deleteSpeakerModal(id) {
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
              this.deleteSpeaker(id);
              
                this.fetchAllSpeaker({
                page: 1,
                search: ''
                });
            this.$swal.fire({
              text: "Success, Speaker has been deleted.",
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
   this.fetchAllSpeaker(this.query);
  },

  watch: {   
      createdSpeakerData: function () {
          if (this.createdSpeakerData !== null && !this.isCreating) {
        this.fetchAllSpeaker({
              page: 1,
              search: ''
            });
        this.$swal.fire({
          text: "Success, Speaker has been added successfully.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });
        this.$refs.form.resetForm();
      }
    },

    updatedSpeakerData: function () {
      if (this.updatedSpeakerData != null && !this.isUpdating) {
        this.fetchAllSpeaker({
              page: 1,
              search: ''
            });
        this.$store.commit('fromActionStatus', 'insert');
        this.speakerForm = this.validationCreate;
        this.$swal.fire({
          text: "Success, Speaker has been Updated.",
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
.border-b{
  border-bottom: 1px solid #eeeeee;
}
.border-b:last-child{
  border:none;
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

.speaker-image {
    width: 70px;
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
