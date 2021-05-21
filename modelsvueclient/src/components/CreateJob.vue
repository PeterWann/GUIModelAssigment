<template>
  <div>
    <h1>Opret et nyt job</h1>

    <h4>Indtast information og tryk opret!</h4>

    <form style="width: 100% text-align: center">
      <label>Indtast Kunde: </label>
      <input type="text" v-model="form.customer" /><br /><br />
      <label>Indtast Startdato: </label>
      <input type="date" v-model="form.startDate" /><br /><br />
      <label>Indtast Antal Dage: </label>
      <input type="number" v-model="form.days" /><br /><br />
      <label>Indtast Lokation: </label>
      <input type="text" v-model="form.location" /><br /><br />
      <label>Indtast Kommentar: </label>
      <input type="text" v-model="form.comments" style="height: 10em"/><br /><br />
      <button type="button" v-on:click="createJob()">Opret Job</button>
    </form>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  data() {
    return {
      form: {
        customer: "",
        startDate: "",
        days: 0,
        location: "",
        comments: ""
      },
    };
  },
  methods: {
    async createJob() {
      let url = "https://localhost:44368/api/Jobs";
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

          router.push("/createJobSuccess");
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
