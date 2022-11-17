<template lang="pug">
div
  el-button(@click='logout') 登出

</template>
<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    logout() {
      //todo 待完成
      this.$store.commit("");
    },
  },
};
</script>
<style lang="scss" scoped></style>
