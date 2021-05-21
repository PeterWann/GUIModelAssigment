<template>
  <div>
    <h1>Opret en ny model</h1>

    <h4>Indtast information og tryk opret!</h4>

    <form style="width: 30% text-align: center">
      <label>Indtast Fornavn: </label>
      <input type="text" v-model="form.firstName" /><br /><br />
      <label>Indtast Efternavn: </label>
      <input type="text" v-model="form.lastName" /><br /><br />
      <label>Indtast Email: </label>
      <input type="text" v-model="form.email" /><br /><br />
      <label>Indtast Telefonnummer </label>
      <input type="text" v-model="form.phoneNo" /><br /><br />
      <label>Indtast Addresse #1: </label>
      <input type="text" v-model="form.addresLine1" /><br /><br />
      <label>Indtast Addresse #2: </label>
      <input type="text" v-model="form.addresLine2" /><br /><br />
      <label>Indtast Postkode: </label>
      <input type="text" v-model="form.zip" /><br /><br />
      <label>Indtast By: </label>
      <input type="text" v-model="form.city" /><br /><br />
      <label>Indtast Land: </label>
      <input type="text" v-model="form.country" /><br /><br />
      <label>Indtast Fødselsdato: </label>
      <input type="date" v-model="form.birthDate" /><br /><br />
      <label>Indtast Nationalitet: </label>
      <input type="text" v-model="form.nationality" /><br /><br />
      <label>Indtast Højde: </label>
      <input type="text" v-model="form.height" /><br /><br />
      <label>Indtast Skostørrelse: </label>
      <input type="text" v-model="form.shoeSize" /><br /><br />
      <label>Indtast Kommentar: </label>
      <input type="text" v-model="form.comments" style="height: 10em"/><br /><br />
      <label>Indtast Password: </label>
      <input type="password" v-model="form.password" /><br /><br />
      <button type="button" v-on:click="createModel()">Opret Model</button>
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
        phoneNo: "",
        addresLine1: "",
        addresLine2: "",
        zip: "",
        city: "",
        country: "",
        birthDate: "",
        nationality: "",
        height: 0,
        shoeSize: 0,
        hairColor: "",
        eyeColor: "",
        comments: "",
        password: "",
      },
    };
  },
  methods: {
    async createModel() {
      let url = "https://localhost:44368/api/Models";
      try {
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.form), // Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });

        if (response.ok) {
          let msg = await response.json();

          console.log(msg);

          router.push("/createModelSuccess");
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