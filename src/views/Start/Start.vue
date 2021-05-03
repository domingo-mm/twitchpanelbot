<template>
  <div class="home">
    <div class="bg"></div>
    <InformationPanel class="infoPanel"/>
  </div>
</template>


<style scoped lang="scss">
  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    .bg {
      width: 100%;
      height: 100%;
      background-color: #007cc7;
      clip-path: polygon(0% 0%, 0% 5%, 100% 100%, 100% 0%);
    }

    .infoPanel{
      position: absolute;
      z-index: 1;
    }
  }
</style>

<script>
// @ is an alias to /src
import InformationPanel from "@/components/START_components/InformationPanel.vue";

export default {
  name: "Start",
  components: {
    InformationPanel,
  },
};
</script>

