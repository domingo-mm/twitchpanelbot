<template>
  <div class="home">
    <InformationPanel />
  </div>
</template>


<style scoped lang="scss">
  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E88268;
    width: 100%;
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
