<template lang="pug">
div
    AddList
    ListData

</template>

<script>
import AddList from "@/components/childComponents/AddList.vue";
import ListData from "@/components/childComponents/ListData.vue";

export default {
  components: {
    AddList,
    ListData,
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    methods: {
      remove(i) {
        let obj = this.tableData.slice(); //深拷貝
        obj.splice(i, 1);
        this.$store.dispatch("updateTableData", obj);
      },
    },
  },
};
</script>

<style lang="scss"></style>
<style src="../../public/reset.css"></style>
