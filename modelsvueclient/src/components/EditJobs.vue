<template>
  <div>
    <h1>Kunde: {{jobinfo.customer}} </h1>
    <h3>Lokation: {{jobinfo.location}}</h3>

    <h4>Modeller tilknyttet jobbet</h4>
    <table id="jobs">
      <tr>
        <th>Fornavn</th>
        <th>Efternavn</th>
        <th>Email</th>
        <th>Telefonnummer</th>
        <th>Slet fra job</th>
      </tr>
      <tr v-for="model in models" v-bind:key="model.email">
        <td>{{ model.firstName }}</td>
        <td>{{ model.lastName }}</td>
        <td>{{ model.email }}</td>
        <td>{{ model.phoneNo }}</td>
        <td><button v-on:click="deleteFromJob(model.efModelId)" style="border: none"><img src="https://img-premium.flaticon.com/png/512/561/561189.png?token=exp=1621531004~hmac=6db2fbd360c674f247dca5b4e5c4e815" height="25em" width="25em"></button></td>
      </tr>
    </table>
    <br><br>
    <h4>Tilknyt model til job</h4>
    <table id="jobs">
      <tr>
        <th>Fornavn</th>
        <th>Efternavn</th>
        <th>Email</th>
        <th>Telefonnummer</th>
        <th>Tilføj til job</th>
      </tr>
      <tr v-for="model in newmodels" v-bind:key="model.email">
        <td>{{ model.firstName }}</td>
        <td>{{ model.lastName }}</td>
        <td>{{ model.email }}</td>
        <td>{{ model.phoneNo }}</td>
        <td><button v-on:click="addToJob(model.efModelId)" style="border: none"><img src="https://image.flaticon.com/icons/png/512/149/149699.png" height="18em" width="18em"></button></td>
      </tr>
    </table>
  </div>
</template>

<script>


export default {

name: "Models",
data() {
  return {
    models: [],
    jobinfo: {},
    newmodels: [],
  }
},
methods: {
    addToJob(efModelId) {
        var url = "https://localhost:44368/api/Jobs/" + this.currentJob() + "/model/" + efModelId;
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
        }})
        .then(location.reload())
    },
    getAllModels() {
        var url = "https://localhost:44368/api/Models/";
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
        }})
        .then(res => res.json().then(re => {
            this.newmodels = re;
            
            }))
            .catch(err => console.error('Error:', err));
    },
    deleteFromJob(efModelId) {
        var url = "https://localhost:44368/api/Jobs/" + this.currentJob() + "/model/" + efModelId;
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
        }})
        .then(location.reload())
    },
        getJobs() {
        var jobModels = [];
        var url = "https://localhost:44368/api/Jobs/" + this.currentJob();
        fetch(url, {
            
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }})
            .then(res => res.json().then(re => {
                this.jobinfo = re;
                jobModels = re.jobModels;
                jobModels.forEach(m => {
                    this.models.push(m.model);
                })

            }))
            .catch(err => console.error('Error:', err));
        },
        currentJob() {
            let currentUrl = window.location.pathname;
            let jobId = currentUrl.split("/");
            return jobId[jobId.length - 1];
        }
    },
        beforeMount() {
            this.getJobs();
            this.getAllModels();
        }
}
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