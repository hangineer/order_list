<template lang="pug">
div
  div(style='margin-top: 20px')
    el-button(@click='addProductBtn' type='primary') 新增訂單
  </template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    addProductBtn() {
      this.$router.push("/addProduct");
    },
  },
};
</script>

<style lang="scss" scoped></style>
