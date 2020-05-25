import Vue from "vue";
import Router from "vue-router";

import Home from "../layouts/Home.vue";

Vue.use(Router);

const routes = [
  {
    path: "",
    name: " ",
    component: Home,
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
