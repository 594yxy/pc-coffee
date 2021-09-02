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
      let option = {
        grid: {
          //图表的位置
          top: '20px',
          left: '2%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        /* xAxis: {
          type: 'category',
          axisLabel: { interval: 0 },
          data: xAxisData,
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          name: '数量',
          type: 'value',
        }, */
        yAxis: {
          type: 'category',
          inverse: true,
          axisLabel: { interval: 0, fontSize: 14, color: '#000' },
          data: xAxisData,
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false }
        },
        xAxis: {
          name: '数量',
          type: 'value',
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { fontSize: 14 }
        },
        series: [
          {
            name: '销售量',
            data: seriesData,
            type: 'bar',
            barMaxWidth: 100,
            barMinWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 200, 200, 0]
              }
            },
            label: {
              show: true,
              position: 'inside',
              color: '#fff'
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
