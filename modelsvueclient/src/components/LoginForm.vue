<template>
    <section>
        <input v-model="form.email" type="text" />
        <input v-model="form.password" type="password" />
        <button type="button" v-on:click="login">Log In</button>
    </section>
</template>

<script>
import router from "../router/index";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        oldPassword: "",
      },
    };
  },
  methods: {
    async login() {
      let url = "https://localhost:44368/api/Account/login";
      try {
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.form), // Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });

        if (response.ok) {
          let token = await response.json();
          localStorage.setItem("token", token.jwt);

          console.log(this.parseJwt(token.jwt));
          let claims = this.parseJwt(token.jwt);
          
          localStorage.setItem(
            "claim",
            claims[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          );
          localStorage.setItem("ModelId",claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
          localStorage.setItem("Id",claims['ModelId']);
          router.push("/");
        } else {
          console.log("Server returned: ", response.statusText);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
    parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

      return JSON.parse(jsonPayload);
    },
  },
};
</script>