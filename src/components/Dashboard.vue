<template>
<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header bg-light">
          <div class="card-title"></div>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="card-counter primary">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span class="count-numbers">{{totalIntRegisters}}</span>
                <span class="count-name">INTERNATIONAL</span>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card-counter danger">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span class="count-numbers">{{totalNationalRegisters}}</span>
                <span class="count-name">NATIONAL</span>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card-counter success">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span class="count-numbers">{{totalVirtualRegisters}}</span>
                <span class="count-name">VIRTUAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>


  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Registration Type Wise Report (Bar Chart)</div>
        </div>
        <div class="card-body">
          <center>
            <apexchart v-if="chartOneBarStatus"
              width="500"
              type="bar"
              :options="chartOne.chartOptions"
              :series="chartOne.series"
            ></apexchart>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Registration Type Wise Report (Pie Chart)</div>
        </div>
        <div class="card-body">
          <center>
            <apexchart v-if="chartOnePieStatus"
            width="435"
            type="pie"
            :options="chartOnePie.chartOptions"
            :series="chartOnePie.series"
            ></apexchart>
          </center>
        </div>
      </div>
    </div>
  </div>


  <div class="row mt-5">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Country Wise Registration Report (Pie Chart)</div>
        </div>
        <div class="card-body">
          <center>
            <apexchart  v-if="chartTwoBarStatus"
            width="435"
            type="pie"
            :options="chartTwoPie.chartOptions"
            :series="chartTwoPie.series"
            ></apexchart>
          </center>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Country Wise Registration Report (Bar Chart)</div>
        </div>
        <div class="card-body">
          <center>
            <div style="position:relative; top:40px">
              <apexchart v-if="chartTwoPieStatus"
              width="500"
              type="bar"
              :options="chartTwo.chartOptions"
              :series="chartTwo.series"
              ></apexchart>
            </div>
          </center>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import $ from 'jquery';
