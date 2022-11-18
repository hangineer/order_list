<template lang="pug">
div.listHeader
  el-menu(mode='horizontal' :router="true" background-color='lightblue' text-color='black')
    el-menu-item(index='1' route="/list" ) 
      img(:style="logoSize" src="../../assets/image/logo.png")
      span.header {{header}}
    el-submenu(index='2' v-if="this.$store.state.adminModule.isLogin" )
      template(slot='title' ) 
        span(style="font-size:18px") 訂單相關
      el-menu-item( v-for="item in listNav" :index="item.route") {{item.name}}
      //- el-menu-item(index='2-1' route="/add") 建立訂單
      //- el-menu-item(index='2-2' route="/list") 查看訂單
    el-submenu(index='3'  v-if="this.$store.state.adminModule.isLogin"  :disabled="show") 
      template(slot='title' ) 
        span(style="font-size:18px") 產品相關
      el-menu-item( v-for="item in productNav" :index="item.route") {{item.name}}
    logoutBtn
      //- el-menu-item(index='2-1' route="/addProduct") 建立產品
      //- el-menu-item(index='2-2' route="/product") 查看產品
    //- el-menu-item(index='3' disabled='') Info
</template>
<script>
import logoutBtn from "@/components/childComponents/logoutBtn.vue";
export default {
  components: {
    logoutBtn,
  },
  data() {
    return {
      header: "Order List",
      logoSize: [
        {
          width: "100px",
        },
      ],
      listNav: [
        { name: "建立訂單", route: "/add" },
        { name: "查看訂單", route: "/list" },
      ],
      productNav: [
        { name: "建立產品", route: "/addProduct" },
        { name: "查看產品", route: "/product" },
      ],
    };
  },
  computed: {
    show() {
      if (JSON.parse(sessionStorage.getItem("userData")).role == "user") {
        return true;
      }
    },
  },
  // methods: {
  //   test() {
  //     return this.$store.state.isLogin;
  //   },
  // },
  // created() {
  //   this.$set(this.$store.commit(setIsLogin), "penguin", 0);
  // },
};
</script>

<style lang="scss" scoped>
.listHeader {
  box-sizing: border-box;
  height: 80px;
  margin-bottom: 20px;
  background: lightblue;

  .header {
    color: #000000;
    font-size: 32px !important;
  }
}
</style>
