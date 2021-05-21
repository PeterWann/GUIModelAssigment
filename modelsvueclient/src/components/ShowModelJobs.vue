<template>
  <div>
    <h1>Model email: {{ modelinfo }}</h1>
    

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
        <td><router-link :to="`/Expenses/${job.efJobId}`"><img src="https://banner2.cleanpng.com/20171216/5d0/dollar-sign-png-5a355146e059a3.4282492115134436549189.jpg" height="35em" width="50em"></router-link></td>
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
      modelinfo: localStorage.getItem('ModelId'),

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