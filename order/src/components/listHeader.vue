<template lang="pug">
.listHeader
    h2 {{ header }}
    hr 
    br
</template>

<script>
export default {
  data: function () {
    return {
      header: "Order List",
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
