<template>

  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title"><strong> Total Number of Registers</strong></h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <div class="input-group">
              <div class="input-group-prepend">
                  <span class="input-group-text p4 input-group-text-label" >International*</span>
              </div>
              <input type="number" @keyup="checkInput('international', international)" v-model="international" class="form-control" autocomplete="off" min="0"/>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
              <div class="input-group-prepend">
                  <span class="input-group-text p4 input-group-text-label" >National*</span>
              </div>
              <input type="number" @keyup="checkInput('national', national)" v-model="national" class="form-control" autocomplete="off" min="0"/>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
              <div class="input-group-prepend">
                  <span class="input-group-text p4 input-group-text-label" >Virtual*</span>
              </div>
              <input type="number" @keyup="checkInput('virtual', virtual)" v-model="virtual" class="form-control" autocomplete="off" min="0"/>
          </div>
        </div>
        <div class="col-md-12 mt-5">
          <div class="jumbotron p-3 text-center">
            <button class="btn btn-sm btn-info" @click="saveInfo" style="width:300px;">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
import '@/assets/css/custom.css';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
export default {
  components: {

  },

  data() {
    return {
      backend_url: process.env.VUE_APP_API_URL, 
      international:0,
      national:0,
      virtual:0,
    }
  },
  
  methods: {
    getRegInfo() {
      this.axios
      .get(this.backend_url+'getRegInfo')
      .then(res => {
        console.log(res.data.data);
        this.international = res.data.data.international;
        this.national = res.data.data.national;
        this.virtual = res.data.data.virtual;
      })
      .catch(err => {
        console.log(err);
      })     
    },

    checkInput(type, value){
      var newValue = value;
      if(newValue < 0){
        newValue = 0;
      }
        if(type == 'international'){
          this.international = newValue;
        }else if(type == 'national'){
          this.national = newValue;
        }else{
          this.virtual = newValue;
        }
      },

    saveInfo(){
      this.axios
      .post(this.backend_url+'saveRegInfo',{
        international:this.international,
        national:this.national,
        virtual:this.virtual,
      })
      .then(res => {
        console.log(res);
        createToast('Saved Successfully !', {
          position: 'top-center',
          transition: 'bounce',
          timeout: 1500,
          type: 'success',
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

  },

  created() {
   this.getRegInfo();
  },

  watch: {   

  }

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