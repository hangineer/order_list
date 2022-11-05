<template>
  <div></div>
</template>
<script>
export default {
  //   name: "test",
  //   props: {},
  data() {
    return {
      nowID: this.$route.params.id,
    };
  },
  mounted() {
    this.$store.state.tableData[this.nowID];
  },
};
</script>
<style lang="scss" scoped></style>
