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
  },
  {
    path: "/module",
    name: "Module",
    component: () =>
      import("@/views/Module/Module.vue"),
  },
  {
    path: "/fun",
    name: "Fun",
    component: () =>
      import("@/views/Fun/Fun.vue"),
  },
  {
    path: "/trigger",
    name: "Trigger",
    component: () =>
      import("@/views/Trigger/Trigger.vue"),
  },
  {
    path: "/twitch",
    name: "Twitch",
    
  }
];

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
