<template>
    <div>
        <h4 class="text-bold heading-style">Document</h4>
        <div class="card card-default">

            <div class="card-header">
                <button class="add-button btn-sm"
                    @click="addDocument"
                    > 
                    <font-awesome-icon icon="fa-so400lid  fa-plus" /> 
                    Add New Document
                </button>
                <button class="btn btn-success ml-2" style="padding:5px 6px" @click="printDocumentDetail">
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
                                    <th scope="col">SL </th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Presenter Name</th>
                                    <th scope="col">Document Type</th> 
                                    <th scope="col">Session</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(document,index) in documents" :key="document.id">
                                    <th scope="row">{{index+1}}</th>
                                    <td><img :src="base_url+'/public/uploads/document/thumbnail/'+document.thumbnail" alt="image" style="max-width: 75px;height:auto;border: 1px #eeeeee solid;" class=""></td>
                                    <!-- <td >{{document.title.substring(0, 20) + '..'}}</td> -->
                                    <td>{{document.title}}</td>
                                    <td>{{document.presented_by}}</td>
                                    <td >{{document.document_type}}
                                        <!-- {{document.present_date != null ? document.present_date : 'NA' }} -->
                                        <span v-if="document.present_date != null && document.day != 0" class="font-weight-bold text-primary" style="font-size: 15px;"> [ PD : {{$filters.myDateFormate(document.present_date)}},&nbsp;&nbsp;{{document.day}} ]</span>
                                        <span style="font-size: 15px;" class="font-weight-bold text-primary" v-else> </span>
                                    </td>
                                    <td>{{document.session}}</td>
                                    <!-- <td v-if="document.present_date != ''" class="font-weight-bold text-primary"> {{$filters.myDateFormate(document.present_date)}} <span class="badge badge-dark ml-2 border border-dark rounded" style="font-size: 15px;color:#212529;background-color: #f8f9fa;">{{document.day}}</span> </td> -->
                                    <td >
                                        <span v-if="document.status" class="badge badge-success"> Active</span>
                                        <span v-if="!document.status" class="badge badge-danger"> In-active</span>
                                    </td>
                                    <td> 
                                        <button class="btn btn-warning mx-2 btn-sm" title="Edit partner deatials"
                                        @click="onEdit(document)">
                                        <font-awesome-icon icon="fa-solid  fa-pencil" />
                                        </button>
                                        |
                                        <button class="btn btn-danger mx-2 btn-sm" title="Delete Partner" 
                                        @click="onDelete(document.id)">
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                        </button>
                                        |
                                        <a 
                                        :href="base_url+'/public/uploads/document/file/'+document.file"
                                        class="btn btn-primary mx-2 btn-sm" title="Show Document"
                                        target="_blank" 
                                        >
                                        <font-awesome-icon icon="fa-solid fa-file" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>

        <!-- Modal For Entry New Document -->
            <div class="modal fade" id="addNewDocumentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Document</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="modal-body" id="ck-control">
                            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                <div class="col-md-12 form-bg">
                                    <Form @submit="createNewDocument" :validation-schema="newDocumentAddForm" ref="form">

                                        <!-- Event Title -->
                                        <div class="row mb-3 mt-2">
                                            <div class="col-md-12">
                                                <div class="input-group border border-dark rounded">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Event Title</span>
                                                    </div>
                                                    <label class="ml-3 mt-2 ">{{eventTitle.title}}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- Document Type -->
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text input-group-text-label p4" >Document Type* </span>
                                            </div>
                                            <Field name="documentType" @change="day" as="select" class="form-control" v-model="documentType">
                                                <option value="">-- Select Document Type --</option>
                                                <option value="Concept note">Concept note</option>
                                                <option value="Presentation">Presentation</option>
                                            </Field>                       
                                        </div>
                                        <ErrorMessage name="documentType" class="error-feedback mb-1" />
                                        <!-- End -->

                                        <!-- Presentation Day -->
                                        <div class=" input-group mb-2" v-if="showDay">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text p4 input-group-text-label">Presentation Day* </span>
                                        </div>
                                        <Field name="selectedPresentationDay" as="select" class="form-control" v-model="selectedPresentationDay">
                                                <option value="">-- Select Presentation Day -- </option>
                                                <option v-for="(ptnDay,index) in presentationDay" :key="index" :value="ptnDay.day"> Date: {{$filters.myDateFormate(ptnDay.present_date)}},&nbsp;&nbsp;&nbsp;&nbsp;{{ptnDay.day}}</option>
                                        </Field>                                          
                                        </div>
                                        <ErrorMessage v-if="presentationDayErrMsgFlag" name="selectedPresentationDay" class="error-feedback" />
                                        <!-- End -->

                                        <!-- Document Title -->
                                        <div class="row mt-1">
                                            <div class="col-md-12 form-group">
                                            <div class="mb-2">
                                                <div class="input-group mb-2">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text input-group-text-label p4" >Document Title*</span>
                                                    </div>
                                                    <Field name="documentTitle" type="text" v-model="documentTitle" class="form-control" autocomplete="off"/>
                                                </div>
                                                </div>
                                            <ErrorMessage name="documentTitle" class="error-feedback" />
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- Details -->
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                            <div class="mb-2">
                                                <div class="">
                                                    <span class="input-group-text p4 mb-2" >Details </span>
                                                </div>
                                                <ckeditor name="documentDetails" autocomplete="off" class="form-control" :editor="editor" v-model="documentDetails" :config="editorConfig" />
                                            </div>
                                            <ErrorMessage name="documentDetails" class="error-feedback" />
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- File,Presented By & Status-->
                                        <div class="row">
                                            <div class="col-md-12">
                                            
                                            <div class="col-md-6 mt-4 d-inline-block float-left">

                                                <div class="row">
                                                    <!-- Presented By -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Presented By</span>
                                                            </div>
                                                            <Field name="presentedBy"  type="text" id="presentedBy" class="form-control"   v-model="presentedBy" autocomplete="off"  style="height:44px" />
                                                            </div>
                                                        <ErrorMessage name="presentedBy"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->                                               
                                                    <!-- File -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >File</span>
                                                                
                                                            </div>
                                                            
                                                            <Field name="documentFile"  type="file" id="documentFile" class="form-control" accept=".pdf, .pptx, .docx" @change="pickFile"  v-model="documentFile" autocomplete="off"  style="height:44px" />
                                                            </div>
                                                            <span class="badge badge-danger" >note </span><span> File type : pdf,docx,pptx.</span>
                                                        <ErrorMessage name="documentFile"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->
                                                    <!-- Session -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Session</span>
                                                            </div>
                                                            <Field name="documentSession"  type="text" id="documentSession" class="form-control"   v-model="documentSession" autocomplete="off"  style="height:44px" />
                                                            </div>
                                                        <ErrorMessage name="documentSession"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Status -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Status* </span>
                                                            </div>
                                                            <Field name="documentStatus" as="select" class="form-control" v-model="documentStatus">
                                                                <option value="">-- Select Status  --</option>
                                                                <option value="1">Active</option>
                                                                <option value="0">In-active</option>
                                                            </Field>                                    
                                                        </div>
                                                        <ErrorMessage name="documentStatus" class="error-feedback" />
                                                    </div>
                                                    <!-- End -->
                                                </div>

                                            </div>

                                            <div class="col-md-6 d-inline-block">
                                                <div class="col-md-12 form-group">
                                                    <div class="form-bg text-center p-3">
                                                        <div class=" box" style="display:block">
                                                            <div class="js--image-preview img-thumbnail" style="text-align:center">
                                                                <img id="prvImg"  src="@/assets/img/placeholder.png"
                                                                style="max-width:95%; width:95%">

                                                                <!-- <img id="prvImg"  v-if="editImageFlag" :src="editImage"
                                                                style="max-width:95%; width:95%"> -->
                                                            </div>
                                                            <div class="upload-options mt-3">
                                                                <label class="upload-options">
                                                                    <i class="fas fa-plus-square"></i> Select Document Thumbnail
                                                                    <input type="file" class="image-upload" accept="image/*" @change="onFileUpload">
                                                                </label>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            </div>
                                        </div>

                                        <!-- Modal Footer -->
                                        <div class="modal-footer">
                                            <div class="form-group">
                                                <button class="btn btn-primary mr-2">
                                                <span v-show="isCreating"  class="spinner-border spinner-border-sm"></span>
                                                Submit 
                                                </button>

                                                <button class="btn btn-danger ml-2" type="reset">Reset</button>
                                            </div>
                                        </div>
                                        <!-- End -->

                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                    </div>
                </div>
            </div>
        <!-- End -->

        <!-- Modal For Edit Document -->
            <div class="modal fade" id="editDocumentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Document </h5>
                            <button @click="clearDocType" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="modal-body" id="ck-control">
                            <div class="row justify-content-center mt-2 mb-2 ml-0 mr-0">
                                <div class="col-md-12 form-bg">
                                    <Form @submit="updateDocument" :validation-schema="documentEditForm">

                                        <!-- Event Title -->
                                        <div class="row mb-3 mt-2">
                                            <div class="col-md-12">
                                                <div class="input-group border border-dark rounded">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text p4 input-group-text-label" >Event Title</span>
                                                    </div>
                                                    <label class="ml-3 mt-2 ">{{eventTitle.title}}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- Document Type -->
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text input-group-text-label p4" >Document Type* </span>
                                            </div>
                                            <Field name="documentType" @change="day" as="select" class="form-control" v-model="documentType">
                                                <option value="">-- Select Document Type --</option>
                                                <option value="Concept note">Concept note</option>
                                                <option value="Presentation">Presentation</option>
                                            </Field>                       
                                        </div>
                                        <ErrorMessage name="documentType" class="error-feedback" />
                                        <!-- End -->

                                        <!-- Presentation Day -->
                                        <div  v-if="showDay" class=" input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text p4 input-group-text-label">Presentation Day* </span>
                                            </div>
                                            <Field name="selectedPresentationDay" as="select" class="form-control" v-model="selectedPresentationDay">
                                                    <option value="">-- Select Presentation Day -- </option>
                                                    <option v-for="(ptnDay,index) in presentationDay" :key="index" :value="ptnDay.day">Date: {{$filters.myDateFormate(ptnDay.present_date)}} , {{ptnDay.day}}</option>
                                            </Field>                                          
                                        </div>
                                        <ErrorMessage v-if="presentationDayErrMsgFlag" name="selectedPresentationDay" class="error-feedback" />
                                        <!-- End -->

                                        <!-- Document Title -->
                                        <div class="row mt-1">
                                            <div class="col-md-12 form-group">
                                            <div class="mb-2">
                                                <div class="input-group mb-2">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text input-group-text-label p4" >Document Title*</span>
                                                    </div>
                                                    <Field name="documentTitle" type="text" v-model="documentTitle" class="form-control" autocomplete="off"/>
                                                </div>
                                                </div>
                                            <ErrorMessage name="documentTitle" class="error-feedback" />
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- Details -->
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                            <div class="mb-2">
                                                <div class="">
                                                    <span class="input-group-text p4 mb-2" >Details </span>
                                                </div>
                                                <ckeditor name="documentDetails" autocomplete="off" class="form-control" :editor="editor" v-model="documentDetails" :config="editorConfig" />
                                            </div>
                                            <ErrorMessage name="documentDetails" class="error-feedback" />
                                            </div>
                                        </div>
                                        <!-- End -->

                                        <!-- File,Presented By & Status-->Concept note
                                        <div class="row">
                                            <div class="col-md-12">
                                            
                                            <div class="col-md-6 mt-4 d-inline-block float-left">

                                                <div class="row"> 
                                                    <!-- Presented By -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Presented By</span>
                                                            </div>
                                                            <Field name="presentedBy"  type="text" id="presentedBy" class="form-control"   v-model="presentedBy" autocomplete="off"  style="height:44px" />
                                                            </div>
                                                        <ErrorMessage name="presentedBy"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->

                                                    <!-- File -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                
                                                                <span class="input-group-text input-group-text-label p4"> File </span>
                                                            </div>
                                                            <Field name="documentFile"  type="file" id="concept_note" class="form-control" accept=".pdf,.pptx,.docx" @change="pickFile"  v-model="documentFile" autocomplete="off"  style="height:44px" />
                                                            <a v-if="editDocumentFile" :href="editDocumentFile" target="_blank" class="fa fa-eye iconsubmit"></a>
                                                            </div>
                                                            <span class="badge badge-danger" >note </span><span> File type : pdf,docx,pptx.</span>
                                                        <ErrorMessage name="documentFile"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Session -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Session</span>
                                                            </div>
                                                            <Field name="documentSession"  type="text" id="documentSession" class="form-control"   v-model="documentSession" autocomplete="off"  style="height:44px" />
                                                            </div>
                                                        <ErrorMessage name="documentSession"  class="error-feedback" />
                                                    </div>
                                                    <!-- End -->

                                                    <!-- Status -->
                                                    <div class="col-md-12 form-group">
                                                        <div class="input-group mb-2">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-text-label p4" >Status* </span>
                                                            </div>
                                                            <Field name="documentStatus" as="select" class="form-control" v-model="documentStatus">
                                                                <option value="">-- Select Status  --</option>
                                                                <option value="1">Active</option>
                                                                <option value="0">In-active</option>
                                                            </Field>                                    
                                                        </div>
                                                        <ErrorMessage name="documentStatus" class="error-feedback" />
                                                    </div>
                                                    <!-- End -->
                                                </div>

                                            </div>

                                            <div class="col-md-6 d-inline-block">
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
                                                            aspectRatio: 1.8/1
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

        <!-- Modal For Print Guest -->
        <div class="modal fade" id="modalForPrintEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Document </h5>
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
                        <th scope="col" >Presenter Name</th>
                        <th scope="col" >Document Type</th>
                        <th scope="col" >Session</th> 
                        <th scope="col" >File Name</th> 
                        <th scope="col" >Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(document,index) in allDocument" :key="document.id">
                        <th scope="row">{{index+1}}</th>
                        <td >{{document.title}}</td>
                        <td >{{document.presented_by}}</td>
                        <td >{{document.document_type}}
                            <span v-if="document.present_date != null && document.day != 0" class="font-weight-bold" style="font-size: 15px;"> [ PD : {{$filters.myDateFormate(document.present_date)}},&nbsp;&nbsp;{{document.day}} ]</span>
                            <span style="font-size: 15px;" class="font-weight-bold text-primary" v-else> </span>
                        </td>
                        <td>{{document.session}}</td>
                        <td>{{document.file}}</td>
                        <td > {{document.status == 1 ? 'Active' : 'Inactive'}}</td>
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
    import moment from 'moment';
    import { Cropper } from 'vue-advanced-cropper'
    import 'vue-advanced-cropper/dist/style.css';
    import { Form, ErrorMessage,Field } from "vee-validate";
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
        
        presentedBy: yup 
            .string()
            .required("Presenter name is required"),
        documentType: yup 
            .string()
            .required("Document type is required"),
        documentFile: yup  
            .string()
            .required("Document file is required"),
        documentTitle: yup  
            .string()
            .required("Document title is required"),
        });

        const validationEdit = yup.object().shape({
        presentedBy: yup 
            .string()
            .required("Presenter name is required"),
        documentType: yup 
            .string()
            .required("Document type is required"),
        documentTitle: yup  
            .string()
            .required("Document title is required"),
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

            //Base Url
            base_url:this.backendUrl,
            backend_url: process.env.VUE_APP_API_URL, 

            //Object
            documents: {},
            eventTitle:{},
            presentationDay:[],

            //Validate Document Form
            newDocumentAddForm:validationCreate,
            documentEditForm:validationEdit,
            documentSession:'',

            //Properties
            documentType:'',
            selectedPresentationDay:'',
            documentDetails:'',
            documentStatus:0,
            documentTitle:'',
            documentFile:'',
            thumbnail:'',
            cropData:'',
            img:'',
            editImageFlag:false,
            editImage:'',
            dateFlag:false,
            updateId:'',
            showDay:false,
            presentationDayErrMsgFlag:false,
            editDocumentFile:'',
            result1:'',
            presentDateValue:'',
            fileExtension:'',
            allDocument:'',
           // documentTitleErrMsg:false,
            presentedBy:''
            



        }
    },

    methods: {

        printDocumentDetail() {
            $(document).ready(function () {
                $('#modalForPrintEvent').modal('show');
            });
            $('#datatablePrint').DataTable().destroy();
            this.axios
                .get(this.backend_url + "documents")
                .then((res) => {
                this.allDocument = res.data.data;
                $(document).ready(function() {
                    $('#datatablePrint').DataTable( {
                        dom: '<"top"Bfi>rt<"top"lp><"clear">', 
                        buttons: [
                          {
                                extend: 'csv',
                                messageTop: 'Document Informations',
                                title: 'Asf 2022 Event Information Table'
                           },
                           {
                                extend: 'print',
                                messageTop: 'Document Informations',
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
        clearDocType() {
            if(this.documentType == 'Presentation' || this.documentType == 'Concept note'){ 
            this.documentType ='';
            }
        },

        //Update Specific Document
        updateDocument(){
            if(this.selectedPresentationDay && this.documentType != 'Concept note'){
                let text = this.selectedPresentationDay; 
                let result = text.slice(4);
                this.result1 = result - 1;
                this.presentDateValue = this.presentationDay[this.result1].present_date;
            }

            if(this.documentType == 'Concept note') {
                this.presentDateValue = '';
                this.selectedPresentationDay = 0;
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();

            data.append('id', this.updateId);
            data.append('title', this.documentTitle);
            data.append('details', this.documentDetails);
            data.append('thumbnail', this.thumbnail ? this.thumbnail : '');
            data.append('document_type', this.documentType);
            data.append('present_date', this.presentDateValue ? this.presentDateValue : '');
            data.append('day', this.selectedPresentationDay ? this.selectedPresentationDay : 0);
            data.append('status', this.documentStatus);
            data.append('session', this.documentSession);
            data.append('file_extension', this.fileExtension);
            data.append('presented_by', this.presentedBy);
            data.append('file', this.documentFile);

            if((this.fileExtension == 'pdf' && this.documentType == 'Concept note') || this.documentType == 'Presentation'){

            this.axios
                .post(this.backend_url +"updateDocument",data,config).then((res)=>{
                    console.log(res);
                    createToast("Document Update Successfully", {
                            position: 'top-center',
                            transition: 'bounce',
                            timeout: 1500,
                            type: 'success',
                    });
                    this.getDocument();
                    $(document).ready(function () {
                    $('#editDocumentModal').modal('hide');
                    });
                    setTimeout(function(){ location.reload(); }, 1000);
                }).catch((err) =>{
                    console.log(err);
                })
            }else{
                alert("Concept note must be a pdf !");
            }

        },
        
        //Create New Document
        createNewDocument(){



            if(this.selectedPresentationDay){
                let text = this.selectedPresentationDay; 
                let result = text.slice(4);
                this.result1 = result - 1;
                this.presentDateValue = this.presentationDay[this.result1].present_date;
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let data = new FormData();

            data.append('title', this.documentTitle);
            data.append('details', this.documentDetails);
            data.append('thumbnail', this.thumbnail ? this.thumbnail : '');
            data.append('document_type', this.documentType);
            data.append('present_date', this.presentDateValue ? this.presentDateValue : '');
            data.append('day', this.selectedPresentationDay ? this.selectedPresentationDay : 0);
            data.append('status', this.documentStatus);
            data.append('session', this.documentSession);
            data.append('file_extension', this.fileExtension);
            data.append('presented_by', this.presentedBy);
            data.append('file', this.documentFile);


            if((this.fileExtension == 'pdf' && this.documentType == 'Concept note') || this.documentType == 'Presentation'){
                this.axios
                .post(this.backend_url +"addDocument",data,config).then((res)=>{
                    console.log(res);
                    this.getDocument();
                    $(document).ready(function () {
                    $('#addNewDocumentModal').modal('hide');
                    });
                    setTimeout(function(){ location.reload(); }, 1000);

                }).catch((err) =>{
                    console.log(err);
                })

            }else{
                alert("Concept note must be a pdf !");
            }
            
          
        },


        day(){
            this.presentationDay=[];
            if(this.documentType == 'Presentation' || (this.dateFlag && !(this.documentType == 'Concept note'))){
                this.showDay = true;
                this.presentationDayErrMsgFlag = true;

                var startDate = moment(this.eventTitle.from_date, "YYYY-MM-DD");
                var endDate = moment(this.eventTitle.to_date, "YYYY-MM-DD");

                var result = endDate.diff(startDate, 'days');

            
            for (let i = 0; i <= result; i++) {
                var startdate = moment(this.eventTitle.from_date).format('YYYY.MM.DD');
                var new_date = moment(startdate, "YYYY-MM-DD").add(i,'days');

                var day = new_date.format('DD');
                var month = new_date.format('MM');
                var year = new_date.format('YYYY');

                var incrementDate = (year +'-'+ month+'-'+day);

                
                var obj = {present_date:'',day:''};
                obj.present_date = incrementDate;
                obj.day = "Day "+(i+1);
                this.presentationDay.push(obj);
            }

            } else{
                this.showDay = false;
                this.presentationDayErrMsgFlag = false;
            }
        },
        
        //Entry New Document Modal
        addDocument() {
            this.$refs.form.resetForm();
            this.presentationDayErrMsgFlag = false;
            this.documentTitle = "";
            this.documentDetails ="";
            this.documentType = "";
            this.documentStatus = 0;
            this.selectedPresentationDay = "";
            this.dateFlag = false;
            this.editImageFlag = false;
            this.showDay = false;
            $(document).ready(function () {
            $('#addNewDocumentModal').modal('show');
            });
        },

        //Get All Document
        getDocument(){
            $('#datatable').DataTable().destroy();
            this.axios
                .get(this.base_url + "/api/document")
                .then((res) => { 
                    this.eventTitle = res.data.activeEvent;
                    this.documents = res.data.list;
                    $(document).ready(function () {
                        $('#datatable').DataTable();
                    });
            })
        },


        pickFile(ev){
            const file = ev.target.files[0];
            //Finding File Extension
            this.fileExtension = ev.target.files;  
            this.fileExtension = this.fileExtension[0].name;
            this.fileExtension = this.fileExtension.split(".").pop();

            this.documentFile = file; 
        },


        onFileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        this.img = '';
        if (file["size"] < 100111775) {
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

        //Croping image params
        changes({ coordinates, canvas }) {
        console.log(coordinates, canvas);
        this.cropData = canvas.toDataURL();
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

        //Edit Document
        onEdit(document) {
            console.log(document);
            
            this.editImageFlag = true;
            this.dateFlag = true;

            if(document.document_type == 'Presentation' || this.documentType == 'Concept note'){ 
                this.day();
            }
            
            if(document.day == 0){ this.showDay = false; this.presentationDayErrMsgFlag = false; }

            if(document.day != 0 &&   document.document_type =='Presentation'){
                this.selectedPresentationDay ='';
                let text = document.day; 
                let result = text.slice(4);
                this.result1  = result - 1;
                this.selectedPresentationDay =  this.presentationDay[this.result1].day;

                if( this.documentType == 'Presentation' && this.documentType == 'Concept note' ){
                    this.selectedPresentationDay ='';
                    let text = document.day; 
                    let result = text.slice(4);
                    this.result1  = result - 1;
                    this.selectedPresentationDay =  this.presentationDay[this.result1].day;
            }
            }

            if(this.documentType == 'Presentation' && !(document.document_type =='Presentation')){ this.selectedPresentationDay = ''}

            this.updateId = document.id;
            this.documentSession = document.session;
            this.documentStatus = document.status;
            this.documentDetails = document.details;
            this.documentTitle = document.title;
            this.documentType = document.document_type;   
            this.presentedBy = document.presented_by;   
                             
            this.editImage = this.base_url + '/public/uploads/document/thumbnail/'+document.thumbnail;     
            this.editDocumentFile = this.base_url + '/public/uploads/document/file/'+document.file; 
            $(document).ready(function () {
                $('#editDocumentModal').modal('show');
            });
        },

        //Delete Document
        onDelete(documentId) {
            this.$swal.fire({                                                
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.axios
                        .delete(this.backend_url + "deleteDocument/" + documentId)                        
                        .then((response) => {
                            this.getDocument();                           
                            this.$swal.fire(
                                'Deleted!',
                                response.data.message,
                                'success'
                            )
                        })
                        .catch((e) => {
                            alert(e);
                        });
                }
            })
        }
        },

    created() {
        this.getDocument();
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
