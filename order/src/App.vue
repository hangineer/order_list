<template lang="pug">
#app
    listHeader
    router-view
      //- <router-link :to=`/list/${i}`>list</router-link>
</template>

<script>
import listHeader from "@/components/mainComponents/listHeader.vue";
export default {
  components: {
    listHeader,
  },
  mounted: {
    //思路：
    //1. 打API，來取得tableData內的資料
    //2. 把get到的tableData寫入store
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
