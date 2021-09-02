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
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
    },
  },
  data() {
    return {
      chart: null,
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
    setOptions({ axisData, seriesData } = {}) {
      let spirit =
        'path://M1009.026 521.3a101.905 101.905 0 0 0-88.712-36.964h-60.165a490.19 490.19 0 0 0-1.592-59.255H24.95s-17.174 149.9 54.194 267.671a507.932 507.932 0 0 0 110.32 130.85 225.192 225.192 0 0 0 142.167 60.847h218.823a225.93 225.93 0 0 0 141.2-59.084c14.614-13.989 28.262-25.59 41.626-39.295 219.448-11.373 275.12-155.018 281.773-174.125a99.516 99.516 0 0 0-6.027-90.588v-0.057z m-63.577 65.851l-1.251 3.583c-25.59 59.937-81.376 103.667-148.536 116.292 3.014-4.493 5.687-9.27 9.042-14.217a395.791 395.791 0 0 0 48.621-138.64h67.103a39.807 39.807 0 0 1 27.125 5.97 37.532 37.532 0 0 1-1.934 27.126l-0.17-0.114z m0 0l-65.624 348.535H5.672c-52.601 53.227 290.588 87.29 290.588 87.29h292.863s332.954-32.698 290.645-87.29l65.68-348.535z m-425.93-225.988a12.852 12.852 0 0 1-12.966 5.403c-105.317-61.985-79.84-148.422-11.146-211.658 52.488-47.938 91.612-72.106 91.896-148.137-0.284-6.824 15.582-7.734 18.027-4.777 129.428 172.022-160.591 180.95-85.869 359.226h0.114z m-189.935 0.057c1.308 2.844-9.155 6.597-12.681 5.403-105.317-61.985-80.182-148.422-11.146-211.658 52.147-47.995 91.27-72.106 91.555-148.137 0-6.88 15.923-7.734 18.482-4.777 129.428 171.965-160.933 180.95-86.153 359.226z'
      let option = {
        tooltip: {},
        xAxis: {
          show: false, 
          splitLine: { show: false },
          axisLine: {
            show: false,
          },
          axisLabel: { fontSize: 14, color: '#000' }
        },
        yAxis: {
          data: axisData,
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            fontSize: 14,
            color: '#000',
          },
        },
        grid: {
          top: 0,
          left: 80,
          right: 60,
          bottom: 0,
        },
        series: [
          {
            // current data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: 'rgba(90,47,2)',
              },
            },
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '10%',
            symbolClip: true,
            symbolSize: 30,
            data: seriesData,
            z: 10,
          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: 'rgba(90,47,2,.2)',
              },
            },
            label: {
              show: true,
              position: 'right',
              offset: [5, 5],
              fontSize: 16,
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '10%',
            symbol: spirit,
            symbolSize: 30,
            data: seriesData,
            z: 5,
          },
        ],
      }
      this.chart.setOption(option)
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
  },
}
</script>
