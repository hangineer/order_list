<template lang="pug">
div.listHeader
  el-menu.menu( mode='horizontal' :router="true" background-color='lightblue' atext-color='#fff' active-text-color='black' text-color='black')
    el-menu-item(index='1' route="/list") 
      img(:style="logoSize" src="../../assets/image/logo.png")
      span.header {{header}}
    el-submenu(index='2')
      template(slot='title') 訂單相關
      el-menu-item(index='2-1' route="/add") 建立訂單
      el-menu-item(index='2-2' route="/list") 查看訂單
    el-submenu(index='3')
      template(slot='title') 產品相關
      el-menu-item(index='2-1' route="/addProduct") 建立產品
      el-menu-item(index='2-2' route="/product") 查看產品
    //- el-menu-item(index='3' disabled='') Info
</template>
<script>
export default {
  data() {
    return {
      header: "Order List",
      logoSize: [
        {
          width: "100px",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.listHeader {
  box-sizing: border-box;
  height: 60px;
  margin-bottom: 20px;
  .header {
    color: #000000;
    font-size: 30px !important;
  }
}
</style>
