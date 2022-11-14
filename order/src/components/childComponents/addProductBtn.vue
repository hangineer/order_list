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
      this.$router.push("/product");
    },
  },
};
</script>
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
<style lang="scss" scoped></style>
