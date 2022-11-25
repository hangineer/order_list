<template lang="pug">
div
  el-footer.footer {{ footer }}
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
.footer {
  height: 200px;
  background: lightblue;
  color: #000000;
  vertical-align: middle;
  line-height: 60px;
}
</style>
