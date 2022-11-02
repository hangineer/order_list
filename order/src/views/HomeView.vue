<template>
  <div class="home">
    <listTitle />
    <addList />
  </div>
</template>

<script>
import addList from "@/components/addList.vue";
import listTitle from "@/components/listTitle.vue";

export default {
  name: "HomeView",
  components: {
    addList,
    listTitle,
  },
};
</script>
