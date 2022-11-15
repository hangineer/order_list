<template lang="pug">
div
    productData
    addProductBtn
</template>

<script>
import productData from "@/components/childComponents/productData.vue";
import addProductBtn from "@/components/childComponents/addProductBtn.vue";

export default {
  components: {
    productData,
    addProductBtn,
  },
  computed: {
    // tableData() {
    //   return this.$store.state.tableData;
    // },
  },
};
</script>

<style lang="scss"></style>
<style src="../../public/reset.css"></style>
