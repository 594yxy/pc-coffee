import {
  axios
} from '@/utils/request';
var indexMixin = {
  data() {
    return {
      isActive: 0,
      tips: {
        edit: '设置成功'
      },
      model: {
        formKeys: ['distributor_mode', 'invite_expire', 'invite_protection'],
      },
    }
  },
  created() {
    this.getKeyValueList()
  },
  methods: {
    toggleMode(index) {
      this.isActive = index
    },
    handleEdit(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.dialogStatus = 'edit'
    },
    beforeSubmit(form) {
      form.distributor_mode = this.isActive
      return form
    },
    setForm() {
      this.isActive = this.model.distributor_mode
    },
  }
};
export default indexMixin;