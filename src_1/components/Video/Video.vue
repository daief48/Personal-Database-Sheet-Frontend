<template>
    <div>
    <h4 class="text-bold heading-style">Videos</h4>
    <div class="card card-default">
        <div class="card-header">
      <button class="btn btn-success print-button-style" @click="printVideoDetail">
            <font-awesome-icon icon="fa-solid  fa-rectangle-list" />
            Export
      </button>
    </div>

    <div class="card-body">
        <div class="row">

            <div class="col-md-4 form-bg rounded" style="border: 1px #eeeeee solid;">

                <Form v-if="formAction == 'insert'" @submit="handleVideoInsert" :validation-schema="vedioForm" ref="forminsert">
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

                        <!-- Title -->
                        <div class="form-group">
                            <label for="title">Title*</label>
                            <Field name="title" type="text" v-model="title" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="title" class="error-feedback" />
                        </div>
                        <!-- End -->

                        <div class="form-group">
                            <label for="vedioStatus">Album*</label>
                            <Field name="album_id" as="select" class="form-control" v-model="album_id">
                            <option value="">Select Album</option>    
                            <option v-for="(album,index) in albumList" :key="index" :value="album.id">{{album.title}}</option>
                            </Field>
                            <ErrorMessage name="album_id" class="error-feedback" />
                        </div>

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
                                        style="max-width:100%; height: auto;border: 3px #c5b7b7 solid;"
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

                        <!-- Url -->
                        <div class="form-group">
                            <label for="url">Url*</label>
                            <Field name="url" type="text" v-model="url" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="url" v-model="url" class="error-feedback" />
                        </div>
                        <!--  -->

                        <!-- Order -->
                        <div class="form-group">
                            <label for="url">Order</label>
                            <Field name="order" type="number" v-model="order" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="order" class="error-feedback" />
                        </div>
                        <!--  -->

                        <!-- Status -->
                        <div class="form-group">
                            <label for="vedioStatus">Status</label>
                            <Field name="vedioStatus" as="select" class="form-control" v-model="vedioStatus">
                            <option value="">-- Select Status --</option>
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

                <Form v-if="formAction == 'update'" @submit="handleVideoUpdate" :validation-schema="vedioForm" ref="formUpdate">
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

                        <!-- Title -->
                        <div class="form-group">
                            <label for="title">Title*</label>
                            <Field name="title" type="text" v-model="title" ref="titleO" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="title" class="error-feedback" />
                        </div>
                        <!-- End -->
                        <div class="form-group">
                            <label for="vedioStatus">Album*</label>
                            <Field name="album_id" as="select" class="form-control" v-model="album_id">
                            <option value="">Select Album</option>    
                            <option v-for="(album,index) in albumList" :key="index" :value="album.id">{{album.title}}</option>
                            </Field>
                            <ErrorMessage name="album_id" class="error-feedback" />
                        </div>
                        <!--  Image -->
                        <div class="form-group">
                            <div class="form-bg text-center p-3">
                                <div class=" box" style="display:block">
                                    <div class="js--image-preview rounded" style="text-align:center">
                                        <img v-if="!editImageFlag"
                                        id="prvImg" 
                                        src="@/assets/img/placeholder.png"
                                        style="max-width:100%;border: 3px #c5b7b7 solid;"
                                        class="rounded"
                                        >

                                        <img v-if="editImageFlag"
                                        id="prvImg" 
                                        :src="showImage"
                                        style="max-width:100%; height: auto;border: 3px #c5b7b7 solid;"
                                        class="rounded"
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

                        <!-- Url -->
                        <div class="form-group">
                            <label for="url">Url*</label>
                            <Field name="url" type="text" v-model="url" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="url" v-model="url" class="error-feedback" />
                        </div>
                        <!-- End -->

                        <!-- Order -->
                        <div class="form-group">
                            <label for="url">Order</label>
                            <Field name="order" type="number" v-model="order" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="order" class="error-feedback" />
                        </div>
                        <!-- End -->

                        <!-- Status -->
                        <div class="form-group">
                            <label for="vedioStatus">Status</label>
                            <Field name="vedioStatus" as="select" class="form-control" v-model="vedioStatus">
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
                            <!-- <button v-if="formAction == 'insert'" class="btn btn-danger ml-2" type="reset">Reset</button> -->
                            <button class="btn btn-danger ml-2" @click = "cancelUpdate"> <font-awesome-icon icon="fa-solid fa-ban" /> Cancel</button>
                        </div>

                    </div>
                </Form>

            </div>

            <div class="col-md-8">
                <table class="table table-hover" id="datatable">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Album</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Order</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(video,index) in videos" :key="video.id">
                            <td scope="row">{{index+1}}</td>
                            <td>
                                <img :src="backendUrl+'/public/uploads/images/gallery/videos/'+video.thumbnail" alt="image" style="max-width: 40px" class="">
                            </td>
                            <td> <font-awesome-icon icon="fa-solid fa-file-video" /> {{video.albumName}}</td>
                            <td> <button type="button" class="badge badge-info mt-0 text-bold" @click="onDetails(video)"> view more </button></td>
                            <td>
                                <span  class="badge rounded-pill bg-dark"> {{video.order}}</span>
                            </td>
                            <td>
                                <span v-if="video.status" class="badge badge-success"> Active</span>
                                <span v-if="!video.status" class="badge badge-danger"> In-active</span>
                            </td>
                            <td>
                            <button class="btn btn-warning mx-2 btn-sm" title="Edit video deatials"
                            @click="onEdit(video)">
                            <font-awesome-icon icon="fa-solid  fa-pencil" />
                            </button>
                            |
                            <button class="btn btn-danger mx-2 btn-sm" title="Delete video" 
                            @click="onDelete(video.id)">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal For Details Video -->
        <div class="modal fade" id="modalForShowDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body" id="ck-control">
                        <div class="justify-content-center mt-2 mb-2 ml-0 mr-0">

                            <!-- Video -->
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <iframe width="770" height="345" :src="vediosDetailsForModal.url">
                                    </iframe>
                                </div>
                            </div>
                            <!-- End -->

                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <h5 class="ml-2 text-bold">Title :</h5>
                                    <hr>
                                    <h4 class="ml-3" v-html="vediosDetailsForModal.title"></h4>
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

        <!-- Open Model For Image Cooper -->
        <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                                            <div class="modal-body modal-body-modify p-3">
                                                <div class="">
                                                    <cropper
                                                        class="cropper"
                                                        :src="img"
                                                        :stencil-props="{
                                                        aspectRatio: 1.1/1.1
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

        <!-- Modal For Print Schedule -->
            <div class="modal fade" id="modalForPrintVideoDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Videos  </h5>
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
                                        <th scope="col" >Album Name</th> 
                                        <th scope="col" >Url</th> 
                                        <th scope="col" >Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(video,index) in allVideo" :key="video.id">
                                        <th scope="row">{{index+1}}</th>                                        
                                        <td >{{video.title}}</td>
                                        <td >{{video.albumName}}</td>
                                        <td >{{video.url}}</td>
                                        <td >{{video.status == 1 ? 'Active' : 'Inactive'}}</td>
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
        
    </div>
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
//import moment from 'moment';
import { Form, ErrorMessage,Field } from "vee-validate";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import * as yup from "yup";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import '@/assets/css/custom.css';
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
                title: yup
                .string()
                .required("Title is required!"),
                // album_id: yup
                // .string()
                // .required("Album is required!"),
                url: yup
                    .string()
                    .required("Url is required!"),
                vedioStatus: yup
                    .string()
                    .required("Status is required!"),   
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
            videos:{},
            vediosDetailsForModal:{},
            title:'',
            url:'',
            eventId:'',
            albumId:'',
            updateId:'',

            vedioStatus:0,
            image:'',
            cropData:'',
            img:'',
            showImage:'',
            editImageFlag:false,
            formAction:'insert',
            albumList : '',
            album_id:'',
            allVideo:'',
            order:0,
            eventTitle:''

            
        }
    },

    methods: {
        cancelUpdate(){
           location.reload(); 
        },

        //Print Vedio Details
        printVideoDetail(){
            $(document).ready(function () {
                $('#modalForPrintVideoDetail').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getVideo")
                .then((res) => {
                this.allVideo = res.data.list;
                console.log(this.allVideo);
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                            {
                                extend: 'csv',
                                messageTop: 'Video Informations',
                                title: 'Asf 2022 Video Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Video Informations',
                                title: 'Asf 2022 Video Information Table'
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

        //Get All Videos
        getVideos(){
            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/getVideo")
                .then((res) => { 
                    this.videos = res.data.list;
                    this.eventTitle = res.data.activeEvent.title;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
            })
        },

        onDetails(video){
            this.vediosDetailsForModal = video;
            $(document).ready(function () {
                $('#modalForShowDetails').modal('show');
            });

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
    handleVideoInsert(){
        this.axios
            .post(this.base_url + '/api/addVideo', {
                title: this.title,
                url: this.url,
                album_id: this.album_id,
                thumbnail:this.image ? this.image : this.img,
                order:this.order,
                status: this.vedioStatus,
            }).then((res) => { 
                    console.log(res);
                    createToast('Video Add Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });

                    $(document).ready(function(){
                    $('#remarkModal').modal('hide');
                    $('#prvImg').attr('src','../../assets/img/placeholder.png');
                    });

                    this.$refs.forminsert.resetForm();
                    this.getVideos();
                    setTimeout(function(){ location.reload(); }, 1000);

                })
                .catch((err) => { 
                    console.log(err);
                })
    },

    // Update Data
    handleVideoUpdate(){
        this.axios
            .put(this.base_url + '/api/updateVideo/' +this.updateId, {
                title: this.title,
                url: this.url,
                event_id:this.eventId,
                album_id:this.album_id,
                thumbnail:this.image ? this.image : this.img,
                order:this.order,
                status: this.vedioStatus,
            }).then((res) => { 
                    console.log(res);
                    createToast('Video Information Updated Successfully !', {
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
                    this.getVideos();
                    setTimeout(function(){ location.reload(); }, 1000);

                })
                .catch((err) => { 
                    console.log(err);
                })

    },

    //Delete Specific Video
    onDelete(id){
        this.axios
            .delete(this.base_url+'/api/deleteVideo/'+id)
            .then((result)=>{
                console.log(result);
                createToast('Video Information Deleted Successfully !', {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });
                    this.getVideos(); 
                })
            .catch((error)=>{
                console.log(error);
            })
        
    },

    onEdit(video){
        this.updateId = video.id;
        this.formAction = 'update';
        this.editImageFlag = true;
        this.title = video.title;
        this.url = video.url;
        this.eventId = video.event_id;
        this.album_id = video.album_id;
        this.vedioStatus = video.status;
        this.showImage = this.base_url + '/public/uploads/images/gallery/videos/' +video.thumbnail;
    },
    getVideoAlbum(){
            this.axios
                .get(this.base_url + "/api/getvideoAlbums")
                .then((res) => { 
                    console.log(res.data.data);
                    this.albumList = res.data.data;
            })

    },

    },

    created() {
        this.getVideos();
        this.getVideoAlbum();
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

/* .img-thumbnail {
    max-width: 20% !important;
} */

.modal-body-modify {
    padding: 0px;
}

</style>