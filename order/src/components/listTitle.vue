<template>
  <div class="listTitle">
    <h2>{{ title }}</h2>
    <hr />
    <br />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "Order List",
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 30px auto;
  font-size: 30px;
}
</style>
