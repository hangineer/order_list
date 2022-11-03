<template>
  <div></div>
</template>
<script>
export default {
  name: "helloWorld",
  props: {},
  data() {
    return {
      nowID: this.$route.params.id,
    };
  },
};
</script>
<style lang="scss" scoped></style>
