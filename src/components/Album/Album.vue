<template>
    <div>
        <h4 class="text-bold heading-style">Albums </h4>

        <div class="card card-default">
            <div class="card-header">


        <button class="btn btn-success print-button-style" style="padding:5px 6px" @click="printAlbum">
                <font-awesome-icon icon="fa-solid  fa-rectangle-list" />
                Export
        </button>
            </div>

        <div class="card-body">
            <div class="row">

                <div class="col-md-4 form-bg rounded" style="border: 1px #eeeeee solid;">

                    <!-- Insert Album Information -->
                    <Form v-if="formAction == 'insert'" @submit="handleAlbumInsert" :validation-schema="vedioForm" ref="forminsert">

                        <div>
                            <div class="row mb-3 mt-2">
                                <div class="col-md-12">
                                    <div class="input-group border border-dark rounded">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                        </div>
                                        <label class="ml-3 mt-2 ">{{eventTitle}}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Album Type -->
                            <div class="form-group">
                                <label for="albumType">Album Type*</label>
                                <Field name="albumType" as="select" class="form-control" v-model="albumType">
                                <option value="">-- Album Type --</option>
                                <option value="Image">Image</option>
                                <option value="Video">Video</option>
                                </Field>
                                <ErrorMessage name="albumType" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!--  Image -->
                            <div class="form-group">
                                <div class="form-bg text-center p-3">
                                    <div class=" box" style="display:block">
                                        <div class="js--image-preview" style="text-align:center">
                                            <img v-if="!editImageFlag"
                                            id="prvImg" 
                                            src="@/assets/img/placeholder.png"
                                            style="max-width:100%;border: 3px #c5b7b7 solid;"
                                            class=""
                                            >

                                            <img v-if="editImageFlag"
                                            id="prvImg" 
                                            :src="showImage"
                                            style="max-width:100%; height:auto;border: 3px #c5b7b7 solid;"
                                            class=""
                                            >
                                        </div>
                                        
                                        <div class="upload-options mt-3">
                                            <label class="upload-options" for="imageUpload">
                                                <font-awesome-icon icon="fa-solid  fa-upload"/> Select Thumbnail  Image
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
                            <!-- End -->

                            <!-- Album Title -->
                            <div class="form-group">
                                <label for="title">Title*</label>
                                <Field name="title" type="text" v-model="title" class="form-control" autocomplete="off"/>
                                <ErrorMessage name="title" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!-- Order -->
                            <div class="form-group">
                                <label for="order">Order</label>
                                <Field name="order" type="number" v-model="order" class="form-control" autocomplete="off"/>
                                <ErrorMessage name="order" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!-- Status -->
                            <div class="form-group">
                                <label for="vedioStatus">Status</label>
                                <Field name="vedioStatus" as="select" class="form-control" v-model="albumStatus">
                                
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                                </Field>
                                <ErrorMessage name="vedioStatus" class="error-feedback" />
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary mr-2" :disabled="isCreating || isUpdating">
                                <span v-show="isCreating" class="spinner-border spinner-border-sm"></span>
                                Submit
                                </button>
                                <button class="btn btn-danger ml-2" type="reset">Reset</button>
                            </div>

                        </div>
                    </Form>
                    <!-- Insert Album Information End -->

                    <!-- Update Album Information -->
                    <Form v-if="formAction == 'update'" @submit="handleAlbumUpdate" :validation-schema="vedioForm" ref="formUpdate">
                        <div>

                            <div class="row mb-3 mt-2">
                                <div class="col-md-12">
                                    <div class="input-group border border-dark rounded">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                        </div>
                                        <label class="ml-3 mt-2 ">{{eventTitle}}</label>
                                    </div>
                                </div>
                            </div>

                             <!-- Album Type -->
                             <div class="form-group">
                                <label for="albumType">Album Type*</label>
                                <Field name="albumType" as="select" class="form-control" v-model="albumType">
                                <option value="">-- Album Type --</option>
                                <option value="Image">Image</option>
                                <option value="Video">Video</option>
                                </Field>
                                <ErrorMessage name="albumType" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!--  Image -->
                            <div class="form-group">
                                <div class="form-bg text-center p-3">
                                    <div class=" box" style="display:block">
                                        <div class="js--image-preview" style="text-align:center">
                                            <img v-if="!editImageFlag"
                                            id="prvImg" 
                                            src="@/assets/img/placeholder.png"
                                            style="max-width:100%;border: 3px #c5b7b7 solid;"
                                            class=""
                                            >

                                            <img v-if="editImageFlag"
                                            id="prvImg" 
                                            :src="showImage"
                                            style="max-width:100%;height:auto;border: 3px #c5b7b7 solid;"
                                            class=""
                                            >
                                        </div>
                                        
                                        <div class="upload-options mt-3">
                                            <label class="upload-options" for="imageUpload">
                                                <font-awesome-icon icon="fa-solid  fa-upload"/> Select Thumbnail  Image
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
                            <!-- End -->

                            <!-- Title -->
                            <div class="form-group">
                                <label for="title">Title</label>
                                <Field name="title" type="text" v-model="title" class="form-control" autocomplete="off"/>
                                <ErrorMessage name="title" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!-- Order -->
                            <div class="form-group">
                                <label for="order">Order</label>
                                <Field name="order" type="number" v-model="order" class="form-control" autocomplete="off"/>
                                <ErrorMessage name="order" class="error-feedback" />
                            </div>
                            <!-- End -->

                            <!-- Status -->
                            <div class="form-group">
                                <label for="vedioStatus">Status*</label>
                                <Field name="vedioStatus" as="select" class="form-control" v-model="albumStatus">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                                </Field>
                                <ErrorMessage name="vedioStatus" class="error-feedback" />
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary mr-2" :disabled="isCreating || isUpdating">
                                <span v-show="isCreating" class="spinner-border spinner-border-sm"></span>
                                Submit
                                </button>
                                <!-- <button class="btn btn-danger ml-2" type="reset">Reset</button> -->
                                <button class="btn btn-danger ml-2" @click = "cancelUpdate"> <font-awesome-icon icon="fa-solid fa-ban" /> Cancel</button>
                            </div>

                        </div>
                    </Form>
                    <!-- Update Album Information End -->

                </div>

                <!-- Table -->
                <div class="col-md-8">
                    <table class="table table-hover" id="datatable">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Thumbnail</th>
                                <th scope="col">Album Type</th>
                                <th scope="col">Title</th>
                                <th scope="col">Order</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(album,index) in albums" :key="album.id">
                                <td scope="row">{{index+1}}</td>

                                <td>
                                    <img :src="backendUrl+'/public/uploads/images/album_thumbnail/'+album.thumbnail" alt="image" style="max-width: 50px;height:auto;border: 1px #eeeeee solid;" class="">
                                </td>

                                <td class="text-bold"> {{album.album_type}}</td>

                                <td> {{album.title}}</td>
                                <td><span  class="badge rounded-pill bg-dark"> {{album.order}}</span></td>
                                <td>
                                    <span v-if="album.status" class="badge badge-success"> Active</span>
                                    <span v-if="!album.status" class="badge badge-danger"> In-active</span>
                                </td>

                                <td>
                                <button class="btn btn-warning mx-2 btn-sm" title="Edit Album Details"
                                @click="onEdit(album)">
                                <font-awesome-icon icon="fa-solid  fa-pencil" />
                                </button>
                                |
                                <button class="btn btn-danger mx-2 btn-sm" title="Delete Album" 
                                @click="onDelete(album.id)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
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
                                                        aspectRatio:auto
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
        <!--Image Cooper End -->

        <!-- Modal For Print Schedule -->
            <div class="modal fade" id="modalForPrintPartner" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Album  </h5>
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
                                        <th scope="col" >Album Type</th>                           
                                        <th scope="col" >Title</th> 
                                        <th scope="col" >Order</th> 
                                        <th scope="col" >Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(album,index) in allAlbum" :key="album.id">
                                        <th scope="row">{{index+1}}</th>
                                        <td >{{album.album_type}}</td>
                                        <td >{{album.title}}</td>
                                        <td >{{album.order}}</td>
                                        <td > {{album.status == 1 ? 'Active' : 'Inactive'}}</td>
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
import { Form, ErrorMessage,Field } from "vee-validate";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import * as yup from "yup";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import '../../assets/css/custom.css';
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
            albumType: yup
                .string()
                .required("Album type is required!"),
            title: yup
                .string()
                .required("Title is required!"),
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

            base_url:this.backendUrl,

            vedioForm:validationCreate,
            albums:{},
            link:'',
            order:'',
            albumType:'',
            eventId:'',
            updateId:'',
            title:'',
            albumStatus:0,
            image:'',
            cropData:'',
            img:'',
            showImage:'',
            editImageFlag:false,
            formAction:'insert',
            allAlbum:{},
            eventTitle:''

            
        }
    },

    methods: {
        cancelUpdate(){
           location.reload(); 
        },
        
        //Print Partner
        printAlbum(){
            $(document).ready(function () {
                $('#modalForPrintPartner').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/albums")
                .then((res) => {
                this.allAlbum = res.data.list;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                            {
                                extend: 'csv',
                                messageTop: 'Album Informations',
                                title: 'Asf 2022 Album Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Album Informations',
                                title: 'Asf 2022 Album Information Table'
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

        // Get All Albums
        getAlbums(){
            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/albums")
                .then((res) => { 
                    this.albums = res.data.list;
                    this.eventTitle = res.data.activeEvent.title;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
            })
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

    //Insert Data
    handleAlbumInsert(){
        this.axios
            .post(this.base_url + '/api/add_album', {
                album_type: this.albumType,
                title: this.title,
                order:this.order,
                thumbnail:this.image ? this.image : this.img,
                status: this.albumStatus,
            }).then((res) => { 
                    console.log(res);
                    setTimeout(createToast('Album Information Add Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    }), 10000);
                    
                    $(document).ready(function(){
                    $('#remarkModal').modal('hide');
                    $('#prvImg').attr('src','@/assets/img/placeholder.png');
                    });

                    this.$refs.forminsert.resetForm();
                    this.getAlbums();
                    setTimeout(function(){ location.reload(); }, 1000);

                })
                .catch((err) => { 
                    console.log(err);
                })
    },

    // Update Data
    handleAlbumUpdate(){
        this.axios
            .put(this.base_url + '/api/update_album/' +this.updateId, {
                album_type: this.albumType,
                title: this.title,
                order:this.order,
                thumbnail:this.image ? this.image : this.img,
                status: this.albumStatus,
                event_id: this.eventId,
            }).then((res) => { 
                    console.log(res);
                    createToast('Album Information Updated Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });
                    this.$refs.formUpdate.resetForm();
                    this.formAction = 'insert';
                    
                    $(document).ready(function(){
                    $('#remarkModal').modal('hide');
                    $('#prvImg').attr('src','@/assets/img/placeholder.png');
                    });
                    this.getAlbums();
                    setTimeout(function(){ location.reload(); }, 1000);
                })
                .catch((err) => { 
                    console.log(err);
                })

    },
    onDelete(id){
        this.axios
            .delete(this.base_url+'/api/delete_album/'+id)
            .then((result)=>{
                console.log(result);
                createToast('Album Information Deleted Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    }); 
                    this.getAlbums();
                })
            .catch((error)=>{
                console.log(error);
            })
    },

    onEdit(album){
        this.updateId = album.id;
        this.eventId = album.event_id;
        this.formAction = 'update';
        this.editImageFlag = true;
        this.title = album.title;
        this.albumType = album.album_type;
        this.order = album.order;
        this.albumStatus = album.status;
        this.showImage = this.base_url + '/public/uploads/images/album_thumbnail/' +album.thumbnail;
    },

    },

    created() {
        this.getAlbums();
    },

}
</script>

<style scoped>



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

.modal-body-mod {
    padding: 0px !important;
}

</style>