<template>
  <div>
    <h1>Din model mail: {{model}} </h1>
    

    <table id="jobs">
      <tr>
        <th>Kunde</th>
        <th>Startdato</th>
        <th>Antal dage</th>
        <th>Lokation</th>
        <th>Kommentarer</th>
        <th>Se / Tilføj Udgifter</th>
      </tr>
      <tr v-for="job in modelJobs" v-bind:key="job.efJobId">
        <td>{{ job.customer }}</td>
        <td>{{ date = new Date(job.startDate).toLocaleDateString() }}</td>
        <td>{{ job.days }}</td>
        <td>{{ job.location }}</td>
        <td>{{ job.comments }}</td>
        <td><router-link :to="`/expenses/${job.efJobId}`"
            ><img
              src="http://pngimg.com/uploads/dollar_sign/dollar_sign_PNG21539.png"
              widht="25em"
              height="25em"
          /></router-link></td>
      </tr>
    </table>

    <br /><br />
  </div>
</template>

<script>
export default {
  name: "Models",
  data() {
    return {
      modelJobs: [],
      model: localStorage.getItem('modelMail')
    };
  },
  methods: {
    getAllModelJobs() {
      var url = "https://localhost:44368/api/Jobs/";
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((re) => {
            this.modelJobs = re;
          })
        )
        .catch((err) => console.error("Error:", err));
    }
  },
  beforeMount() {
    this.getAllModelJobs();
  },
};
</script>

<style scoped>
#jobs {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

#jobs td,
#jobs th {
  border: 1px solid #ddd;
  padding: 8px;
}

#jobs tr:nth-child(even) {
  background-color: #f2f2f2;
}

#jobs tr:hover {
  background-color: #ddd;
}

#jobs th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #37afcb;
  color: white;
}
</style>