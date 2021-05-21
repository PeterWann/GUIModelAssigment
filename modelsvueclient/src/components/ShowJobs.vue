<template>
  <div>
    <h1>Viser alle jobs</h1>

    <h4>Tryk på redigere for at tilføje eller slette modeller fra jobbet</h4>

    <table id="jobs">
      <tr>
        <th>Kunde</th>
        <th>Startdato</th>
        <th>Antal dage</th>
        <th>Lokation</th>
        <th>Kommentar</th>
        <th>Redigere</th>
      </tr>
      <tr v-for="job in jobs" v-bind:key="job.efJobId">
        <td>{{ job.customer }}</td>
        <td>{{ (date = new Date(job.startDate).toLocaleDateString()) }}</td>
        <td>{{ job.days }}</td>
        <td>{{ job.location }}</td>
        <td>{{ job.comments }}</td>
        <td>
          <router-link :to="`/editJobs/${job.efJobId}`"
            ><img
              src="https://image.flaticon.com/icons/png/512/1828/1828918.png"
              widht="25em"
              height="25em"
          /></router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    getJobs() {
      var url = "https://localhost:44368/api/Jobs";
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((re) => {
            this.jobs = re;
          })
        )
        .catch((err) => console.error("Error:", err));
    },
  },
  mounted() {
    this.getJobs();
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