import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../components/LoginForm.vue"
import CreateManager from "../components/CreateManager"
import CreateModel from "../components/CreateModel"
import CreateJob from "../components/CreateJob"
import ShowJobs from "../components/ShowJobs"
import EditJobs from "../components/EditJobs"
import ShowModelJobs from "../components/ShowModelJobs"
import Expenses from "../components/Expenses"

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
  {
    path: "/createJob",
    name: "Create Job",
    component: CreateJob,
    beforeEnter: function (to, from, next) {
      if (to.name == "Create Job" && localStorage.getItem("claim") == 'Manager') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
  {
    path: "/showJobs",
    name: "Show Jobs",
    component: ShowJobs,
    beforeEnter: function (to, from, next) {
      if (to.name == "Show Jobs" && localStorage.getItem("claim") == 'Manager') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
  {
    path: "/editJobs/:id",
    name: "Edit Jobs",
    component: EditJobs,
    beforeEnter: function (to, from, next) {
      if (to.name == "Edit Jobs" && localStorage.getItem("claim") == 'Manager') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
  {
    path: "/showModelJobs",
    name: "Show Model Jobs",
    component: ShowModelJobs,
    beforeEnter: function (to, from, next) {
      if (to.name == "Show Model Jobs" && localStorage.getItem("claim") == 'Model') { next() }
      else { next({
        name: "Home"
      }) }
    }
  },
  {
    path: "/Expenses/:id",
    name: "Expenses",
    component: Expenses,
    beforeEnter: function (to, from, next) {
      if (to.name == "Expenses" && localStorage.getItem("claim") == 'Model') { next() }
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
