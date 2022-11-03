<template lang="pug">
div
  listHeader
  addList
  a(href='/list') list
  br
  a(href='/add') addList
  addList

</template>

<script>
import listHeader from "@/components/listHeader";
import AddList from "@/views/AddList.vue";
export default {
  name: "HomeView",
  components: {
    listHeader,
    AddList,
  },
};
</script>
