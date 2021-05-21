<template>
  <div>
    <h1>Opret en ny manager</h1>

    <h4>Indtast information og tryk opret!</h4>

    <form style="width: 30% text-align: center">
      <label>Indtast Fornavn: </label>
      <input type="text" v-model="form.firstName" /><br /><br />
      <label>Indtast Efternavn: </label>
      <input type="text" v-model="form.lastName" /><br /><br />
      <label>Indtast Email: </label>
      <input type="text" v-model="form.email" /><br /><br />
      <label>Indtast Password: </label>
      <input type="password" v-model="form.password" /><br /><br />
      <button type="button" v-on:click="createManager()">Opret Manager</button>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async createManager() {
      let url = "https://localhost:44368/api/Managers";
      try {
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.form), // Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }),
        });

        if (response.ok) {
          let msg = await response.json();

          console.log(msg);

          router.push("/createManagerSuccess");
        } else {
          console.log("Server returned: ", response.statusText);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
  },
};
</script>

<style scoped>
</style>