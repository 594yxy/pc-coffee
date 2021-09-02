<template>
  <a-modal
    title="上传图片"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="1300"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row :gutter="24">
      <a-col :xs="24" :md="12" :style="{height: '342px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :canMove="options.canMove"
          :canMoveBox="options.canMoveBox"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        ></vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '342px'}">
        <div class="avatar-upload-preview" :style="previewStyle">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{span: 1, offset: 2}" :md="2">
        <a-button icon="plus" @click="changeScale(1)" />
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="minus" @click="changeScale(-1)" />
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="undo" @click="rotateLeft" />
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="redo" @click="rotateRight" />
      </a-col>
      <a-col :lg="{span: 2, offset: 6}" :md="2">
        <a-button type="primary" @click="finish('blob')">开始上传</a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      id: null,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      Urls: {
        uploadImgUrl: '/api/file/upload',
        addUrl: '/api/marketing/image/insert',
      },
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 608,
        autoCropHeight: 342,
        fixedBox: true,
        canMove: true,
        canMoveBox: false,
      },
      previews: {},
      previewStyle: {},
    }
  },
  methods: {
    edit(id) {
      this.visible = true
      this.id = id
      /* 获取原始头像 */
    },
    close() {
      this.id = null
      this.visible = false
    },
    cancelHandel() {
      this.close()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload(file) {
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    // 上传图片（点击上传按钮）
    finish(type) {
      console.log('finish')
      const _this = this
      const formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          const img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          formData.append('file', data, this.fileName)
          this.confirmLoading = true
          this.$http
            .post(this.Urls.uploadImgUrl, formData, {
              contentType: false,
              processData: false,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .then((res) => {
              this.confirmLoading = false
              if (res.code == 0) {
                _this.$emit('ok', res.data.url)
                _this.visible = false
              } else {
                _this.$message.error(res.msg)
              }
            })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    realTime(data) {
      this.previews = data
      this.previewStyle = {
        width: data.w + 'px',
        height: data.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: 1,
      }
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
