<template lang="pug">
div
  productForm 
</template>

<script>
import productForm from "@/components/childComponents/productForm.vue";

export default {
  components: {
    productForm,
  },
  computed: {
    // tableData() {
    //   return this.$store.state.tableData;
    // },
  },
};
</script>

<style lang="scss"></style>
