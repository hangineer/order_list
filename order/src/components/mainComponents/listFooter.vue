<template>
  <el-footer>{{ footer }}</el-footer>
</template>

<script>
export default {
  data() {
    return {
      footer: "Copyright © 2022 Hannah. All rights reserved.",
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: lightblue;
  color: #000000;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
}
</style>
