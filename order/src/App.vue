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
