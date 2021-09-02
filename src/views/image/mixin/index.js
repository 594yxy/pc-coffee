import {
  axios
} from '@/utils/request';
import Item from '@/components/AvatarList/Item';

var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/marketing/image/list',
        delUrl: '/api/marketing/image/delete/',
        addUrl: '/api/marketing/image/insert',
        editUrl: '/api/marketing/image/update/',
      },
      imgLoading: true
    }
  },
  filters: {},
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    // 限制上传格式
    beforeUpload(file, fileList) {
      this.$refs.imgModal.edit(1)
      // image/jpeg
      // image/png
      // application/vnd.openxmlformats-officedocument.wordprocessingml.document
      // application/pdf
      // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

      /* const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLSX) {
        this.$message.error('导入文件格式有误,只支持.xlsx格式')
        return false
      } */

      // this.handleUploadImg(file)
      return false
    },
    handleErrorImg(e) {
      e.target.src = require('@/assets/default.jpg');
    },
    handleLoadImg() {
      this.imgLoading = false
    },
    // 新增营销图
    handleInsertImg(url) {
      axios({
        url: this.Urls.addUrl,
        method: 'post',
        data: {
          isEnable: 1,
          imageSrc: url
        }
      }).then(res => {
        this.uploading = false;
        if (res.code == 0) {
          this.$message.success("上传成功")
          this.afterSubmit()
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {})
    },
    afterSubmit() {
      this.getData(1)
    },
    // 可用设置
    switchChange(checked, item) {
      axios({
        url: this.Urls.editUrl + item.id,
        method: 'post',
        data: {
          isEnable: checked ? 1 : 0
        }
      }).then(res => {
        this.uploading = false;
        if (res.code == 0) {
          this.$notification.success({
            message: '设置成功'
          })
          this.afterSubmit()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {})
    }
  }
};
export default indexMixin;