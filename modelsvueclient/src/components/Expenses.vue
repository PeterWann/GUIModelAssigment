<template>
  <div>

    <h4>Udgifter tilknyttet jobbet</h4>
    <table id="jobs">
      <tr>
        <th>Dato</th>
        <th>Tekst</th>
        <th>Beløb</th>
        <th>Slet beløb</th>
      </tr>
      <tr v-for="expense in expenses" v-bind:key="expense.efExpenseId">
        <td>{{ date = new Date(expense.date).toLocaleDateString() }}</td>
        <td>{{ expense.text }}</td>
        <td>{{ expense.amount }}</td>
        <td><button v-on:click="deleteExpense(expense.efExpenseId)" style="border: none"><img src="https://assets.dryicons.com/uploads/icon/svg/2641/delete.svg" height="18em" width="18em"></button></td>
      </tr>
    </table>
    <br><br>
    <h4>Tilføj udgifter til jobbet</h4>

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
export default {
  name: "Expenses",
  data() {
    return {
      expenses: [],
      modelId: localStorage.getItem('Id'),
      form: {
      date: "",
      text: "",
      amount: "",
      modelId: localStorage.getItem('Id'),
      jobId: this.currentJob(),
      }
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

          location.reload();
        } else {
          console.log("Server returned: ", response.statusText);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
    deleteExpense(efExpenseId) {
      var url =
        "https://localhost:44368/api/Expenses/" + efExpenseId;
      fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }).then(location.reload());
    },
    getExpenses() {
      var url = "https://localhost:44368/api/Expenses/model/" + this.modelId;
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
            this.expenses = re;
          })
        )
        .catch((err) => console.error("Error:", err));
    },
    currentJob() {
      let currentUrl = window.location.pathname;
      let jobId = currentUrl.split("/");
      return jobId[jobId.length - 1];
    },
  },
  beforeMount() {
    this.getExpenses();
  },
};
</script>

<style scoped>
#jobs {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 30%;
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