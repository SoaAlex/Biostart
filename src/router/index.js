import Vue from "vue";
import VueRouter from "vue-router";
import Monitoring from "../views/Monitoring.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "monitoring",
    component: Monitoring
  },
  {
    path: "/monitoring",
    name: "monitoring",
    component: Monitoring
  },
  {
    path: "/overview",
    name: "overview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Overview.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
