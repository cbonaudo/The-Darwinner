import Vue from "vue";
import Router from "vue-router";
import Global from "@/Global";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Global",
      component: Global
    }
  ]
});
