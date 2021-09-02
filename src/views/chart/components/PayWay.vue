<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
var echarts = require('echarts')
import resize from '.././mixin/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions({ xAxisData, seriesData } = {}) {
      let colorList = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']
      let option = {
        grid: {
          //图表的位置
          top: '32px',
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, fontSize: 14, color: '#000' },
          data: xAxisData,
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: {
          name: '数量',
          type: 'value',
          axisLabel: { fontSize: 14},
          splitLine: { show: false }
        },
        series: [
          {
            name: '销售量',
            data: seriesData,
            type: 'bar',
            barMaxWidth: 50,
            itemStyle: {
              normal: {
                color: function(params) {
                  let index = params.dataIndex
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length
                  }
                  return colorList[index]
                },
                barBorderRadius: [100, 100, 0, 0]
              }
            },
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#000'
            }
          }
        ]
      }
      this.chart.setOption(option)
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    }
  }
}
</script>
