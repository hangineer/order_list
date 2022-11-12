<template lang="pug">
.listHeader
    a(href='/') 
      h2 {{ header }}  
</template>

<script>
export default {
  data() {
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
  height: 60px;
  margin-bottom: 20px;
  background: lightblue;
  a {
    text-decoration: none;
    h2 {
      text-align: center;
      color: #000000;
      font-size: 30px;
    }
  }
}
</style>
