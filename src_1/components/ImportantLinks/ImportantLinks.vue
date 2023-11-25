<template>
    <div>
        <h4 class="text-bold heading-style">Important Links</h4>
        <div class="card card-default">
            <!-- Heading -->
            <div class="card-header">
                <div class=""><button class="btn btn-sm add-button float-left" @click="addLink">Add New Link</button></div>

                <button  style="padding:5px 6px"  @click="print" class="float-right bg-success print-button">Print</button>
            </div>

            <div class="card-body">

            <div class="row">
                <div class="col-md-12" id="">
                        <!-- Event Title -->
                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <div class="input-group border border-dark rounded">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text p4 input-group-text-label" >Event Title </span>
                                        </div>
                                        <label class="ml-3 mt-2 ">{{eventTitle}}</label>
                                    </div>                            
                                </div>
                            </div>
                         <!-- End -->

                    <!-- Draggable Comp -->
                    <draggable class="dragArea list-group w-full" :list="importantLinks" @change="log">
                    <div v-for="(link,index) in importantLinks" :key="index" class="bg-light w-100 d-block overflow-hidden mb-3 p-1 link-item" style="box-shadow: 0px 0px 5px 0px #ccc; border-radius:3px;">
                        <div class="float-left text-center" style="width:30px; line-height: 35px; border:1px solid #ccc; border-right: none;">{{index+1}}</div>
                        <div class="inputFields float-left" style="width:calc( 100% - 70px )">
                            <div class="row">
                                <div class="col-md-6 form-group m-0">
                                    <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p5" >Title</span>
                                    </div>
                                    <input type="text" v-model="link.title" class="form-control" autocomplete="off"/>
                                    </div>
                                </div>
                                <div class="col-md-6 form-group m-0">
                                    <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text p5" >Url</span>
                                    </div>
                                    <input type="text" v-model="link.link" class="form-control" autocomplete="off"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-danger float-right ml-1" style="width:30px; line-height: 28px;" @click="removeLink(index)">X</button>
                    </div> 
                    </draggable>
                    <!-- End -->

                    <div class="jumbotron p-2"><button :disabled="importantLinks.length < 1" class="btn btn-md btn-success btn-block" @click="saveLinks">Save Links</button></div> 
                </div>
            </div> 
            <loader v-if="spinnerOn"></loader>
            </div>
        </div>

        <div class="d-none" id="printMe">

            <table class="table table-bordered" style="width:100%">
                <thead style="text-align:left">
                    <th>#</th>
                    <th>title</th>
                    <th>Url</th>
                </thead>
                
                <tbody>
                    <tr v-for="(link,index) in importantLinks" :key="index" style="border:1px solid #cccccc">
                        <td>{{++index}}</td>
                        <td>{{link.title}}</td>
                        <td>{{link.link}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import Loader from '../Loader.vue';
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
// import $ from 'jquery';

export default defineComponent({
    name: 'Important Links',
    components: {
        Loader,
        draggable: VueDraggableNext,
    },
    data() {
        return {
            spinnerOn:false,
            base_url: this.backendUrl,
            importantLinks:[],
            dragging: false,
            eventTitle:''
        }
    },
    methods: {

        //Get All Important Link
        getImportantLinks(){
            this.axios
            .get(this.base_url + "/api/getImpLinks")
            .then((res) => {
                this.eventTitle = res.data.activeEvent.title;
                this.importantLinks = res.data.data;
            })
            .catch((err) => { 
                console.log(err);
            })
        },

        //Add New Link Row
        addLink() { 
            this.importantLinks.push({'title':'','link':''});
        },

        //Remove Link Row
        removeLink(index){
            // if(this.importantLinks.length > 1){
            //     this.importantLinks.splice(index, 1);
            // } 
            this.importantLinks.splice(index, 1);
        },

        //Save Link
        saveLinks(){
            this.spinnerOn = true;
            this.axios
            .post(this.base_url + '/api/saveImpLinks',{links: JSON.stringify(this.importantLinks)})
            .then((res) => { 
                console.log(res);
                this.spinnerOn = false;
                createToast('Link Added Successfully', {
                        position: 'top-center',
                        transition: 'bounce',
                        timeout: 1500,
                        type: 'success',
                })
            })
            .catch((err) => { 
                console.log(err);
                this.spinnerOn = false;
            })
        },
        print() {
            this.$htmlToPaper('printMe')
        }
    },

    created() {
        this.getImportantLinks();
        
    },
})
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
.link-item{
    cursor: move;
}
</style>