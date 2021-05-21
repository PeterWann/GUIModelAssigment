<template>
  <div>
    <h1>Modelnavn: {{modelinfo.firstName + " " + modelinfo.lastName}}</h1>
    

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
        <td>DOLLARDOLLAR</td>
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
      modelinfo: {},
      modelId: localStorage.getItem('ModelId'),
    };
  },
  methods: {
    getAllModelJobs() {
      var url = "https://localhost:44368/api/Models/" + this.modelId;
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
            this.modelinfo = re;
            this.modelJobs = re.jobModels;
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