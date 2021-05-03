import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";

// Views
  import Start from "@/views/Start/Start.vue";
  import Command from "@/views/Command/Command.vue";
  import Timer from "@/views/Timer/Timer.vue";
  

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start
  },
  {
    path: "/:token",
    name: "Token",
    component: Start,
    beforeEnter: (to, from, next) => {
      next("/");
    },
  },
  {
    path: "/command",
    name: "Command",
    component: Command
  },
  {
    path: "/timer",
    name: "Timer",
    component: Timer
  }
];

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
