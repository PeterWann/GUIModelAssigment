<template>
  <div>
    <h1>Tilføj udgifter til jobbet</h1>

    <h4>Indtast information og tryk tilføj udgift!</h4>

    <form style="width: 30% text-align: center">
      <label>Indtast dato: </label>
      <input type="date" v-model="form.date"/><br /><br />
      <label>Indtast kommentar til udgift: </label>
      <input type="text" v-model="form.text" style="height: 8em"/><br /><br />
      <label>Indtast pris på udgift i USD: </label>
      <input type="number" v-model="form.amount" /><br /><br />
      <button type="button" v-on:click="createExpense()">Tilføj udgift</button>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  data() {
    return {
      form: {
        date: "",
        text: "",
        amount: "",
      },
    };
  },
  methods: {
    async createExpense() {
      let url = "https://localhost:44368/api/Expenses";
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

          router.push("/");
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