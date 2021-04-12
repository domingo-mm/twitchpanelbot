<template>
  <div class="command">
    <ListCommands />
  </div>
</template>

<style scoped lang="scss">
  .command{
    width: 100%;
    background-color: #4e2b45;
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