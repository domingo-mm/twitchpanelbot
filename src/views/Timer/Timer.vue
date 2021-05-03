<template>
    <div class="timer">
        <div class="bg"></div>
        <ListTimmers />
    </div>
</template>

<style scoped lang="scss">
.timer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    .bg {
        width: 100%;
        height: 100%;
        background-color: #058502;
        clip-path: polygon(0% 0%, 0% 5%, 100% 100%, 100% 0%);
    }
}
</style>

<script>
import ListTimmers from "@/components/TIMMERS_components/listTimmers.vue"

export default {
    name: "Timer",
    components: {
        ListTimmers
    }
}
</script>