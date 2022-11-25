<template lang="pug">
div
  div(style='margin: 20px')
    el-button(@click='addListBtn' type='primary') 新增訂單
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    addListBtn() {
      this.$router.push("/add");
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>
