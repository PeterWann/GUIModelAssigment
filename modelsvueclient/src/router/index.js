import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../components/LoginForm.vue"
import CreateManager from "../components/CreateManager"
import CreateModel from "../components/CreateModel"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/createModel",
    name: "Create Model",
    component: CreateModel,
    beforeEnter: function (to, from, next) {
      if (to.name == "Create Model" && localStorage.getItem("claim") == 'Manager') { next() }
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
