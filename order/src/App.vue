<template lang="pug">
#app
    listHeader
    router-view(:style="contentHeight")
    router-link(to="/:id")
    listFooter
</template>

<script>
import listHeader from "@/components/mainComponents/listHeader.vue";
import listFooter from "@/components/mainComponents/listFooter.vue";
export default {
  data() {
    return {
      contentHeight: { minHeight: "calc(100vh - 100px - 60px)" },
    };
  },
  components: {
    listHeader,
    listFooter,
  },
};
</script>
<style lang="scss">
@import "../public/reset.css";
#app {
  margin: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微軟雅黑", Arial, sans-serif;
}
</style>
