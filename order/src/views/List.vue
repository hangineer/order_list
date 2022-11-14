<template lang="pug">
div
    //- AddList
    listData
    addListBtn
</template>

<script>
// import AddList from "@/views/AddList.vue";
import listData from "@/components/childComponents/listData.vue";
import addListBtn from "@/components/childComponents/addListBtn.vue";

export default {
  components: {
    // AddList,
    listData,
    addListBtn,
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  methods: {},
};
</script>

<style lang="scss"></style>
<style src="../../public/reset.css"></style>
