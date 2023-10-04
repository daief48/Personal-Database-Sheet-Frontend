<template>
    <div>
    <h3 class=""><strong> Profile</strong></h3>
    <div class="card card-default">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <DataTable
              :columns="columns"
              :data="transferList"
              class="table table-hover table-striped"
              width="100%"
            >
            <thead>
        <tr>
          <th>id</th>
          <th>Employee</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Transfer Type</th>
          <th>Transfer Order</th>
          <th>To</th>
          <th>From</th>
          <th>Transfer Date</th>
          <th>Join Date</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>id</th>
          <th>Employee</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Transfer Type</th>
          <th>Transfer Order</th>
          <th>To</th>
          <th>From</th>
          <th>Transfer Date</th>
          <th>Join Date</th>
        </tr>
      </tfoot>
          </DataTable>
          </div>
        </div>
      </div>
    </div>
   
  <!-- Modal Start -->

  <!-- Modal End -->
  
  
  
                
  </div>
  </template>
  
  <script>
  
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);
  export default {
    components: {
      DataTable
    },
  
    data() {
      const storageData = JSON.parse(localStorage.getItem('user'));
      const columns = [
        { data: 'employee_name' },
        { data: 'dept_name' },
        { data: 'designation' },
        { data: 't_type' },
        { data: 'transfer_order' },
        { data: 'to_office' },
        { data: 'from_office' },
        { data: 'transfer_date' },
        { data: 'join_date' },
      ];
      return {
        backend_url: process.env.VUE_APP_API_URL, 
        storageData,
        url: this.backendUrl + "/api/users",
        basicInfo:{
          name:'',
          mobileNumber:'',
          email:'',
          designation:'',
          designation_id:'',
          image:'',
        },               
        columns,
        transferList:[],

      };
    },
    
    computed: { },
  
    methods: {

      getTransferList(){
        this.axios
        .get(this.backend_url+'getTransferList?user_id='+this.storageData.id)
        .then((res) => {
            console.log(res.data.data);
            this.transferList = res.data.data;
        })
        .catch((e)=>{
          console.log(e)
        })
      },
  
      getDepartmentList(){
        this.axios
        .get(this.backend_url+'getDepartment')
        .then((res) => {
          this.departments = res.data.data;
          
        })
      },

      getDesignationList(){
        this.axios
        .get(this.backend_url+'getDesignationMgt')
        .then((res) => {
          this.designations = res.data.data;
          console.log(this.designations);
        })
      },    
  
      saveTranfer(){
        let formData = new FormData;
        formData.append('user_id', this.storageData.id);
  
        this.axios
        .post(this.backend_url+'saveTranfer',formData)
        .then((res) => {
            console.log(res.data);
            this.getProfileInfo();
        })
      },
  
    },
  
    created() {
      this.getTransferList();
      // this.getDepartmentList();
      // this.getDesignationList();
    },
  
    watch: {
      
      },
  
  }
  
  
  </script>
  
  <style>
  @import 'datatables.net-dt';

  .ui.inverted.dimmer {
    color: #009688 !important;
  
  }
  
  .cropper {
      height: 400px;
      width: 400px;
      background: #DDD;
  }
  
  
  .file-btn {
    position: relative;
    display: block;
    cursor: pointer;
  }
  .file-btn input {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
  }    
      
  
  </style>
  
  <style scoped>
    ::v-deep .modal-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ::v-deep .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 0 1rem;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
      background: #fff;
    }
    .modal__title {
      margin: 0 2rem 0 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .modal__close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
    </style>
    
    <style scoped>
    .dark-mode div::v-deep .modal-content {
      border-color: #2d3748;
      background-color: #1a202c;
    }

    </style>