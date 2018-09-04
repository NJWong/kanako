import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (kana-test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/kana-test",
      name: "kana-test",
      // route level code-splitting
      // this generates a separate chunk (kana-test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "kana-test" */ "./views/KanaTest.vue")
    }
  ]
});
