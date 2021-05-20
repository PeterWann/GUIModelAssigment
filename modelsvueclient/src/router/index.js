import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import LoginForm from "../components/LoginForm.vue"
import CreateManager from "../components/CreateManager"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    beforeEnter: function (to, from, next) {
      if (to.name == "About" && localStorage.getItem("claim") == 'Manager') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/createManager",
    name: "Create Manager",
    component: CreateManager,
    beforeEnter: function (to, from, next) {
      if (to.name == "Create Manager" && localStorage.getItem("claim") == 'Manager') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
