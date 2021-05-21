<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="getClaim() == 'Manager'" to="/createManager">Opret Manager</router-link><span v-if="getClaim() == 'Manager'"> | </span>
      <router-link v-if="getClaim() == 'Manager'" to="/createModel">Opret Model</router-link><span v-if="getClaim() == 'Manager'"> | </span>
      <router-link v-if="getClaim() == 'Manager'" to="/createJob">Opret Job</router-link><span v-if="getClaim() == 'Manager'"> | </span>
      <router-link v-if="getClaim() == 'Manager'" to="/showJobs">Vis Jobs</router-link><span v-if="getClaim() == 'Manager'"> | </span>
      <router-link v-if="getClaim() == 'Model'" to="/showModelJobs">Vis Jobs</router-link><span v-if="getClaim() == 'Model'"> | </span>
      <router-link v-if="!isLoggedIn()" to="/login">Log in</router-link>
      <a class="nav" v-else v-on:click="logout()">Log Out</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods:{
    isLoggedIn(){
      return localStorage.getItem('token');
    },
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('claim');
      this.$forceUpdate();
      return;
    },
    getClaim(){
      return localStorage.getItem("claim");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a{
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}

#nav a:hover{
  color: #42b983;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
