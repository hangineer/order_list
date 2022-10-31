<template>
  <div class="home">
    <listTitle />
    <orderList />
  </div>
</template>

<script>
import orderList from "@/components/orderList.vue";
import listTitle from "@/components/listTitle.vue";

export default {
  name: "HomeView",
  components: {
    orderList,
    listTitle,
  },
};
</script>
