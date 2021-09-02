import {
  axios
} from '@/utils/request';

var indexMixin = {
  data() {
    return {
      Urls: {
        chartUrl: '/api/order/count'
      },
      storeData: {
        xAxisData: [],
        seriesData: []
      },
      goodData: {
        axisData: [],
        seriesData: []
      },
      payWayData: {
        xAxisData: [],
        seriesData: []
      },
      storeShow: false,
      searchParams: {
        start: null,
        end: null
      },
      loading: false
    }
  },
  created() {
    this.getChartData()
  },
  mounted() {},

  methods: {
    // 查询条件 时间
    handleStartTime(date) {
      this.searchParams.start = `${date} 00:00:00`
    },
    handleEndTime(date) {
      this.searchParams.end = `${date} 23:59:59`
    },
    handleSearch() {
      this.getChartData();
    },
    getChartData() {
      this.loading = true
      axios({
        url: this.Urls.chartUrl,
        method: 'get',
        params: this.searchParams
      }).then(res => {
        this.loading = false
        if (res.code == 0) {
          let store = res.data.store;
          this.storeData.seriesData = store.map((item, index) => {
            this.storeData.xAxisData[index] = item.type
            return item.count || 0
          })

          let good = res.data.product.slice(0, 5);
          this.goodData.seriesData = good.map((item, index) => {
            this.goodData.axisData[index] = item.type
            return {
              value: item.count || 0,
              name: item.type
            }
          })

          let way = res.data.pay;
          this.payWayData.seriesData = way.map((item, index) => {
            this.payWayData.xAxisData[index] = item.type
            return item.count || 0
          })

          this.storeShow = false
          this.$nextTick(function () {
            this.storeShow = true
          })
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
};
export default indexMixin;