<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-6">
        <div class="col-sm-6">
          <h1 class="m-0" style="font-family: 'Russo One', sans-serif;color: #0a466e;"> Dashboard </h1>
        </div>
        <!-- <div class="col-sm-6 d-none">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>


    .customize-font-for-card-header {
      font-family: 'Russo One', sans-serif;
    }
    .div-height {
      height: 25px;
    }
    .button {
      border-radius: 4px;
      background-color: #0a466e;
      border: none;
      color: #FFFFFF;
      text-align: center;
      font-size: 28px;
      /* padding: 10px; */
      width: 100%;
      transition: all 0.5s;
      cursor: pointer; 
      margin-bottom: 6px;
      
    }
  
    .button span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
      font-size: 17px;
          
    }
  
    .button span:after {
      content: '\00bb';
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
          font-size: 17px;
    }
  
    .button:hover span {
      padding-right: 25px;
          font-size: 17px;
    }
  
    .button:hover span:after {
      opacity: 1;
      right: 0;
          font-size: 17px;
    }

    .hover-text-color {
      color: white;
    }
</style>