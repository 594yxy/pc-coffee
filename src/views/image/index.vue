<template>
  <div>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="beforeUpload">
          <a-icon type="upload" />选择图片
        </a-button>
      </div>
      <a-list
        :grid="{ gutter: 24, xs: 1, md: 1, lg: 2, xl:3, xxl:4 }"
        :data-source="dataSource"
        :loading="localLoading"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="img-list-item">
            <div class="img-div">
              <a-spin :spinning="imgLoading" size="small">
                <div class="images" v-viewer>
                  <img
                    v-for="(src,index) in item.imageSrc.split()"
                    @error="handleErrorImg"
                    @load="handleLoadImg"
                    :src="src"
                    :key="index"
                  />
                </div>
              </a-spin>
            </div>
            <div class="img-foot">
              <span class="title">轮播图{{index+1}}</span>
              <div class="action">
                <a-button
                  size="small"
                  type="dashed"
                  style="margin-right: 12px"
                  @click="handleDel(item)"
                >删除</a-button>
                <a-switch
                  checked-children="开"
                  un-checked-children="关"
                  :checked="item.isEnable==1?true:false"
                  @change="checked=>switchChange(checked,item)"
                />
              </div>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <avatar-modal ref="imgModal" @ok="handleInsertImg" />
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import AvatarModal from './modules/AvatarModal'

export default {
  name: 'ImgList',
  mixins: [baseMixin, indexMixin],
  components: {
    AvatarModal,
  },
}
</script>
<style lang="less" scoped>
&.mobile {
  .img-list-item {
    .img-div {
      height: 100%;
    }
  }
}
.img-list-item {
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  .img-div {
    height: 200px;
    overflow: hidden;
    margin: 10px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  &.mobile {
    .date-picker-box {
      .till {
        display: none;
      }
    }
  }

  .img-foot {
    border-top: 1px dashed #d9d9d9;
    padding: 6px 10px;
    display: flex;
    .title {
      flex: 1;
    }
    .action {
      text-align: right;
      display: flex;
      align-items: center;
    }
  }
}
</style>
