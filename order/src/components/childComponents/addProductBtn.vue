<template lang="pug">
div
  div(style='margin: 20px')
    el-button(@click='addProductBtn' type='primary') 新增產品
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
