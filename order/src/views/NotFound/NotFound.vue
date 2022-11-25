<template lang="pug">
div.container
    p.message {{ message }}
    img.notFound(src="../../assets/image/404Bird.png" alt="404 notFound")
    img.dizzyStar(src="../../assets/image/dizzy_star.gif" alt="dizzy star")
</template>
<script>
export default {
  data() {
    return {
      message: "404 Not Found",
    };
  },
};
</script>
<style lang="scss" scoped>
%style-shared {
  display: block;
  margin: auto;
  transform: scale(-1) rotate(-10deg);
}
.container {
  overflow-y: hidden;
  .message {
    font-size: 45px;
    text-align: left;
    margin: 30px 0 0 30px;
  }
  .notFound {
    @extend %style-shared;
    max-width: 650px;
    max-height: 600px;
    border-radius: 10%;
  }
  .dizzyStar {
    @extend %style-shared;
    max-width: 400px;
    max-height: 150px;
    transform: translate(15%, -70%);
    //   max-width: 20vw;
    //   max-height: 20vh;
  }
}
</style>
