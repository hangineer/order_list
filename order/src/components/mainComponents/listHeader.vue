<template lang="pug">
.listHeader
    h2 {{ header }}
    //- hr 
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
.listHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;
  height: 80px;
  margin-bottom: 20px;
  background: lightblue;
  h2 {
    text-align: center;
    // margin: 30px auto;
    font-size: 30px;
  }
}
</style>
