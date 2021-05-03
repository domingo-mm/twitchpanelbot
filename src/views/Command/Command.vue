<template>
  <div class="command">
    <div class="bg"></div>
    <ListCommands />
  </div>
</template>

<style scoped lang="scss">
  .command{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    .bg {
      width: 100%;
      height: 100%;
      background-color: #69008f;
      clip-path: polygon(0% 0%, 0% 5%, 100% 100%, 100% 0%);
    }

    .listCommands{
      position: absolute;
    }
  }
</style>

<script>
import ListCommands from "@/components/COMMANDS_components/listCommands.vue"

export default {
    name: "Command",
    components:{
      ListCommands
    },
    setup() {
        
    },
}
</script>