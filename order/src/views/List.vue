<template lang="pug">
div

    listData
    addListBtn
</template>

<script>
import listData from "@/components/childComponents/listData.vue";
import addListBtn from "@/components/childComponents/addListBtn.vue";

export default {
  components: {
    listData,
    addListBtn,
  },
};
</script>

<style lang="scss"></style>
<style src="../../public/reset.css"></style>
