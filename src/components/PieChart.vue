<template>
    <div>
      <div id="chart"></div>
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts'
//   import HighchartsVue from 'highcharts-vue'
  
  export default {
    name: 'PieChart',
    // components: {
    //   HighchartsVue
    // },
    props: {
      principal: Number,
      interest: Number,
    },
    data() {
      return {
        chartOptions: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Loan Proportions'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          series: [{
            name: 'Loan Proportions',
            colorByPoint: true,
            data: [{
              name: 'Principal',
              y: this.principal
            }, {
              name: 'Interest',
              y: this.interest
            }]
          }]
        }
      }
    },
    watch: {
      principal() {
        this.updateChart()
      },
      interest() {
        this.updateChart()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.updateChart()
      })
    },
    methods: {
      updateChart() {
        const chart = Highcharts.chart('chart', this.chartOptions)
        chart.series[0].setData([{
          name: 'Principal',
          y: this.principal
        }, {
          name: 'Interest',
          y: this.interest
        }], true, true)
      }
    }
  }
  </script>
  