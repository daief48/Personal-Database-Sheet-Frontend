<template>
   <div class="card card-default">
        <div class="card-header">
            <h3 class="card-title"><strong> Gallery Images</strong></h3>

            <button class="btn btn-success ml-3 mb-2" @click="printGalleryImage">
                      <font-awesome-icon icon="fa-solid  fa-rectangle-list" />
                      Export
            </button>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="user-list" style="position:relative; top:-20px;">
                            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                            <div class="col-8">
                                <!-- Add New Speaker Button -->
                                <button class="add-button"
                                @click="addGalleryImage"
                                > 
                                <font-awesome-icon icon="fa-solid  fa-plus" /> 
                                Add New Gallery Image
                                </button>

                            </div>
                            <div class="col-4">
                
                            </div>
                        </div>  
                    </div>  
                </div>  
            </div>
            <div class="row">
            <div class="col-md-12">
                <table class="table table-hover" id="datatable">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Thumbnail Image</th>
                            <th scope="col">Album Name</th>
                            <th scope="col">Caption</th>
                            <th scope="col">Order</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(galleryImage,index) in galleryImages" :key="galleryImage.id">
                            <td scope="row">{{index+1}}</td>
                            <td>
                                <img class="img-thumbnail" style="max-width: 90px;" :src="base_url_for_resource +'uploads/images/gallery/' + galleryImage.thumbnail" alt="Thumbnail Image">
                            </td>
                            <td>
                                <span class="font-weight-bold">{{galleryImage.albumName}}</span>
                            </td>
                            <td>{{galleryImage.caption}}</td>
                            <td>
                                <span  class="badge rounded-pill bg-dark"> {{galleryImage.order}}</span>
                            </td>
                            <td>
                                <span class="badge" :class="galleryImage.status == 1 ? 'badge-success' : 'badge-info'"> {{ galleryImage.status == 1 ? 'Active' : 'In-active'}} </span>
                            </td>
                            <td>

                            <button v-if="galleryImage.status == 0" class="btn btn-success mx-2 btn-sm" title="Active Gallery Image"  
                            @click="onActive(galleryImage.id)">
                            <!-- <font-awesome-icon icon="fa-solid fa-square-check" /> -->
                            <i class="fa fa-toggle-on" aria-hidden="true"></i>
                            </button>
                            <button v-else class="btn btn-secondary mx-2 btn-sm" data-toggle="tooltip" data-placement="top" title="Inactive Gallery Image"  
                            @click="onInactive(galleryImage.id)">
                            <!-- <font-awesome-icon icon="fa-solid fa-rectangle-xmark" /> -->
                            <i class="fa fa-toggle-off" aria-hidden="true"></i>
                            </button>
                            |
                            <button
                            class="btn btn-warning mx-2 btn-sm"
                            title="Delete User"
                            @click="onEdit(galleryImage)"
                            >
                            <font-awesome-icon icon="fa-solid  fa-pencil" />
                            </button>
                            |
                            <button class="btn btn-danger mx-2 btn-sm" title="Delete Gallery Image"
                            @click="onDelete(galleryImage.id)">
                            <font-awesome-icon icon="fa-solid  fa-trash" />
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
           </div> 
        </div>

        <!-- Modal Add New Gallery Image -->
        <div class="modal fade" id="galleryImageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Gallery Images</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                    <div class="col-md-12 form-bg">
                        <!-- Form Start From Here -->
                        <Form @submit="createNewGalleryImage" :validation-schema="galleryImageValidationForCreate" ref="form">
                            <!-- Gallery Image,Caption,Image & Order -->
                            <div class="row">
                                <div class="col-md-12">

                                <div class="col-md-7 mt-4 d-inline-block float-left">

                                    <div class="row">
                                        <!-- Gallery Image -->
                                        <div class="col-md-12  mt-2  mb-3 form-group">
                                        <div class=" input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text p4 input-group-text-label">Video Album*</span>
                                            </div>
                                            <Field name="imageAlbum" as="select" class="form-control" v-model="imageAlbum">
                                            <option value="">-- Select Status --</option>
                                            <option v-for="(imageAlbum,index) in imageAlbums" :key="index" :value="imageAlbum.id">{{imageAlbum.title}}</option>
                                            </Field>                                          
                                        </div>
                                        <ErrorMessage name="imageAlbum" class="error-feedback" style="margin-bottom: -10px;" />
                                        </div>
                                        <!-- End -->

                                        <!-- Caption -->
                                        <div class="col-md-12 mt-2 mb-3 form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Caption*</span>
                                                </div>
                                                <Field name="caption" type="text" v-model="caption" class="form-control" autocomplete="off"/>
                                            </div>
                                            <ErrorMessage name="caption" v-model="caption" class="error-feedback" style="margin-bottom: -8px;" />
                                        </div>
                                        <!-- End -->

                                        <!-- Image -->
                                        <div class="col-md-12 mt-2  mb-3 form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Image*</span>
                                                </div>
                                                <Field name="image"  type="file" id="concept_note" class="form-control" accept="image/*" @change="pickFile" autocomplete="off"  style="height:44px" />
                                            </div>
                                            <ErrorMessage name="image" class="error-feedback" />
                                        </div>
                                        <!-- End -->

                                        <!-- Order -->
                                        <div class="col-md-12 mt-2  mb-3 form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Order</span>
                                                </div>
                                                <Field name="order" type="text" v-model="order" class="form-control" autocomplete="off"/>
                                            </div>
                                            <ErrorMessage name="order" v-model="order" class="error-feedback" />
                                        </div>
                                        <!-- End -->

                                        <!-- Status -->
                                        <div class="col-md-12  mt-2  mb-3 form-group">
                                        <div class=" input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text p4 input-group-text-label">Status*</span>
                                            </div>
                                            <Field name="status" as="select" class="form-control" v-model="status">
                                            <option value="">-- Select Status --</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                            </Field>                                          
                                        </div>
                                        <ErrorMessage name="status" class="error-feedback" style="margin-bottom: -10px;" />
                                        </div>
                                        <!-- End -->
                                    </div>

                                </div>

                                <!-- Thumbnail Image -->
                                <div class="col-md-5 mt-2 d-inline-block">
                                    <div class="col-md-12 form-group">
                                        <div class="form-bg text-center p-3">
                                            <div class=" box" style="display:block">
                                                <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                    <img v-if="!editImageFlag"
                                                        id="prvImg" 
                                                        src="@/assets/img/thumbail.png"
                                                        style="max-width:378px; height: auto;border: 3px #c5b7b7 solid;"
                                                        class="img-thumbnail"
                                                    >

                                                    <img v-if="editImageFlag"
                                                        id="prvImg" 
                                                        :src="editImage"
                                                        style="max-width:378px; height: auto;border: 3px #c5b7b7 solid;"
                                                        class=""
                                                    >
                                                </div>
                                                
                                                <div class="upload-options mt-3">
                                                    <label class="upload-options" for="imageUpload">
                                                        <font-awesome-icon icon="fa-solid  fa-upload"/> Select Thumbnail Image
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
                                <!-- End -->
                                </div>
                            </div>
                            <!-- End -->

                            <!-- Modal Footer -->
                            <div class="modal-footer">
                                <div class="form-group">
                                    <button class="btn btn-primary mr-2">
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
        <!-- End -->

        <!-- Modal Edit Gallery Image -->
        <div class="modal fade" id="galleryImageModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Gallery Images</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                    <div class="col-md-12 form-bg">
                        <!-- Form Start From Here -->
                        <Form @submit="updateGalleryImage" :validation-schema="galleryImageValidationForUpdate" ref="form">
                            <!-- Gallery Image,Caption,Image & Order -->
                            <div class="row">
                                <div class="col-md-12">

                                <div class="col-md-7 mt-4 d-inline-block float-left">

                                    <div class="row">
                                        <!-- Gallery Image -->
                                        <div class="col-md-12  mt-2  mb-3 form-group">
                                        <div class=" input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text p4 input-group-text-label">Video Album*</span>
                                            </div>
                                            <Field name="imageAlbum" as="select" class="form-control" v-model="edit.imageAlbum">
                                            <option value="">-- Select Status --</option>
                                            <option v-for="(imageAlbum,index) in imageAlbums" :key="index" :value="imageAlbum.id">{{imageAlbum.title}}</option>
                                            </Field>                                          
                                        </div>
                                        <ErrorMessage name="imageAlbum" class="error-feedback" style="margin-bottom: -10px;" />
                                        </div>
                                        <!-- End -->

                                        <!-- Caption -->
                                        <div class="col-md-12 mt-2 mb-3 form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Caption*</span>
                                                </div>
                                                <Field name="caption" type="text" v-model="edit.caption" class="form-control" autocomplete="off"/>
                                            </div>
                                            <ErrorMessage name="caption" v-model="caption" class="error-feedback" style="margin-bottom: -8px;" />
                                        </div>
                                        <!-- End -->

                                        <!-- Image -->
                                        <div class="col-md-12 mt-2  mb-3 form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Image*</span>
                                                </div>
                                                <Field name="image"  type="file" id="concept_note" class="form-control inputset" accept="image/*" @change="pickFile" autocomplete="off"  style="height:44px" />
                                                <a :href="fullViewImage" target="_blank" class="fa fa-eye iconsubmit"></a>
                                            </div>
                                            <ErrorMessage name="image" class="error-feedback" />
                                        </div>
                                        <!-- End -->

                                        <!-- Order -->
                                        <div class="col-md-12 mt-2  mb-3 form-group">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Order</span>
                                                </div>
                                                <Field name="order" type="text" v-model="edit.order" class="form-control" autocomplete="off"/>
                                            </div>
                                            <ErrorMessage name="order" v-model="order" class="error-feedback" />
                                        </div>
                                        <!-- End -->

                                        <!-- Status -->
                                        <div class="col-md-12  mt-2  mb-3 form-group">
                                        <div class=" input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text p4 input-group-text-label">Status*</span>
                                            </div>
                                            <Field name="status" as="select" class="form-control" v-model="edit.status">
                                            <option value="">-- Select Status --</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                            </Field>                                          
                                        </div>
                                        <ErrorMessage name="status" class="error-feedback" style="margin-bottom: -10px;" />
                                        </div>
                                        <!-- End -->
                                    </div>

                                </div>

                                <!-- Thumbnail Image -->
                                <div class="col-md-5 mt-2 d-inline-block">
                                    <div class="col-md-12 form-group">
                                        <div class="form-bg text-center p-3">
                                            <div class=" box" style="display:block">
                                                <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                    <img v-if="!editImageFlag"
                                                        id="prvImgEdit" 
                                                        src="@/assets/img/thumbail.png"
                                                        style="max-width:378px; height: auto;border: 3px #c5b7b7 solid;"
                                                        class="img-thumbnail"
                                                    >

                                                    <img v-if="editImageFlag"
                                                        id="prvImg" 
                                                        :src="editImage"
                                                        style="width:378px; height: auto; border: 3px #c5b7b7 solid;"
                                                        class=""
                                                    >
                                                </div>
                                                
                                                <div class="upload-options mt-3">
                                                    <label class="upload-options" for="imageUpload">
                                                        <font-awesome-icon icon="fa-solid  fa-upload"/> Select Thumbnail Image
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
                                <!-- End -->
                                </div>
                            </div>
                            <!-- End -->

                            <!-- Modal Footer -->
                            <div class="modal-footer">
                                <div class="form-group">
                                    <button class="btn btn-primary mr-2">
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
        <!-- End -->

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
                                                        aspectRatio: 2.33/1
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

        <!-- Modal For Print Gallery Image -->
            <div class="modal fade" id="modalForPrintGalleryImage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Gallery Images </h5>
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
                                        <th scope="col" >Album Name</th>                           
                                        <th scope="col" >Caption</th> 
                                        <th scope="col" >Order</th> 
                                        <th scope="col" >Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(galleryImage,index) in allGalleryImage" :key="galleryImage.id">
                                        <th scope="row">{{index+1}}</th>                                        
                                        <td >{{galleryImage.albumName}}</td>
                                        <td v-html="galleryImage.caption"></td>
                                        <td >{{galleryImage.order}}</td>
                                        <td > {{galleryImage.status == 1 ? 'Active' : 'Inactive'}}</td>
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
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import 'mosha-vue-toastify/dist/style.css'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Form,Field,ErrorMessage } from "vee-validate";
import * as yup from "yup";
import $ from 'jquery';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        Cropper
    },
    
    data() {
            const validationCreate = yup.object().shape({
            imageAlbum: yup
                .string()
                .required("Video Album is required!"),
            caption: yup
                .string()
                .required("Caption is required!"),
            status: yup
                .string()
                .required("Status is required!"),
            image: yup
                .string()
                .required("Image is required!"),      
        });

        const validationUpdate = yup.object().shape({
            imageAlbum: yup
                .string()
                .required("Video Album is required!"),
            caption: yup
                .string()
                .required("Caption is required!"),
            status: yup
                .string()
                .required("Status is required!"),     
        });
        return {
            backend_url: process.env.VUE_APP_API_URL, 
            base_url_for_image : this.base_url_for_resource,
            galleryImageValidationForCreate:validationCreate,
            galleryImageValidationForUpdate:validationUpdate,

            editImageFlag:false,
            galleryImages:{},
            imageAlbums:{},
            updateId:'',
            thumbnail:'',
            imageAlbum:'',
            editImage:'',
            cropData:'',
            caption:'',
            order:'',
            status:'',
            image:'',
            img:'',
            edit:{
                caption:'',
                order:'',
                status:''
            },
            fullViewImage:'',
            allGalleryImage:''
            
        }
    },

    methods: {

        // Print Gallery Image
        printGalleryImage(){
            $(document).ready(function () {
                $('#modalForPrintGalleryImage').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.backend_url + "images")
                .then((res) => {
                this.allGalleryImage = res.data.galleryImageList;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                            {
                                extend: 'csv',
                                messageTop: 'Gallery Image Informations',
                                title: 'Asf 2022 Gallery Image Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Gallery Image Informations',
                                title: 'Asf 2022 Gallery Image Information Table'
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


        onEdit(image){
            this.updateId = image.id;

            this.editImageFlag = true;
            $(document).ready(function () {
            $('#galleryImageModalEdit').modal('show');
            }); 

            this.edit.caption = image.caption;
            this.edit.order = image.order;
            this.edit.status = image.status;
            this.edit.imageAlbum = image.albumId;
            this.editImage = this.base_url_for_image + 'uploads/images/gallery/'+image.thumbnail;
            this.fullViewImage = this.base_url_for_image + 'uploads/images/gallery/'+image.image;

        },

        //Update Gallery Image
        updateGalleryImage(){

            this.axios
                .put(this.backend_url +"updateGalleryImage/"+this.updateId,{
                    caption : this.edit.caption,
                    image   : this.image,
                    order   : this.edit.order,   
                    status  : this.edit.status,
                    album_id : this.edit.imageAlbum,
                    thumbnail : this.thumbnail ? this.thumbnail : this.img
                }).then((res)=>{
                    console.log(res);
                    createToast(res.data.message, {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });
                    this.getGalleryImages();
                    $(document).ready(function () {
                    $('#galleryImageModalEdit').modal('hide');
                    });
                    this.editImageFlag = false;

                }).catch((err) =>{
                    alert(err);
                })

        },

        //Create New Gallery Image
        createNewGalleryImage(){
            this.axios
                .post(this.backend_url +"addGalleryImage",{
                    caption : this.caption,
                    image   : this.image,
                    order   : this.order,   
                    status  : this.status,
                    thumbnail : this.thumbnail ? this.thumbnail : this.img
                }).then((res)=>{
                    console.log(res);
                    createToast(res.data.message, {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });
                    this.getGalleryImages();
                    $(document).ready(function () {
                    $('#galleryImageModal').modal('hide');
                    });

                }).catch((err) =>{
                    alert(err);
                })
        },

        //Add Gallery Image
        addGalleryImage(){
            this.editImageFlag = false;
            $(document).ready(function () {
            $('#galleryImageModal').modal('show');
            });    
        },

        //Croping image(Crop(image) -> Button) =>
        cropImage(e){
        console.log(e);
        let reader = new FileReader();
        console.log(reader);
        this.thumbnail = this.cropData;
        if(this.thumbnail){
            this.editImageFlag = false;
            var pic = this.thumbnail;

            $(document).ready(function(){
            $('#remarkModal').modal('hide');
            $('#prvImg').attr('src',pic);
            });   

            $(document).ready(function(){
            $('#remarkModal').modal('hide');
            $('#prvImgEdit').attr('src',pic);
            }); 
        }


        },

        //Croping image params
        changes({ coordinates, canvas }) {
        console.log(coordinates, canvas);
        this.cropData = canvas.toDataURL();
        },

        //Delete Specific Image
        onDelete(id){
            this.axios
                .delete(this.backend_url + "deleteGalleryImage/" +id)
                .then((res) => { 
                    createToast(res.data.message, {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'danger',
                    })
                    this.getGalleryImages();
                })
        },

        //Get All Images
        getGalleryImages(){
            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.backend_url + "images")
                .then((res) => { 
                    this.galleryImages = res.data.galleryImageList;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
                })
        },

        //Active Image Album
        onActive(id){
            this.axios
                .patch(this.backend_url + "activeGalleryImage/" +id)
                .then((res) => { 
                    console.log(res);
                    createToast('Active Gallery Image Successfully', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    })
                    this.getGalleryImages();
                })
        },

        //Inactive Image Album
        onInactive(id){
            this.axios
                .patch(this.backend_url + "inactiveGalleryImage/" +id)
                .then((res) => { 
                    console.log(res);
                    createToast('Inactive Gallery Image Successfully', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'danger',
                    })
                    this.getGalleryImages();
                })
        },

        //Get All Image Album Dropdown
        getImageAlbum(){
            this.axios
                .get(this.backend_url + "getImageAlbums")
                .then((res) => { 
                    this.imageAlbums = res.data.data;
                    console.log(this.imageAlbums);
                })
        },

        pickFile(ev){
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.onloadend = (file) => {
            console.log(file);
            this.image = reader.result;
        };
            reader.readAsDataURL(file);       
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

        
    },

    created() {
        this.getGalleryImages();
        this.getImageAlbum();
        
    },

    mounted(){
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }


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

.inputset {
    height: 2em;
    width: 30em;
    border-radius: 0.5em;
    font-size: 1em;
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


</style>