export default {
  data: function() {
    return {
      totalIntRegisters:0,
      totalNationalRegisters:0,
      totalVirtualRegisters:0,
      chartOne:{
        chartOptions: {
          chart: {
            id: "registersByType",
          },
          xaxis: {
            categories: [],
          },
          // colors:['#aaaaaa', '#cccccc', '#aaaaaa'],
        },
        series: [
          {
            name: "Total Registers",
            data: [50, 150, 100],
          },
        ],
      },

      chartOneBarStatus:false,

      chartOnePie:{
        series: [],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [],
            legend: {
              show: true,
              showForSingleSeries: false,
              showForNullSeries: true,
              showForZeroSeries: true,
              position: 'bottom',
              horizontalAlign: 'center',
              floating: false,
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial',
              fontWeight: 400,
              formatter: undefined,
              inverseOrder: false,
              width: undefined,
              height: undefined,
              tooltipHoverFormatter: undefined,
              customLegendItems: [],
              offsetX: 0,
              offsetY: 0,
              labels: {
                colors: undefined, useSeriesColors: false
              },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
      },
      chartOnePieStatus:false,
      

      chartTwo:{
        chartOptions: {
          
          chart: {
            id: "registersByCountry",
          },
          xaxis: {
            categories: ['Bangladesh', 'India', 'Nepan', 'Vutan', 'Thailand', 'Loas', 'Cambodia', 'Vaitnam', 'Japan'],
          },
        },
        series: [
          {
            name: "Total Registers",
            data: [50, 20, 15, 5, 12, 7, 3, 6, 18],
          },
        ],
      },
      chartTwoBarStatus:false,

      chartTwoPie:{
        series: [50, 20, 15, 5, 12, 7, 3, 6, 18],
          chartOptions: {
            colors: ["#0072eb",
                      "#a5a500",
                      "#ff7a36",
                      "#00f7ff",
                      "#b90038",
                      "#007c3f",
                      "#007536",
                      "#f160c9",
                      "#002700",
                      "#6974e0",
                      "#872800",
                      "#00a7e8",
                      "#ff966c",
                      "#002071",
                      "#737935",
                      "#0381c7",
                      "#604800",
                      "#003166",
                      "#ffdcf3",
                      "#001b2c",
                      "#c16652",
                      "#003f61",
                      "#de89a1",
                      "#250f2c",
                      "#795859",
                      "#004665"
                    ],
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [],
            legend: {
              show: true,
              showForSingleSeries: false,
              showForNullSeries: true,
              showForZeroSeries: true,
              position: 'bottom',
              horizontalAlign: 'center',
              floating: false,
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial',
              fontWeight: 400,
              formatter: undefined,
              inverseOrder: false,
              width: undefined,
              height: undefined,
              tooltipHoverFormatter: undefined,
              customLegendItems: [],
              offsetX: 0,
              offsetY: 0,
              labels: {
                //colors: undefined, 
                //useSeriesColors: false
              },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
      },
      chartTwoPieStatus: false,
      
    };
  },

  methods:{
    getRegReport(){
      this.chartOneBarStatus = false;
      this.chartOnePieStatus = false;

      this.chartTwoBarStatus = false;
      this.chartTwoPieStatus = false;



      this.axios
      .get(this.backendUrl + "/api/regReport")
      .then((res) => { 
          var reportByRegType = res.data.reports.reportByRegType;
          

          var chartOnecatagoryArr =[];
          for(var i=0; i<reportByRegType.length; i++ ){
            chartOnecatagoryArr.push(reportByRegType[i].registration_type);
          }
          this.chartOne.chartOptions.xaxis.categories = chartOnecatagoryArr;
          this.chartOnePie.chartOptions.labels = chartOnecatagoryArr;

          
          var chartOneseriesArr =[];
          for(var j=0; j<reportByRegType.length; j++ ){
            chartOneseriesArr.push(reportByRegType[j].total_reg);
            if(j == 0){
              this.totalIntRegisters=reportByRegType[j].total_reg;
            }
            if(j == 1){
              this.totalNationalRegisters=reportByRegType[j].total_reg;
            }
            if(j == 2){
              this.totalVirtualRegisters=reportByRegType[j].total_reg;
            }
          }
          this.chartOne.series[0].data = chartOneseriesArr;
          this.chartOnePie.series = chartOneseriesArr;

          this.chartOneBarStatus = true;
          this.chartOnePieStatus = true;


          var reportByCountry = res.data.reports.reportByRegCountry;

          var chartTwoCatagoryArr =[];
          for(var k=0; k<reportByCountry.length; k++ ){
            chartTwoCatagoryArr.push(reportByCountry[k].country);
          }
          this.chartTwo.chartOptions.xaxis.categories = chartTwoCatagoryArr;
          this.chartTwoPie.chartOptions.labels = chartTwoCatagoryArr;

          
          var chartTwoSeriesArr =[];
          for(var l=0; l<reportByCountry.length; l++ ){
            chartTwoSeriesArr.push(reportByCountry[l].total_reg);
          }
          this.chartTwo.series[0].data = chartTwoSeriesArr;
          this.chartTwoPie.series = chartTwoSeriesArr;

          this.chartTwoBarStatus = true;
          this.chartTwoPieStatus = true;



      })
    }
  },


  created(){
    this.getRegReport();
  }


};
</script>
<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
  .apexcharts-legend{
    text-align: left;
    display:block;
  }




  .card-counter{
    box-shadow: 2px 2px 10px #DADADA;
    margin: 5px;
    padding: 20px 10px;
    background-color: #fff;
    height: 100px;
    border-radius: 5px;
    transition: .3s linear all;
  }

  .card-counter:hover{
    box-shadow: 4px 4px 20px #DADADA;
    transition: .3s linear all;
  }

  .card-counter.primary{
    background-color: #007bff;
    color: #FFF;
  }

  .card-counter.danger{
    background-color: #ef5350;
    color: #FFF;
  }  

  .card-counter.success{
    background-color: #66bb6a;
    color: #FFF;
  }  

  .card-counter.info{
    background-color: #26c6da;
    color: #FFF;
  }  

  .card-counter i{
    font-size: 5em;
    opacity: 0.2;
  }

  .card-counter .count-numbers{
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 32px;
    display: block;
  }

  .card-counter .count-name{
    position: absolute;
    right: 35px;
    top: 65px;
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
    display: block;
    font-size: 18px;
  }
</style>
